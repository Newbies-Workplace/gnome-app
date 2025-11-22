import { Stack } from "expo-router";
import "../global.css";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "@/store/useAuthStore";

export default function RootLayout() {
  const { init } = useAuthStore();

  cssInterop(BottomSheet, {
    backgroundClassName: {
      target: "backgroundStyle",
    },
    handleIndicatorClassName: {
      target: "handleIndicatorStyle",
    },
  });

  useEffect(() => {
    init();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <StatusBar />
        <Stack
          screenOptions={{
            // Hide the header for this route
            headerShown: false,
          }}
        />
        <PortalHost />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
