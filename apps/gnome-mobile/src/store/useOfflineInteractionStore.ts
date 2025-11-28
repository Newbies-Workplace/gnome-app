import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GnomesService } from "@/lib/api/Gnomes.service";

interface OfflineInteraction {
  gnomeId: string;
  interactionDate: Date;
}

interface OfflineInteractionStore {
  pending: OfflineInteraction[];

  addPendingInteraction: (gnomeId: string) => Promise<void>;
  syncPending: () => Promise<void>;
}

export const useOfflineInteractionStore = create<OfflineInteractionStore>()(
  persist(
    (set, get) => ({
      pending: [],

      addPendingInteraction: async (gnomeId) => {
        const interaction = {
          gnomeId,
          interactionDate: new Date(),
        };

        set((state) => ({
          pending: [...state.pending, interaction],
        }));
      },

      syncPending: async () => {
        const net = await Network.getNetworkStateAsync();
        if (!net.isConnected || net.isInternetReachable === false) return;

        const { pending } = get();
        if (pending.length === 0) return;

        const stillPending: OfflineInteraction[] = [];

        for (const interaction of pending) {
          try {
            await GnomesService.addInteraction(interaction);
          } catch (error) {
            stillPending.push(interaction);
          }
        }

        set({ pending: stillPending });
      },
    }),
    {
      name: "offline-interactions-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
