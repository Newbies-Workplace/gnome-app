import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GoogleUserResponse } from "@repo/shared/responses";
import { OAuth2Client } from "google-auth-library";
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

  generateJWT(payload) {
    return this.jwtService.sign(payload);
  }

  async googleAuth(user: GoogleUserResponse) {
    let userExists = await this.prismaService.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!userExists) {
      userExists = await this.userService.createUserWithGoogleData({
        id: user.providerId,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        pictureUrl: user.pictureUrl,
      });
    }

    return await this.jwtService.sign({
      user: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        pictureUrl: userExists.pictureUrl,
        role: userExists.role,
      },
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
