import { GnomeCard } from "@/components/ui/GnomeCard";
import {
  ProfileButton,
  ProfileButtonLogout,
} from "@/components/ui/ProfileButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { useEffect } from "react";
import { Alert, Share, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import ikon
import AchievementsIcon from "@/assets/icons/achievements.svg";
import BackIcon from "@/assets/icons/arrow-left.svg";
import FriendsIcon from "@/assets/icons/friends.svg";
import LastSeenIcon from "@/assets/icons/last-seen.svg";
import LogoutIcon from "@/assets/icons/log-out.svg";
import QuestsIcon from "@/assets/icons/quests.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import ShareIcon from "@/assets/icons/share-right.svg";

export default function ProfileScreen() {
  const { logout, user } = useAuthStore();
  const navigation = useNavigation();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Wylogowanie", "Czy na pewno chcesz się wylogować?", [
      { text: "Anuluj", style: "cancel" },
      { text: "Wyloguj", onPress: logout },
    ]);
  };

  // header z powrotem i udostepnianiem
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <BackIcon className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity className="p-5" onPress={handleShare}>
          <ShareIcon className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#131413",
      },
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation, router]);

  // udostepnianie
  const handleShare = async () => {
    try {
      if (user?.name) {
        await Share.share({
          message: `Sprawdź profil użytkownika ${user.name}!`,
        });
      }
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się udostępnić");
    }
  };

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-white">Brak danych użytkownika</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="p-6 flex-1 bg-primary-foreground items-center">
      {/* Profil */}
      <View className="flex flex-row items-center gap-5 mb-5 rounded-lg bg-background-foreground w-full justify-center">
        <Avatar alt="Your avatar" className="w-20 h-20">
          <AvatarImage source={{ uri: user.pictureUrl }} />
          <AvatarFallback>
            <Text className="text-lg">You</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Text className="text-xl font-bold text-white">{user.name}</Text>
          <Button className="mt-2 px-4 py-2 rounded-full bg-background">
            <Text className="text-white">Edytuj profil</Text>
          </Button>
        </View>
      </View>

      {/* Menu */}
      <View className="w-full mt-4">
        <ProfileButton
          text="Znajomi"
          image={<FriendsIcon />}
          onClick={() => router.navigate("/friends")}
        />
        <ProfileButton
          text="Osiągnięcia"
          image={<AchievementsIcon />}
          onClick={() => router.push("/achievements")}
        />
        <ProfileButton
          text="Zadania"
          image={<QuestsIcon />}
          onClick={() => router.push("/quests")}
        />
        {/* Ostatnio odkryte */}
        <View className="mb-4">
          <ProfileButton
            text="Ostatnio odkryte"
            image={<LastSeenIcon />}
            onClick={() => router.replace("/(app)/(tabs)/collection")}
          />
          {/* Trzy zdjęcia z polami tekstowymi */}
          <View>
            <View className="justify-center flex-row">
              <GnomeCard
                image={require("@/assets/images/placeholder.png")}
                text="?"
                onClick={() => router.replace("/collection")}
              />
              <GnomeCard
                image={require("@/assets/images/placeholder.png")}
                text="?"
                onClick={() => router.replace("/collection")}
              />
              <GnomeCard
                image={require("@/assets/images/placeholder.png")}
                text="?"
                onClick={() => router.replace("/collection")}
              />
            </View>
          </View>
        </View>

        {/* Ustawienia */}
        <ProfileButton
          text="Ustawienia"
          image={<SettingsIcon />}
          onClick={() => router.push("/settings")}
        />

        {/* Wylogowanie */}
        <ProfileButtonLogout
          text="Wyloguj"
          image={<LogoutIcon />}
          onClick={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
}
