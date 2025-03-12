import { Stack } from "expo-router";
import "../global.css";
import { useAuthStore } from "@/store/useAuthStore";
import { PortalHost } from "@rn-primitives/portal";
import React, { useEffect } from "react";

export default function RootLayout() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <>
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
