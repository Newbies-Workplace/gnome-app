import type { GnomeResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { GnomesService } from "@/api/Gnomes.service";

interface GnomeState {
  gnomes: GnomeResponse[];
  loading: boolean;
  error: string | null;

  fetchGnomes: () => Promise<void>;
  addGnome: (gnome: GnomeResponse) => Promise<void>;
  removeGnome: (id: string) => Promise<void>;
  updateGnome: (id: string, gnome: Partial<GnomeResponse>) => Promise<void>;
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

  addGnome: async (gnome) => {
    try {
      const newGnome = await GnomesService.addGnome(gnome);
      set((state) => ({ gnomes: [...state.gnomes, newGnome] }));
    } catch (error) {
      console.error("Add gnome error:", error);
    }
  },

  removeGnome: async (id) => {
    try {
      await GnomesService.removeGnome(id);
      set((state) => ({
        gnomes: state.gnomes.filter((gnome) => gnome.id !== id),
      }));
    } catch (error) {
      console.error("Remove gnome error:", error);
    }
  },

  updateGnome: async (id, gnome) => {
    try {
      const updated = await GnomesService.updateGnome(id, gnome);
      set((state) => ({
        gnomes: state.gnomes.map((g) =>
          g.id === id ? { ...g, ...updated } : g,
        ),
      }));
    } catch (error) {
      console.error("Update gnome error:", error);
    }
  },
}));
