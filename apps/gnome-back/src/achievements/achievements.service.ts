import { Injectable, NotFoundException } from "@nestjs/common";
import {
  AchievementDataResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";

const GNOME_ACHIEVEMENT_MAP: Record<number, string> = {
  1: "To jest ich więcej?",
  10: "Początkujący zbieracz",
  20: "Młodszy zbieracz",
  50: "Doświadczony zbieracz",
  80: "Kolekcjoner krasnali",
  100: "Stary wyjadacz",
  150: "Mistrz zbieractwa krasnali",
  200: "Boski zbieracz",
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
    const achievementName = GNOME_ACHIEVEMENT_MAP[gnomeCount];
    if (!achievementName) return null;

    const achievement = await this.prismaService.achievement.findFirst({
      where: { name: achievementName },
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
