import { Module } from "@nestjs/common";
import { DistrictsService } from "@/districts/districts.service";
import { FriendsController } from "@/friends/friends.controller";
import { FriendsConverter } from "@/friends/friends.converter";
import { FriendsService } from "@/friends/friends.service";
import { GnomesService } from "@/gnomes/gnomes.service";
import { StorageService } from "@/storage/storage.service";

@Module({
  controllers: [FriendsController],
  providers: [
    FriendsService,
    GnomesService,
    DistrictsService,
    StorageService,
    FriendsConverter,
  ],
  exports: [FriendsService],
})
export class FriendsModule {}
