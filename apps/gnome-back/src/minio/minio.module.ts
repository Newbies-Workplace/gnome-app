import { Module } from "@nestjs/common";
import { AchievementsService } from "@/achievements/achievements.service";
import { DistrictsService } from "@/districts/districts.service";
import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesConverter } from "@/gnomes/gnomes.converter";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioService } from "@/minio/minio.service";

@Module({
  controllers: [GnomesController],
  providers: [
    MinioService,
    GnomesService,
    GnomesConverter,
    DistrictsService,
    AchievementsService,
  ],
  exports: [MinioService],
})
export class MinioModule {}
