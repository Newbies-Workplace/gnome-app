import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View className="bg-primary-foreground flex-1 items-center justify-center">
      <Text className="text-tekst font-bold mb-5">{t("common.loading")}</Text>
      <ActivityIndicator
        size="large"
        color="primary"
        className="color-primary"
      />
    </View>
  );
};

export default LoadingScreen;
