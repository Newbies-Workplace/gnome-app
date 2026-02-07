import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { use, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import AchievementsIcon from "@/assets/icons/achievements.svg";
import BackIcon from "@/assets/icons/arrow-left.svg";
import FriendsIcon from "@/assets/icons/friends.svg";
import LastSeenIcon from "@/assets/icons/last-seen.svg";
import LogoutIcon from "@/assets/icons/log-out.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import { Achievement } from "@/components/Achievement";
import { BottomSheetWrapper } from "@/components/BottomSheetWrapper";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GnomeCard } from "@/components/ui/GnomeCard";
import {
  ProfileButton,
  ProfileButtonLogout,
} from "@/components/ui/ProfileButton";
import { useAchievementsStore } from "@/store/useAchievementsStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { logout, user } = useAuthStore();
  const navigation = useNavigation();
  const router = useRouter();
  const { userAchievements } = useAchievementsStore();
  const logoutDialogRef = useRef<BottomSheetModal>(null);
  const latestEarnedAchievements = userAchievements.slice(0, 3);

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
    <View className="p-4 flex-1 bg-primary-foreground items-center">
      <View className="flex flex-row items-center gap-5 mb-5 rounded-lg bg-background-foreground w-full justify-center">
        <Avatar alt="Your avatar" className="w-20 h-20">
          <AvatarImage source={{ uri: user.pictureUrl }} />
          <AvatarFallback>
            <Text className="text-lg">{t("common.you")}</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Text className="text-xl font-bold text-tekst">{user.name}</Text>
        </View>
      </View>

      <View className="w-full mt-4">
        <ProfileButton
          text={t("friends.title")}
          image={<FriendsIcon className="text-tekst" />}
          onClick={() => router.push("/friends")}
        />

        <View>
          <ProfileButton
            text={t("achievements.title")}
            image={<AchievementsIcon className="text-tekst" />}
            onClick={() => router.push("/achievements")}
          />
          {latestEarnedAchievements.length === 3 && (
            <View className="w-full flex-row justify-between">
              {latestEarnedAchievements.map(({ achievement }) => (
                <Achievement key={achievement.id} title={achievement.name} />
              ))}
            </View>
          )}
        </View>
        <View className="mb-4">
          <ProfileButton
            text={t("profile.lastGnomes")}
            image={<LastSeenIcon className="text-tekst" />}
            onClick={() => router.push("/(app)/(tabs)/collection")}
          />
          <View className="justify-center flex-row">
            <GnomeCard
              gnomeId={"1"}
              text="?"
              onClick={() => router.push("/collection")}
            />
            <GnomeCard
              gnomeId={"2"}
              text="?"
              onClick={() => router.push("/collection")}
            />
            <GnomeCard
              gnomeId={"2"}
              text="?"
              onClick={() => router.push("/collection")}
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
          onClick={() => {
            logoutDialogRef.current?.present();
          }}
        />

        <BottomSheetWrapper ref={logoutDialogRef}>
          <ConfirmDialog
            title={t("profile.logout.confirmationTitle")}
            confirmContent={
              <View className="flex-row gap-2 items-center">
                <Text className="text-tekst font-bold">
                  {t("profile.logout.title")}
                </Text>
                <LogoutIcon className="text-tekst" />
              </View>
            }
            onConfirm={() => {
              logout();
              router.replace("/welcome");
            }}
            onDecline={() => {
              logoutDialogRef.current?.dismiss();
            }}
          />
        </BottomSheetWrapper>
      </View>
    </View>
  );
}
