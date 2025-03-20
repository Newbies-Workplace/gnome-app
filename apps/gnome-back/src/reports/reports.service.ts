import { PrismaService } from "@/db/prisma.service";
import { Injectable } from "@nestjs/common";
import { Report } from "@prisma/client";

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllReports(): Promise<{ id: string; reportAuthor: string }[]> {
    return this.prisma.report.findMany({
      select: {
        id: true,
        reportAuthor: true,
      },
    });
  }

  async getReportsCount(): Promise<number> {
    const collection = await this.prisma.report.findMany();
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
    return this.prisma.report.create({
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
    return this.prisma.report.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteReport(id: string) {
    return this.prisma.report.delete({
      where: {
        id: id,
      },
    });
  }

  async deleteAllReports() {
    const deleteAll = await this.prisma.report.deleteMany();
    return deleteAll.count;
  }
}
