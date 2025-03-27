import { Text } from "@/components/ui/text";
import type React from "react";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";

interface ProfileButtonProps {
  image: React.ReactNode;
  text: string;
  onClick: () => void;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  image: Icon,
  text,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className="rounded-lg bg-background mb-3 flex flex-row justify-start items-center px-3 py-2"
    >
      {Icon}
      <Text className="text-white text-lg font-bold ml-3">{text}</Text>
    </TouchableOpacity>
  );
};

export const ProfileButtonLogout: React.FC<ProfileButtonProps> = ({
  image: Icon,
  text,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className="rounded-lg bg-background mb-3 flex flex-row justify-start items-center px-3 py-2"
    >
      {Icon}
      <Text className="text-primary text-lg font-bold ml-3">{text}</Text>
    </TouchableOpacity>
  );
};
