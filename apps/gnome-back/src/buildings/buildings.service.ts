import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Building, UserRole } from "@prisma/client";
import { Action, CreateBuildingRequest } from "@repo/shared/requests";
import { distance, featureCollection, nearestPoint, point } from "@turf/turf";
import { JwtUser } from "@/auth/types/jwt-user";
import {
  BUILDINGS,
  BUILDINGS_MIN_DISTANCE_METERS_BETWEEN,
  BuildingConstants,
} from "@/buildings/buildings.constants";
import { PrismaService } from "@/db/prisma.service";
import { DistrictsService } from "@/districts/districts.service";

@Injectable()
export class BuildingsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly districtsService: DistrictsService,
  ) {}

  async createBuilding(data: CreateBuildingRequest, user: JwtUser) {
    const buildingConstants = BUILDINGS.find((b) => b.type === data.type);

    await this.assertNoBuildingsColliding(data.latitude, data.longitude);

    const districtId = await this.districtsService.findDistrictId([
      Number(data.longitude),
      Number(data.latitude),
    ]);

    const createdBuilding = await this.prismaService.$transaction(async () => {
      await this.withdrawUserResourcesForBuilding(user.id, buildingConstants);

      return this.prismaService.building.create({
        data: {
          gnomeCount: data.gnomeCount,
          health: buildingConstants.maxHealth,
          latitude: data.latitude,
          longitude: data.longitude,
          districtId: districtId,
          type: data.type,
          ownerId: user.id,
        },
      });
    });

    return createdBuilding;
  }

  async getBuildingById(id: string): Promise<Building> {
    return this.prismaService.building.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getAllBuildings(): Promise<Building[]> {
    return this.prismaService.building.findMany();
  }

  async deleteBuilding(
    buildingId: string,
    userId: string,
    role: UserRole,
  ): Promise<Building> {
    const building = await this.prismaService.building.findUnique({
      where: { id: buildingId },
      select: { ownerId: true },
    });

    if (building.ownerId !== userId && role !== "ADMIN") {
      throw new ForbiddenException("No permission to delete this building");
    }

    return this.prismaService.building.delete({
      where: {
        id: buildingId,
      },
    });
  }

  async empowerBuilding(id: string, gnomeIncrement: number): Promise<Building> {
    const building = await this.prismaService.building.findUnique({
      where: { id: id },
      select: { health: true, type: true },
    });

    if (!building) {
      throw new NotFoundException(`Building with id ${id} not found`);
    }

    const buildingData = BUILDINGS.find((b) => b.type === building.type);
    const maxHealth = buildingData.maxHealth;
    const newHealth = Math.min(building.health + gnomeIncrement * 2, maxHealth);

    return this.prismaService.building.update({
      where: {
        id: id,
      },
      data: {
        gnomeCount: { increment: gnomeIncrement },
        health: newHealth,
      },
    });
  }

  async attackBuilding(id: string, damage: number): Promise<Building> {
    const buildingData = await this.prismaService.building.findUnique({
      where: {
        id: id,
      },
      select: {
        health: true,
      },
    });
    if (!buildingData) {
      throw new NotFoundException(`Building with id ${id} not found`);
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

  async decayBuildings() {
    await this.prismaService.building.updateMany({
      where: {
        health: { gt: 0 },
      },
      data: {
        health: { decrement: 1 },
      },
    });
    await this.removeDeadBuildings();
  }

  async getBuildingInteractions(buildingId: string) {
    const interactions = await this.prismaService.buildingInteraction.findMany({
      where: {
        buildingId,
      },
    });
    return interactions.map((e) => ({
      userId: e.userId,
      createdAt: e.createdAt,
      interactionType: e.interactionType,
      amount: e.amount,
    }));
  }

  async createInteraction(
    userId: string,
    buildingId: string,
    action: Action,
    amount: number,
  ) {
    await this.prismaService.buildingInteraction.create({
      data: {
        interactionType: action,
        buildingId,
        userId,
        amount,
      },
    });
  }

  private async removeDeadBuildings() {
    await this.prismaService.building.deleteMany({
      where: { health: { lte: 0 } },
    });
  }

  private async withdrawUserResourcesForBuilding(
    userId: string,
    constants: BuildingConstants,
  ) {
    const { berries, sticks, stones } = constants.costs;
    const resources = await this.prismaService.userResource.findUnique({
      where: {
        userId: userId,
      },
    });

    if (
      !(
        resources.berries > berries &&
        resources.sticks > sticks &&
        resources.stones > stones
      )
    ) {
      throw new ConflictException("Not enough resources");
    }

    await this.prismaService.userResource.update({
      where: {
        userId: userId,
      },
      data: {
        berries: { decrement: berries },
        sticks: { decrement: sticks },
        stones: { decrement: stones },
      },
    });
  }

  private async assertNoBuildingsColliding(
    latitude: number,
    longitude: number,
  ) {
    const buildings = await this.prismaService.building.findMany({
      select: {
        latitude: true,
        longitude: true,
      },
    });

    const newPoint = point([longitude, latitude]);
    const currentBuildingsPoints = buildings.map((b) =>
      point([b.longitude, b.latitude]),
    );

    if (currentBuildingsPoints.length > 0) {
      const collection = featureCollection(currentBuildingsPoints);
      const nearest = nearestPoint(newPoint, collection);

      const dist = distance(newPoint, nearest, { units: "meters" });

      if (dist < BUILDINGS_MIN_DISTANCE_METERS_BETWEEN) {
        throw new ConflictException("Za blisko innego budynku");
      }
    }
  }
}
