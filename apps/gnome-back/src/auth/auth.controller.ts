import { AuthService } from "@/auth/auth.service";
import { UsersService } from "@/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { GoogleUserResponse, UserResponse } from "@repo/shared/responses";
import { GoogleGuard } from "./guards/google.guard";
import { User } from "./decorators/jwt-user.decorator";
import { GoogleAuthRequest } from "./dto/google-auth.request.dto";
import { UserRole } from "@prisma/client";
import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @Get("google/redirect")
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get("google/callback")
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(
    @User() user: GoogleUserResponse,
    @Res() res: Response
  ) {
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const token = await this.authService.googleAuth(user);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    if (user.role.includes(UserRole.ADMIN))
      return res.redirect(`${FRONTEND_URL}/admin`);

    return res.redirect(`${FRONTEND_URL}`);
  }

  @Post("google")
  async google(@Body() body: GoogleAuthRequest) {
    const userData = await this.authService.verifyGoogleToken(body.idToken);
    let user = await this.usersService.findUserByGoogleId(userData.id);

    if (!user) {
      user = await this.usersService.createUserWithGoogleData(userData);
    }

    const payload: {
      user: UserResponse;
    } = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        pictureUrl: user.pictureUrl,
      },
    };

    return {
      user: payload.user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
