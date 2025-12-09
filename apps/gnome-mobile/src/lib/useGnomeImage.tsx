import { ImageSourcePropType } from "react-native";
import { useGnomeImageStore } from "@/store/useGnomeImageStore";
import { useGnomeStore } from "@/store/useGnomeStore";

const placeholder = require("@/assets/images/placeholder.png");

export const useGnomeImage = (gnomeId: string): ImageSourcePropType => {
  const gnome = useGnomeStore((state) =>
    state.gnomes.find((g) => g.id === gnomeId),
  );
  const { getImageForGnome } = useGnomeImageStore();

  const imageFromStore = getImageForGnome(gnomeId);
  if (imageFromStore) {
    // todo nie działa :/
    return { uri: imageFromStore.assetUri };
  }

  if (gnome?.pictureUrl) {
    return { uri: gnome.pictureUrl };
  }

  return placeholder;
};
