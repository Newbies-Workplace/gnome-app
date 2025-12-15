import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { User as PrismaUser, UserResource } from "@prisma/client";
import {
  AssignTeam,
  PaginationRequest,
  SearchByNameReuqest,
  UserUpdate,
} from "@repo/shared/requests";
import { UserPatchResponse } from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { Role } from "@/auth/decorators/role.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { RoleGuard } from "@/auth/guards/role.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { MinioService } from "@/minio/minio.service";
import { UsersService } from "@/users/users.service";

@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly minioService?: MinioService,
  ) {}

  @Get()
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async getUsers(
    @Query() { page }: PaginationRequest,
    @Query() { name }: SearchByNameReuqest,
  ) {
    return this.usersService.getUsers(page, name);
  }

  @Get("@me")
  @UseGuards(JwtGuard)
  async getMe(@User() user: JwtUser): Promise<PrismaUser> {
    return this.usersService.findUserById(user.id);
  }

  @ApiBody({
    schema: {
      example: {
        name: "name",
      },
    },
  })
  @Patch("@me")
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

  @Delete("@me")
  @UseGuards(JwtGuard)
  async deleteUserAccount(@User() user: JwtUser) {
    return this.usersService.deleteAccount(user.id);
  }

  @ApiBody({
    schema: {
      example: {
        team: "TEAM_BLUE",
      },
    },
  })
  @Patch("@me/team")
  @UseGuards(JwtGuard)
  async assignTeam(@User() user: JwtUser, @Body() body: AssignTeam) {
    return this.usersService.assignTeam(user.id, body.team);
  }
}
