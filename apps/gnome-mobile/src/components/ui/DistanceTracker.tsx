import React from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";

type DistanceTrackerProps = {
  distance: number;
};

const DistanceTracker: React.FC<DistanceTrackerProps> = ({ distance }) => {
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
        <Text className="text-lg text-white font-bold">
          Najbliższy krasnal znajduje{" "}
        </Text>
        <Text className="text-lg text-white font-bold">
          się{" "}
          <Text className="text-lg text-primary font-bold">{distance}m</Text> od
          ciebie
        </Text>
      </View>
      <View className="absolute left-6 bottom-[-35px]">
        <Image
          source={require("@/assets/images/krasnal.png")}
          className="w-24 h-24" // 100x100 image
        />
      </View>
    </View>
  );
};

export default DistanceTracker;
