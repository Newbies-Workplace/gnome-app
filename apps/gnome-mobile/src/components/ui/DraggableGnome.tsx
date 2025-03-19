import React, { useRef, useState } from "react";
import { Alert, Image, PanResponder, View } from "react-native";

const DraggableGnome = () => {
  const trackWidth = 344;
  const trackHeight = 70;
  const gnomeWidth = 100;
  const gnomeHeight = 63;
  const startX = -trackWidth / 2 + gnomeWidth / 2;
  const endX = startX + trackWidth - gnomeWidth + 20;

  const [position, setPosition] = useState({ x: startX, y: 0 });

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.max(startX, Math.min(startX + gestureState.dx, endX));
        setPosition({ x: newX, y: 0 });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= endX - startX - 20) {
          Alert.alert("Unlocked!");
        }
        setPosition({ x: startX, y: 0 });
      },
    }),
  ).current;

  return (
    <View className="flex-1 justify-end items-center pb-10 mb-4">
      <Image
        source={require("@/assets/icons/dragger.png")}
        className="absolute w-[344px] h-[70px]"
      />
      <Image
        {...pan.panHandlers}
        source={require("@/assets/icons/mad-gnome.png")}
        className="absolute w-[100px] h-[63px]"
        style={{
          transform: [
            { translateX: position.x },
            { translateY: -trackHeight / 2 + gnomeHeight / 2 },
          ],
        }}
      />
    </View>
  );
};

export default DraggableGnome;
