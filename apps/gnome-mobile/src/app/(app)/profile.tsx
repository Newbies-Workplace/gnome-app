import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import { Text, View, TouchableOpacity, Alert, Image, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { logout, user } = useAuthStore();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Wylogowanie",
      "Czy na pewno chcesz się wylogować?",
      [
        { text: "Anuluj", style: "cancel" },
        { text: "Wyloguj", onPress: logout },
      ]
    );
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

  const buttonIcons = {
    "Znajomi": require("@/assets/icons/friends.svg"),
    "Osiągnięcia": require("@/assets/icons/achievements.svg"),
    "Zadania": require("@/assets/icons/quests.svg"),
    "Ostatnio odkryte": require("@/assets/icons/latest-seen.svg"),
    "Odznaki": require("@/assets/icons/awards.svg"),
    "Ustawienia": require("@/assets/icons/settings.svg"),
    "Wyloguj": require("@/assets/icons/log-out.svg"),
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
          <Image source={require("@/assets/icons/arrow-left.svg")} className="w-7 h-7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Image source={require("@/assets/icons/share-right.svg")} className="w-7 h-7" />
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
        {["Znajomi", "Osiągnięcia", "Zadania"].map((item, index) => (
          <Button key={index} className="rounded-lg bg-background mb-3 flex flex-row justify-start">
            <Image source={buttonIcons[item]} className="w-7 h-7 mr-2" />
            <Text className="text-white text-lg font-bold">{item}</Text>
          </Button>
        ))}

        {/* Ostatnio odkryte */}
        <View className="mb-4">
          <Button key="Ostatnio odkryte" className="rounded-lg bg-background mt-8 mb-2 flex flex-row justify-start">
            <Image source={buttonIcons["Ostatnio odkryte"]} className="w-7 h-7 mr-2" />
            <Text className="text-white text-lg font-bold">Ostatnio odkryte</Text>
          </Button>

          {/* Trzy zdjęcia z polami tekstowymi */}
          <View className="flex flex-row justify-between mb-4">
            {[1, 2, 3].map((index) => (
              <View key={index} className="items-center">
                <Image
                  source={require("@/assets/images/example1.png")}
                  className="w-30 h-30 rounded-md mb-2"
                />
                <Text
                  style={{
                    width: 80,
                    height: 30,
                    textAlign: "center",
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  ?
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ustawienia */}
        {["Ustawienia"].map((item, index) => (
          <Button key={index} className="rounded-lg bg-background mb-3 flex flex-row justify-start">
            <Image source={buttonIcons[item]} className="w-7 h-7 mr-2" />
            <Text className="text-white text-lg font-bold">{item}</Text>
          </Button>
        ))}

        {/* Wylogowanie */}
        <Button className="rounded-lg bg-background flex flex-row justify-start" onPress={handleLogout}>
          <Image source={buttonIcons["Wyloguj"]} className="w-7 h-7 mr-2" />
          <Text className="text-primary text-lg font-bold">Wyloguj</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
