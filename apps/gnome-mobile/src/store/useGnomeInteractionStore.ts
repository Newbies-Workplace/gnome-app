import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GnomesService } from "@/lib/api/Gnomes.service";

interface GnomeInteraction {
  gnomeId: string;
  interactionDate: Date;
}

interface GnomeInteractionStore {
  pending: GnomeInteraction[];
  latestInteractions: GnomeInteraction[];
  interactionCount: Record<string, number>;

  addPendingInteraction: (gnomeId: string) => Promise<void>;
  syncPending: () => Promise<void>;
  fetchInteractionCount: (gnomeId: string) => Promise<void>;
}

export const useGnomeInteractionStore = create<GnomeInteractionStore>()(
  persist(
    (set, get) => ({
      pending: [],
      latestInteractions: [],
      interactionCount: {},

      addPendingInteraction: async (gnomeId) => {
        const interaction = {
          gnomeId,
          interactionDate: new Date(),
        };

        const isInteractionAdded = get().latestInteractions.find(
          (interaction) => interaction.gnomeId === gnomeId,
        );

        if (isInteractionAdded) {
          set((state) => ({
            pending: [...state.pending, interaction],
            latestInteractions: state.latestInteractions.map(
              (existingInteraction) =>
                existingInteraction.gnomeId === gnomeId
                  ? { ...existingInteraction, interactionDate: new Date() }
                  : existingInteraction,
            ),
          }));
        } else {
          set((state) => ({
            pending: [...state.pending, interaction],
            latestInteractions: [...state.latestInteractions, interaction],
          }));
        }
      },

      fetchInteractionCount: async (gnomeId: string) => {
        try {
          const count = await GnomesService.getInteractionCount(gnomeId);
          set((state) => ({
            interactionCount: { ...state.interactionCount, [gnomeId]: count },
          }));
        } catch (error) {
          console.error("Nie udało się pobrać liczby interakcji:", error);
        }
      },

      syncPending: async () => {
        const net = await Network.getNetworkStateAsync();
        if (!net.isConnected || net.isInternetReachable === false) return;

        const { pending } = get();
        if (pending.length === 0) return;

        const stillPending: GnomeInteraction[] = [];

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
