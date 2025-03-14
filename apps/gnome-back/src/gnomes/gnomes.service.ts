import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { Gnome } from "@prisma/client";

@Injectable()
export class GnomesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getInteractionCount(gnomeId: string): Promise<number> {
    const collection = await this.prismaService.gnomeInteraction.findMany({
      where: {
        gnomeId,
      },
    });

    return collection.length;
  }

  async getAllGnomes(): Promise<Gnome[]> {
    return this.prismaService.gnome.findMany();
  }

  async getCreationDate(id: string): Promise<Date> {
    const gnome = await this.prismaService.gnome.findUnique({
      where: { id },
      select: { creationDate: true },
    });

    return gnome.creationDate;
  }
}
