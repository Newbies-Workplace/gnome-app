import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RefreshTokenRequest } from "@repo/shared/requests";
import {
  GoogleLoginResponse,
  GoogleUserResponse,
  RefreshTokenResponse,
} from "@repo/shared/responses";
import { Response } from "express";
import { AuthService } from "@/auth/auth.service";
import { User } from "@/auth/decorators/jwt-user.decorator";
import { GoogleAuthRequest } from "@/auth/dto/google-auth.request";
import { GoogleGuard } from "@/auth/guards/google.guard";
import { JwtUser } from "@/auth/types/jwt-user";
import { UsersConverter } from "@/users/users.converter";
import { UsersService } from "@/users/users.service";

@ApiBearerAuth()
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly usersConverter: UsersConverter,
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
    const jwtUser = await this.authService.googleAuth(user);
    const { access_token, refresh_token } =
      await this.authService.generateTokens(jwtUser);

    res.cookie("access_token", access_token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${FRONTEND_URL}/login/callback`);
  }

  @Post("refresh")
  async refresh(
    @Body() body: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    const { access_token, refresh_token } =
      await this.authService.refreshTokens(body.refreshToken);

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }

  @Post("google")
  async google(@Body() body: GoogleAuthRequest): Promise<GoogleLoginResponse> {
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
      role: user.role,
    };

    const { access_token, refresh_token } =
      await this.authService.generateTokens(jwtUser);

    return {
      user: await this.usersConverter.toUserResponse(user),
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }
}
