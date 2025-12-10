import {
  AchievementResponse,
  UserAchievementResponse,
} from "@repo/shared/responses";
import { create } from "zustand";
import { AchievementsService } from "@/lib/api/Achievements.service";

interface AchievementsStore {
  achivements: AchievementResponse[];
  userAchivements: UserAchievementResponse[];

  fetchAchivements: () => Promise<void>;
  fetchUserAchivements: () => Promise<void>;
}

export const useAchievementsStore = create<AchievementsStore>((set) => ({
  achivements: [],
  userAchivements: [],

  fetchAchivements: async () => {
    const achivements = await AchievementsService.getAllAchievements();

    set({ achivements });
  },

  fetchUserAchivements: async () => {
    const userAchievements = await AchievementsService.getUserAchievements();

    set({ userAchivements: userAchievements });
  },
}));
