import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AchievementsService } from "@/achievements/achievements.service";
import { DistrictsService } from "@/districts/districts.service";
import { GnomesConverter } from "@/gnomes/gnomes.converter";
import { GnomesService } from "@/gnomes/gnomes.service";
import { StorageController } from "@/storage/storage.controller";
import { StorageService } from "@/storage/storage.service";

@Module({
  imports: [ConfigModule],
  controllers: [StorageController],
  providers: [
    StorageService,
    GnomesService,
    GnomesConverter,
    DistrictsService,
    AchievementsService,
  ],
  exports: [StorageService],
})
export class StorageModule {}
