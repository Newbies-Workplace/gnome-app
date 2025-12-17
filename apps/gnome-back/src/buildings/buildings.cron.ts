import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { BuildingsService } from "@/buildings/buildings.service";

@Injectable()
export class BuildingsCron {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async decayBuildings() {
    await this.buildingsService.decayBuildings();
  }
}
