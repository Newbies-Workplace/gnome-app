import { Injectable, NotFoundException } from "@nestjs/common";
import { Report } from "@prisma/client";
import { ReportResponse } from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllReports(): Promise<{
    reportCount: number;
    reports: ReportResponse[];
  }> {
    const reports = await this.prismaService.report.findMany();
    const reportCount = await reports.length;
    if (reportCount < 1) {
      throw new NotFoundException("Brak reportów");
    }
    return { reportCount, reports };
  }

  async createReport(
    gnomeName: string,
    pictureUrl: string,
    latitude: number,
    longitude: number,
    location: string,
    reportAuthor: string,
  ) {
    return this.prismaService.report.create({
      data: {
        gnomeName: gnomeName,
        pictureUrl: pictureUrl,
        latitude: latitude,
        longitude: longitude,
        location: location,
        reportAuthor: reportAuthor,
      },
    });
  }

  async getUniqueReport(id: string): Promise<Report | null> {
    const uniqueReport = await this.prismaService.report.findUnique({
      where: {
        id: id,
      },
    });
    if (!uniqueReport) {
      throw new NotFoundException("Nie znaleziono zgłoszenia");
    }

    return uniqueReport;
  }

  async deleteReport(id: string) {
    return this.prismaService.report.delete({
      where: {
        id: id,
      },
    });
  }

  async deleteAllReports() {
    const deleteAll = await this.prismaService.report.deleteMany();
    return deleteAll.count;
  }
}
