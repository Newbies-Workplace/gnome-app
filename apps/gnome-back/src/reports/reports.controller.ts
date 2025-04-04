import { JWTUser } from "@/auth/jwt/JWTUser";
import { JwtGuard } from "@/auth/jwt/jwt.guard";
import { MinioService } from "@/minio/minio.service";
import { Role } from "@/role/role.decorator";
import { RoleGuard } from "@/roleguard/role.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileTypeValidator, MaxFileSizeValidator } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateReportRequest } from "@repo/shared/requests";
import { ReportResponse } from "@repo/shared/responses";
import { ReportsService } from "./reports.service";
@Controller("reports")
export class ReportsController {
  constructor(
    private readonly minioService: MinioService,
    private readonly reportsService: ReportsService,
  ) {}
  @Get("")
  @UseGuards(JwtGuard, RoleGuard)
  @Role(["ADMIN"])
  async getAllReports() {
    const allReports = await this.reportsService.getAllReports();

    return allReports;
  }
  @Post("")
  @UseInterceptors(FileInterceptor("file"))
  async createReport(
    @Body() body: CreateReportRequest,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 10_000_000 }), // 10MB
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.minioService.createBucketIfNotExists();

    let fileUrl: string;
    if (file) {
      const fileName = `${Date.now()}.jpg`;
      const catalogueName = "reportImages";
      const filePath = `${catalogueName}/${fileName}`;

      await this.minioService.uploadFile(file, fileName, catalogueName);
      fileUrl = await this.minioService.getFileUrl(filePath);
    }
    const latitude = body.latitude;
    const longitude = body.longitude;
    return this.reportsService.createReport(
      body.gnomeName,
      fileUrl,
      latitude,
      longitude,
      body.location,
      body.reportAuthor,
    );
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
