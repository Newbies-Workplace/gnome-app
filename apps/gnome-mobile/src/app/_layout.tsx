import { Stack } from "expo-router";
import "../global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "@/store/useAuthStore";

export default function RootLayout() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <StatusBar style={"light"} />
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
