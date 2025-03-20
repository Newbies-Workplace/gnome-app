import { JwtGuard } from "@/auth/jwt/jwt.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateReport } from "./dto/createReport.dto";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Get("")
  getAllReports() {
    return this.reports.getAllReports();
  }

  @Get("count")
  getReportsCount() {
    return this.reports.getReportsCount();
  }

  @Post("")
  createReport(@Body() body: CreateReport) {
    return this.reports.createReport(
      body.gnomeName,
      body.pictureUrl,
      body.latitude,
      body.longitude,
      body.location,
      body.reportAuthor,
    );
  }

  @Get(":id")
  getUniqueReport(@Param("id") id: string) {
    return this.reports.getUniqueReport(id);
  }

  @Delete(":id")
  deleteReport(@Param("id") id: string) {
    return this.reports.deleteReport(id);
  }

  @Delete("")
  deleteAllReports() {
    /* zwraca liczbe usunietych zgloszen */
    return this.reports.deleteAllReports();
  }
}
