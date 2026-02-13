import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { getDistance } from "geolib";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { LatLng } from "react-native-maps/lib/sharedTypes";
import GnomeDetailsFullScreenIcon from "@/assets/icons/FullscreenButton.svg";
import GnomeCaughtCountIcon from "@/assets/icons/GnomeCaughtCount.svg";
import GnomeHowFarAwayIcon from "@/assets/icons/GnomeHowFarAway.svg";
import GnomeLocationIcon from "@/assets/icons/GnomeLocation.svg";
import { GnomeImage } from "@/components/GnomeImage";
import { formatDistance } from "@/lib/distanceUtils";
import { useGnomeStore } from "@/store/useGnomeStore";

interface GnomeDetailsBottomSheetProps {
  gnomeId: string;
  userLocation: LatLng | undefined;
}

export const GnomeDetailsBottomSheet: React.FC<
  GnomeDetailsBottomSheetProps
> = ({ gnomeId, userLocation }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { interactionCount, fetchInteractionCount } = useGnomeStore();
  const gnome = useGnomeStore((state) =>
    state.gnomes.find((gnome) => gnome.id === gnomeId),
  );

  useEffect(() => {
    fetchInteractionCount(gnomeId);
  }, [gnomeId]);

  const handleOpenGnomeDetails = () => {
    router.push(`/gnomes/${gnomeId}`);
  };

  const selectedGnomeDistance =
    gnome && userLocation
      ? getDistance(
          {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          {
            latitude: gnome.latitude,
            longitude: gnome.longitude,
          },
        )
      : null;

  const formattedDistance =
    selectedGnomeDistance !== null
      ? formatDistance(selectedGnomeDistance)
      : null;

  return (
    <BottomSheetView className="p-5 rounded-t-2xl relative z-10">
      <View className="flex-row items-start space-x-4">
        <GnomeImage gnomeId={gnomeId} className="w-28 h-32 rounded-xl" />

        <View className="flex-1 space-y-2 ml-3">
          <View className="flex-row justify-between items-start">
            <Text className="text-2xl font-semibold text-tekst">
              {gnome?.name}
            </Text>

            <TouchableOpacity onPress={handleOpenGnomeDetails}>
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
  );
};
