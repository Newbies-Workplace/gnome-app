import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from "@nestjs/common";
import { Building, UserRole } from "@prisma/client";
import { CreateBuildingRequest } from "@repo/shared/requests";
import { BuildingResponse } from "@repo/shared/responses";
import { distance, featureCollection, nearestPoint, point } from "@turf/turf";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";

const BUILDINGS = [
  {
    type: "MINE",
    costs: { berries: 15, sticks: 15, stones: 15 },
    maxHealth: 75,
  },
  {
    type: "WATCHTOWER",
    costs: { berries: 15, sticks: 15, stones: 15 },
    maxHealth: 100,
  },
];
@Injectable()
export class BuildingsService {
  constructor(private readonly prismaService: PrismaService) {}
  async CreateBuilding(data: CreateBuildingRequest, user: JwtUser) {
    const buildings = await this.prismaService.building.findMany({
      select: {
        latitude: true,
        longitude: true,
      },
    });
    const buildingData = BUILDINGS.find((b) => b.type === data.type);
    const { berries, sticks, stones } = buildingData.costs;
    const resources = await this.prismaService.userResource.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (
      resources.berries > berries &&
      resources.sticks > sticks &&
      resources.stones > stones
    ) {
      const removeResources = await this.prismaService.userResource.update({
        where: {
          userId: user.id,
        },
        data: {
          berries: { decrement: berries },
          sticks: { decrement: sticks },
          stones: { decrement: stones },
        },
      });
      const newPoint = point([data.longitude, data.latitude]);
      const oldPoints = buildings.map((b) => point([b.longitude, b.latitude]));
      if (oldPoints.length > 0) {
        const collection = featureCollection(oldPoints);
        const nearest = nearestPoint(newPoint, collection);

        const dist = distance(newPoint, nearest, { units: "meters" });
        console.log(dist, "metrow");
        if (dist < 50) {
          throw new ForbiddenException("Za blisko innego budynku");
        }
      }

      return this.prismaService.building.create({
        data: {
          gnomeCount: data.gnomeCount,
          health: buildingData.maxHealth,
          latitude: data.latitude,
          districtId: data.districtId,
          longitude: data.longitude,
          type: data.type,
          ownerId: user.id,
        },
      });
    } else {
      throw new UnauthorizedException("Nie masz wystarczająco surowców");
    }
  }
  async getBuildingById(id: string): Promise<BuildingResponse> {
    return await this.prismaService.building.findUnique({
      where: {
        id: id,
      },
    });
  }
  async getAllBuildings(): Promise<BuildingResponse[]> {
    return this.prismaService.building.findMany();
  }
  async deleteBuilding(
    buildingId: string,
    userId: string,
    role: UserRole,
  ): Promise<BuildingResponse | Building> {
    const building = await this.prismaService.building.findUnique({
      where: { id: buildingId },
      select: { ownerId: true },
    });
    if (building.ownerId !== userId || role === "ADMIN")
      return await this.prismaService.building.delete({
        where: {
          id: buildingId,
        },
      });
    else {
      throw new ForbiddenException("Brak uprawnień");
    }
  }
  async empowerBuilding(
    id: string,
    gnomeIncrement: number,
  ): Promise<BuildingResponse> {
    const building = await this.prismaService.building.findUnique({
      where: { id: id },
      select: { health: true, type: true },
    });
    if (!building) {
      throw new NotFoundException("Nie ma takiego budynku");
    }
    const buildingData = BUILDINGS.find((b) => b.type === building.type);
    const maxHealth = buildingData.maxHealth;
    const newHealth = Math.min(building.health + gnomeIncrement * 2, maxHealth);
    return await this.prismaService.building.update({
      where: {
        id: id,
      },
      data: {
        gnomeCount: { increment: gnomeIncrement },
        health: newHealth,
      },
    });
  }
  async removeDeadBuildings() {
    await this.prismaService.building.deleteMany({
      where: { health: { lte: 1 } },
    });
  }
  async attackBuilding(id: string, damage: number): Promise<BuildingResponse> {
    const buildingData = await this.prismaService.building.findUnique({
      where: {
        id: id,
      },
      select: {
        health: true,
      },
    });
    if (!buildingData) {
      throw new NotFoundException("Budynek nie istnieje");
    }
    await this.prismaService.building.update({
      where: {
        id: id,
      },
      data: {
        health: { decrement: damage },
      },
    });
    await this.removeDeadBuildings();

    return this.prismaService.building.findUnique({
      where: {
        id: id,
      },
    });
  }
  async decayBuilding() {
    await this.removeDeadBuildings();
    return this.prismaService.building.updateMany({
      where: {
        health: { gt: 0 },
      },
      data: {
        health: { decrement: 1 },
      },
    });
  }
}
