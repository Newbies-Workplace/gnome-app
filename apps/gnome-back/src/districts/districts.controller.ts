import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CreateDistrict, FindPoint } from "@repo/shared/requests";
import { DistrictsResponse } from "@repo/shared/responses";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { Role } from "@/role/role.decorator";
import { DistrictsService } from "./districts.service";

@Controller("districts")
export class DistrictsController {
  constructor(private readonly districtService: DistrictsService) {}

  @Get("")
  @UseGuards(JwtGuard)
  async findDistricts(@Query("id") id: number): Promise<DistrictsResponse> {
    return await this.districtService.findDistricts(id);
  }

  @Post("")
  @UseGuards(JwtGuard)
  @Role(["ADMIN"])
  async createDistrict(@Body() body: CreateDistrict) {
    return await this.districtService.createDistricts(body.name, body.points);
  }

  @Get("point")
  @UseGuards(JwtGuard)
  async findPoint(@Body() body: { point: [number, number] }) {
    return await this.districtService.findPointInPolygon(body.point);
  }
}
