import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import {
  AssignTeamRequest,
  PaginationRequest,
  SearchByNameRequest,
  UserUpdateRequest,
} from "@repo/shared/requests";
import {
  UserResponse,
  UserUpdateInviteCodeResponse,
} from "@repo/shared/responses";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { Role } from "@/auth/decorators/role.decorator";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { RoleGuard } from "@/auth/guards/role.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { StorageDirectory, StorageService } from "@/storage/storage.service";
import { UsersConverter } from "@/users/users.converter";
import { UsersService } from "@/users/users.service";

@ApiBearerAuth()
@Controller("/v1/users")
export class UsersController {
  constructor(
    private readonly converter: UsersConverter,
    private readonly usersService: UsersService,
    private readonly minioService?: StorageService,
  ) {}

  @Get()
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async getUsers(
    @Query() { page }: PaginationRequest,
    @Query() { name }: SearchByNameRequest,
  ): Promise<UserResponse[]> {
    const users = await this.usersService.getUsers(page, name);

    return Promise.all(
      users.map(async (user) => this.converter.toUserResponse(user)),
    );
  }

  @Get("@me")
  @UseGuards(JwtGuard)
  async getMe(@User() user: JwtUser): Promise<UserResponse> {
    const foundUser = await this.usersService.findUserById(user.id);

    return this.converter.toUserResponse(foundUser);
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
    @Body() body: UserUpdateRequest,
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
  ): Promise<UserResponse> {
    if (body.name == null && !file) {
      throw new BadRequestException("Nic do zaaktualizowania");
    }

    let fileUrl: string | undefined;
    if (file) {
      const fileName = `${user.id}.jpg`;

      const uploadedFile = await this.minioService.uploadFile(
        file,
        fileName,
        StorageDirectory.USER_IMAGES,
      );

      fileUrl = uploadedFile.path;
    }

    const updatedUser = await this.usersService.changeUserData(user.id, {
      name: body.name,
      pictureUrl: file ? fileUrl : undefined,
    });

    return this.converter.toUserResponse(updatedUser);
  }

  @Patch("@me/invite-code")
  @UseGuards(JwtGuard)
  async regenerateInviteCode(
    @User() user: JwtUser,
  ): Promise<UserUpdateInviteCodeResponse> {
    const newInviteCode = await this.usersService.regenerateInviteCode(user.id);

    return { inviteCode: newInviteCode };
  }

  @Delete("@me")
  @HttpCode(204)
  @UseGuards(JwtGuard)
  async deleteUserAccount(@User() user: JwtUser) {
    await this.usersService.deleteAccount(user.id);
  }

  @ApiBody({
    schema: {
      example: {
        team: "TEAM_BLUE",
      },
    },
  })
  @Put("@me/teams")
  @HttpCode(204)
  @UseGuards(JwtGuard)
  async assignTeam(@User() user: JwtUser, @Body() body: AssignTeamRequest) {
    await this.usersService.assignTeam(user.id, body.team);
  }
}
