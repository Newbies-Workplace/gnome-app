import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { replace } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [value, setValue] = useState("");
  const { replace } = useRouter();
  const { logout, user } = useAuthStore();

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View className={"p-4 flex gap-2 justify-center items-center"}>
      <Text className={""}>Zalogowano jako: {user?.name}</Text>

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
      <Button onPress={() => replace("/profile")}>
        <Text className={"text-white"}>Profil</Text>
      </Button>
    </View>
  );
}
