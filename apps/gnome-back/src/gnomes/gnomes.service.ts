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
