import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import AchievementsIcon from "@/assets/icons/achievements.svg";
import BackIcon from "@/assets/icons/arrow-left.svg";
import FriendsIcon from "@/assets/icons/friends.svg";
import LastSeenIcon from "@/assets/icons/last-seen.svg";
import LogoutIcon from "@/assets/icons/log-out.svg";
import QuestsIcon from "@/assets/icons/quests.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GnomeCard } from "@/components/ui/GnomeCard";
import {
  ProfileButton,
  ProfileButtonLogout,
} from "@/components/ui/ProfileButton";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { logout, user } = useAuthStore();
  const navigation = useNavigation();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      t("profile.logout.title"),
      t("profile.logout.confirmationTitle"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("profile.logout.title"),
          onPress: () => {
            logout();
            router.replace("/welcome");
          },
        },
      ],
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <BackIcon className="w-7 h-7 text-tekst" />
        </TouchableOpacity>
      ),
      headerTitle: "",
      headerBackground: () => (
        <View className="absolute inset-0 bg-primary-foreground" />
      ),
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation, router]);

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-tekst">{t("common.loading")}</Text>
      </View>
    );
  }

  return (
    <View className="p-6 flex-1 bg-primary-foreground items-center">
      <View className="flex flex-row items-center gap-5 mb-5 rounded-lg bg-background-foreground w-full justify-center">
        <Avatar alt="Your avatar" className="w-20 h-20">
          <AvatarImage source={{ uri: user.pictureUrl }} />
          <AvatarFallback>
            <Text className="text-lg">You</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Text className="text-xl font-bold text-tekst">{user.name}</Text>
        </View>
      </View>

      <View className="w-full mt-4">
        <ProfileButton
          text="Znajomi"
          image={<FriendsIcon className="text-tekst" />}
          onClick={() => router.navigate("/friends")}
        />
        <ProfileButton
          text="Osiągnięcia"
          image={<AchievementsIcon className="text-tekst" />}
          onClick={() => router.push("/achievements")}
        />

        <View className="mb-4">
          <ProfileButton
            text="Ostatnio odkryte"
            image={<LastSeenIcon className="text-tekst" />}
            onClick={() => router.replace("/(app)/(tabs)/collection")}
          />
          <View className="justify-center flex-row">
            <GnomeCard
              image={require("@/assets/images/gnomeplaceholder.svg")}
              text="?"
              onClick={() => router.replace("/collection")}
            />
            <GnomeCard
              image={require("@/assets/images/gnomeplaceholder.svg")}
              text="?"
              onClick={() => router.replace("/collection")}
            />
            <GnomeCard
              image={require("@/assets/images/gnomeplaceholder.svg")}
              text="?"
              onClick={() => router.replace("/collection")}
            />
          </View>
        </View>

        <ProfileButton
          text={t("settings.title")}
          image={<SettingsIcon className="text-tekst" />}
          onClick={() => router.push("/settings")}
        />

        <ProfileButtonLogout
          text={t("profile.logout.title")}
          image={<LogoutIcon className={"text-primary"} />}
          onClick={handleLogout}
        />
      </View>
    </View>
  );
}
