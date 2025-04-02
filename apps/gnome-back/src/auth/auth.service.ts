import { GoogleUser } from "@/auth/types/GoogleUser";
import { PrismaService } from "@/db/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client } from "google-auth-library";
import { GoogleUserType } from "./google/GoogleUserType";

@Injectable()
export class AuthService {
  private client = new OAuth2Client(
    `${process.env.GOOGLE_ID}.apps.googleusercontent.com`,
  );

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {
    console.log("JwtService Config:", this.jwtService);
  }

  generateJWT(payload) {
    return this.jwtService.sign(payload);
  }

  async googleAuth(user: GoogleUserType) {
    let userExists = await this.prismaService.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!userExists) {
      userExists = await this.prismaService.user.create({
        data: {
          email: user.email,
          name: user.firstName,
          pictureUrl: user.pictureUrl,
          googleId: user.providerId,
        },
      });
    }

    return this.jwtService.sign({
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
