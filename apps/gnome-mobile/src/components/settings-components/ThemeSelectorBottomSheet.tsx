import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeSelectorBottomSheetProps {
  onDismiss?: () => void;
}

const ThemeSelectorBottomSheet: React.FC<ThemeSelectorBottomSheetProps> = ({
  onDismiss,
}) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const options = {
    dark: t("settings.theme.dark"),
    light: t("settings.theme.light"),
    system: t("settings.theme.system"),
  };

  return (
    <BottomSheetView className="w-full px-6 py-6">
      {Object.keys(options).map((key) => (
        <TouchableOpacity
          key={key}
          className="py-4 border-b border-tekst flex-row justify-between items-center"
          onPress={() => {
            toggleTheme(key as "dark" | "light" | "system");

            onDismiss?.();
          }}
        >
          <Text className="text-tekst text-xl font-bold">
            {options[key as keyof typeof options]}
          </Text>

          {theme === key && <Text className="text-tekst text-xl">✓</Text>}
        </TouchableOpacity>
      ))}
    </BottomSheetView>
  );
};

export default ThemeSelectorBottomSheet;
