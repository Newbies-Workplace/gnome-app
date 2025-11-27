import { Stack } from "expo-router";
import "../global.css";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Svg, { Circle, Rect } from "react-native-svg";
import { useAuthStore } from "@/store/useAuthStore";

export default function RootLayout() {
  const { init } = useAuthStore();

  const sheetInteropConfig = {
    backgroundClassName: { target: "backgroundStyle" },
    handleIndicatorClassName: { target: "handleIndicatorStyle" },
  };

  [BottomSheet, BottomSheetModal].forEach((Component) => {
    cssInterop(Component, sheetInteropConfig);
  });

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
        strokeWidth: true,
        fill: true,
      },
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
