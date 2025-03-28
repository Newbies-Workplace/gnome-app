import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { Role } from "@/role/role.decorator";
import { RoleGuard } from "@/roleguard/role.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateReportRequest } from "./dto/CreateReportRequest.dto";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get("")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  getAllReports() {
    /* zwraca wszystkie reporty i ich ilosc */
    return this.reportsService.getAllReports();
  }

  @Post("")
  createReport(@Body() body: CreateReportRequest) {
    return this.reportsService.createReport(
      body.gnomeName,
      body.pictureUrl,
      body.latitude,
      body.longitude,
      body.location,
      body.reportAuthor,
    );
  }

  @Get(":id")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  getUniqueReport(@Param("id") id: string) {
    return this.reportsService.getUniqueReport(id);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  deleteReport(@Param("id") id: string) {
    return this.reportsService.deleteReport(id);
  }

  @Delete("")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  deleteAllReports() {
    /* zwraca liczbe usunietych zgloszen */
    return this.reportsService.deleteAllReports();
  }
}
