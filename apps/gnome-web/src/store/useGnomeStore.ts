import type { CreateGnomeRequest } from "@repo/shared/requests";
import type { GnomeResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { GnomesService } from "@/api/Gnomes.service";

interface GnomeState {
  gnomes: GnomeResponse[];
  loading: boolean;
  error: string | null;

  fetchGnomes: () => Promise<void>;
  addGnome: (payload: FormData) => Promise<GnomeResponse>;
  removeGnome: (id: string) => Promise<void>;
  updateGnome: (
    id: string,
    payload: Partial<CreateGnomeRequest>,
  ) => Promise<GnomeResponse>;
}

export const useGnomeStore = create<GnomeState>((set) => ({
  gnomes: [],
  loading: false,
  error: null,

  fetchGnomes: async () => {
    set({ loading: true, error: null });

    try {
      const data = await GnomesService.getGnomes();
      set({ gnomes: data, loading: false });
    } catch (error: any) {
      const message =
        error?.response?.status === 401
          ? "Brak autoryzacji – zaloguj się"
          : "Nie udało się pobrać gnomów";

      set({ error: message, loading: false });
    }
  },

  addGnome: async (payload: FormData) => {
    try {
      set({ loading: true, error: null });

      const newGnome = await GnomesService.addGnome(payload);

      set((state) => ({
        gnomes: [...state.gnomes, newGnome],
        loading: false,
        error: null,
      }));

      return newGnome;
    } catch (error) {
      set({ loading: false, error: "Nie udało się dodać gnoma" });
      throw error;
    }
  },

  removeGnome: async (id: string) => {
    try {
      set({ loading: true, error: null });

      await GnomesService.removeGnome(id);

      set((state) => ({
        gnomes: state.gnomes.filter((g) => g.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: "Nie udało się usunąć gnoma" });
      throw error;
    }
  },

  updateGnome: async (id, payload) => {
    try {
      set({ loading: true, error: null });

      const updated = await GnomesService.updateGnome(id, payload);

      set((state) => ({
        gnomes: state.gnomes.map((g) => (g.id === id ? updated : g)),
        loading: false,
      }));

      return updated;
    } catch (error) {
      set({ loading: false, error: "Nie udało się zaktualizować gnoma" });
      throw error;
    }
  },
}));
