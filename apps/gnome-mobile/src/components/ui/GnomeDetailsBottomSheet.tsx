import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import GnomeDetailsFullScreenIcon from "@/assets/icons/FullscreenButton.svg";
import GnomeCaughtCountIcon from "@/assets/icons/GnomeCaughtCount.svg";
import GnomeHowFarAwayIcon from "@/assets/icons/GnomeHowFarAway.svg";
import GnomeLocationIcon from "@/assets/icons/GnomeLocation.svg";

interface GnomeDetailsBottomSheetProps {
  selectedGnome: {
    id: string;
    name: string;
    location: string;
    pictureUrl: string;
  } | null;

  formattedDistance?: string | null;
  interactions: { gnomeId: string }[];
  ref: any;
  onClick: any;
}

export const GnomeDetailsBottomSheet: React.FC<
  GnomeDetailsBottomSheetProps
> = ({ selectedGnome, formattedDistance, interactions, ref, onClick }) => {
  const placeholder = require("@/assets/images/placeholder.png");

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      pressBehavior="close"
      appearsOnIndex={0}
      disappearsOnIndex={-1}
    />
  );

  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      backgroundClassName="bg-background"
      handleIndicatorClassName="bg-tekst w-20 mt-2 rounded-lg"
      backdropComponent={renderBackdrop}
      index={-1}
    >
      <BottomSheetView className="p-5 rounded-t-2xl relative">
        <View className="flex-row items-start space-x-4">
          <Image
            source={
              selectedGnome?.pictureUrl
                ? { uri: selectedGnome?.pictureUrl }
                : placeholder
            }
            className="rounded-lg"
          />

          {/* Teksty po prawej */}
          <View className="flex-1 space-y-2 ml-3">
            <View className="flex-row justify-between items-start">
              <Text className="text-2xl font-semibold text-tekst">
                {selectedGnome?.name}
              </Text>

              <TouchableOpacity onPress={onClick}>
                <GnomeDetailsFullScreenIcon />
              </TouchableOpacity>
            </View>

            <View className="space-y-1">
              <View className="flex-row items-center">
                <GnomeLocationIcon />
                <Text className="ml-2 text-base text-tekst">
                  {selectedGnome?.location}
                </Text>
              </View>

              <View className="flex-row items-center">
                <GnomeHowFarAwayIcon />
                <Text className="ml-2 text-base text-tekst">
                  {formattedDistance ?? "Brak danych"}
                </Text>
              </View>

              <View className="flex-row items-center">
                <GnomeCaughtCountIcon />
                <Text className="ml-2 text-base text-tekst">
                  {
                    interactions.filter((i) => i.gnomeId === selectedGnome?.id)
                      .length
                  }{" "}
                  osób
                </Text>
              </View>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
