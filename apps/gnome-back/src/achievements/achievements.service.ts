import { Injectable, NotFoundException } from "@nestjs/common";
import {
  AchievementDataResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";

const GNOME_ACHIEVEMENT_MAP: Record<number, string> = {
  1: "47bb20ea-2ae9-4f97-9012-095a04ae3ee9",
  10: "224553b4-ae02-4aa0-9e99-5c3a50134a29",
  20: "fab5d7c0-46db-4ed2-8426-a18f5d263da9",
  50: "a1c31786-8c2d-4503-890a-4e519dd2e885",
  80: "274707cb-c457-443a-878e-05c8e4330f2f",
  100: "b8d07d69-2004-4462-8b92-dc34d0a32697",
  150: "762117ca-71b7-4e74-9b79-f41e0834ca66",
  200: "204b0de2-4165-4759-b6ff-ff6147ccb97c",
  300: "Legendarny zbieracz", // To 300 to do zmiany bo nie wiem ile krasnali jest
};

@Injectable()
export class AchievementsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAchievementData(
    userId: string,
    achievementId: string,
  ): Promise<UserAchievementResponse> {
    const achievement = await this.prismaService.userAchievement.findFirst({
      where: {
        achievementId: achievementId,
        userId: userId,
      },
    });

    if (!achievement) {
      throw new NotFoundException("Achievement not found in user");
    }

    return {
      achievementId: achievement.achievementId,
      earnedAt: achievement.earnedAt,
    };
  }

  async getUserAchievements(
    userId: string,
  ): Promise<UserAchievementResponse[]> {
    const achievements = await this.prismaService.userAchievement.findMany({
      where: { userId },
    });

    return achievements.map((a) => ({
      achievementId: a.achievementId,
      earnedAt: a.earnedAt,
    }));
  }

  async giveAchievement(
    userId: string,
    achievementId: string,
  ): Promise<UserAchievementResponse> {
    const achievement = await this.prismaService.userAchievement.create({
      data: {
        userId,
        achievementId,
      },
    });

    return {
      achievementId: achievement.achievementId,
      earnedAt: achievement.earnedAt,
    };
  }

  async getAchievement(id: string): Promise<AchievementDataResponse> {
    const achievement = await this.prismaService.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      throw new NotFoundException("Achievement not found");
    }

    const collection = await this.prismaService.userAchievement.findMany({
      where: { achievementId: id },
    });

    return {
      id: achievement.id,
      name: achievement.name,
      description: achievement.description,
      users: collection.length,
    };
  }

  async unlockGnomeAchievement(userId: string, gnomeCount: number) {
    const achievementId = GNOME_ACHIEVEMENT_MAP[gnomeCount];
    if (!achievementId) return null;

    const achievement = await this.prismaService.achievement.findFirst({
      where: { id: achievementId },
    });

    if (!achievement) return null;

    return this.prismaService.userAchievement.create({
      data: {
        userId,
        achievementId: achievement.id,
      },
    });
  }
}
