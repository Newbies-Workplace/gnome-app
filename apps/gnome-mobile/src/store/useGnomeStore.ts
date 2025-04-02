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

interface Interaction {
  gnomeId: string;
  interactionDate: Date;
  gnome: Gnome;
}

interface GnomeState {
  gnomes: Gnome[];
  interactions: Interaction[];
  loading: boolean;
  error: string | null;

  fetchGnomes: () => Promise<void>;
  addGnome: (gnome: Gnome) => void;
  removeGnome: (id: string) => void;
  fetchMyInteractions: () => Promise<void>;
}

export const useGnomeStore = create<GnomeState>((set) => ({
  gnomes: [],
  interactions: [],
  loading: false,
  error: null,

  fetchGnomes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await (GnomesService as any).getGnomes();
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

  fetchMyInteractions: async () => {
    set({ loading: true, error: null });
    try {
      const { user } = useAuthStore.getState();
      const userId = user?.id;
      if (!userId) {
        throw new Error("User  is not authenticated");
      }
      const data = await (GnomesService as any).getMyGnomesInteractions(userId);
      console.log("Fetched interactions:", data); // Log data
      if (!Array.isArray(data))
        throw new Error("Invalid interaction data format");

      set({ interactions: data, loading: false });
    } catch (error) {
      console.error("Fetch error:", error);
      set({ error: "Failed to load interactions", loading: false });
    }
  },
}));
