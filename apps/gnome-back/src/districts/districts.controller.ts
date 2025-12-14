import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { DistrictsResponse } from "@repo/shared/responses";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { DistrictsService } from "./districts.service";

@ApiBearerAuth()
@Controller("districts")
export class DistrictsController {
  constructor(private readonly districtService: DistrictsService) {}

  @Get("")
  @UseGuards(JwtGuard)
  async findDistricts(): Promise<DistrictsResponse[]> {
    return await this.districtService.findManyDistricts();
  }

  @Get(":id")
  async findDistrictById(@Param("id") id: number): Promise<DistrictsResponse> {
    return await this.districtService.findDistrict(Number(id));
  }
}
