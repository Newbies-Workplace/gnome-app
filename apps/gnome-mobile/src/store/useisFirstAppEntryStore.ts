import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface isFirstAppEntry {
  isFirstAppEntry: boolean;

  setIsFirstAppEntryToFalse: () => void;
}

export const isFirstAppEntryStore = create<isFirstAppEntry>()(
  persist(
    (set) => ({
      isFirstAppEntry: true,

      setIsFirstAppEntryToFalse: () => set({ isFirstAppEntry: false }),
    }),
    {
      name: "is-first-app-entry-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
