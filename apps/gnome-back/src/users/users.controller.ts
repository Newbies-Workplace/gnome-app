import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User as PrismaUser } from "@prisma/client";
import { UserUpdate } from "@repo/shared/requests";
import { UserPatchResponse } from "@repo/shared/responses";
import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
import { MinioService } from "@/minio/minio.service";
import { UsersService } from "@/users/users.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly minioService?: MinioService,
  ) {}

  @Get("@me") // moj profil
  @UseGuards(JwtGuard)
  async getMe(@User() user: JWTUser): Promise<PrismaUser> {
    return this.usersService.findUserById(user.id);
  }

  @Patch("@me") // zaaktualizuj profil
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(JwtGuard)
  async changeUserData(
    @User() user: JWTUser,
    @Body() body: UserUpdate,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 10_000_000 }), // 10MB
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      }),
    )
    file?: Express.Multer.File,
  ): Promise<UserPatchResponse> {
    if (body.name == null && !file) {
      throw new BadRequestException("Nic do zaaktualizowania");
    }

    const fileName = `${user.id}.jpg`;
    const catalogueName = "userProfilePictures";
    if (file) {
      await this.minioService.createBucketIfNotExists();
      await this.minioService.uploadFile(file, fileName, catalogueName);
    }
    const filePath = `${catalogueName}/${fileName}`;
    const fileUrl: string = await this.minioService.getFileUrl(filePath);

    const changeProfile = await this.usersService.changeUserData(
      user.id,
      body.name,
      fileUrl,
    );

    return changeProfile;
  }
}
