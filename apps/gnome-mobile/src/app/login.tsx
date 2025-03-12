import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { login } = useAuthStore();
  const { replace } = useRouter();

  return (
    <SafeAreaView className="flex-1 justify-end">
      <Image
        source={require("@/assets/images/bgmax.png")}
        className="w-full h-full flex-1 object-cover"
      />
      <View className="bg-gray-900">
        <View>
          <Text className="text-white text-center text-3xl mt-4 mb-4 font-bold">
            Zaloguj się!
          </Text>
        </View>
        <Input
          type="text"
          className="border rounded-3xl border-white border-t-10 bg-gray-900 mt-4 mb-4 w-80 h-20 mx-auto text-white"
          placeholder="Nazwa Użytkownika"
        />
        <Input
          type="text"
          className="border rounded-3xl border-white  bg-gray-900 mt-4 mb-4 w-80 h-20 mx-auto text-white"
          placeholder="Hasło"
        />
        <View>
          <Text className="text-white text-center text-sm font-bold mt-2 mb-2 ">
            Nie masz konta?&nbsp;
            <Text
              onPress={() => replace("/sign-in")}
              className="text-red-500 text-center text-sm font-bold mt-2 mb-2 "
            >
              Zajerestruj się tutaj!
            </Text>
          </Text>
        </View>
        <Button
          onPress={() => replace("/sign-in")}
          className="border rounded-3xl border-red-800 bg-red-800 mt-4 mb-4 w-80 h-20 mx-auto"
        >
          <Text>Zaloguj</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
