import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTUser, Token } from "@/auth/jwt/JWTUser";
import { PrismaService } from "@/db/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // TO BE CHANGED
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Token): Promise<JWTUser> {
    const user = await this.prismaService.user.findFirst({
      where: {
        googleId: payload.user.googleId,
      },
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
