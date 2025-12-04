import { Injectable, NotFoundException } from "@nestjs/common";
import {
  AchievementDataResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";

const GNOME_ACHIEVEMENT_MAP: Record<number, string> = {
  1: "gnomeCollect-1",
  10: "gnomeCollect-10",
  20: "gnomeCollect-20",
  50: "gnomeCollect-50",
  80: "gnomeCollect-80",
  100: "gnomeCollect-100",
  150: "gnomeCollect-150",
  200: "gnomeCollect-200",
  300: "gnomeCollect-all", // To 300 to do zmiany bo nie wiem ile krasnali jest
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
