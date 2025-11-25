import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
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
  const closeSheet = () => {
    themeBottomSheetRef.current?.close();
  };

  return (
    <BottomSheetView className="w-full px-6 py-6">
      {/* DARK */}
      <TouchableOpacity
        className="py-4 border-b border-tekst flex-row justify-between items-center"
        onPress={() => {
          setColorScheme?.("dark");
          closeSheet();
          setStatusBarStyle("light");
        }}
      >
        <Text className="text-tekst text-xl font-bold">Ciemny</Text>
        {colorScheme.get?.() === "dark" && (
          <Text className="text-tekst text-xl">✓</Text>
        )}
      </TouchableOpacity>

      {/* LIGHT */}
      <TouchableOpacity
        className="py-4 flex-row justify-between items-center"
        onPress={() => {
          setColorScheme?.("light");
          closeSheet();
          setStatusBarStyle("dark");
        }}
      >
        <Text className="text-tekst text-xl font-bold">Jasny</Text>
        {colorScheme.get?.() === "light" && (
          <Text className="text-tekst text-xl">✓</Text>
        )}
      </TouchableOpacity>
    </BottomSheetView>
  );
};

export default ThemeSelector;
