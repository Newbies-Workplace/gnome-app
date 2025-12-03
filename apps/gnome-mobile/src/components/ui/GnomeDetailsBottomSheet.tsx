import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import GnomeDetailsFullScreenIcon from "@/assets/icons/FullscreenButton.svg";
import GnomeCaughtCountIcon from "@/assets/icons/GnomeCaughtCount.svg";
import GnomeHowFarAwayIcon from "@/assets/icons/GnomeHowFarAway.svg";
import GnomeLocationIcon from "@/assets/icons/GnomeLocation.svg";

interface Props {
  selectedGnome: {
    id: string;
    name: string;
    location: string;
  } | null;

  formattedDistance?: string | null;

  interactions: { gnomeId: string }[];

  ref: any;
}

export const GnomeDetailsBottomSheet: React.FC<Props> = ({
  selectedGnome,
  formattedDistance,
  interactions,
  ref,
}) => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      backgroundClassName="bg-background"
      handleIndicatorClassName="bg-tekst w-20 mt-2 rounded-lg"
      index={-1}
    >
      <BottomSheetView className="p-5 rounded-t-2xl relative">
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current?.close();
            router.push(`/gnomes/${selectedGnome?.id}`);
          }}
        >
          <GnomeDetailsFullScreenIcon className="absolute top-3 right-3" />
        </TouchableOpacity>

        <View className="mb-5">
          <Text className="text-2xl font-semibold text-tekst">
            {selectedGnome?.name}
          </Text>
        </View>

        <View className="space-y-4">
          <View className="flex-row items-center">
            <GnomeLocationIcon />
            <Text className="ml-3 text-base text-tekst">
              {selectedGnome?.location}
            </Text>
          </View>

          <View className="flex-row items-center">
            <GnomeHowFarAwayIcon />
            <Text className="ml-3 text-base text-tekst">
              {formattedDistance ?? "Brak danych"}
            </Text>
          </View>

          <View className="flex-row items-center">
            <GnomeCaughtCountIcon />
            <Text className="ml-3 text-base text-tekst">
              {
                interactions.filter((i) => i.gnomeId === selectedGnome?.id)
                  .length
              }{" "}
              osób
            </Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
