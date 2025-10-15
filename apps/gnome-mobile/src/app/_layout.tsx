import { Stack } from "expo-router";
import "../global.css";
import { useAuthStore } from "@/store/useAuthStore";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <GestureHandlerRootView>
      <StatusBar style={"light"} />
      <Stack
        screenOptions={{
          // Hide the header for this route
          headerShown: false,
        }}
      />
      <PortalHost />
    </GestureHandlerRootView>
  );
}
