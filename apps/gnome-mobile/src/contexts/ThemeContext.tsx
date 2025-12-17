import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { colorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

type ThemeOption = "light" | "dark" | "system";

type ThemeContextType = {
  theme: ThemeOption;
  toggleTheme: (theme: ThemeOption) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>("system");

  useEffect(() => {
    (async () => {
      const storedTheme = await getStoredTheme();
      if (storedTheme) {
        setCurrentTheme(storedTheme);
        colorScheme.set(storedTheme);
      }
    })();
  }, []);

  const toggleTheme = async (theme: ThemeOption) => {
    setCurrentTheme(theme);
    colorScheme.set(theme);
    await setStoredTheme(theme);
  };

  const statusBarStyle =
    currentTheme === "dark"
      ? "light"
      : currentTheme === "light"
        ? "dark"
        : "auto";

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <StatusBar style={statusBarStyle} />

      {children}
    </ThemeContext.Provider>
  );
};

const getStoredTheme = async (): Promise<ThemeOption | null> => {
  const storedTheme = await AsyncStorage.getItem("theme");

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return "system";
};

const setStoredTheme = async (theme: ThemeOption): Promise<void> => {
  await AsyncStorage.setItem("theme", theme);
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
