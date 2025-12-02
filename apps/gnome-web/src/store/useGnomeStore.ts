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
      if (error.response?.status === 401) {
        set({ error: "Brak autoryzacji – zaloguj się", loading: false });
      } else {
        set({ error: "Failed to load gnomes", loading: false });
      }
    }
  },

  addGnome: async (payload: FormData) => {
    const newGnome = await GnomesService.addGnome(payload);
    set((state) => ({ gnomes: [...state.gnomes, newGnome] }));
    return newGnome;
  },

  removeGnome: async (id: string) => {
    await GnomesService.removeGnome(id);
    set((state) => ({
      gnomes: state.gnomes.filter((gnome) => gnome.id !== id),
    }));
  },

  updateGnome: async (id: string, payload: Partial<CreateGnomeRequest>) => {
    const updated = await GnomesService.updateGnome(id, payload);
    set((state) => ({
      gnomes: state.gnomes.map((g) => (g.id === id ? { ...g, ...updated } : g)),
    }));
    return updated;
  },
}));
