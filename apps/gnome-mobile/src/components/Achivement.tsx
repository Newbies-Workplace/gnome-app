import { Text, View } from "react-native";
import CheckmarkIcon from "@/assets/icons/checkmark.svg";

export const Achievement = ({
  icon,
  title = "?",
}: {
  icon?: React.ReactNode;
  title: string;
}) => {
  return (
    <View className="items-center text-center max-w-[100px] gap-1">
      <View className="bg-[#2A2D2A] rounded-full items-center justify-center p-6">
        <CheckmarkIcon className="h-10 w-10" />
      </View>
      <Text className="w-full text-center">{title}</Text>
    </View>
  );
};
