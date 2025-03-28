import { Stack } from "expo-router";
import "../global.css";
import { useAuthStore } from "@/store/useAuthStore";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar"; // Import StatusBar
import React, { useEffect } from "react";

export default function RootLayout() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {/* Hide StatusBar to enable full-screen mode */}
      <StatusBar hidden={false} translucent={false} />
      <Stack
        screenOptions={{
          // Hide the header for this route
          headerShown: false,
        }}
      />

      <PortalHost />
    </>
  );
}
