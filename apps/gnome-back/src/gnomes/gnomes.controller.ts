import { JWTUser } from "@/auth/jwt/JWTUser";
import { User } from "@/auth/jwt/jwtuser.decorator";
import { Controller, Get, Param } from "@nestjs/common";
import { GnomesService } from "./gnomes.service";

@Controller("gnomes")
export class GnomesController {
  constructor(private readonly gnomeService: GnomesService) {}

  // Pobieranie wszystkich gnomów

  @Get("")
  getPlaceData() {
    return this.gnomeService.getPlaceDate();
  }

  // Pobieranie interakcji gnomów

  @Get(":id")
  getFound(@Param("id") gnomeId: string) {
    return this.gnomeService.getInteractionCount(gnomeId);
  }

  // Pobranie daty postawienia gnoma

  @Get(":id/creationDate")
  getCreationDate(@Param("id") id: string) {
    return this.gnomeService.getCreationDate(id);
  }
}
