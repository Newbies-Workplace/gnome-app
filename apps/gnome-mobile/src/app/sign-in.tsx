import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GnomesService } from "@/lib/api/Gnomes.service";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function SignInScreen() {
  const { login } = useAuthStore();
  const { replace } = useRouter();

  const [loading, setLoading] = useState(true);
  const [text, setText] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    GnomesService.getGnomes()
      .then((gnomes) => {
        setText(gnomes[0].name);
        setLoading(false);
        console.log(gnomes);
      })
      .catch(console.error);
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

  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <View className={"p-4"}>
      <Text>{text}</Text>

      <Button onPress={onSignInPress}>
        <Text>Zaloguj</Text>
      </Button>
    </View>
  );
}
