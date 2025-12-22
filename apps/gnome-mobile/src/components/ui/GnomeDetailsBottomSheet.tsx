import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { getDistance } from "geolib";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import GnomeDetailsFullScreenIcon from "@/assets/icons/FullscreenButton.svg";
import GnomeCaughtCountIcon from "@/assets/icons/GnomeCaughtCount.svg";
import GnomeHowFarAwayIcon from "@/assets/icons/GnomeHowFarAway.svg";
import GnomeLocationIcon from "@/assets/icons/GnomeLocation.svg";
import { GnomeImage } from "@/components/GnomeImage";
import { useGnomeInteractionStore } from "@/store/useGnomeInteractionStore";
import { useGnomeStore } from "@/store/useGnomeStore";

interface GnomeDetailsBottomSheetProps {
  gnomeId: string;
  userLocation: { latitude: number; longitude: number };
  onClose?: () => void;
  onClick: () => void;
}

export const GnomeDetailsBottomSheet: React.FC<
  GnomeDetailsBottomSheetProps
> = ({ gnomeId, userLocation, onClose, onClick }) => {
  const { t } = useTranslation();
  const gnome = useGnomeStore((state) =>
    state.gnomes.find((gnome) => gnome.id === gnomeId),
  );

  const { interactionCount, fetchInteractionCount } =
    useGnomeInteractionStore();

  useEffect(() => {
    if (gnome) {
      fetchInteractionCount(gnome.id);
    }
  }, [gnome]);

  const selectedGnomeDistance = gnome
    ? getDistance(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        {
          latitude: gnome.latitude,
          longitude: gnome.longitude,
        },
      )
    : null;

  const formattedDistance =
    selectedGnomeDistance !== null
      ? selectedGnomeDistance < 1000
        ? `${selectedGnomeDistance} m`
        : `${(selectedGnomeDistance / 1000).toFixed(2)} km`
      : null;

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
          <GnomeImage gnomeId={gnomeId} className="w-28 h-32 rounded-xl" />

          <View className="flex-1 space-y-2 ml-3">
            <View className="flex-row justify-between items-start">
              <Text className="text-2xl font-semibold text-tekst">
                {gnome?.name}
              </Text>

              <TouchableOpacity onPress={onClick}>
                <GnomeDetailsFullScreenIcon />
              </TouchableOpacity>
            </View>

            <View className="space-y-1">
              <View className="flex-row items-center">
                <GnomeLocationIcon className="text-tekst" />
                <Text className="ml-2 text-base text-tekst">
                  {gnome?.location}
                </Text>
              </View>

              {!!formattedDistance && (
                <View className="flex-row items-center">
                  <GnomeHowFarAwayIcon className="text-tekst" />
                  <Text className="ml-2 text-base text-tekst">
                    {formattedDistance}
                  </Text>
                </View>
              )}

              <View className="flex-row items-center">
                <GnomeCaughtCountIcon className="text-tekst" />
                <Text className="ml-2 text-base text-tekst">
                  {gnome ? (interactionCount[gnome.id] ?? 0) : 0}{" "}
                  {t("gnomeDetails.users")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
