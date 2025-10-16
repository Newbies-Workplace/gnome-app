import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface isFirstTimeStore {
  isFirstTime: boolean;

  setIsFirstTimeToFalse: () => void;
}

export const useIsFirstTimeStore = create<isFirstTimeStore>()(
  persist(
    (set) => ({
      isFirstTime: true,

      setIsFirstTimeToFalse: () => set({ isFirstTime: false }),
    }),
    {
      name: "is-first-time-store",
      partialize: (state) => ({ isFirstTime: state.isFirstTime }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
