import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { DistrictsResponse } from "@repo/shared/responses";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { DistrictsService } from "@/districts/districts.service";

@ApiBearerAuth()
@Controller("districts")
export class DistrictsController {
  constructor(private readonly districtService: DistrictsService) {}

  @Get("")
  @UseGuards(JwtGuard)
  async getAllDistricts(): Promise<DistrictsResponse[]> {
    return await this.districtService.getAllDistricts();
  }
}
