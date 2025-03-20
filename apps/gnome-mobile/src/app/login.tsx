import { GnomesService } from "@/lib/api/Gnomes.service";
import { useAuthStore } from "@/store/useAuthStore";
import { FontAwesome } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { login } = useAuthStore();
  const { replace } = useRouter();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    GnomesService.getGnomes()
      .then((gnomes) => {
        setText(gnomes[0]?.name || "");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const onSignInPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const signInResponse = await GoogleSignin.signIn();
      const idToken = signInResponse?.data?.idToken;
      if (idToken) {
        await login(idToken);
        replace("/Home");
      } else {
        throw new Error("No ID token present!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Błąd",
        "Nie udało się zalogować przez Google. Spróbuj ponownie.",
      );
    }
  };

  if (loading) {
    return <ActivityIndicator size={"large"} color="#ffffff" />;
  }

  return (
    <SafeAreaView className="flex-1 justify-end">
      <Image
        source={require("@/assets/images/bgmax.png")}
        className="w-full h-full flex-1 object-cover"
        style={{
          transform: "scale(1)",
        }}
      />
      <View className="bg-background p-10">
        <Text className="text-white text-2xl font-bold mb-5 text-center">
          Zaloguj się!
        </Text>
        <TextInput
          className="bg-background text-white w-full p-2.5 mb-2.5 rounded-3xl placeholder:text-[white] border border-[white]"
          placeholder="Email"
          secureTextEntry
        />
        <TextInput
          className="bg-background text-white w-full p-2.5 mb-2.5 rounded-3xl placeholder:text-[white] border border-[white]"
          placeholder="Hasło"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={() => console.log("Zalogowano po podaniu email oraz haslo")}
          className="bg-primary mb-2.5 p-2.5 rounded-3xl w-full flex items-center"
        >
          <Text className="text-white font-bold">Zaloguj</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSignInPress}
          className="flex flex-row bg-white p-2.5 rounded-[30px] mb-2.5"
        >
          <FontAwesome name="google" size={20} color="black" />
          <Text className="ml-2.5 text-black">Zaloguj przez Google</Text>
        </TouchableOpacity>

        <Text className="text-white mt-5 text-center">
          Nie masz konta?
          <Text
            onPress={() => replace("/register")}
            style={{ color: "#FF5252", fontWeight: "bold" }}
          >
            {" "}
            Zarejestruj się tutaj!
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
