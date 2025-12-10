import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

interface ThemeSelectorProps {
  colorScheme: { get?: () => "light" | "dark" };
  setColorScheme?: (value: "light" | "dark") => void;
  themeBottomSheetRef: React.RefObject<any>;
  setStatusBarStyle: (value: "light" | "dark") => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  colorScheme,
  setColorScheme,
  themeBottomSheetRef,
  setStatusBarStyle,
}) => {
  const { t } = useTranslation();
  const closeSheet = () => {
    themeBottomSheetRef.current?.close();
  };

  const options = {
    dark: t("settings.theme.dark"),
    light: t("settings.theme.light"),
  };

  return (
    <BottomSheetView className="w-full px-6 py-6">
      {Object.keys(options).map((key) => (
        <TouchableOpacity
          className="py-4 border-b border-tekst flex-row justify-between items-center"
          onPress={() => {
            setColorScheme?.(key as keyof typeof options);
            closeSheet();
            setStatusBarStyle(key === "dark" ? "light" : "dark");
          }}
        >
          <Text className="text-tekst text-xl font-bold">
            {options[key as keyof typeof options]}
          </Text>

          {colorScheme.get?.() === key && (
            <Text className="text-tekst text-xl">✓</Text>
          )}
        </TouchableOpacity>
      ))}
    </BottomSheetView>
  );
};

export default ThemeSelector;
