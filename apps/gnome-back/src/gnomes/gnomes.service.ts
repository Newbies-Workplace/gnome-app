import { ConflictException, Injectable } from "@nestjs/common";
import { CreateGnomeRequest, UpdateGnomeRequest } from "@repo/shared/requests";
import { PrismaService } from "@/db/prisma.service";
import { DistrictsService } from "@/districts/districts.service";
import { Gnome, GnomeInteraction } from "@/generated/prisma/client";
import { GnomeInteractionCreateResult } from "@/gnomes/gnomes.dto";
import { StorageDirectory, StorageService } from "@/storage/storage.service";

const MIN_INTERACTION_INTERVAL = 5 * 60 * 1000;

@Injectable()
export class GnomesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
    private readonly districtsService: DistrictsService,
  ) {}

  async getAllGnomes(): Promise<Gnome[]> {
    return this.prismaService.gnome.findMany();
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

  async getMyGnomesUniqueInteractions(id: string): Promise<GnomeInteraction[]> {
    return this.prismaService.gnomeInteraction.findMany({
      where: { userId: id },
      distinct: ["gnomeId"],
      orderBy: { interactionDate: "desc" },
    });
  }

  async assertNoRecentInteractions(gnomeId: string, userId: string) {
    const lastInteraction = await this.prismaService.gnomeInteraction.findFirst(
      {
        where: {
          userId: userId,
          gnomeId: gnomeId,
        },
        orderBy: {
          interactionDate: "desc",
        },
      },
    );

    if (lastInteraction) {
      if (
        Date.now() - new Date(lastInteraction.interactionDate).getTime() <
        MIN_INTERACTION_INTERVAL
      ) {
        throw new ConflictException(
          `Interaction cooldown - gnomeId: ${gnomeId}`,
        );
      }
    }
  }

  async createGnome(
    gnomeId: string,
    data: CreateGnomeRequest,
    pictureUrl: string | null,
  ) {
    const districtId = await this.districtsService.findDistrictId([
      Number(data.longitude),
      Number(data.latitude),
    ]);

    return this.prismaService.gnome.create({
      data: {
        id: gnomeId,
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
  ): Promise<GnomeInteractionCreateResult> {
    const interaction = await this.prismaService.gnomeInteraction.create({
      data: {
        userId,
        interactionDate,
        gnomeId,
      },
    });

    const { resource1, resource2, amount1, amount2 } =
      await this.getInteractionRandomResources();

    const newResources = await this.prismaService.userResource.update({
      where: {
        userId: userId,
      },
      data: {
        [resource1]: { increment: amount1 },
        [resource2]: { increment: amount2 },
      },
    });

    return {
      interaction: interaction,
      _metadata: {
        userResources: newResources,
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

    if (gnomes.pictureUrl) {
      await this.storageService.deleteFile(
        gnomes.pictureUrl,
        StorageDirectory.GNOME_IMAGES,
      );
    }

    await this.prismaService.gnome.delete({
      where: {
        id: id,
      },
    });
  }

  async updateGnome(gnomeId: string, gnomeData: UpdateGnomeRequest) {
    return this.prismaService.gnome.update({
      where: { id: gnomeId },
      data: { ...gnomeData },
    });
  }

  async updateGnomePicture(gnomeId: string, file: Express.Multer.File) {
    const typeSplit = file.mimetype.split("/");
    const type = typeSplit[typeSplit.length - 1];
    const fileName = `${gnomeId}.${type}`;
    const uploadedFile = await this.storageService.uploadFile(
      file,
      fileName,
      StorageDirectory.GNOME_IMAGES,
    );

    return this.prismaService.gnome.update({
      where: {
        id: gnomeId,
      },
      data: {
        pictureUrl: uploadedFile.path,
      },
    });
  }

  async deleteGnomePicture(gnomeId: string) {
    const gnome = await this.prismaService.gnome.findUnique({
      where: {
        id: gnomeId,
      },
      select: {
        pictureUrl: true,
        name: true,
      },
    });

    if (gnome.pictureUrl) {
      await this.storageService.deleteFile(
        gnome.pictureUrl,
        StorageDirectory.GNOME_IMAGES,
      );

      await this.prismaService.gnome.update({
        where: {
          id: gnomeId,
        },
        data: {
          pictureUrl: null,
        },
      });
    }
  }

  private async getInteractionRandomResources() {
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
}
