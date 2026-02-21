import { FontAwesome } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, Linking, Pressable, View } from "react-native";
import LoginLogoDarkTheme from "@/assets/images/LoginLogoDarkTheme.svg";
import LoginLogoLightTheme from "@/assets/images/LoginLogoLightTheme.svg";
import LoginSearchingGnome from "@/assets/images/LoginSearchingGnome.svg";
import LoginWelcomingGnome from "@/assets/images/LoginWelcomingGnome.svg";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthStore } from "@/store/useAuthStore";

export default function SignInScreen() {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const { replace } = useRouter();
  const { theme } = useTheme();
  const [isChecked, setChecked] = useState(false);

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
      Alert.alert(t("common.genericError"), JSON.stringify(error));
    }
  };

  const LoginLogo = useMemo(() => {
    return theme === "dark" ? LoginLogoDarkTheme : LoginLogoLightTheme;
  }, [theme]);

  return (
    <View className="flex-1 justify-end">
      <Image
        source={
          theme === "dark"
            ? require("@/assets/images/LoginBackgroundDark.png")
            : require("@/assets/images/LoginBackgroundLight.png")
        }
        className="w-full h-full flex-1 object-cover"
      />

      <LoginLogo className="absolute top-40 self-center" width={320} />

      <LoginSearchingGnome
        className="absolute left-[-50px] top-72"
        width={270}
        height={280}
      />

      <LoginWelcomingGnome
        className="absolute right-0 top-72"
        width={270}
        height={452}
      />

      <View className="bg-background p-10 justify-center gap-8">
        <View>
          <Text className="text-tekst text-4xl font-bold mb-1 text-center font-Afacad">
            {t("welcome.title")}
          </Text>
          <Text className="text-tekst text-center font-Afacad">
            {t("welcome.subtitle")}
          </Text>
        </View>

        <Pressable
          disabled={!isChecked}
          onPress={onSignInPress}
          className="flex flex-row p-2.5 rounded-3xl justify-center gap-4"
          style={{
            backgroundColor: isChecked ? "#d6484a" : "#d6484a88",
          }}
        >
          <FontAwesome name="google" size={20} color="white" />
          <Text className="text-white">{t("welcome.signInWithGoogle")}</Text>
        </Pressable>

        <View className="flex-row justify-center items-center ">
          <Checkbox
            className="mr-2"
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#d6484a" : undefined}
            style={{ borderRadius: 5 }}
          />
          <Text className="text-tekst">
            {t("welcome.acceptPrivacy")}{" "}
            <Text
              className="text-primary font-bold underline"
              onPress={() =>
                Linking.openURL(`${process.env.EXPO_PUBLIC_FRONT_URL}privacy`)
              }
            >
              {t("welcome.privacyPolicy")}
            </Text>
          </Text>
        </View>

        <Text className="text-tekst mt-5 text-md text-center justify-center">
          {t("welcome.appDescription")}
        </Text>
      </View>
    </View>
  );
}
