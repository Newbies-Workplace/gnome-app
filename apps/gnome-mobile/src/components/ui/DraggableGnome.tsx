import React, { useRef, useState } from "react";
import { Image, PanResponder, View, useWindowDimensions } from "react-native";

const DraggableGnome = ({ onUnlock }) => {
  const { width } = useWindowDimensions();
  const trackWidth = width * 0.9;
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
          if (onUnlock) onUnlock();
        }
        setPosition({ x: startX, y: 0 });
      },
    }),
  ).current;

  return (
    <View className="flex-1 justify-end items-center pb-10">
      <View
        className="flex-row items-center bg-background rounded-full relative"
        style={{ width: trackWidth, height: trackHeight }}
      >
        <Image
          source={require("@/assets/icons/middle_dragger.png")}
          className="absolute"
          style={{
            width: 232,
            height: 11,
            left: trackWidth / 2 - 116,
            top: trackHeight / 2 - 5.5,
          }}
        />
        <Image
          source={require("@/assets/icons/lock.png")}
          className="absolute w-[50px] h-[50px]"
          style={{ right: 10 }}
        />
      </View>
      <Image
        {...pan.panHandlers}
        source={require("@/assets/icons/mad-gnome.png")}
        className="absolute w-[100px] h-[63px]"
        style={{
          transform: [
            { translateX: position.x },
            { translateY: -gnomeHeight / 2 - 6 },
          ],
        }}
      />
    </View>
  );
};

export default DraggableGnome;
