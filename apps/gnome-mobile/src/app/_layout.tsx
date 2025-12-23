import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "@/store/useAuthStore";
import CustomSplash from "./splashscreen";
import "@/i18n";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { setupCssInterop } from "@/lib/cssInterop";

SplashScreen.setOptions({
  duration: 800,
  fade: true,
});
SplashScreen.preventAutoHideAsync();

setupCssInterop();

export default function RootLayout() {
  const [isReady, setisReady] = useState(false);
  const { init } = useAuthStore();

  useEffect(() => {
    async function initializeApp() {
      try {
        await init();
      } catch (e) {
        console.warn(e);
      } finally {
        setisReady(true);
      }
    }

    initializeApp();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return <CustomSplash />;
  }

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
