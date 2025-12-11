import { Pressable, Text, View } from "react-native";
import CheckmarkIcon from "@/assets/icons/checkmark.svg";

export const Achievement = ({
  icon,
  title,
  onPress,
}: {
  icon?: React.ReactNode;
  title?: string;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      className="items-center text-center w-1/3 gap-1 p-1"
      onPress={onPress}
    >
      <View className="bg-[#2A2D2A] rounded-full items-center justify-center p-6">
        <CheckmarkIcon className="h-10 w-10" />
      </View>
      <Text className="w-full text-center">{title}</Text>
    </Pressable>
  );
};
