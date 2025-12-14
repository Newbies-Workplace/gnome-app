import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { BuildingsController } from "./buildings.controller";
import { BuildingsService } from "./buildings.service";

@Module({
  controllers: [BuildingsController],
  providers: [BuildingsService],
  imports: [ScheduleModule.forRoot()],
})
export class BuildingsModule {}
