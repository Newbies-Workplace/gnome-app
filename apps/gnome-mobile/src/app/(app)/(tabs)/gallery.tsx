import { useAuthStore } from "@/store/useAuthStore";
import { useNavigation, useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { Button, Text, View } from "react-native";

const Gallery = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-xl font-bold mb-4">Galeria</Text>
      <View className="w-full p-5 flex items-center">
        <Button title="Logout" onPress={logout} color="red" />
        <Button
          title="Camera"
          onPress={() => {
            router.push("/camera");
          }}
        />
      </View>
    </View>
  );
};

export default Gallery;
