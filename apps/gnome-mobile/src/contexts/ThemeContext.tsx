import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { colorScheme } from "nativewind";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance } from "react-native";

interface ThemeProviderProps {
  children: React.ReactNode;
}

type ThemeOption = "light" | "dark" | "system";

type ThemeContextType = {
  theme: ThemeOption;
  isDark: boolean;
  toggleTheme: (theme: ThemeOption) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  isDark: Appearance.getColorScheme() === "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>("system");
  const systemColorScheme = Appearance.getColorScheme();

  const isDark = useMemo(() => {
    if (currentTheme === "system") {
      return systemColorScheme === "dark";
    }
    return currentTheme === "dark";
  }, [currentTheme, systemColorScheme]);

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
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        isDark,
        toggleTheme,
      }}
    >
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
