import { GnomesService } from "@/lib/api/Gnomes.service";
import { useAuthStore } from "@/store/useAuthStore";
import { create } from "zustand";

export interface Gnome {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  creationDate: Date;
  description: string;
  exists: boolean;
}

interface GnomeState {
  gnomes: Gnome[];
  loading: boolean;
  error: string | null;

  fetchGnomes: () => Promise<void>;
  addGnome: (gnome: Gnome) => void;
  removeGnome: (id: string) => void;
}

export const useGnomeStore = create<GnomeState>((set) => ({
  gnomes: [],
  loading: false,
  error: null,

  fetchGnomes: async () => {
    set({ loading: true });
    try {
      const data = await GnomesService.getGnomes();
      set({ gnomes: data, loading: false });
    } catch (error) {
      set({ error: "Failed to load gnomes", loading: false });
    }
  },

  addGnome: (gnome) => set((state) => ({ gnomes: [...state.gnomes, gnome] })),

  removeGnome: (id) =>
    set((state) => ({
      gnomes: state.gnomes.filter((gnome) => gnome.id !== id),
    })),
}));
