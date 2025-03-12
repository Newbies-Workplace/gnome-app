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
      <View className="bg-[rgba(30,32,30)]">
        <View>
          <Text className="text-white text-2xl text-center font-bold mb-[<10>] mt-4 font-Afacad">
            Zarejestruj się
          </Text>
        </View>

        <Input
          type="text"
          className="border rounded-3xl border-white border-t-10 bg-[rgba(30,32,30)] mt-4 mb-4 w-80 h-20 mx-auto text-white"
          placeholder="Nazwa Użytkownika"
        />
        <Input
          type="text"
          className="border rounded-3xl border-white border-t-10 bg-[rgba(30,32,30)] mt-4 mb-4 w-80 h-20 mx-auto text-white"
          placeholder="Email"
        />
        <Input
          type="text"
          className="border rounded-3xl border-white  bg-[rgba(30,32,30)] mt-4 mb-4 w-80 h-20 mx-auto text-white"
          placeholder="Hasło"
        />
      </View>

      <View className="bg-[rgba(30,32,30)]">
        <View className="flex items-center mb-4">
          <Text className="w-full text-white font-bold text-center bg-[rgba(30,32,30)] mx-auto mt-2 mb-2">
            Masz konto?&nbsp;
            <Text
              className="text-[rgba(214,72,74)]"
              onPress={() => replace("/login")}
            >
              Zaloguj się
            </Text>
          </Text>

          <Text className="w-full text-white font-bold text-center bg-[rgba(30,32,30)] mx-auto">
            Akceptuje&nbsp;
            <Text className="text-white" onPress={() => replace("/sign-in")}>
              politykę prywatności
            </Text>
          </Text>
        </View>

        <Button
          onPress={() => replace("/sign-in")}
          className="border rounded-3xl bg-[rgba(214,72,74)] border-[rgba(214,72,74)] mt-4 mb-4 w-80 h-20 mx-auto"
        >
          <Text className="text-white text-center font-bold font-Afacad">
            ZAŁÓŻ KONTO
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
