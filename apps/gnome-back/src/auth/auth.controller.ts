import { AuthService } from "@/auth/auth.service";
import { GoogleAuthRequest } from "@/auth/dto/GoogleAuth.request";
import { UsersService } from "@/users/users.service";
import { Body, Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserResponse } from "@repo/shared/responses";

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
