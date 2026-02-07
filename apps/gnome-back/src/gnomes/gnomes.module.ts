import { Module } from "@nestjs/common";
import { AchievementsModule } from "@/achievements/achievements.module";
import { DistrictsModule } from "@/districts/districts.module";
import { GnomesController } from "@/gnomes/gnomes.controller";
import { GnomesConverter } from "@/gnomes/gnomes.converter";
import { GnomesService } from "@/gnomes/gnomes.service";
import { StorageModule } from "@/storage/storage.module";

@Module({
  imports: [StorageModule, DistrictsModule, AchievementsModule],
  providers: [GnomesService, GnomesConverter],
  controllers: [GnomesController],
})
export class GnomesModule {}
