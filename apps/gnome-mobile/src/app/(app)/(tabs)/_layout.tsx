import HomeTabs from "@/app/(app)/navigator/HomeTabs";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!accessToken) {
    return <Redirect href={"/welcome"} />;
  }

  return (
    <SafeAreaView edges={[]} className={"flex-1 bg-background"}>
      <HomeTabs />
    </SafeAreaView>
  );
}
