import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GoogleUserResponse } from "@repo/shared/responses";
import { OAuth2Client } from "google-auth-library";
import { JWTUser } from "@/auth/jwt/JWTUser";
import { GoogleUser } from "@/auth/types/GoogleUser";
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

    const jwtUser: JWTUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      googleId: existingUser.googleId,
    };

    return this.jwtService.sign({
      user: jwtUser,
    });
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
}
