import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function SignInScreen() {
  const { login } = useAuthStore();
  const { replace } = useRouter();

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

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
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <View className={"p-4"}>
      <Button onPress={onSignInPress}>
        <Text>Zaloguj</Text>
      </Button>
    </View>
  );
}
