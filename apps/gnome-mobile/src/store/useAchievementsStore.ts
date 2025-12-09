import { UserAchievementResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { AchievementsService } from "@/lib/api/Achievements.service";

interface AchievementsStore {
  achivements: [];
  userAchivements: UserAchievementResponse[];

  fetchAchivements: () => Promise<void>;
  fetchUserAchivements: () => Promise<void>;
}

export const useAchievementsStore = create<AchievementsStore>((set) => ({
  achivements: [],
  userAchivements: [],

  fetchAchivements: async () => {
    return;
  },

  fetchUserAchivements: async () => {
    const userAchievements = await AchievementsService.getUserAchivements();

    set({ userAchivements: userAchievements });
  },
}));
