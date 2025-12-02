import { Module } from "@nestjs/common";
import { AchievementsService } from "@/achievements/achievements.service";
import { DistrictsService } from "@/districts/districts.service";
import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioService } from "./minio.service";
@Module({
  controllers: [GnomesController],
  providers: [
    MinioService,
    GnomesService,
    DistrictsService,
    AchievementsService,
  ],
  exports: [MinioService],
})
export class MinioModule {}
