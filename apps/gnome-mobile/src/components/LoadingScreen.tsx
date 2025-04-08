import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingScreen: React.FC = () => {
  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Text className="text-white font-bold mb-5">Ładowanie...</Text>
      <ActivityIndicator
        size="large"
        color="primary"
        className="color-primary"
      />
    </View>
  );
};

export default LoadingScreen;
