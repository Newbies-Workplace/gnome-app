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

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "gray",
        },
        tabBarLabelStyle: {
          color: "white",
        },
        tabBarIconStyle: {
          color: "white",
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "white",
        tabBarPressColor: "red",
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Główna" }} />
      <Tabs.Screen name="collection" options={{ title: "Kolekcja" }} />
      <Tabs.Screen name="friends" options={{ headerShown: false }} />
      <Tabs.Screen name="gallery" options={{ title: "Galeria" }} />
    </Tabs>
  );
}
