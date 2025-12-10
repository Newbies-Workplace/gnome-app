import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, useWindowDimensions, View } from "react-native";

type DistanceTrackerProps = {
  distance: number;
};

const DistanceTracker: React.FC<DistanceTrackerProps> = ({ distance }) => {
  const { t } = useTranslation();

  const { width } = useWindowDimensions();
  const viewWidth = width * 0.6;

  return (
    <View className="flex-1">
      <View
        className="absolute bg-background border rounded-xl p-4 bottom-2 left-2/3"
        style={{
          width: viewWidth,
          transform: [{ translateX: -viewWidth / 2 }],
        }}
      >
        <Text className="text-lg text-tekst font-bold">
          {t("gnomeDistanceTracker.closestGnomeMeters", { distance })}
        </Text>
      </View>
      <View className="absolute left-6 bottom-[-35px]">
        <Image
          source={require("@/assets/images/krasnal.png")}
          className="w-24 h-24"
        />
      </View>
    </View>
  );
};

export default DistanceTracker;
