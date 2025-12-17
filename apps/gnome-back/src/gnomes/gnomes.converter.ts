import { Injectable } from "@nestjs/common";
import { Gnome, GnomeInteraction } from "@prisma/client";
import {
  GnomeDetailsResponse,
  GnomeResponse,
  InteractionExtendedResponse,
  InteractionResponse,
} from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";
import { GnomeInteractionCreateResult } from "@/gnomes/gnomes.dto";

@Injectable()
export class GnomesConverter {
  constructor(private readonly prismaService: PrismaService) {}

  async toGnomeResponse(gnome: Gnome): Promise<GnomeResponse> {
    return {
      name: gnome.name,
      id: gnome.id,
      funFact: gnome.funFact,
      latitude: gnome.latitude,
      longitude: gnome.longitude,
      location: gnome.location,
      creationDate: gnome.creationDate,
      description: gnome.description,
      exists: gnome.exists,
      pictureUrl: gnome.pictureUrl,
      districtId: gnome.districtId,
    };
  }

  async toGnomeDetailsResponse(gnome: Gnome): Promise<GnomeDetailsResponse> {
    const allGnomes = await this.prismaService.gnome.findMany({
      where: { id: { not: gnome.id } },
    });

    const nearest = allGnomes
      .sort(
        (a, b) =>
          (a.latitude - gnome.latitude) ** 2 +
          (a.longitude - gnome.longitude) ** 2 -
          ((b.latitude - gnome.latitude) ** 2 +
            (b.longitude - gnome.longitude) ** 2),
      )
      .slice(0, 3);

    return {
      ...(await this.toGnomeResponse(gnome)),
      nearest: await Promise.all(
        nearest.map(async (n) => this.toGnomeResponse(n)),
      ),
    };
  }

  async toInteractionResponse(
    interaction: GnomeInteraction,
  ): Promise<InteractionResponse> {
    return {
      id: interaction.id,
      gnomeId: interaction.gnomeId,
      userId: interaction.userId,
      interactionDate: interaction.interactionDate,
    };
  }

  async toInteractionExtendedResponse(
    result: GnomeInteractionCreateResult,
  ): Promise<InteractionExtendedResponse> {
    const gnome = await this.prismaService.gnome.findUniqueOrThrow({
      where: { id: result.interaction.gnomeId },
    });

    return {
      id: result.interaction.id,
      gnomeId: result.interaction.gnomeId,
      userId: result.interaction.userId,
      interactionDate: result.interaction.interactionDate,
      gnome: await this.toGnomeResponse(gnome),
      _metadata: {
        userResources: {
          berries: result._metadata.userResources.berries,
          stones: result._metadata.userResources.stones,
          sticks: result._metadata.userResources.sticks,
        },
        gatheredResources: {
          berries: result._metadata.gatheredResources.berries,
          stones: result._metadata.gatheredResources.stones,
          sticks: result._metadata.gatheredResources.sticks,
        },
      },
    };
  }
}
