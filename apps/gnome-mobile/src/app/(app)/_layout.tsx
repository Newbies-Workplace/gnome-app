import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuthStore();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (!accessToken) {
    return <Redirect href={"/welcome"} />;
  }

  return <Tabs />;
}
