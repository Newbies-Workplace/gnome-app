import {
  Body,
  ConflictException,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
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
  GnomeIdResponse,
  GnomeResponse,
  InteractionExtendedResponse,
  InteractionResponse,
} from "@repo/shared/responses";
import { Express } from "express";
import { AchievementsService } from "@/achievements/achievements.service";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { MinioService } from "@/minio/minio.service";
import { Role } from "@/role/role.decorator";
import { RoleGuard } from "@/roleguard/role.guard";
import { GnomesService } from "./gnomes.service";

const MIN_INTERACTION_INTERVAL = 5 * 60 * 1000;

@ApiBearerAuth()
@Controller("gnomes")
export class GnomesController {
  constructor(
    private readonly gnomeService: GnomesService,
    private readonly minioService: MinioService,
    private readonly achievementService: AchievementsService,
  ) {}

  // Pobieranie wszystkich gnomów

  @Get("")
  @UseGuards(JwtGuard)
  async getAllGnomes(): Promise<GnomeResponse[]> {
    const gnomes = await this.gnomeService.getAllGnomes();
    if (!gnomes) {
      throw new NotFoundException("Nie znaleziono gnomów");
    }
    return gnomes;
  }

  // Pobranie danych gnoma

  @Get(":id")
  @UseGuards(JwtGuard)
  async getGnomeData(@Param("id") gnomeId: string): Promise<GnomeIdResponse> {
    const gnomeData = await this.gnomeService.getGnomeData(gnomeId);
    if (!gnomeData) {
      throw new NotFoundException("Nie znaleziono gnoma");
    }
    return gnomeData;
  }

  // Pobieranie interakcji gnoma
  @Get(":id/interactions/count")
  @UseGuards(JwtGuard)
  async getGnomeInteractionCount(
    @Param("id") gnomeId: string,
  ): Promise<number> {
    const findGnome = await this.gnomeService.getGnomeData(gnomeId);
    if (!findGnome) {
      throw new NotFoundException("Nie znaleziono gnoma");
    }
    const interactionCount =
      this.gnomeService.getGnomeUniqueInteractionCount(gnomeId);
    return interactionCount;
  }

  // Wyświetlanie swojej interakcji z gnomem

  @Get("@me/interactions")
  @UseGuards(JwtGuard)
  async getMyGnomesInteractions(
    @User() user: JwtUser,
  ): Promise<InteractionResponse[]> {
    return this.gnomeService.getMyGnomesInteractions(user.id);
  }

  // Tworzenie nowego gnoma
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
  ): Promise<GnomeResponse> {
    await this.minioService.createBucketIfNotExists();
    const typeSplit = file.mimetype.split("/");
    const type = typeSplit[typeSplit.length - 1];
    const fileName = `${createGnomeDto.name}.${type}`;
    const catalogueName = "defaultGnomePictures";
    const filePath = `${catalogueName}/${fileName}`;
    await this.minioService.uploadFile(file, fileName, catalogueName);
    const fileUrl = await this.minioService.getFileUrl(filePath);

    const gnomeCreate = await this.gnomeService.createGnome(
      createGnomeDto,
      fileUrl,
    );
    return gnomeCreate;
  }

  // Tworzenie interakcji usera z gnomem
  @ApiBody({
    schema: {
      example: {
        interactionDate: "1970-01-01T00:00:00.000Z",
        gnomeId: "07a9b1c2-4f5a-4f0a-8def-7890abcdef12",
      },
    },
  })
  @Post("interaction")
  @UseGuards(JwtGuard)
  async createInteraction(
    @User() user: JwtUser,
    @Body() body: CreateInteractionRequest,
  ): Promise<InteractionExtendedResponse> {
    const lastUserInteraction = await this.gnomeService.getLastInteraction(
      body.gnomeId,
      user.id,
    );
    if (lastUserInteraction) {
      if (
        new Date().getTime() -
          new Date(lastUserInteraction.interactionDate).getTime() <
        MIN_INTERACTION_INTERVAL
      ) {
        throw new ConflictException(
          `Interaction cooldown - gnomeId: ${body.gnomeId}`,
        );
      }
    }

    const interaction = await this.gnomeService.createInteraction(
      user.id,
      body.interactionDate,
      body.gnomeId,
    );

    const gnomeCount = await this.gnomeService.getUserUniqueInteractionCount(
      user.id,
    );

    await this.achievementService.unlockGnomeAchievement(user.id, gnomeCount);

    return interaction;
  }
  @Delete(":id")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async deleteGnome(@Param("id") id: string) {
    await this.gnomeService.deleteGnome(id);
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
  ) {
    const gnome = await this.gnomeService.getGnomeData(gnomeId);

    if (!gnome) {
      throw new ConflictException("Gnome not found - no data changed");
    }
    return await this.gnomeService.updateGnome(gnomeId, body);
  }
}
