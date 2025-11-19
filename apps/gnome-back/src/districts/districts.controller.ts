import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CreateDistrict } from "@repo/shared/requests";
import { DistrictsResponse } from "@repo/shared/responses";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { PrismaService } from "@/db/prisma.service";
import { DistrictsService } from "./districts.service";

@Controller("districts")
export class DistrictsController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly districtService: DistrictsService,
  ) {}

  @Get("")
  @UseGuards(JwtGuard)
  async findDistricts(@Query("id") id: number): Promise<DistrictsResponse> {
    return await this.districtService.findDistricts(id);
  }

  @Post("")
  async createDistrict(@Body() body: CreateDistrict) {
    return await this.districtService.createDistricts(body.name, body.points);
  }
}
