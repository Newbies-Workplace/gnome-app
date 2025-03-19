import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ProfileButton,
  ProfileButtonLogout,
} from "@/components/ui/profile-button";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Image,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AchievementsIcon from "@/assets/icons/achievements.svg";
import BackIcon from "@/assets/icons/arrow-left.svg";
// import ikon
import FriendsIcon from "@/assets/icons/friends.svg";
import LastSeenIcon from "@/assets/icons/last-seen.svg";
import LogoutIcon from "@/assets/icons/log-out.svg";
import QuestsIcon from "@/assets/icons/quests.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import ShareIcon from "@/assets/icons/share-right.svg";

export default function ProfileScreen() {
  const { logout, user } = useAuthStore();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Wylogowanie", "Czy na pewno chcesz się wylogować?", [
      { text: "Anuluj", style: "cancel" },
      { text: "Wyloguj", onPress: logout },
    ]);
  };

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
      {/* Nagłówek */}
      <View className="flex flex-row justify-between items-center bg-primary-foreground w-full">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon className="w-7 h-7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <ShareIcon className="w-7 h-7" />
        </TouchableOpacity>
      </View>

      {/* Profil */}
      <View className="flex flex-row items-center gap-5 p-6 rounded-lg bg-background-foreground w-full justify-center">
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
        <ProfileButton text="Znajomi" image={FriendsIcon} onClick={() => {}} />
        <ProfileButton
          text="Osiągnięcia"
          image={AchievementsIcon}
          onClick={() => {}}
        />
        <ProfileButton text="Zadania" image={QuestsIcon} onClick={() => {}} />
        {/* Ostatnio odkryte */}
        <View className="mb-4">
          <ProfileButton
            text="Ostatnio odkryte"
            image={LastSeenIcon}
            onClick={() => {}}
          >
            <Image source={LastSeenIcon} className="w-7 h-7 mr-2" />
          </ProfileButton>
          {/* Trzy zdjęcia z polami tekstowymi */}
          <View className="flex flex-row justify-between mb-4">
            {[1, 2, 3].map((index) => (
              <View key={index} className="items-center">
                <Image
                  source={require("@/assets/images/placeholder.png")}
                  className="w-30 h-30 rounded-md mb-2"
                />
                <Text className="w-20 h-7 text-center rounded px-1 text-white font-bold">
                  ?
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ustawienia */}
        <ProfileButton text="Znajomi" image={SettingsIcon} onClick={() => {}} />

        {/* Wylogowanie */}
        <ProfileButtonLogout
          text="Wyloguj"
          image={LogoutIcon}
          onClick={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
}
