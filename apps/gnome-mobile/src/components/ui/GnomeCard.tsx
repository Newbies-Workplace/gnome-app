import CameraIcon from "@/assets/icons/camera.svg";
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
      return <Image source={{ uri: interaction.userPicture }} />;
    if (interaction?.found && !interaction?.userPicture)
      return <Image source={{ uri: gnome.pictureUrl }} />;
    return <Image source={require("@/assets/images/placeholder.png")} />;
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      className="relative items-center p-5 flex-1"
    >
      <View className="relative">
        {getImageSource()}
        <View className="absolute top-1 left-1">{getIcon()}</View>
      </View>

      <Text className="flex-1 text-center rounded px-1 text-white font-bold w-full text-nowrap">
        {text}
      </Text>
    </TouchableOpacity>
  );
};
