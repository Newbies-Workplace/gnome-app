import { Module } from "@nestjs/common";
import { FriendsModule } from "@/friends/friends.module";
import { AchievementsController } from "./achievements.controller";
import { AchievementsService } from "./achievements.service";

@Module({
  imports: [FriendsModule],
  providers: [AchievementsService],
  controllers: [AchievementsController],
  exports: [AchievementsService],
})
export class AchievementsModule {}
