import React from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";

interface DistanceTrackerProps {
  distance: number;
  showDistanceTracker: boolean;
}

const DistanceTracker = ({
  distance,
  showDistanceTracker,
}: DistanceTrackerProps) => {
  const { width } = useWindowDimensions();
  const trackWidth = width * 0.6;

  return (
    <View className="flex-1 justify-start items-start">
      {showDistanceTracker && (
        <View className="flex-row items-center">
          <Image
            source={require("@/assets/images/krasnal.png")}
            className="ml-2"
          />
          <View
            className={`w-[${trackWidth}px] ml-4 bg-background border rounded-xl p-2 justify-center self-end mb-6`}
          >
            <Text className="text-lg text-white font-bold font-Afacad">
              Najbliższy krasnal znajduje{" "}
            </Text>
            <Text className="text-lg text-white font-bold font-Afacad">
              się{" "}
              <Text className="text-lg text-primary font-bold font-Afacad">
                {distance}m
              </Text>{" "}
              od ciebie
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DistanceTracker;
