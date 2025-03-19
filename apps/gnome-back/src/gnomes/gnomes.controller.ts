import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { User } from "@/auth/jwt/jwtuser.decorator";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { createGnomeDto } from "./dto/gnomeCreate.dto";
import { GnomesService } from "./gnomes.service";

@Controller("gnomes")
export class GnomesController {
  constructor(private readonly gnomeService: GnomesService) {}

  // Pobieranie wszystkich gnomów

  @Get("")
  @UseGuards(JwtGuard)
  getAllGnomes() {
    return this.gnomeService.getAllGnomes();
  }

  // Pobranie danych gnoma

  @Get(":id")
  @UseGuards(JwtGuard)
  getGnomeData(@Param("id") gnomeId: string) {
    return this.gnomeService.getGnomeData(gnomeId);
  }

  // Pobieranie interakcji gnomów

  @Get(":id/interactions")
  @UseGuards(JwtGuard)
  getInteractionCount(@Param("id") gnomeId: string) {
    return this.gnomeService.getInteractionCount(gnomeId);
  }

  // Wyświetlanie swojej interakcji z gnomem

  @Get("@me")
  @UseGuards(JwtGuard)
  async getMyGnomes(@User() user: JWTUser) {
    return this.gnomeService.getMyGnomes(user.id);
  }

  // Tworzenie nowego gnoma

  @Post()
  @UseGuards(JwtGuard)
  async createGnome(@Body() createGnomeDto: createGnomeDto) {
    return this.gnomeService.createGnome(createGnomeDto);
  }
}
