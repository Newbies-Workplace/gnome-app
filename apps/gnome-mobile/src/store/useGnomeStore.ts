import { GnomesService } from "@/lib/api/Gnomes.service";
import { useAuthStore } from "@/store/useAuthStore";
import { create } from "zustand";

interface Gnome {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  creationDate: Date;
  description: string;
  exists: boolean;
}

interface Interaction {
  id: string;
  interactionDate: Date;
}

interface GnomeState {
  gnomes: Gnome[];
  interactions: Interaction[];
  loading: boolean;
  error: string | null;

  fetchGnomes: () => Promise<void>;
  addGnome: (gnome: Gnome) => void;
  removeGnome: (id: string) => void;
  fetchInteractions: (gnomeId: string) => Promise<void>;
}

export const useGnomeStore = create<GnomeState>((set) => ({
  gnomes: [],
  interactions: [], // Add interactions property
  loading: false,
  error: null,

  fetchGnomes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await GnomesService.getGnomes();
      console.log("Fetched gnomes:", data); // Log data
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

  fetchInteractions: async (gnomeId) => {
    set({ loading: true, error: null });
    try {
      const { user } = useAuthStore.getState();
      const gnomes = await GnomesService.getGnomes();
      const gnome = gnomes.find((gnome) => gnome.id === gnomeId);
      const interactions = gnomes.filter((gnome) => gnome.id === gnomeId);
      set({ interactions: interactions, loading: false });
    } catch (error) {
      console.error("Fetch error:", error);
      set({ error: "Failed to load interactions", loading: false });
    }
  },
}));
