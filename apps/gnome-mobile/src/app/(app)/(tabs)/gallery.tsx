import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const Gallery = () => {
  const { logout } = useAuthStore();
  const router = useRouter(); // Get the router instance

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-xl font-bold mb-4">Galeria</Text>
      <View className="w-full p-5 flex items-center">
        <Button title="Logout" onPress={logout} color="red" />
        <Button
          title="gnome_on_hat"
          onPress={() => router.replace("/gnome_on_hat")}
        />
        <Button title="camera" onPress={() => router.replace("/camera")} />
        <Button title="profile" onPress={() => router.replace("/profile")} />
        <Button title="settings" onPress={() => router.replace("/settings")} />
      </View>
    </View>
  );
};

export default Gallery;
