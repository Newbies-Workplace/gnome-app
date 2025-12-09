import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import GnomeDetailsFullScreenIcon from "@/assets/icons/FullscreenButton.svg";
import GnomeCaughtCountIcon from "@/assets/icons/GnomeCaughtCount.svg";
import GnomeHowFarAwayIcon from "@/assets/icons/GnomeHowFarAway.svg";
import GnomeLocationIcon from "@/assets/icons/GnomeLocation.svg";
import { useGnomeImage } from "@/lib/useGnomeImage";
import { useGnomeInteractionStore } from "@/store/useGnomeInteractionStore";

interface GnomeDetailsBottomSheetProps {
  selectedGnome: {
    id: string;
    name: string;
    location: string;
    pictureUrl: string;
  };
  formattedDistance?: string | null;
  onClose?: () => void;
  onClick: () => void;
}

export const GnomeDetailsBottomSheet: React.FC<
  GnomeDetailsBottomSheetProps
> = ({ selectedGnome, formattedDistance, onClose, onClick }) => {
  const { interactionCount, fetchInteractionCount } =
    useGnomeInteractionStore();
  const gnomeImage = useGnomeImage(selectedGnome?.id);

  useEffect(() => {
    if (selectedGnome) {
      fetchInteractionCount(selectedGnome.id);
    }
  }, [selectedGnome]);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );

  return (
    <BottomSheet
      backgroundClassName="bg-background"
      handleIndicatorClassName="bg-tekst w-20 mt-2 rounded-lg"
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onClose={onClose}
    >
      <BottomSheetView className="p-5 rounded-t-2xl relative z-10">
        <View className="flex-row items-start space-x-4">
          <Image
            source={gnomeImage}
            className="rounded-lg w-24 h-32 object-cover"
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
                <GnomeLocationIcon className="text-tekst" />
                <Text className="ml-2 text-base text-tekst">
                  {selectedGnome?.location}
                </Text>
              </View>

              <View className="flex-row items-center">
                <GnomeHowFarAwayIcon className="text-tekst" />
                <Text className="ml-2 text-base text-tekst">
                  {formattedDistance ?? "Brak danych"}
                </Text>
              </View>

              <View className="flex-row items-center">
                <GnomeCaughtCountIcon className="text-tekst" />
                <Text className="ml-2 text-base text-tekst">
                  {selectedGnome
                    ? (interactionCount[selectedGnome.id] ?? 0)
                    : 0}{" "}
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
