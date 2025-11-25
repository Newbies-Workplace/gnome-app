import React from "react";
import { Image, Text, View } from "react-native";
import { Button } from "./button";

interface NoFriendsAlertProps {
  image: any;
  title: string;
  alert: string;
  description: string;
  onClick: () => void;
}

export const NoFriendsAlert: React.FC<NoFriendsAlertProps> = ({
  image,
  title,
  alert,
  description,
  onClick,
}) => {
  return (
    <View className="flex-1 items-center justify-center pt-28">
      <Image source={image} className="mb-6" resizeMode="contain" />
      <Text className="text-2xl font-bold text-center text-primary mb-4">
        {title}
      </Text>
      <Text className="text-lg text-center text-tekst mb-4">{alert}</Text>
      <Text className="text-lg text-center text-tekst">{description}</Text>
      <Button className="mt-8 px-6 py-3 rounded-xl" onPress={onClick}>
        <Text className="text-tekst font-bold text-lg text-center">
          Dodaj znajomego
        </Text>
      </Button>
    </View>
  );
};
