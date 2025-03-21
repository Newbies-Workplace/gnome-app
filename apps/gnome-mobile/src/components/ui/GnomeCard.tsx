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
}

export const GnomeCard: React.FC<GnomeCardProps> = ({
  image,
  text,
  onClick,
}) => {
  return (
    <TouchableOpacity onPress={onClick} className="items-center p-5">
      <Image className="w-30 h-30 rounded-md mb-2" source={image} />
      <Text className="w-20 h-7 text-center rounded px-1 text-white font-bold">
        {text}
      </Text>
    </TouchableOpacity>
  );
};
