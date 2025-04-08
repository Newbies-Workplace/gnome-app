import { GnomesService } from "@/lib/api/Gnomes.service";
import { axiosInstance } from "@/lib/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { GnomeResponse, InteractionResponse } from "@repo/shared/responses";
import { create } from "zustand";

interface GnomeState {
  gnomes: GnomeResponse[];
  interactions: InteractionResponse[];
  loading: boolean;
  error: string | null;

  fetchGnomes: () => Promise<void>;
  addGnome: (gnome: GnomeResponse) => void;
  removeGnome: (id: string) => void;
  fetchMyInteractions: () => Promise<void>;
  addInteraction: (gnomeId: string, photoUrl?: string) => Promise<void>;
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

  fetchMyInteractions: async () => {
    set({ loading: true, error: null });
    try {
      const { user } = useAuthStore.getState();
      if (!user) {
        throw new Error("User is not authenticated");
      }
      const data = await GnomesService.getMyGnomesInteractions();
      console.log("Fetched interactions:", data); // Log data
      if (!Array.isArray(data))
        throw new Error("Invalid interaction data format");

      set({ interactions: data, loading: false });
    } catch (error) {
      console.error("Fetch error:", error);
      set({ error: "Failed to load interactions", loading: false });
    }
  },

  addInteraction: async (gnomeId, photoUrl) => {
    console.log("Photo captured:", photoUrl);
    const form = new FormData();
    const interactionDate = new Date().toISOString();
    form.append("file", {
      uri: photoUrl,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);
    form.append("interactionDate", interactionDate);
    form.append("gnomeId", gnomeId);

    const url = "api/rest/v1/gnomes/interaction";
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    await axiosInstance.post(url, form, { headers });
  },
}));
