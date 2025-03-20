import HomeTabs from "@/app/(app)/navigator/HomeTabs";
import { useAuthStore } from "@/store/useAuthStore";
import { NavigationContainer } from "@react-navigation/native";
import { Redirect } from "expo-router";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuthStore();

  if (isLoading) {
    return <Text>Loading</Text>;
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
