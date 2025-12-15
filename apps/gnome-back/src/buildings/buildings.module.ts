import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { BuildingsController } from "@/buildings/buildings.controller";
import { BuildingsCron } from "@/buildings/buildings.cron";
import { BuildingsService } from "@/buildings/buildings.service";
import { DistrictsModule } from "@/districts/districts.module";

@Module({
  imports: [ScheduleModule.forRoot(), DistrictsModule],
  controllers: [BuildingsController],
  providers: [BuildingsService, BuildingsCron],
})
export class BuildingsModule {}
