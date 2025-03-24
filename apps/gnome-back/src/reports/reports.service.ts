import type { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import type { Report } from "@prisma/client";

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllReports(): Promise<Report[]> {
    return this.prismaService.report.findMany();
  }

  async getReportsCount(): Promise<number> {
    const collection = await this.prismaService.report.findMany();
    return collection.length;
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
    return this.prismaService.report.findUnique({
      where: {
        id: id,
      },
    });
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
