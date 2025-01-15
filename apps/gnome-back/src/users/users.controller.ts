import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
import { UsersService } from "@/users/users.service";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { User as PrismaUser } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("@me")
  @UseGuards(JwtGuard)
  async getMe(@User() user: JWTUser): Promise<PrismaUser> {
    return this.usersService.findUserById(user.id);
  }
}
