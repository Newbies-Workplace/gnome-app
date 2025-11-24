import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ZadajPytanieIcon from "@/assets/icons/askquestion.svg";
import DesignIcon from "@/assets/icons/design.svg";
import FAQIcon from "@/assets/icons/faq.svg";
import LanguageIcon from "@/assets/icons/language.svg";
import MainIcon from "@/assets/icons/main.svg";
import ModeIcon from "@/assets/icons/mode.svg";
import NotificationsIcon from "@/assets/icons/notifications.svg";
import PrivacyIcon from "@/assets/icons/privacy.svg";
import SecurityIcon from "@/assets/icons/security.svg";
import { SettingsOption } from "@/components/ui/SettingsOption";
import { Text } from "@/components/ui/text";

function SettingsScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-white text-2xl font-bold text-center tracking-wide">
          USTAWIENIA
        </Text>
      ),
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#1E201E" },
      headerShown: true,
    });
  }, [navigation, router]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full px-4 mt-4">
        <SettingsOption
          text="Motyw"
          image={ModeIcon}
          onClick={() => router.replace("/theme")}
          customClass="mb-8"
        />
        <SettingsOption
          text="Powiadomienia"
          image={NotificationsIcon}
          onClick={() => router.replace("/notifications")}
        />
        <SettingsOption
          text="Prywatność"
          image={PrivacyIcon}
          onClick={() => router.replace("/privacy")}
        />
        <SettingsOption
          text="Bezpieczeństwo"
          image={SecurityIcon}
          onClick={() => router.replace("/security")}
          customClass="mb-8"
        />
        <SettingsOption
          text="Główne"
          image={MainIcon}
          onClick={() => router.replace("/main")}
        />
        <SettingsOption
          text="Wygląd"
          image={DesignIcon}
          onClick={() => router.replace("/appearance")}
        />
        <SettingsOption
          text="Język"
          image={LanguageIcon}
          onClick={() => router.replace("/language")}
          extraText="Polski"
          customClass="mb-8"
        />
        <SettingsOption
          text="Zadaj pytanie"
          image={ZadajPytanieIcon}
          onClick={() => router.replace("/ask")}
        />
        <SettingsOption
          text="FAQ"
          image={FAQIcon}
          onClick={() => router.replace("/faq")}
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
