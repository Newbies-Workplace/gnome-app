import { Portal } from "@rn-primitives/portal";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Krasnal from "@/assets/images/krasnal.svg";

const DistanceTracker = ({ distance }: { distance: number }) => {
  const { t } = useTranslation();

  return (
    <View>
      <View className="absolute bg-background border rounded-xl p-4 bottom-11 left-1/4 w-60">
        <Text className="text-tekst font-bold">
          {t("home.closestGnomeMeters", { distance })}
        </Text>
      </View>
      <Portal name="floating-gnome">
        <Krasnal
          style={{
            position: "absolute",
            bottom: 60,
            left: 40,
            width: 96,
            height: 96,
          }}
        />
      </Portal>
    </View>
  );
};

export default DistanceTracker;
