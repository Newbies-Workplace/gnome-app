import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Alert, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SignInScreen() {
  const { login } = useAuthStore();
  const { replace } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("Google Web Client ID:", process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID);
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const onSignInPress = async () => {
    console.log("Google sign-in attempt...");

    try {
      await GoogleSignin.hasPlayServices();
      const signInResponse = await GoogleSignin.signIn();
      console.log("Google Sign-In Response:", signInResponse);

      const idToken = signInResponse?.data?.idToken;

      if (idToken) {
        await login(idToken);
        replace("/");
      } else {
        throw new Error("No ID token present!");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Błąd", "Nie udało się zalogować przez Google. Spróbuj ponownie.");
    }
  };

  const onEmailSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Błąd", "Email i hasło nie mogą być puste.");
      return;
    }

    console.log("Email sign-in attempt...");

    try {
      await login(email, password);
      replace("/");
    } catch (error) {
      console.error("Email Sign-In Error:", error);
      Alert.alert("Błąd", "Nie udało się zalogować przez email. Spróbuj ponownie.");
    }
  };

  return (
    <View className="flex justify-center items-center h-screen bg-gray-900">
      <View className="bg-gray-700 w-96 p-8 rounded-lg flex items-center shadow-lg">
        <Text className="text-white text-2xl mb-6">Zaloguj się</Text>

        <Input
          className="w-full mb-4 p-3 bg-gray-600 text-white rounded"
          placeholder="Nazwa użytkownika"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          className="w-full mb-4 p-3 bg-gray-600 text-white rounded"
          placeholder="Hasło"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Zamiast <hr>, używamy View z odpowiednią wysokością i tłem */}
        <View className="w-full my-4 border-t border-white" />

        {/* Ikona Google Button */}
        <TouchableOpacity onPress={onSignInPress} className="flex flex-row items-center justify-center bg-white p-4 rounded-lg w-full mb-4">
          <FontAwesome name="google" size={20} color="black" />
          <Text className="ml-2 text-black">Zaloguj przez Google</Text>
        </TouchableOpacity>

        <View className="flex flex-row justify-center items-center mb-4">
          <Text className="text-white">Nie masz konta? </Text>
          <TouchableOpacity onPress={() => Linking.openURL("/register")}>
            <Text className="text-red-500">Zarejestruj się</Text>
          </TouchableOpacity>
        </View>

        {/* Main Sign In Button */}
        <Button onPress={onEmailSignIn} className="bg-red-500 text-white p-4 rounded-lg w-full">
          <Text className="text-white">Zaloguj się</Text>
        </Button>
      </View>
    </View>
  );
}
