import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { changeLanguage } from "@/i18n";

interface LanguageSelectorProps {
  onDismiss: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onDismiss,
}) => {
  const { t } = useTranslation();

  const options = [
    { code: "pl", label: "Polski" },
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "ua", label: "Українська" },
    { code: "kr", label: "한국어" },
  ];

  return (
    <BottomSheetView className="w-full px-6 py-6">
      {options.map((option) => (
        <View className="py-4 border-b border-tekst" key={option.code}>
          <Text
            className="text-tekst text-xl font-bold"
            onPress={() => {
              changeLanguage(option.code).then(() => {
                onDismiss();
              });
            }}
          >
            {option.label}
          </Text>
        </View>
      ))}
    </BottomSheetView>
  );
};
