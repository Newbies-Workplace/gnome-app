import { Module } from "@nestjs/common";
import { DistrictsService } from "@/districts/districts.service";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioService } from "@/minio/minio.service";
import { FriendsController } from "./friends.controller";
import { FriendsService } from "./friends.service";

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, GnomesService, DistrictsService, MinioService],
  exports: [FriendsService],
})
export class FriendsModule {}
