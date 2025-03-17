import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ZadajPytanieIcon from "@/assets/icons/askquestion.svg";
import WygladIcon from "@/assets/icons/design.svg";
import FAQIcon from "@/assets/icons/faq.svg";
import JezykIcon from "@/assets/icons/language.svg";
import GlowneIcon from "@/assets/icons/main.svg";
// Importing Icons
import MotywIcon from "@/assets/icons/mode.svg";
import PowiadomieniaIcon from "@/assets/icons/notifications.svg";
import PrywatnoscIcon from "@/assets/icons/privacy.svg";
import BezpieczenstwoIcon from "@/assets/icons/security.svg";

const settingsOptions = [
  { name: "Motyw", icon: MotywIcon, route: "/theme" },
  { name: "Powiadomienia", icon: PowiadomieniaIcon, route: "/notifications" },
  { name: "Prywatność", icon: PrywatnoscIcon, route: "/privacy" },
  { name: "Bezpieczeństwo", icon: BezpieczenstwoIcon, route: "/security" },
  { name: "Główne", icon: GlowneIcon, route: "/main" },
  { name: "Wygląd", icon: WygladIcon, route: "/appearance" },
  { name: "Język", icon: JezykIcon, route: "/language", extra: "Polski" }, // Dodane "Polski"
  { name: "Zadaj pytanie", icon: ZadajPytanieIcon, route: "/ask" },
  { name: "FAQ", icon: FAQIcon, route: "/faq" },
];

function SettingsScreen() {
  const { replace } = useRouter();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-4 py-3 bg-background">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft width={40} height={40} />
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-white text-xl font-bold flex-1 text-center">
          Ustawienia
        </Text>

        {/* Placeholder for alignment */}
        <View style={{ width: 40 }} />
      </View>

      {/* Settings List */}
      <View className="w-full px-4 mt-4">
        {settingsOptions.map(({ name, icon: Icon, route, extra }, index) => (
          <Button
            key={name}
            onPress={() => replace(route)}
            className={`rounded-lg bg-background flex flex-row items-center justify-between px-4 py-2 
              ${[0, 3, 6].includes(index) ? "mb-6" : "mb-3"}`} // Larger margin after 1st, 4th, and 7th buttons
          >
            {/* Left Icon + Text */}
            <View className="flex flex-row items-center">
              <Icon width={24} height={24} className="mr-3" />
              <Text className="text-white ml-3 text-lg">{name}</Text>
            </View>

            {/* Right Section (Extra Text + Arrow) */}
            <View className="flex flex-row items-center">
              {extra && (
                <Text className="text-gray-400 text-lg mr-3">{extra}</Text>
              )}
              <ArrowRight width={24} height={24} />
            </View>
          </Button>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
