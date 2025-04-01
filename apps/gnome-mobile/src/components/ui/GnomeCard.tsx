import CameraIcon from "@/assets/icons/camera.svg";
import Locked from "@/assets/icons/locked.svg";
import NoCameraIcon from "@/assets/icons/no-camera.svg";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface GnomeCardProps {
  image: ImageSourcePropType;
  text: string;
  onClick: () => void;
  interaction?: { found: boolean; imageUrl?: string };
}

export const GnomeCard: React.FC<GnomeCardProps> = ({
  image,
  text,
  onClick,
  interaction = { found: false, imageUrl: "" },
}) => {
  // Determine which icon to show
  const getIcon = () => {
    if (interaction?.found && interaction?.imageUrl)
      return <CameraIcon width={20} height={20} />;
    if (interaction?.found && !interaction?.imageUrl)
      return <NoCameraIcon width={20} height={20} />;
    return <Locked width={20} height={20} />;
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      className="relative items-center p-5 flex-1"
    >
      <View className="relative">
        <Image
          className={`rounded-md mb-2 aspect-[4/5] ${
            interaction?.found && !interaction?.imageUrl ? "opacity-50" : ""
          }`}
          source={image}
        />
        {/* Top Right Icon */}
        <View className="absolute top-1 left-1">{getIcon()}</View>
      </View>

      <Text className="flex-1 text-center rounded px-1 text-white font-bold w-full text-nowrap">
        {text}
      </Text>
    </TouchableOpacity>
  );
};
