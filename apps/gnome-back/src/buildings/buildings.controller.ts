import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
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
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async deleteBuilding(
    @Param("id") buildingId: string,
  ): Promise<BuildingResponse> {
    return await this.buildingsService.deleteBuilding(buildingId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updateBuilding(@Body() body: updateBuildingRequest) {
    return await this.buildingsService.empowerBuilding(
      body.id,
      body.gnomeCount,
    );
  }
}
