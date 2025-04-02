import { JWTUser } from "@/auth/jwt/JWTUser";
import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { Gnome } from "@prisma/client";
import { GnomeIdResponse, InteractionResponse } from "@repo/shared/responses";
import { CreateGnomeRequest } from "./dto/gnomeCreate.dto";
import { CreateInteractionRequest } from "./dto/interactionCreate";

@Injectable()
export class GnomesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllGnomes(): Promise<Gnome[]> {
    return this.prismaService.gnome.findMany();
  }

  async getGnomeData(id: string): Promise<GnomeIdResponse> {
    const gnome = await this.prismaService.gnome.findUnique({
      where: { id },
    });

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

  async getMyGnomesInteractions(id: string): Promise<InteractionResponse[]> {
    return this.prismaService.gnomeInteraction.findMany({
      where: { userId: id },
      include: {
        gnome: true,
      },
    });
  }

  async createGnome(data: CreateGnomeRequest, pictureUrl: string) {
    return this.prismaService.gnome.create({
      data: {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        location: data.location,
        description: data.description,
        creationDate: data.creationDate,
        pictureUrl: pictureUrl,
        funFact: data.funFact,
      },
    });
  }

  async createInteraction(
    userId: string,
    interactionDate: Date,
    gnomeId: string,
    userPicture: string,
  ) {
    const createGnome = await this.prismaService.gnomeInteraction.create({
      data: {
        userId,
        interactionDate,
        gnomeId,
        userPicture,
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
