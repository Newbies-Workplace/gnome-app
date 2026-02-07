import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/db/prisma.service";
import { Achievement } from "@/generated/prisma/client";

const GNOME_ACHIEVEMENT_MAP: Record<number, string> = {
  1: "gnomeCollect-1",
  10: "gnomeCollect-10",
  20: "gnomeCollect-20",
  50: "gnomeCollect-50",
  80: "gnomeCollect-80",
  100: "gnomeCollect-100",
  150: "gnomeCollect-150",
  200: "gnomeCollect-200",
};

@Injectable()
export class AchievementsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserAchievements(userId: string) {
    return this.prismaService.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
      },
    });
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

  async getAllAchievements(): Promise<Achievement[]> {
    return this.prismaService.achievement.findMany();
  }
}
