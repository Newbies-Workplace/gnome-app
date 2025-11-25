import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User as PrismaUser, UserResource } from "@prisma/client";
import { UserUpdate } from "@repo/shared/requests";
import { UserPatchResponse } from "@repo/shared/responses";
import { userInfo } from "os";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { JwtUser } from "@/auth/types/jwt-user";
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
  async getMe(@User() user: JwtUser): Promise<PrismaUser> {
    return this.usersService.findUserById(user.id);
  }

  @Patch("@me") // zaaktualizuj profil
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(JwtGuard)
  async changeUserData(
    @User() user: JwtUser,
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

  @Patch("@me/invite-code")
  @UseGuards(JwtGuard)
  async regenerateInviteCode(
    @User() user: JwtUser,
  ): Promise<{ inviteCode: string }> {
    const newInviteCode = await this.usersService.regenerateInviteCode(user.id);

    return { inviteCode: newInviteCode };
  }
  @Get("@me/resource")
  @UseGuards(JwtGuard)
  async getUserResources(@User() user: JwtUser): Promise<UserResource> {
    return await this.usersService.getUserResources(user.id);
  }
}
