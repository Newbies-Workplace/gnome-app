import { Module } from "@nestjs/common";
import { AchievementsModule } from "@/achievements/achievements.module";
import { DistrictsModule } from "@/districts/districts.module";
import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioModule } from "@/minio/minio.module";

@Module({
  imports: [MinioModule, DistrictsModule, AchievementsModule],
  providers: [GnomesService],
  controllers: [GnomesController],
})
export class GnomesModule {}
