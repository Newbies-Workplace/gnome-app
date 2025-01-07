import { Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { UsersService } from "src/users/users.service.js";
import type { GoogleUser } from "./types/GoogleUser.js";

@Injectable()
export class AuthService {
  private client = new OAuth2Client(
    `${process.env.GOOGLE_ID}.apps.googleusercontent.com`,
  );

  async verifyGoogleToken(idToken: string): Promise<GoogleUser> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: `${process.env.GOOGLE_ID}.apps.googleusercontent.com`,
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
