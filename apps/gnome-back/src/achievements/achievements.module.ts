import { Module } from "@nestjs/common";
import { AchievementsController } from "./achievements.controller";
import { AchievementsService } from "./achievements.service";

@Module({
  providers: [AchievementsService],
  controllers: [AchievementsController],
})
export class AchievementsModule {}
