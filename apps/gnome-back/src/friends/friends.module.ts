import { Module } from "@nestjs/common";
import { DistrictsService } from "@/districts/districts.service";
import { GnomesService } from "@/gnomes/gnomes.service";
import { FriendsController } from "./friends.controller";
import { FriendsService } from "./friends.service";

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, GnomesService, DistrictsService],
  exports: [FriendsService],
})
export class FriendsModule {}
