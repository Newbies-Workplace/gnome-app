import React, { useEffect, useState } from "react";
import { View, Alert, TouchableOpacity, Image, TextInput, Text, ActivityIndicator } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { GnomesService } from "@/lib/api/Gnomes.service";

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
        replace("/");
      } else {
        throw new Error("No ID token present!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Błąd", "Nie udało się zalogować przez Google. Spróbuj ponownie.");
    }
  };

  if (loading) {
    return <ActivityIndicator size={"large"} color="#ffffff" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212"}}>
      <Image
        source={require("@/assets/images/bgmax.png")}
        className="w-full h-full flex-1 object-cover"
        style={{
          transform: "scale(1)",
        }}
      />
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Zaloguj się!</Text>
      <TextInput
        style={{ backgroundColor: "#1E1E1E", color: "white", width: 300, padding: 10, marginBottom: 10, borderRadius: 30 }}
        placeholder="Email"
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={{ backgroundColor: "#1E1E1E", color: "white", width: 300, padding: 10, marginBottom: 10, borderRadius: 30 }}
        placeholder="Hasło"
        placeholderTextColor="#ccc"
        secureTextEntry
      />
      <TouchableOpacity onPress={onSignInPress} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 10, borderRadius: 30, marginBottom: 10 }}>
        <FontAwesome name="google" size={20} color="black" />
        <Text style={{ marginLeft: 10, color: "black" }}>Zaloguj przez Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => replace("/index")} style={{ backgroundColor: "#D32F2F", padding: 15, borderRadius: 30, width: 300, alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Zaloguj</Text>
      </TouchableOpacity>
      <Text style={{ color: "white", marginTop: 20 }}>
        Nie masz konta?
        <Text onPress={() => replace("/register")} style={{ color: "#FF5252", fontWeight: "bold" }}> Zarejestruj się tutaj!</Text>
      </Text>
    </View>
  );
}