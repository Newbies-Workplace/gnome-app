import { Injectable, NotFoundException, Param } from "@nestjs/common";
import { Building } from "@prisma/client";
import { CreateBuildingRequest } from "@repo/shared/requests";
import { BuildingResponse } from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";
@Injectable()
export class BuildingsService {
  constructor(private readonly prismaService: PrismaService) {}
  async CreateBuilding(data: CreateBuildingRequest, user: JwtUser) {
    return this.prismaService.building.create({
      data: {
        gnomeCount: data.gnomeCount,
        health: data.health,
        latitude: data.latitude,
        longitude: data.longitude,
        district: data.district,
        Type: data.type,
        ownerId: user.id,
      },
    });
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
  async deleteBuilding(id: string): Promise<BuildingResponse> {
    return await this.prismaService.building.delete({
      where: {
        id: id,
      },
    });
  }
  async empowerBuilding(
    id: string,
    gnomeIncrement: number,
  ): Promise<BuildingResponse> {
    return await this.prismaService.building.update({
      where: {
        id: id,
      },
      data: {
        gnomeCount: { increment: gnomeIncrement },
        health: { increment: gnomeIncrement * 2 },
      },
    });
  }
}
