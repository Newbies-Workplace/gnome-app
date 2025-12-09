import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomSplash() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary-foreground">
      <Image
        source={require("@/assets/images/splash-icon.png")}
        className="w-52 h-52 mb-6"
      />
      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-4xl font-bold text-tekst">Krasnal</Text>
        <Text className="text-4xl font-bold text-primary">GO</Text>
      </View>
    </SafeAreaView>
  );
}
