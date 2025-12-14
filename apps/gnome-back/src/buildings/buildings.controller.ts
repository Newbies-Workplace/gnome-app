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
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import {
  AttackBuildingRequest,
  CreateBuildingRequest,
  EmpowerBuildingRequest,
} from "@repo/shared/requests";
import {
  BuildingInteractionResponse,
  BuildingResponse,
} from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { Role } from "@/auth/decorators/role.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { RoleGuard } from "@/auth/guards/role.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { BuildingsService } from "./buildings.service";

@ApiBearerAuth()
@Controller("buildings")
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}
  @ApiBody({
    schema: {
      example: {
        gnomeCount: "40",
        latitude: "51.05876634559732",
        longitude: "17.05951335787934",
        districtId: "3",
        type: "WATCHTOWER",
      },
    },
  })
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
  @ApiBody({
    schema: {
      example: {
        gnomeCount: "40",
      },
    },
  })
  @Patch(":id/empower")
  @UseGuards(JwtGuard)
  async updateBuilding(
    @Param("id") buildingId: string,
    @User() user: JwtUser,
    @Body() body: EmpowerBuildingRequest,
  ) {
    await this.buildingsService.createInteraction(
      user.id,
      buildingId,
      "EMPOWER",
      body.gnomeCount,
    );
    return await this.buildingsService.empowerBuilding(
      buildingId,
      body.gnomeCount,
    );
  }
  @ApiBody({
    schema: {
      example: {
        clicks: "40",
      },
    },
  })
  @Patch(":id/attack")
  @UseGuards(JwtGuard)
  async attackBuilding(
    @Param("id") buildingId: string,
    @User() user: JwtUser,
    @Body() body: AttackBuildingRequest,
  ) {
    const maxDamage = 40;
    const damage = Math.min(body.clicks * 0.2, maxDamage);
    await this.buildingsService.createInteraction(
      user.id,
      buildingId,
      "ATTACK",
      damage,
    );
    return await this.buildingsService.attackBuilding(buildingId, damage);
  }
  @Cron(CronExpression.EVERY_HOUR)
  async decayBuildings() {
    await this.buildingsService.decayBuildings();
  }
}
