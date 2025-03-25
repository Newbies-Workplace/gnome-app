import type { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
import {
  ArgumentMetadata,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Injectable,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  PipeTransform,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { MinioService } from "./minio.service";

@Controller("minio")
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post("image")
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(JwtGuard)
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      }),
    )
    file: Express.Multer.File,
    @User() user: JWTUser,
    @Body() body: { gnomeId: string },
  ) {
    await this.minioService.createBucketIfNotExists();
    const fileName = await this.minioService.uploadFile(
      file,
      user.id,
      body.gnomeId,
    );
    return fileName;
  }

  @Get("image/:fileName")
  async getFileUrl(@Param("fileName") fileName: string) {
    const fileUrl = await this.minioService.getFileUrl(fileName);
    return fileUrl;
  }

  @Delete("image/:fileName")
  async deleteFile(@Param("fileName") fileName: string) {
    await this.minioService.deleteFile(fileName);
    return fileName;
  }
}
