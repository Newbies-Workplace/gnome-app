import { Module } from "@nestjs/common";
import { DistrictsService } from "@/districts/districts.service";
import { FriendsController } from "@/friends/friends.controller";
import { FriendsService } from "@/friends/friends.service";
import { GnomesService } from "@/gnomes/gnomes.service";
import { MinioService } from "@/minio/minio.service";

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, GnomesService, DistrictsService, MinioService],
  exports: [FriendsService],
})
export class FriendsModule {}
