import React from "react";
import { Text, View } from "react-native";
import { Button } from "./button";

interface EmptyStateProps {
  image: any;
  title: string;
  alert: string;
  description: string;
  ButtonTitle: string;
  onClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  image,
  title,
  alert,
  description,
  ButtonTitle,
  onClick,
}) => {
  return (
    <View className="flex-1 items-center justify-center">
      {image}
      <Text className="text-2xl font-bold text-center text-primary mb-4 mt-4">
        {title}
      </Text>
      <Text className="text-lg text-center text-tekst mb-4">{alert}</Text>
      <Text className="text-lg text-center text-tekst">{description}</Text>
      <Button className="mt-8 px-6 py-3 rounded-xl" onPress={onClick}>
        <Text className="text-tekst font-bold text-lg text-center">
          {ButtonTitle}
        </Text>
      </Button>
    </View>
  );
};
