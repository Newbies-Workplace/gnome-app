import { Injectable } from "@nestjs/common";
import { Achievement, UserAchievement } from "@prisma/client";
import {
  AchievementResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";

@Injectable()
export class AchievementsConverter {
  async toAchievementResponse(
    model: Achievement,
  ): Promise<AchievementResponse> {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
    };
  }

  async toUserAchievementResponse(
    achievement: UserAchievement & { achievement: Achievement },
  ): Promise<UserAchievementResponse> {
    return {
      achievement: await this.toAchievementResponse(achievement.achievement),
      earnedAt: achievement.earnedAt,
    };
  }
}
