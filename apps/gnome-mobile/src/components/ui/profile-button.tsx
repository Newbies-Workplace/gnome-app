import { Text } from "@/components/ui/text";
import React from "react";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";

interface ProfileButtonProps {
  image: ImageSourcePropType | string;
  text: string;
  onClick: () => void;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  image,
  text,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className="rounded-lg bg-background mb-3 flex flex-row justify-start items-center px-3 py-2"
    >
      <Image
        source={typeof image === "string" ? { uri: image } : image}
        className="w-7 h-7 mr-2"
      />
      <Text className="text-white text-lg font-bold">{text}</Text>
    </TouchableOpacity>
  );
};

export const ProfileButtonLogout: React.FC<ProfileButtonProps> = ({
  image,
  text,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className="rounded-lg bg-background mb-3 flex flex-row justify-start items-center px-3 py-2"
    >
      <Image
        source={typeof image === "string" ? { uri: image } : image}
        className="w-7 h-7 mr-2"
      />
      <Text className="text-primary text-lg font-bold">{text}</Text>
    </TouchableOpacity>
  );
};
