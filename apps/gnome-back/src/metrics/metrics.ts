import { Injectable } from "@nestjs/common";
import { Counter, Gauge } from "prom-client";
import { PrismaService } from "@/db/prisma.service";

@Injectable()
export class MetricsService {
  private userCountGauge: Gauge<string>;
  private gnomeCountGauge: Gauge<string>;
  private buildingsCountGauge: Gauge<string>;
  public httpRequestCounter: Counter<string>;

  constructor(private prisma: PrismaService) {
    this.userCountGauge = new Gauge({
      name: "app_user_count",
      help: "Number of users stored in the database",
    });

    this.gnomeCountGauge = new Gauge({
      name: "app_gnome_count",
      help: "Number of gnomes stored in the database",
    });

    this.buildingsCountGauge = new Gauge({
      name: "app_building_count",
      help: "Number of buildings stord in the database",
    });

    this.httpRequestCounter = new Counter({
      name: "app_requests_total",
      help: "Total HTTP requests",
      labelNames: ["method", "route", "status_code"],
    });
  }

  async updateUserCount() {
    const count = await this.prisma.user.count();
    this.userCountGauge.set(count);
  }

  async updateGnomeCount() {
    const count = await this.prisma.gnome.count();
    this.gnomeCountGauge.set(count);
  }

  async updateBuildingCount() {
    const count = await this.prisma.building.count();
    this.buildingsCountGauge.set(count);
  }
}
