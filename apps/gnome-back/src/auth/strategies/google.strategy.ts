import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { UserRole } from "@prisma/client";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private prismaService: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<User> {
    const { id, name, emails, photos } = profile;

    const user = await this.prismaService.user.findFirst({
      where: { googleId: id },
    });

    if (user) {
      const userWithRole = {
        provider: "google",
        providerId: id,
        email: user.email,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1] || "",
        pictureUrl: photos[0].value,
        role: user.role,
      };
      return done(null, userWithRole);
    }

    const newUser = {
      provider: "google",
      providerId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      pictureUrl: photos[0].value,
      role: UserRole.USER,
    };
    return done(null, newUser);
  }
}
