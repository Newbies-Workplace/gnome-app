import { Injectable } from "@nestjs/common";
import {
  BuildingInteractionResponse,
  BuildingResponse,
} from "@repo/shared/responses";
import { Building, BuildingInteraction } from "@/generated/prisma/client";

@Injectable()
export class BuildingsConverter {
  async toBuildingResponse(building: Building): Promise<BuildingResponse> {
    return {
      id: building.id,
      gnomeCount: building.gnomeCount,
      health: building.health,
      latitude: building.latitude,
      longitude: building.longitude,
      districtId: building.districtId,
      type: building.type,
      createdAt: building.createdAt,
      ownerId: building.ownerId,
    };
  }

  async toBuildingInteractionResponse(
    interaction: BuildingInteraction,
  ): Promise<BuildingInteractionResponse> {
    return {
      userId: interaction.userId,
      interactionType: interaction.interactionType,
      amount: interaction.amount,
      createdAt: interaction.createdAt,
    };
  }
}
