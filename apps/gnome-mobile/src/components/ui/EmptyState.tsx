import React from "react";
import { Text, View } from "react-native";
import { Button } from "./button";

interface EmptyStateProps {
  image: any;
  title: string;
  alert?: string;
  description?: string;
  buttonTitle?: string;
  onClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  image,
  title,
  alert,
  description,
  buttonTitle,
  onClick,
}) => {
  return (
    <View className="flex-1 items-center justify-center p-4">
      {image}
      <Text className="text-2xl font-bold text-center text-primary mb-4 mt-4">
        {title}
      </Text>
      <Text className="text-lg text-center text-tekst mb-4">{alert}</Text>
      <Text className="text-lg text-center text-tekst">{description}</Text>
      {buttonTitle && onClick && (
        <Button className="mt-8 px-6 py-3 rounded-xl" onPress={onClick}>
          <Text className="text-tekst font-bold text-lg text-center">
            {buttonTitle}
          </Text>
        </Button>
      )}
    </View>
  );
};
