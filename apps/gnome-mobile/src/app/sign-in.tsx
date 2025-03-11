import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GnomesService } from "@/lib/api/Gnomes.service";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Link } from "expo-router";

export default function SignInScreen() {
  const { login } = useAuthStore();
  const { replace } = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const onSignInPress = async () => {
    console.log("sign in");

    try {
      await GoogleSignin.hasPlayServices();
      const signInResponse = await GoogleSignin.signIn();
      const idToken = signInResponse?.data?.idToken;

      if (idToken) {
        await login(idToken);

        replace("/");
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className={"p-4"}>

      <Button onPress={onSignInPress}>
        <Text>Zaloguj</Text>
      </Button>
      <Button>
      <Link href="/login">Przejdź do strony głównej</Link>
      </Button>
    </View>
  );
}
