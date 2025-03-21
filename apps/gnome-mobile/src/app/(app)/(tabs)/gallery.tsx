import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const Gallery = () => {
  const { logout } = useAuthStore();
  const { replace } = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-xl font-bold mb-4">Galeria</Text>
      <View className="w-full p-5 flex items-center">
        <Button title="Logout" onPress={logout} color="red" />
        <Button
          title="Profile"
          onPress={() => {
            replace("/profile");
          }}
        />
        <Button
          title="Camera"
          onPress={() => {
            replace("/camera");
          }}
        />
        <Button
          title="Settings"
          onPress={() => {
            replace("/settings");
          }}
        />
      </View>
    </View>
  );
};

export default Gallery;
