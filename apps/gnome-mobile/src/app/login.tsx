import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { GnomesService } from "@/lib/api/Gnomes.service";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { text } from "body-parser";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Image } from "react-native";
import React from 'react';
import { transform } from "@babel/core";


export default function SignInScreen() {
  const { login } = useAuthStore();
  const { replace } = useRouter();

  return (
    <View className="flex-1 justify-end">
      <Image
        source={require("@/assets/images/bgmax.png")}
        className="w-full h-full flex-1 object-cover" />
      <View className="bg-gray-900">
        <View>
          <Text className="text-white text-center text-3xl mt-4 mb-4 font-bold">Zaloguj się!</Text>
        </View>
        <Input type="text" 
        className="border rounded-3xl border-white border-t-10 bg-gray-900 mt-4 mb-4 w-80 h-20 mx-auto text-white" 
        placeholder="Nazwa Użytkownika" />
        <Input type="text" 
        className="border rounded-3xl border-white  bg-gray-900 mt-4 mb-4 w-80 h-20 mx-auto text-white" 
        placeholder="Hasło" />
        <View>
          <Text className="text-white text-center text-sm font-bold mt-2 mb-2 ">
            Nie masz konta?&nbsp;
            <Text onPress={() => replace("/sign-in")} className="text-red-500 text-center text-sm font-bold mt-2 mb-2 ">
             Zajerestruj się tutaj!
          </Text>
          </Text>
          
        </View>
        <Button onPress={() => replace("/main-page")}
        className="border rounded-3xl border-red-800 bg-red-800 mt-4 mb-4 w-80 h-20 mx-auto">
          <Text>Zaloguj</Text>
        </Button>
      </View>
    </View>
  );
}
