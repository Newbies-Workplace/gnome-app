import { Stack } from "expo-router";
import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function RootLayout() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <StatusBar style={"light"} />
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
