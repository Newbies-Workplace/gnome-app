import { AuthService } from "@/auth/auth.service";
import { GoogleAuthRequest } from "@/auth/dto/GoogleAuth.request";
import { UsersService } from "@/users/users.service";
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GoogleUserResponse, UserResponse } from "@repo/shared/responses";
import { GoogleGuard } from "./google/google.guard";
import { User } from "./jwt/jwtuser.decorator";

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
    @Response() res,
    @Request() req,
  ) {
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const token = await this.authService.googleAuth(user);
    req.user = user; // to do roli zeby sprawdzac
    res.cookie("access_token", token, {
      maxAge: 60 * 60 * 100000,
    });

    if (req.user.role === "ADMIN") {
      return res.redirect(`${FRONTEND_URL}/admin`);
    }

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
