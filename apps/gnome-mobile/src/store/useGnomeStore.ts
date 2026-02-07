import AsyncStorage from "@react-native-async-storage/async-storage";
import { GnomeResponse, InteractionResponse } from "@repo/shared/responses";
import * as Network from "expo-network";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GnomesService } from "@/lib/api/Gnomes.service";

interface PendingGnomeInteraction {
  gnomeId: string;
  interactionDate: Date;
}

interface GnomeState {
  gnomes: GnomeResponse[];

  pendingInteractions: PendingGnomeInteraction[];
  interactions: InteractionResponse[];
  interactionCount: Record<string, number>;

  loading: boolean;
  error: string | null;

  fetchGnomes: () => Promise<void>;

  fetchMyInteractions: () => Promise<void>;
  fetchInteractionCount: (gnomeId: string) => Promise<void>;

  addInteraction: (gnomeId: string) => Promise<void>;
  syncPendingInteractions: () => Promise<void>;
}

export const useGnomeStore = create<GnomeState>()(
  persist(
    (set, get) => ({
      gnomes: [],

      pendingInteractions: [],
      interactions: [],
      interactionCount: {},

      loading: false,
      error: null,

      fetchGnomes: async () => {
        set({ loading: true, error: null });
        try {
          const data = await GnomesService.getGnomes();

          set({ gnomes: data, loading: false });
        } catch {
          set({ error: "Failed to load gnomes", loading: false });
        }
      },
      fetchInteractionCount: async (gnomeId: string) => {
        try {
          const count = await GnomesService.getInteractionCount(gnomeId);

          set((state) => ({
            interactionCount: { ...state.interactionCount, [gnomeId]: count },
          }));
        } catch (error) {
          console.error("Failed to load interactions count", error);
        }
      },

      fetchMyInteractions: async () => {
        set({ loading: true, error: null });
        try {
          const data = await GnomesService.getMyGnomesUniqueInteractions();

          set({ interactions: data, loading: false });
        } catch {
          set({ error: "Failed to load interactions", loading: false });
        }
      },

      addInteraction: async (gnomeId: string) => {
        const interactionDate = new Date();

        const pendingInteraction: PendingGnomeInteraction = {
          gnomeId,
          interactionDate,
        };

        set((state) => ({
          pendingInteractions: [
            ...state.pendingInteractions.filter(
              (interaction) => interaction.gnomeId !== gnomeId,
            ),
            pendingInteraction,
          ],
        }));

        await get().syncPendingInteractions();
      },
      syncPendingInteractions: async () => {
        const net = await Network.getNetworkStateAsync();
        if (!net.isConnected || net.isInternetReachable === false) return;

        const { pendingInteractions } = get();
        if (pendingInteractions.length === 0) return;

        const stillPending: PendingGnomeInteraction[] = [];

        for (const interaction of pendingInteractions) {
          try {
            const createdInteraction = await GnomesService.addInteraction(
              interaction.gnomeId,
              interaction,
            );

            set((state) => ({
              interactions: [
                ...state.interactions.filter(
                  (i) => i.gnomeId !== createdInteraction.gnomeId,
                ),
                createdInteraction,
              ],
            }));
          } catch (error) {
            console.error("Error while adding interaction", error);
            stillPending.push(interaction);
          }
        }

        set({ pendingInteractions: stillPending });
      },
    }),
    {
      name: "gnome-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        gnomes: state.gnomes,
        pendingInteractions: state.pendingInteractions,
        interactions: state.interactions,
        interactionCount: state.interactionCount,
      }),
    },
  ),
);
