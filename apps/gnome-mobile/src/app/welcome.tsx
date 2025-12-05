import { FontAwesome } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, Image, Linking, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";

export default function SignInScreen() {
  const { login } = useAuthStore();
  const { replace } = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
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
      Alert.alert(
        "Błąd",
        "Nie udało się zalogować przez Google. Spróbuj ponownie.",
      );
    }
  };

  return (
    <View className="flex-1 justify-end">
      <Image
        source={require("@/assets/images/bgmax.png")}
        className="w-full h-full flex-1 object-cover"
        style={{
          transform: "scale(1)",
        }}
      />

      <View className="bg-background p-10 justify-center">
        <Text className="text-tekst text-xl font-bold mb-2 text-center font-Afacad">
          Znajdź swojego ulubionego krasnala!
        </Text>
        <Text className="text-tekst text-lg mb-6 text-center font-Afacad">
          Dołącz do nas i odkryj swojego idealnego krasnala we Wrocławiu!
        </Text>
        {/* <Button
          onPress={() => replace("/register")}
          className="items-center justify-center w-full mb-4 rounded-3xl bg-primary font-Afacad"
        >
          <Text className="text-tekst">Załóż konto</Text>
        </Button> */}
        {/* <Button
          onPress={() => replace("/login")}
          className="w-full rounded-3xl bg-primary font-Afacad"
        >
          <Text className="text-tekst">Zaloguj się</Text>
        </Button> */}
        <Pressable
          onPress={onSignInPress}
          className="flex flex-row bg-primary p-2.5 rounded-[30px] mb-2.5 justify-center"
        >
          <FontAwesome name="google" size={20} color="white" />
          <Text className="ml-3 text-white">Zaloguj przez Google</Text>
        </Pressable>

        <Text className="text-tekst mt-5 text-center">
          @ Krasnal GO - odkrywaj Wrocław krok po kroku.
        </Text>
        <Pressable
          onPress={() => Linking.openURL("http://localhost:5173/privacy")}
        >
          <Text className="text-primary font-bold text-center underline mt-1">
            Polityka prywatności
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
