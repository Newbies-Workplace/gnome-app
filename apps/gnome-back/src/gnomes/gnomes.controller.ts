import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import {
  CreateGnomeRequest,
  CreateInteractionRequest,
  UpdateGnomeRequest,
} from "@repo/shared/requests";
import {
  GnomeDetailsResponse,
  GnomeResponse,
  InteractionExtendedResponse,
  InteractionResponse,
} from "@repo/shared/responses";
import { Express } from "express";
import { AchievementsService } from "@/achievements/achievements.service";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { Role } from "@/auth/decorators/role.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { RoleGuard } from "@/auth/guards/role.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";
import { GnomesConverter } from "@/gnomes/gnomes.converter";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioService } from "@/minio/minio.service";

@ApiBearerAuth()
@Controller("gnomes")
export class GnomesController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly gnomeService: GnomesService,
    private readonly converter: GnomesConverter,
    private readonly minioService: MinioService,
    private readonly achievementService: AchievementsService,
  ) {}

  @Get("")
  @UseGuards(JwtGuard)
  async getAllGnomes(): Promise<GnomeResponse[]> {
    const gnomes = await this.gnomeService.getAllGnomes();

    return Promise.all(
      gnomes.map(async (gnome) => this.converter.toGnomeResponse(gnome)),
    );
  }

  @Get(":id")
  @UseGuards(JwtGuard)
  async getGnome(@Param("id") gnomeId: string): Promise<GnomeDetailsResponse> {
    const gnome = await this.prismaService.gnome.findUnique({
      where: { id: gnomeId },
    });

    if (!gnome) {
      throw new NotFoundException(`Gnome with id ${gnomeId} not found`);
    }

    return this.converter.toGnomeDetailsResponse(gnome);
  }

  // todo replace with count in gnome details
  @Get(":id/interactions/count")
  @UseGuards(JwtGuard)
  async getGnomeInteractionCount(
    @Param("id") gnomeId: string,
  ): Promise<number> {
    const gnome = await this.prismaService.gnome.findUnique({
      where: { id: gnomeId },
    });

    if (!gnome) {
      throw new NotFoundException(`Gnome with id ${gnomeId} not found`);
    }

    return this.gnomeService.getGnomeUniqueInteractionCount(gnomeId);
  }

  @Get("@me/interactions")
  @UseGuards(JwtGuard)
  async getMyGnomesUniqueInteractions(
    @User() user: JwtUser,
  ): Promise<InteractionResponse[]> {
    const interactions = await this.gnomeService.getMyGnomesUniqueInteractions(
      user.id,
    );

    console.log("interactions", interactions);

    return Promise.all(
      interactions.map(async (interaction) =>
        this.converter.toInteractionResponse(interaction),
      ),
    );
  }

  @ApiBody({
    schema: {
      example: {
        name: "Ikuś",
        latitude: "51.04828161310336",
        longitude: "16.95514228088844",
        location: "IKEA, Bielany Wrocławskie",
        description:
          "Ikuś, pojawił się nagle. Usłyszawszy, że we Wrocławiu potrzeba handlowca-stratega, spakował manatki i wyruszył w drogę. Przybył na przedmieścia Wrocławia w październiku 2016 roku i od razu zdobył sympatię wszystkich.",
        creationDate: "2020-04-06T00:00:00.000Z",
        funFact:
          "Podobno zna wszystkie tajne skróty w IKEI i potrafi wyjść z niej w kilka minut – bez zgubienia się w labiryncie alejek.",
      },
    },
  })
  @Post("")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  @UseInterceptors(FileInterceptor("file"))
  async createGnome(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 10_000_000 }),
          new FileTypeValidator({ fileType: /^image/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createGnomeDto: CreateGnomeRequest,
  ): Promise<GnomeDetailsResponse> {
    let fileUrl: string | null = null;
    if (file) {
      const typeSplit = file.mimetype.split("/");
      const type = typeSplit[typeSplit.length - 1];
      const fileName = `${createGnomeDto.name}.${type}`;
      const catalogueName = "defaultGnomePictures";
      const filePath = `${catalogueName}/${fileName}`;
      await this.minioService.uploadFile(file, fileName, catalogueName);
      fileUrl = await this.minioService.getFileUrl(filePath);
    }

    const createdGnome = await this.gnomeService.createGnome(
      createGnomeDto,
      fileUrl,
    );

    return this.converter.toGnomeDetailsResponse(createdGnome);
  }

  @ApiBody({
    schema: {
      example: {
        interactionDate: "1970-01-01T00:00:00.000Z",
        gnomeId: "07a9b1c2-4f5a-4f0a-8def-7890abcdef12",
      },
    },
  })
  @Post(":id/interactions")
  @UseGuards(JwtGuard)
  async createInteraction(
    @User() user: JwtUser,
    @Param("id") gnomeId: string,
    @Body() body: CreateInteractionRequest,
  ): Promise<InteractionExtendedResponse> {
    await this.gnomeService.assertNoRecentInteractions(gnomeId, user.id);

    const interactionResult = await this.gnomeService.createInteraction(
      user.id,
      body.interactionDate,
      gnomeId,
    );

    const gnomeCount = await this.gnomeService.getUserUniqueInteractionCount(
      user.id,
    );
    await this.achievementService.unlockGnomeAchievement(user.id, gnomeCount);

    return this.converter.toInteractionExtendedResponse(interactionResult);
  }

  @ApiBody({
    schema: {
      example: {
        name: "Ikuś",
        latitude: "51.04828161310336",
        longitude: "16.95514228088844",
        location: "IKEA, Bielany Wrocławskie",
        description:
          "Ikuś, pojawił się nagle. Usłyszawszy, że we Wrocławiu potrzeba handlowca-stratega, spakował manatki i wyruszył w drogę. Przybył na przedmieścia Wrocławia w październiku 2016 roku i od razu zdobył sympatię wszystkich.",
        creationDate: "2020-04-06T00:00:00.000Z",
        funFact:
          "Podobno zna wszystkie tajne skróty w IKEI i potrafi wyjść z niej w kilka minut – bez zgubienia się w labiryncie alejek.",
      },
    },
  })
  @Patch(":id")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async updateGnome(
    @Param("id") gnomeId: string,
    @Body() body: UpdateGnomeRequest,
  ): Promise<GnomeDetailsResponse> {
    const gnome = await this.prismaService.gnome.findUnique({
      where: { id: gnomeId },
    });

    if (!gnome) {
      throw new NotFoundException(`Gnome with id ${gnomeId} not found`);
    }

    const updatedGnome = await this.gnomeService.updateGnome(gnomeId, body);

    return this.converter.toGnomeDetailsResponse(updatedGnome);
  }

  @Patch(":id/photo")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  @UseInterceptors(FileInterceptor("file"))
  async updateGnomePhoto(
    @Param("id") id: string,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 10_000_000 }),
          new FileTypeValidator({ fileType: /^image/ }),
        ],
      }),
    )
    file: Express.Multer.File | undefined,
  ): Promise<GnomeResponse> {
    const updatedGnome = await this.gnomeService.updateGnomePicture(id, file);

    return this.converter.toGnomeResponse(updatedGnome);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  @HttpCode(204)
  async deleteGnome(@Param("id") id: string): Promise<void> {
    await this.gnomeService.deleteGnome(id);
  }

  @Delete(":id/photo")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  @HttpCode(204)
  async deleteGnomePhoto(@Param("id") id: string): Promise<void> {
    await this.gnomeService.deleteGnomePicture(id);
  }
}
