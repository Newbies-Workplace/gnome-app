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
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createGnomeDto: CreateGnomeRequest,
  ): Promise<GnomeResponse> {
    await this.minioService.createBucketIfNotExists();
    const fileName = `${createGnomeDto.name}.jpg`;
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
  @Patch(":id/photo")
  async updateGnomePhoto(@Param("id") id: string) {
    return await this.gnomeService.updateGnomePicture(id);
  }
}
