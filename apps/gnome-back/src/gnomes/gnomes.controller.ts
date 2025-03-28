import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
import { MinioService } from "@/minio/minio.service";
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
  @UseGuards(JwtGuard)
  async createGnome(@Body() createGnomeDto: CreateGnomeRequest) {
    return this.gnomeService.createGnome(createGnomeDto);
  }

  // Tworzenie interakcji usera z gnomem

  @Post("interaction")
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(JwtGuard)
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
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

    const fileName = `${user.id}-${Date.now()}.jpg`;
    const catalogueName = "userGnomes";

    await this.minioService.uploadFile(file, fileName, catalogueName);

    const fileUrl = await this.minioService.getFileUrl(fileName);

    const interaction = await this.gnomeService.createInteraction(
      user.id,
      body.interactionDate,
      body.gnomeId,
      fileUrl,
    );

    return interaction;
  }
}
