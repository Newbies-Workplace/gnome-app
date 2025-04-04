import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { Role } from "@/role/role.decorator";
import { RoleGuard } from "@/roleguard/role.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateReportRequest } from "@repo/shared/requests";
import { ReportResponse } from "@repo/shared/responses";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get("")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async getAllReports() {
    const allReports = await this.reportsService.getAllReports();

    return allReports;
  }

  @Post("")
  async createReport(
    @Body() body: CreateReportRequest,
  ): Promise<ReportResponse> {
    const createReport = await this.reportsService.createReport(
      body.gnomeName,
      body.pictureUrl,
      body.latitude,
      body.longitude,
      body.location,
      body.reportAuthor,
    );
    return createReport;
  }

  @Get(":id")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async getUniqueReport(@Param("id") id: string): Promise<ReportResponse> {
    const uniqueReport = await this.reportsService.getUniqueReport(id);

    return uniqueReport;
  }

  @Delete(":id")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async deleteReport(@Param("id") id: string): Promise<ReportResponse> {
    await this.reportsService.getUniqueReport(id);
    const deletedReport = await this.reportsService.deleteReport(id);
    return deletedReport;
  }

  @Delete("")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async deleteAllReports(): Promise<number> {
    /* zwraca liczbe usunietych zgloszen */
    await this.reportsService.getAllReports();
    return await this.reportsService.deleteAllReports();
  }
}
