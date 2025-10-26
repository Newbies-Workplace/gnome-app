import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  CreateGnomeRequest,
  CreateInteractionRequest,
} from "@repo/shared/requests";
import {
  GnomeIdResponse,
  GnomeResponse,
  InteractionResponse,
} from "@repo/shared/responses";
import { Express } from "express";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { MinioService } from "@/minio/minio.service";
import { Role } from "@/role/role.decorator";
import { RoleGuard } from "@/roleguard/role.guard";
import { TeamsService } from "@/teams/teams.service";
import { GnomesService } from "./gnomes.service";

@Controller("gnomes")
export class GnomesController {
  constructor(
    private readonly gnomeService: GnomesService,
    private readonly minioService: MinioService,
    private readonly teamsService: TeamsService,
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

  // Pobieranie interakcji gnomów

  @Get(":id/interactions/count")
  @UseGuards(JwtGuard)
  async getInteractionCount(@Param("id") gnomeId: string): Promise<number> {
    const interactionCount = this.gnomeService.getInteractionCount(gnomeId);
    const findGnome = await this.gnomeService.getGnomeData(gnomeId);
    if (!findGnome) {
      throw new NotFoundException("Nie znaleziono gnoma");
    }
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
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 10_000_000 }), // 10MB
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      }),
    )
    file: Express.Multer.File,
    @User() user: JwtUser,
    @Body() body: CreateInteractionRequest,
  ): Promise<InteractionResponse> {
    await this.minioService.createBucketIfNotExists();

    const fileName = `${user.id}-${body.gnomeId}.jpg`;
    const catalogueName = "userGnomes";
    const filePath = `${catalogueName}/${fileName}`;
    await this.minioService.uploadFile(file, fileName, catalogueName);
    const gnomeName = (await this.gnomeService.getGnomeData(body.gnomeId)).name;

    let fileUrl: string;

    if (file) {
      fileUrl = await this.minioService.getFileUrl(filePath);
    } else {
      fileUrl = await this.minioService.getFileUrl(
        `defaultGnomePictures/${gnomeName}.jpg`,
      );
    }

    const team = await this.teamsService.getTeamWithMemberId(user.id);
    if (team && team.members.length > 1) {
      const interactions = team.members.map((member) => {
        return this.gnomeService.createInteraction(
          member.userId,
          body.interactionDate,
          body.gnomeId,
          fileUrl,
        );
      });
      const resolvedInteractions = await Promise.all(interactions);
      const filteredInteractions = resolvedInteractions.filter(
        (interaction) => interaction.userId === user.id,
      );
      return filteredInteractions[0];
    }

    const interaction = await this.gnomeService.createInteraction(
      user.id,
      body.interactionDate,
      body.gnomeId,
      fileUrl,
    );

    return interaction;
  }
}
