import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

export default function SignInScreen() {
  const { login } = useAuthStore();
  const { replace } = useRouter();

  return (
    <View className="flex-1 justify-end">
      <View>
        <View className="flex-row border rounded-full bg-gray-700 border-gray-700 mt-4 mb-4 w-full  mx-auto">
          <Button className="bg-gray-700 border rounded-full border-gray-700 ml-4 mr-2 my-2"
          onPress={() => replace("/main-page")}>
            <Text className="text-white font-Afacad">
              Główna
            </Text>
          </Button>
          <Button className="bg-red-700 border rounded-full border-red-700 mx-2 my-2"
          onPress={() => replace("/collect-page")}>
            <Text className="text-white font-Afacad">
              Kolekcja
            </Text>
          </Button>
          <Button className="bg-gray-700 border rounded-full border-gray-700 mx-2 my-2"
          onPress={() => replace("/friend-page")}>
            <Text className="text-white font-Afacad">
              Znajomi
            </Text>
          </Button>
          <Button className="bg-gray-700 border rounded-full border-gray-700 ml-2 mr-4 my-2"
          onPress={() => replace("/gallery-page")}>
            <Text className="text-white font-Afacad">
              Galeria
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
