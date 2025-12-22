import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { cssInterop } from "nativewind";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Svg, { Circle, Rect, Text as SvgText } from "react-native-svg";
import { useAuthStore } from "@/store/useAuthStore";
import CustomSplash from "./splashscreen";
import "@/i18n";
import { ThemeProvider } from "@/contexts/ThemeContext";

SplashScreen.setOptions({
  duration: 800,
  fade: true,
});
SplashScreen.preventAutoHideAsync();

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

  const sheetInteropConfig = {
    backgroundClassName: { target: "backgroundStyle" },
    handleIndicatorClassName: { target: "handleIndicatorStyle" },
  };

  for (const Component of [BottomSheet, BottomSheetModal]) {
    cssInterop(Component, sheetInteropConfig);
  }

  cssInterop(Svg, {
    className: {
      target: "style",
      nativeStyleToProp: { width: true, height: true },
    },
  });
  cssInterop(Circle, {
    className: {
      target: "style",
      nativeStyleToProp: {
        width: true,
        height: true,
        stroke: true,
        strokeWidth: true,
        fill: true,
      },
    },
  });
  cssInterop(Rect, {
    className: {
      target: "style",
      nativeStyleToProp: {
        width: true,
        height: true,
        stroke: true,
        borderRadius: true,
        strokeWidth: true,
        fill: true,
      },
    },
  });
  cssInterop(SvgText, {
    className: {
      target: "style",
      nativeStyleToProp: {
        stroke: true,
        fill: true,
      },
    },
  });

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
