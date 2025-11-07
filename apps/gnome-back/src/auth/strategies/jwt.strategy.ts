import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtUser, Token } from "@/auth/types/jwt-user";
import { PrismaService } from "@/db/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Token): Promise<JwtUser> {
    const user = await this.prismaService.user.findFirst({
      where: {
        googleId: payload.user.googleId,
      },
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
