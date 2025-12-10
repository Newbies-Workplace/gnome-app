import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomSplash() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary-foreground">
      <Image
        source={require("@/assets/images/splash-icon.png")}
        className="w-52 h-52 mb-6"
      />
      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-4xl font-bold text-tekst">
          {t("common.appName")}
        </Text>
      </View>
    </SafeAreaView>
  );
}
