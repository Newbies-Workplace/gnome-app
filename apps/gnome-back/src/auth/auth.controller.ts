import { Body, Controller, Post } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import type { UsersService } from "src/users/users.service.js";
import type { AuthService } from "./auth.service.js";
import type { GoogleAuthRequest } from "./dto/GoogleAuth.request.js";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("google")
  async google(@Body() body: GoogleAuthRequest) {
    const userData = await this.authService.verifyGoogleToken(body.idToken);
    let user = await this.usersService.findUserByGoogleId(userData.id);

    if (!user) {
      user = await this.usersService.createUserWithGoogleData(userData);
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        googleId: user.googleId,
      },
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
