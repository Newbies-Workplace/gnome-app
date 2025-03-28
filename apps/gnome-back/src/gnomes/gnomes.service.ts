import { JWTUser } from "@/auth/jwt/JWTUser";
import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { Gnome } from "@prisma/client";
import { CreateGnomeRequest } from "./dto/gnomeCreate.dto";
import { CreateInteractionRequest } from "./dto/interactionCreate";

@Injectable()
export class GnomesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllGnomes(): Promise<Gnome[]> {
    return this.prismaService.gnome.findMany();
  }

  async getGnomeData(id: string): Promise<Gnome[]> {
    return this.prismaService.gnome.findMany({
      where: { id },
    });
  }

  async getInteractionCount(gnomeId: string): Promise<number> {
    const collection = await this.prismaService.gnomeInteraction.findMany({
      where: {
        gnomeId,
      },
    });

    return collection.length;
  }

  async getMyGnomesInteractions(
    id: string,
  ): Promise<Array<{ gnomeId: string; interactionDate: Date; gnome: Gnome }>> {
    return this.prismaService.gnomeInteraction.findMany({
      where: { userId: id },
      select: {
        gnomeId: true,
        interactionDate: true,
        gnome: true,
      },
    });
  }

  async createGnome(data: CreateGnomeRequest) {
    return this.prismaService.gnome.create({
      data: {
        ...data,
      },
    });
  }

  async createInteraction(
    userId: string,
    interactionDate: Date,
    gnomeId: string,
    userPicture: string,
  ) {
    return this.prismaService.gnomeInteraction.create({
      data: {
        userId,
        interactionDate,
        gnomeId,
        userPicture,
      },
    });
  }
}
