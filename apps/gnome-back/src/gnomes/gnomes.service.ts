import { Injectable } from "@nestjs/common";
import { Gnome } from "@prisma/client";
import { CreateGnomeRequest } from "@repo/shared/requests";
import { GnomeIdResponse } from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";

import { DistrictsService } from "@/districts/districts.service";

@Injectable()
export class GnomesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly districtsService: DistrictsService,
  ) {}

  async getAllGnomes(): Promise<Gnome[]> {
    return this.prismaService.gnome.findMany();
  }

  async getGnomeData(id: string): Promise<GnomeIdResponse> {
    const gnome = await this.prismaService.gnome.findUnique({
      where: { id },
    });
    if (!gnome) {
      return undefined;
    }

    const allGnomes = await this.prismaService.gnome.findMany({
      where: { id: { not: id } },
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
    return { ...gnome, nearest };
  }

  async getInteractionCount(gnomeId: string): Promise<number> {
    const collection = await this.prismaService.gnomeInteraction.findMany({
      where: {
        gnomeId,
      },
    });
    return collection.length;
  }

  async getMyGnomesInteractions(id: string) {
    return this.prismaService.gnomeInteraction.findMany({
      where: { userId: id },
    });
  }

  async getLastInteraction(id: string, user: string) {
    const hasInteraction = await this.prismaService.gnomeInteraction.findFirst({
      where: {
        userId: user,
        gnomeId: id,
      },
      orderBy: {
        interactionDate: "desc",
      },
    });
    return hasInteraction;
  }

  async createGnome(data: CreateGnomeRequest, pictureUrl: string) {
    const districtId = await this.districtsService.findPointInPolygon([
      Number(data.latitude),
      Number(data.longitude),
    ]);

    return this.prismaService.gnome.create({
      data: {
        name: data.name,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        location: data.location,
        description: data.description,
        creationDate: data.creationDate,
        pictureUrl: pictureUrl,
        funFact: data.funFact,
        districtId: districtId || undefined,
      },
    });
  }

  async createInteraction(
    userId: string,
    interactionDate: Date,
    gnomeId: string,
  ) {
    const createGnome = await this.prismaService.gnomeInteraction.create({
      data: {
        userId,
        interactionDate,
        gnomeId,
      },
    });

    const findGnome = await this.prismaService.gnome.findUnique({
      where: {
        id: gnomeId,
      },
    });

    return {
      ...createGnome,
      gnome: findGnome,
    };
  }
}
