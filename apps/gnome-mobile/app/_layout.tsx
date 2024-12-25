import {Stack} from "expo-router";
import "../global.css";
import React, {useEffect} from "react";
import {PortalHost} from '@rn-primitives/portal';
import {useAuthStore} from "@/store/useAuthStore";

export default function RootLayout() {
  const {init} = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Stack />
      <PortalHost />
    </>
  );
}
