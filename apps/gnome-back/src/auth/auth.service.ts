import { GoogleUser } from "@/auth/types/GoogleUser";
import { Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {
  private client = new OAuth2Client(
    `${process.env.GOOGLE_ID}.apps.googleusercontent.com`,
  );

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
