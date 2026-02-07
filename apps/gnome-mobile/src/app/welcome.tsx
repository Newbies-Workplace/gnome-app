import { FontAwesome } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";

export default function SignInScreen() {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const { replace } = useRouter();
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
          {t("welcome.title")}
        </Text>
        <Text className="text-tekst text-lg mb-6 text-center font-Afacad">
          {t("welcome.subtitle")}
        </Text>

        <Pressable
          disabled={!isChecked}
          onPress={isChecked ? onSignInPress : null}
          className="flex flex-row p-2.5 rounded-[30px] mb-4 justify-center"
          style={{
            backgroundColor: isChecked ? "#d6484a" : "#d6484a88",
          }}
        >
          <FontAwesome name="google" size={20} color="white" />
          <Text className="ml-3 text-white">
            {t("welcome.signInWithGoogle")}
          </Text>
        </Pressable>

        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#d6484a" : undefined}
          />
          <Text style={styles.paragraph} className="text-tekst">
            {t("welcome.acceptPrivacy")}
          </Text>
        </View>

        <Text className="text-tekst mt-5 text-center justify-center">
          {t("welcome.appDescription")}
        </Text>
        <Pressable
          onPress={() =>
            Linking.openURL(`${process.env.EXPO_PUBLIC_FRONT_URL}privacy`)
          }
        >
          <Text className="text-primary font-bold text-center underline mt-1">
            {t("welcome.privacyPolicy")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
