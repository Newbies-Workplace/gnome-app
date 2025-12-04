import type { BuildingResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { BuildingsService } from "@/api/Buildings.service";

interface BuildState {
  buildings: BuildingResponse[];
  loading: boolean;
  error: string | null;

  fetchBuildings: () => Promise<void>;
}
export const useBuildStore = create<BuildState>((set) => ({
  buildings: [],
  loading: false,
  error: null,

  fetchBuildings: async () => {
    set({ loading: true, error: null });

    try {
      const data = await BuildingsService.getBuildings();
      console.log("API ZWRÓCIŁO:", data); // 👈 DODAJ TO

      set({
        buildings: Array.isArray(data) ? data : [data],
        loading: false,
      });
    } catch (error: any) {
      const message =
        error?.response?.status === 401
          ? "Brak autoryzacji - zaloguj się"
          : "Nie udało się pobrać budowli";

      set({ error: message, loading: false });
    }
  },
}));
