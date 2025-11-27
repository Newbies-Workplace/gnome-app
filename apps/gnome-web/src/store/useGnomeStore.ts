import type { GnomeResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { axiosInstance } from "@/api/axios";
import { GnomesService } from "@/api/Gnomes.service";
import { useAuthStore } from "@/store/useAuthStore";

interface GnomeState {
  gnomes: GnomeResponse[];
  loading: boolean;
  error: string | null;

  fetchGnomes: () => Promise<void>;
  addGnome: (gnome: GnomeResponse) => void;
  removeGnome: (id: string) => void;
}

export const useGnomeStore = create<GnomeState>((set) => ({
  gnomes: [],
  interactions: [],
  loading: false,
  error: null,

  fetchGnomes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await GnomesService.getGnomes();
      if (!Array.isArray(data)) throw new Error("Invalid gnome data format");

      set({ gnomes: data, loading: false });
    } catch (error) {
      console.error("Fetch error:", error);
      set({ error: "Failed to load gnomes", loading: false });
    }
  },

  addGnome: (gnome) => set((state) => ({ gnomes: [...state.gnomes, gnome] })),

  removeGnome: (id) =>
    set((state) => ({
      gnomes: state.gnomes.filter((gnome) => gnome.id !== id),
    })),
}));
