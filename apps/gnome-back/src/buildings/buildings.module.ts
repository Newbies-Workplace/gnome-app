import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { BuildingsController } from "@/buildings/buildings.controller";
import { BuildingsConverter } from "@/buildings/buildings.converter";
import { BuildingsCron } from "@/buildings/buildings.cron";
import { BuildingsService } from "@/buildings/buildings.service";
import { DistrictsModule } from "@/districts/districts.module";

@Module({
  imports: [ScheduleModule.forRoot(), DistrictsModule],
  controllers: [BuildingsController],
  providers: [BuildingsService, BuildingsConverter, BuildingsCron],
})
export class BuildingsModule {}
