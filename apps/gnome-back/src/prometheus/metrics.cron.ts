import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MetricsService } from "./metrics";

@Injectable()
export class MetricsCron {
  constructor(private metrics: MetricsService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    await this.metrics.updateUserCount();
    await this.metrics.updateGnomeCount();
    await this.metrics.updateBuildingCount();
  }
}
