import { JWTUser } from "@/auth/jwt/JWTUser";
import { User } from "@/auth/jwt/jwtuser.decorator";
import { PrismaService } from "@/db/prisma.service";
import { Controller, Get } from "@nestjs/common";

@Controller("gnomes")
export class GnomesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get("")
  async getAll(@User() user: JWTUser): Promise<any> {
    const gnomes = await this.prismaService.gnomy.findMany();

    return gnomes;
  }
}
