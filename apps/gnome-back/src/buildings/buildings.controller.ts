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
import { MAX_ATTACK_DAMAGE } from "@/buildings/buildings.constants";
import {
  toBuildingInteractionResponse,
  toBuildingResponse,
} from "@/buildings/buildings.converter";
import { BuildingsService } from "@/buildings/buildings.service";

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
    const createdBuilding = await this.buildingsService.createBuilding(
      body,
      user,
    );

    return toBuildingResponse(createdBuilding);
  }

  @Get(":id")
  @UseGuards(JwtGuard)
  async findBuildingById(
    @Param("id") buildingId: string,
  ): Promise<BuildingResponse> {
    const buildingData =
      await this.buildingsService.getBuildingById(buildingId);

    if (!buildingData) {
      throw new NotFoundException(`Building with id ${buildingId} not found`);
    }

    return toBuildingResponse(buildingData);
  }

  @Get("")
  @UseGuards(JwtGuard)
  async getAllBuildings(): Promise<BuildingResponse[]> {
    const buildings = await this.buildingsService.getAllBuildings();

    return buildings.map(toBuildingResponse);
  }

  @Get(":id/interactions")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async getBuildingInteractions(
    @Param("id") buildingId: string,
  ): Promise<BuildingInteractionResponse[]> {
    const building = await this.buildingsService.getBuildingById(buildingId);

    if (!building) {
      throw new NotFoundException(`Building with id ${buildingId} not found`);
    }

    const interactions =
      await this.buildingsService.getBuildingInteractions(buildingId);

    return interactions.map(toBuildingInteractionResponse);
  }

  @Delete(":id")
  @UseGuards(JwtGuard)
  async deleteBuilding(
    @Param("id") buildingId: string,
    @User() user,
  ): Promise<void> {
    await this.buildingsService.deleteBuilding(buildingId, user.id, user.role);
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
  async empowerBuilding(
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

    const updatedBuilding = await this.buildingsService.empowerBuilding(
      buildingId,
      body.gnomeCount,
    );

    return toBuildingResponse(updatedBuilding);
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
    const damage = Math.min(body.clicks * 0.2, MAX_ATTACK_DAMAGE);

    await this.buildingsService.createInteraction(
      user.id,
      buildingId,
      "ATTACK",
      damage,
    );

    const updatedBuilding = await this.buildingsService.attackBuilding(
      buildingId,
      damage,
    );

    return toBuildingResponse(updatedBuilding);
  }
}
