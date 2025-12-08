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
import { Cron, CronExpression } from "@nestjs/schedule";
import { UserRole } from "@prisma/client";
import {
  AttackBuildingRequest,
  CreateBuildingRequest,
  EmpowerBuildingRequest,
} from "@repo/shared/requests";
import {
  BuildingInteractionResponse,
  BuildingResponse,
} from "@repo/shared/responses";
import { max } from "class-validator";
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

  @Get(":id/interactions")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async getBuildingInteractions(
    @Param("id") buildingId: string,
  ): Promise<BuildingInteractionResponse[]> {
    const building = await this.buildingsService.getBuildingById(buildingId);

    if (!building) {
      throw new NotFoundException("Building not found");
    }
    return await this.buildingsService.getBuildingInteractions(buildingId);
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
    @Body() body: EmpowerBuildingRequest,
  ) {
    return await this.buildingsService.empowerBuilding(
      buildingId,
      body.gnomeCount,
    );
  }
  @Patch(":id/attack")
  @UseGuards(JwtGuard)
  async attackBuilding(
    @Param("id") buildingId: string,
    @Body() body: AttackBuildingRequest,
  ) {
    const maxDamage = 40;
    const damage = Math.min(body.clicks * 0.2, maxDamage);
    return await this.buildingsService.attackBuilding(buildingId, damage);
  }
  @Cron(CronExpression.EVERY_HOUR)
  async decayBuildings() {
    await this.buildingsService.decayBuildings();
  }
}
