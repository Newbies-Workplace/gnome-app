import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "@/i18n";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { setupCssInterop } from "@/lib/cssInterop";

SplashScreen.setOptions({
  duration: 800,
  fade: true,
});

setupCssInterop();

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <PortalHost />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
