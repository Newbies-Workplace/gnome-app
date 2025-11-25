import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CameraIcon from "@/assets/icons/camera.svg";
import NoCameraIcon from "@/assets/icons/no-camera.svg";

const placeholder = require("@/assets/images/placeholder.png");

interface GnomeCardProps {
  image: string;
  text: string;
  onClick: () => void;
  interaction?: { found: boolean; imageUrl?: string; userPicture?: string };
}

export const GnomeCard: React.FC<GnomeCardProps> = ({
  image,
  text,
  onClick,
  interaction,
}) => {
  // Determine which icon to show
  const getIcon = () => {
    if (interaction?.found && interaction?.userPicture)
      return <CameraIcon width={20} height={20} />;
    if (interaction?.found && !interaction?.userPicture)
      return <NoCameraIcon width={20} height={20} />;
    return null;
  };

  const getImageSource = () => {
    if (interaction?.found && interaction?.userPicture)
      return { uri: interaction.userPicture };
    if (interaction?.found && !interaction?.userPicture) return { uri: image };
    return placeholder;
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      className="flex-1 flex-col items-center h-48 p-2"
    >
      <View className={"items-center w-full"}>
        <Image source={getImageSource()} className={"w-full h-40 rounded-xl"} />

        <View className="absolute top-1 left-1">{getIcon()}</View>
      </View>

      <Text
        className="text-center rounded px-1 text-tekst font-bold"
        numberOfLines={1}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
