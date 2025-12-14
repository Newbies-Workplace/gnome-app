import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiBearerAuth } from "@nestjs/swagger";
import { GoogleUserResponse, UserResponse } from "@repo/shared/responses";
import { Response } from "express";
import { AuthService } from "@/auth/auth.service";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { GoogleAuthRequest } from "@/auth/dto/google-auth.request";
import { GoogleGuard } from "@/auth/guards/google.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { UsersService } from "@/users/users.service";

@ApiBearerAuth()
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get("google/redirect")
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get("google/callback")
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(
    @User() user: GoogleUserResponse,
    @Res() res: Response,
  ) {
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const token = await this.authService.googleAuth(user);
    res.cookie("access_token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.redirect(`${FRONTEND_URL}/login/callback`);
  }
  @Post("google")
  async google(@Body() body: GoogleAuthRequest): Promise<{
    user: UserResponse;
    access_token: string;
  }> {
    const userData = await this.authService.verifyGoogleToken(body.idToken);
    let user = await this.usersService.findUserByGoogleId(userData.id);

    if (!user) {
      user = await this.usersService.createUserWithGoogleData(userData);
    }

    const jwtUser: JwtUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      googleId: user.googleId,
    };

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        pictureUrl: user.pictureUrl,
        inviteCode: user.inviteCode,
        role: user.role,
      },
      access_token: this.jwtService.sign({ user: jwtUser }),
    };
  }
}
