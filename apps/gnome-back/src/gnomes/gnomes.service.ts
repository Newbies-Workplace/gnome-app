import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { Gnome } from "@prisma/client";
import { CreateGnomeRequest } from "./dto/gnomeCreate.dto";

@Injectable()
export class GnomesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllGnomes(): Promise<Gnome[]> {
    return this.prismaService.gnome.findMany();
  }

  async getGnomeData(id: string): Promise<Gnome & { nearest: Gnome[] }> {
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

  async getMyGnomes(
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
}
