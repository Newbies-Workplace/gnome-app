import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { BuildingsConverter } from "@/buildings/buildings.converter";
import { BuildingsService } from "@/buildings/buildings.service";

@ApiBearerAuth()
@Controller("/v1/buildings")
export class BuildingsController {
  constructor(
    private readonly buildingsService: BuildingsService,
    private readonly converter: BuildingsConverter,
  ) {}

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
  ): Promise<BuildingResponse> {
    const createdBuilding = await this.buildingsService.createBuilding(
      body,
      user,
    );

    return await this.converter.toBuildingResponse(createdBuilding);
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

    return await this.converter.toBuildingResponse(buildingData);
  }

  @Get("")
  @UseGuards(JwtGuard)
  async getAllBuildings(): Promise<BuildingResponse[]> {
    const buildings = await this.buildingsService.getAllBuildings();

    return Promise.all(
      buildings.map(async (building) =>
        this.converter.toBuildingResponse(building),
      ),
    );
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

    return Promise.all(
      interactions.map(async (interaction) =>
        this.converter.toBuildingInteractionResponse(interaction),
      ),
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
  async empowerBuilding(
    @Param("id") buildingId: string,
    @User() user: JwtUser,
    @Body() body: EmpowerBuildingRequest,
  ): Promise<BuildingResponse> {
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

    return this.converter.toBuildingResponse(updatedBuilding);
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
  ): Promise<BuildingResponse> {
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

    return this.converter.toBuildingResponse(updatedBuilding);
  }

  @Delete(":id")
  @HttpCode(204)
  @UseGuards(JwtGuard)
  async deleteBuilding(
    @Param("id") buildingId: string,
    @User() user: JwtUser,
  ): Promise<void> {
    await this.buildingsService.deleteBuilding(buildingId, user.id, user.role);
  }
}
