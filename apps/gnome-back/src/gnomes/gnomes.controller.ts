import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
import { MinioService } from "@/minio/minio.service";
import { Role } from "@/role/role.decorator";
import { RoleGuard } from "@/roleguard/role.guard";
import { TeamsService } from "@/teams/teams.service";
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { Request } from "express";
import { JWT } from "google-auth-library";
import { Multer } from "multer";
import { CreateGnomeRequest } from "./dto/gnomeCreate.dto";
import { CreateInteractionRequest } from "./dto/interactionCreate";
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
  getAllGnomes() {
    return this.gnomeService.getAllGnomes();
  }

  // Pobranie danych gnoma

  @Get(":id")
  @UseGuards(JwtGuard)
  getGnomeData(@Param("id") gnomeId: string) {
    return this.gnomeService.getGnomeData(gnomeId);
  }

  // Pobieranie interakcji gnomów

  @Get(":id/interactions")
  @UseGuards(JwtGuard)
  getInteractionCount(@Param("id") gnomeId: string) {
    return this.gnomeService.getInteractionCount(gnomeId);
  }

  // Wyświetlanie swojej interakcji z gnomem

  @Get("@me/interactions")
  @UseGuards(JwtGuard)
  async getMyGnomesInteractions(@User() user: JWTUser) {
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
  ) {
    await this.minioService.createBucketIfNotExists();
    const fileName = `${createGnomeDto.name}.jpg`;
    const catalogueName = `defaultGnomePictures`;
    const filePath = `${catalogueName}/${fileName}`;
    await this.minioService.uploadFile(file, fileName, catalogueName);
    const fileUrl = await this.minioService.getFileUrl(filePath);

    const gnomeCreate = this.gnomeService.createGnome(createGnomeDto, fileUrl);
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
    @User() user: JWTUser,
    @Body() body: CreateInteractionRequest,
  ) {
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
    if (team && team.length > 0) {
      const interactions = team.flatMap((teamMember) =>
        teamMember.members.map((member) => {
          return this.gnomeService.createInteraction(
            member.userId,
            body.interactionDate,
            body.gnomeId,
            fileUrl,
          );
        }),
      );
      const resolvedInteractions = await Promise.all(interactions);
      return resolvedInteractions.filter(
        (interaction) => interaction.userId === user.id,
      );
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
