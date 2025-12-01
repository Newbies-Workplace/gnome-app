import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import {
  CreateBuildingRequest,
  updateBuildingRequest,
} from "@repo/shared/requests";
import { BuildingResponse } from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";
import { Role } from "@/role/role.decorator";
import { RoleGuard } from "@/roleguard/role.guard";
import { BuildingsService } from "./buildings.service";
@Controller("buildings")
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}
  @Post("")
  @UseGuards(JwtGuard)
  async createBuilding(
    @User() user: JwtUser,
    @Body() body: CreateBuildingRequest,
  ) {
    return await this.buildingsService.CreateBuilding(body, user);
  }

  @Get(":id")
  @UseGuards(JwtGuard)
  async findBuildingById(
    @Param("id") buildingId: string,
  ): Promise<BuildingResponse> {
    const buildingData =
      await this.buildingsService.getBuildingById(buildingId);
    if (!buildingData) {
      throw new NotFoundException("Nie znaleziono budynku");
    }
    return buildingData;
  }

  @Get("")
  @UseGuards(JwtGuard)
  async getAllBuildings(): Promise<BuildingResponse[]> {
    return await this.buildingsService.getAllBuildings();
  }

  @Delete(":id")
  @UseGuards(JwtGuard)
  async deleteBuilding(
    @Param("id") buildingId: string,
    @User() user,
  ): Promise<BuildingResponse> {
    return await this.buildingsService.deleteBuilding(
      buildingId,
      user.id,
      user.role,
    );
  }

  @Patch(":id/empower")
  @UseGuards(JwtGuard)
  async updateBuilding(
    @Param("id") buildingId: string,
    @Body() body: updateBuildingRequest,
  ) {
    return await this.buildingsService.empowerBuilding(
      buildingId,
      body.gnomeCount,
    );
  }
  @Patch(":id/attack")
  @UseGuards(JwtGuard)
  async attackBuilding(@Param("id") buildingId: string) {
    return await this.buildingsService.attackBuilding(buildingId);
  }
}
