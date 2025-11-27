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
import { create } from "domain";
import { identity } from "rxjs";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";
@Injectable()
export class BuildingsService {
  constructor(private readonly prismaService: PrismaService) {}
  async CreateBuilding(data: CreateBuildingRequest, user: JwtUser) {
    const healthByType = {
      MINE: 75,
      WATCHTOWER: 100,
    };
    const resources = await this.prismaService.userResource.findUnique({
      where: {
        userId: user.id,
      },
    });
    console.log(resources.berries, resources.sticks, resources.stones);
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

      return this.prismaService.building.create({
        data: {
          gnomeCount: data.gnomeCount,
          health: healthByType[data.type],
          latitude: data.latitude,
          districtId: data.districtId,
          longitude: data.longitude,
          Type: data.type,
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
      select: { health: true, Type: true },
    });
    if (!building) {
      throw new NotFoundException("Nie ma takiego budynku");
    }
    let maxHealth = 0;
    console.log(building.Type);
    if (building.Type === "MINE") {
      maxHealth = 75;
    }
    if (building.Type === "WATCHTOWER") {
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
