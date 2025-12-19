import {
  AchievementResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";
import { create } from "zustand";
import { AchievementsService } from "@/lib/api/Achievements.service";

interface AchievementsStore {
  achivements: AchievementResponse[];
  userAchivements: UserAchievementResponse[];

  fetchAchievements: () => Promise<void>;
  fetchUserAchievements: () => Promise<void>;
}

export const useAchievementsStore = create<AchievementsStore>((set) => ({
  achivements: [],
  userAchivements: [],

  fetchAchievements: async () => {
    const achivements = await AchievementsService.getAllAchievements();

    set({ achivements });
  },

  fetchUserAchievements: async () => {
    const userAchievements = await AchievementsService.getUserAchievements();

    set({ userAchivements: userAchievements });
  },
}));
