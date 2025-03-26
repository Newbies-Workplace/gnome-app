import type React from "react";
import {
  Image,
  type ImageSourcePropType,
  Text,
  TouchableOpacity,
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
    <TouchableOpacity onPress={onClick} className="items-center p-5 flex-1">
      <Image className="rounded-md mb-2 aspect-[4/5]" source={image} />
      <Text className="flex-1 text-center rounded px-1 text-white font-bold w-full text-nowrap">
        {text}
      </Text>
    </TouchableOpacity>
  );
};
