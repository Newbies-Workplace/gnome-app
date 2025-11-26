import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface GnomeImage {
  gnomeId: string;
  assetUri: string;
}

interface GnomeImageStore {
  images: GnomeImage[];

  setImageForGnome: (img: GnomeImage) => void;
  getImageForGnome: (gnomeId: string) => GnomeImage | undefined;
}

export const useGnomeImageStore = create<GnomeImageStore>()(
  persist(
    (set, get) => ({
      images: [],

      setImageForGnome: (img) =>
        set((state) => {
          const filtered = state.images.filter(
            (i) => i.gnomeId !== img.gnomeId,
          );
          return { images: [...filtered, img] };
        }),

      getImageForGnome: (gnomeId) =>
        get().images.find((i) => i.gnomeId === gnomeId),
    }),
    {
      name: "gnomes-images-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
