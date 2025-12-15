import { Module } from "@nestjs/common";
import { AchievementsController } from "@/achievements/achievements.controller";
import { AchievementsService } from "@/achievements/achievements.service";
import { FriendsModule } from "@/friends/friends.module";

@Module({
  imports: [FriendsModule],
  providers: [AchievementsService],
  controllers: [AchievementsController],
  exports: [AchievementsService],
})
export class AchievementsModule {}
