import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { replace } = useRouter();

  return (
    <SafeAreaView className="flex-1 justify-end">
      <Image
        source={require("@/assets/images/bgmax.png")}
        className="w-full h-full flex-1 object-cover"
      />
      <View className="bg-background p-10">
        <Text className="text-white text-2xl text-center font-bold mb-4 font-Afacad">
          Zarejestruj się
        </Text>
        <Input
          className="border rounded-3xl border-white border-t-10 bg-background mb-4 h-full mx-auto text-white w-full"
          placeholder="Nazwa Użytkownika"
        />
        <Input
          className="border rounded-3xl border-white border-t-10 bg-background mb-4 h-full mx-auto text-white w-full"
          placeholder="Email"
        />
        <Input
          className="border rounded-3xl border-white  bg-background mb-4 h-full mx-auto text-white w-full"
          placeholder="Hasło"
        />
        <Button
          onPress={() => replace("/")}
          className="border rounded-3xl border-primary mt-4 mb-4 h-20 mx-auto w-full"
        >
          <Text className="text-white text-center font-bold font-Afacad">
            ZAŁÓŻ KONTO
          </Text>
        </Button>
      </View>

      <View className="bg-background">
        <View className="flex items-center mb-4">
          <Text className="w-full text-white font-bold text-center bg-background mx-auto mt-2 mb-2">
            Masz konto?{" "}
            <Text
              className="text-primary font-bold mb-2"
              onPress={() => replace("/login")}
            >
              Zaloguj się
            </Text>
          </Text>

          <Text className="w-full text-white text-center bg-background mx-auto">
            <Text className="text-white" onPress={() => replace("/welcome")}>
              Akceptuje politykę prywatności
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
