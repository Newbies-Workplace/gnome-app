import { Building, BuildingInteraction } from "@prisma/client";
import {
  BuildingInteractionResponse,
  BuildingResponse,
} from "@repo/shared/responses";

export const toBuildingResponse = (building: Building): BuildingResponse => {
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
};

export const toBuildingInteractionResponse = (
  interaction: BuildingInteraction,
): BuildingInteractionResponse => {
  return {
    userId: interaction.userId,
    interactionType: interaction.interactionType,
    amount: interaction.amount,
    createdAt: interaction.createdAt,
  };
};
