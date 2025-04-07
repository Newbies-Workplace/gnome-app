import { GnomesService } from "@/gnomes/gnomes.service";
import { Module } from "@nestjs/common";
import { FriendsController } from "./friends.controller";
import { FriendsService } from "./friends.service";

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, GnomesService],
})
export class FriendsModule {}
