import type React from "react";
import { TouchableOpacity, View } from "react-native";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import { Text } from "@/components/ui/text";

interface SettingsOptionProps {
  text: string;
  image: React.FC<React.SVGProps>;
  onClick: () => void;
  extraText?: string;
  customClass?: string;
}

export const SettingsOption: React.FC<SettingsOptionProps> = ({
  text,
  image: Icon,
  onClick,
  extraText,
  customClass = "mb-4", // Domyślnie mały margines, ale można go nadpisać
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className={`rounded-lg bg-background flex flex-row justify-between items-center px-4 py-3 ${customClass}`}
    >
      {/* Lewa strona: Ikona + Tekst */}
      <View className="flex flex-row items-center">
        <Icon width={28} height={28} className="mr-3" />
        <Text className="text-tekst text-lg ml-4 font-bold">{text}</Text>
      </View>

      {/* Prawa strona: Dodatkowy tekst + Strzałka */}
      <View className="flex flex-row items-center">
        {extraText && (
          <Text className="text-gray-400 text-lg mr-3">{extraText}</Text>
        )}
        <ArrowRight width={24} height={24} />
      </View>
    </TouchableOpacity>
  );
};
