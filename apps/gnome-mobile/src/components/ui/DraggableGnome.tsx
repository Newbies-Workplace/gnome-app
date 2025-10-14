import DraggerIcon from "@/assets/icons/dragger.svg";
import LockIcon from "@/assets/icons/lock.svg";
import MadGnomeIcon from "@/assets/icons/mad-gnome.svg";
import React, { useRef, useState } from "react";
import { PanResponder, View, useWindowDimensions } from "react-native";

type DraggableGnomeProps = {
  onUnlock: () => void;
};

const DraggableGnome: React.FC<DraggableGnomeProps> = ({ onUnlock }) => {
  const { width } = useWindowDimensions();
  const trackWidth = width * 0.9;
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
      <View className="flex-row items-center bg-background rounded-full relative h-[70px] w-full">
        <DraggerIcon
          style={{
            width: 232,
            height: 11,
            left: trackWidth / 2 - 116,
          }}
        />
        <View className="absolute right-[10px]">
          <LockIcon width={40} height={40} />
        </View>
      </View>

      <View
        {...pan.panHandlers}
        className="absolute w-[100px] h-[63px]"
        style={{
          transform: [
            { translateX: position.x },
            { translateY: -gnomeHeight / 2 - 6 },
          ],
        }}
      >
        <MadGnomeIcon />
      </View>
    </View>
  );
};

export default DraggableGnome;
