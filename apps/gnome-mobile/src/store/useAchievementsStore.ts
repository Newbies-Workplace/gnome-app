import {
  AchievementResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";
import { create } from "zustand";
import { AchievementsService } from "@/lib/api/Achievements.service";

interface AchievementsStore {
  achievements: AchievementResponse[];
  userAchievements: UserAchievementResponse[];

  fetchAchievements: () => Promise<void>;
  fetchUserAchievements: () => Promise<void>;
}

export const useAchievementsStore = create<AchievementsStore>((set) => ({
  achievements: [],
  userAchievements: [],

  fetchAchievements: async () => {
    const achievements = await AchievementsService.getAllAchievements();

    set({ achievements: achievements });
  },

  fetchUserAchievements: async () => {
    const userAchievements = await AchievementsService.getUserAchievements();

    set({ userAchievements: userAchievements });
  },
}));
