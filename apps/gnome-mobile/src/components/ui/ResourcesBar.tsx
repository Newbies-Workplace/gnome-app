import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BerryIcon from "@/assets/icons/berry-icon.svg";
import StoneIcon from "@/assets/icons/stone-icon.svg";
import WoodIcon from "@/assets/icons/wood-icon.svg";

interface ResourcesBarProps {
  berries: number;
  stones: number;
  sticks: number;
  onClick: () => void;
}

const ResourcesBar: React.FC<ResourcesBarProps> = ({
  berries,
  stones,
  sticks,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className="w-52 flex-row justify-around items-center px-2 py-2 bg-background rounded-full"
    >
      <View className="flex-row items-center">
        <BerryIcon height={16} width={16} />
        <Text className="text-tekst font-bold">{berries}</Text>
      </View>
      <View className="flex-row items-center">
        <StoneIcon height={16} width={16} />
        <Text className="text-tekst font-bold">{stones}</Text>
      </View>
      <View className="flex-row items-center">
        <WoodIcon height={16} width={16} />
        <Text className="text-tekst font-bold">{sticks}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ResourcesBar;
