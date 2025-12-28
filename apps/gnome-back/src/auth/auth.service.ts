import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GoogleUserResponse } from "@repo/shared/responses";
import { OAuth2Client } from "google-auth-library";
import { GoogleUser } from "@/auth/types/google-user";
import { JwtUser } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";
import { UsersService } from "@/users/users.service";

@Injectable()
export class AuthService {
  private client = new OAuth2Client(
    `${process.env.GOOGLE_ID}.apps.googleusercontent.com`,
  );

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private userService: UsersService,
  ) {}

  async googleAuth(user: GoogleUserResponse) {
    let existingUser = await this.prismaService.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) {
      existingUser = await this.userService.createUserWithGoogleData({
        id: user.providerId,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        pictureUrl: user.pictureUrl,
      });
    }

    const jwtUser: JwtUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      googleId: existingUser.googleId,
      role: existingUser.role,
    };

    return jwtUser;
  }

  async verifyGoogleToken(idToken: string): Promise<GoogleUser> {
    const ticket = await this.client.verifyIdToken({
      idToken,
    });

    const payload = ticket.getPayload();
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      pictureUrl: payload.picture,
    };
  }

  async generateTokens(jwtUser: JwtUser) {
    const accessTokenPayload = {
      user: jwtUser,
    };
    const refreshTokenPayload = {
      userId: jwtUser.id,
      iat: Math.floor(Date.now() / 1000),
    };

    const access_token = this.jwtService.sign(accessTokenPayload, {
      expiresIn: "1h",
    });

    const refresh_token = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: "30d",
    });

    return { access_token, refresh_token };
  }

  verifyRefreshToken(token: string): { userId: string } {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async refreshTokens(refreshToken: string) {
    const payload = this.verifyRefreshToken(refreshToken);

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) throw new UnauthorizedException("User not found");

    const jwtUser: JwtUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      googleId: user.googleId,
      role: user.role,
    };

    return this.generateTokens(jwtUser);
  }
}
