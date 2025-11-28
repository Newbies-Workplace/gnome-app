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
import { create } from "domain";
import { identity } from "rxjs";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";
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

    const healthByType = {
      MINE: 75,
      WATCHTOWER: 100,
    };
    const resources = await this.prismaService.userResource.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (
      resources.berries > 15 &&
      resources.sticks > 15 &&
      resources.stones > 15
    ) {
      const removeResources = await this.prismaService.userResource.update({
        where: {
          userId: user.id,
        },
        data: {
          berries: { increment: -15 },
          sticks: { increment: -15 },
          stones: { increment: -15 },
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
          health: healthByType[data.type],
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
    let maxHealth = 0;
    if (building.type === "MINE") {
      maxHealth = 75;
    }
    if (building.type === "WATCHTOWER") {
      maxHealth = 100;
    }
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
}
