import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { DistrictsResponse } from "@repo/shared/responses";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { Role } from "@/role/role.decorator";
import { DistrictsService } from "./districts.service";

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
