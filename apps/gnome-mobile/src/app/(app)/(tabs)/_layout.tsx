import HomeTabs from "@/app/(app)/navigator/HomeTabs";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!accessToken) {
    return <Redirect href={"/welcome"} />;
  }

  return (
    <>
      <HomeTabs />
      <StatusBar style="auto" />
    </>
  );
}
