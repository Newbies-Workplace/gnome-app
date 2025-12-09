import { useColorScheme as useNativewindColorScheme, vars } from "nativewind";

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  const scheme = colorScheme ?? "dark";

  return {
    colorScheme: scheme,
    isDarkColorScheme: scheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
