import { Injectable } from "@nestjs/common";
import { Gnome } from "@prisma/client";
import { CreateGnomeRequest } from "@repo/shared/requests";
import {
  GnomeIdResponse,
  InteractionExtendedResponse,
} from "@repo/shared/responses";

import { PrismaService } from "@/db/prisma.service";
import { DistrictsService } from "@/districts/districts.service";
import { MinioService } from "@/minio/minio.service";
@Injectable()
export class GnomesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
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

  async getGnomeUniqueInteractionCount(gnomeId: string): Promise<number> {
    const collection = await this.prismaService.gnomeInteraction.findMany({
      where: { gnomeId },
      distinct: ["userId"],
    });
    return collection.length;
  }

  async getUserUniqueInteractionCount(userId: string): Promise<number> {
    const collection = await this.prismaService.gnomeInteraction.findMany({
      where: { userId },
      distinct: ["gnomeId"],
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
  async getRandomResources() {
    const resources = ["berries", "sticks", "stones"];

    const i = Math.floor(Math.random() * resources.length);

    let j = Math.floor(Math.random() * (resources.length - 1));
    if (j >= i) j++;

    const resource1 = resources[i];
    const resource2 = resources[j];

    const amount1 = Math.ceil(Math.random() * 5);
    const amount2 = Math.ceil(Math.random() * 5);

    return { resource1, resource2, amount1, amount2 };
  }
  async createInteraction(
    userId: string,
    interactionDate: Date,
    gnomeId: string,
  ): Promise<InteractionExtendedResponse> {
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
    const { resource1, resource2, amount1, amount2 } =
      await this.getRandomResources();

    const updatedResources = await this.prismaService.userResource.update({
      where: {
        userId: userId,
      },
      data: {
        [resource1]: { increment: amount1 },
        [resource2]: { increment: amount2 },
      },
    });
    const newResources = await this.prismaService.userResource.findUnique({
      where: {
        userId: userId,
      },
      select: {
        berries: true,
        stones: true,
        sticks: true,
      },
    });
    return {
      ...createGnome,
      gnome: findGnome,
      _metadata: {
        userResources: {
          berries: newResources.berries,
          stones: newResources.stones,
          sticks: newResources.sticks,
        },
        gatheredResources: {
          [resource1]: amount1,
          [resource2]: amount2,
        },
      },
    };
  }
  async deleteGnome(id: string) {
    const gnomes = await this.prismaService.gnome.findUnique({
      where: {
        id: id,
      },
    });

    const bucketName = "images";
    const fullUrl = `defaultGnomePictures/${gnomes.pictureUrl}`;
    await this.minioService.deleteFile(bucketName, fullUrl);
    await this.prismaService.gnome.delete({
      where: {
        id: id,
      },
    });
  }
}
