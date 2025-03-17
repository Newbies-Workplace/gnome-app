import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { replace } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function Index() {
  const [value, setValue] = useState("");
  const { logout, user } = useAuthStore();

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View className={"p-4 flex gap-2 justify-center items-center"}>
      <Text>Zalogowano jako: {user?.name}</Text>
      <Avatar alt="Your avatar">
        <AvatarImage source={{ uri: user?.pictureUrl }} />
        <AvatarFallback>
          <Text>You</Text>
        </AvatarFallback>
      </Avatar>
      <Input
        className={"w-full"}
        placeholder="Write some stuff..."
        value={value}
        onChangeText={onChangeText}
        aria-labelledby="inputLabel"
        aria-errormessage="inputError"
      />
      <Text>Zmienna: {process.env.EXPO_PUBLIC_API_URL}</Text>
      <Button onPress={logout}>
        <Text className={"text-white"}>Wyloguj</Text>
      </Button>
    </View>
  );
}
