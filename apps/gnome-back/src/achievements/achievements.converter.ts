import { Achievement, UserAchievement } from "@prisma/client";
import {
  AchievementResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";

export const toAchievementResponse = (
  model: Achievement,
): AchievementResponse => ({
  id: model.id,
  name: model.name,
  description: model.description,
});

export const toUserAchievementResponse = (
  achievement: UserAchievement & { achievement: Achievement },
): UserAchievementResponse => {
  return {
    achievement: toAchievementResponse(achievement.achievement),
    earnedAt: achievement.earnedAt,
  };
};
