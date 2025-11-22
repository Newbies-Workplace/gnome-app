import { Text, View } from "react-native";

export const Divider = ({ title }: { title: string }) => {
  return (
    <View className="w-full flex-row items-center">
      <View className="flex-1 h-1 bg-primary rounded-full" />
      <Text className="px-2 text-tekst">{title}</Text>
      <View className="flex-1 h-1 bg-primary rounded-full" />
    </View>
  );
};
