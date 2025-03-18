import { SettingsOption } from "@/components/ui/SettingsOption";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import ikon jako komponenty SVG
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

function SettingsScreen() {
  const { replace } = useRouter();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Nagłówek */}
      <View className="flex flex-row items-center justify-between px-4 py-3 bg-background">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft width={36} height={36} />
        </TouchableOpacity>

        <Text className="text-white text-xl font-bold flex-1 text-center">
          Ustawienia
        </Text>

        <View style={{ width: 36 }} />
      </View>

      {/* Opcje ustawień */}
      <View className="w-full px-4 mt-4">
        {/* 1 przycisk */}
        <SettingsOption
          text="Motyw"
          image={ModeIcon}
          onClick={() => replace("/theme")}
          customClass="mb-8"
        />

        {/* 3 przyciski */}
        <SettingsOption
          text="Powiadomienia"
          image={NotificationsIcon}
          onClick={() => replace("/notifications")}
        />
        <SettingsOption
          text="Prywatność"
          image={PrivacyIcon}
          onClick={() => replace("/privacy")}
        />
        <SettingsOption
          text="Bezpieczeństwo"
          image={SecurityIcon}
          onClick={() => replace("/security")}
          customClass="mb-8"
        />

        {/* 3 przyciski */}
        <SettingsOption
          text="Główne"
          image={MainIcon}
          onClick={() => replace("/main")}
        />
        <SettingsOption
          text="Wygląd"
          image={DesignIcon}
          onClick={() => replace("/appearance")}
        />
        <SettingsOption
          text="Język"
          image={LanguageIcon}
          onClick={() => replace("/language")}
          extraText="Polski"
          customClass="mb-8"
        />

        {/* 2 przyciski */}
        <SettingsOption
          text="Zadaj pytanie"
          image={ZadajPytanieIcon}
          onClick={() => replace("/ask")}
        />
        <SettingsOption
          text="FAQ"
          image={FAQIcon}
          onClick={() => replace("/faq")}
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
