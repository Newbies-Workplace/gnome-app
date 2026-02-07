import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { changeLanguage } from "@/i18n";

interface LanguageSelectorProps {
  onDismiss: () => void;
}

const languages = ["pl", "en", "de", "ua", "kr"];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onDismiss,
}) => {
  const { t } = useTranslation();

  return (
    <BottomSheetView className="w-full px-6 py-6">
      {languages.map((lang) => (
        <View className="py-4 border-b border-tekst" key={lang}>
          <Text
            className="text-tekst text-xl font-bold"
            onPress={() => {
              changeLanguage(lang).then(() => {
                onDismiss();
              });
            }}
          >
            {t("settings.languageTitle", { lng: lang })}
          </Text>
        </View>
      ))}
    </BottomSheetView>
  );
};
