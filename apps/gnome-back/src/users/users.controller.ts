import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
import { UsersService } from "@/users/users.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User as PrismaUser } from "@prisma/client";
import { UserUpdate } from "./dto/UserUpdate.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("@me") // moj profil
  @UseGuards(JwtGuard)
  async getMe(@User() user: JWTUser): Promise<PrismaUser> {
    return this.usersService.findUserById(user.id);
  }

  @Patch("@me") // zaaktualizuj profil
  @UseGuards(JwtGuard)
  async changeUserData(@User() user: JWTUser, @Body() body: UserUpdate) {
    return this.usersService.changeUserData(
      user.id,
      body.name,
      body.pictureUrl,
    );
  }
}
