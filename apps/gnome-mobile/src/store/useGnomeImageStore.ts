import * as MediaLibrary from "expo-media-library";
import { create } from "zustand";

export interface GnomeImage {
  gnomeId: string;
  assetUri: string;
}

interface GnomeImageStore {
  images: GnomeImage[];
  setImageForGnome: (img: GnomeImage) => void;
  getImageForGnome: (gnomeId: string) => GnomeImage | undefined;
  loadImagesFromAlbum: () => Promise<void>;
}

export const useGnomeImageStore = create<GnomeImageStore>((set, get) => ({
  images: [],
  setImageForGnome: (img) =>
    set((state) => {
      const filtered = state.images.filter((i) => i.gnomeId !== img.gnomeId);
      return { images: [...filtered, img] };
    }),

  getImageForGnome: (gnomeId) =>
    get().images.find((i) => i.gnomeId === gnomeId),

  loadImagesFromAlbum: async () => {
    const album = await MediaLibrary.getAlbumAsync("GnomeCollection");
    if (!album) return;

    const { assets } = await MediaLibrary.getAssetsAsync({ album });
    const mapped = assets
      .map((asset) => {
        const match = asset.filename.match(/^gnome-(.*?)-/);
        const gnomeId = match?.[1];
        if (!gnomeId) return null;

        return {
          gnomeId,
          assetUri: asset.uri,
        };
      })
      .filter(Boolean);

    set({ images: mapped as GnomeImage[] });
  },
}));
