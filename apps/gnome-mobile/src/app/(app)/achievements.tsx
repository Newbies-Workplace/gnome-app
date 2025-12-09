import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { useAchievementsStore } from "@/store/useAchievementsStore";

export default function AchivementScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { achivements, userAchivements, fetchUserAchivements } =
    useAchievementsStore();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="px-5" onPress={() => router.back()}>
          <ArrowLeft className="size-7 text-tekst" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-tekst font-bold text-2xl text-center tracking-wide">
          Odznaki
        </Text>
      ),
      headerTitleAlign: "center",
      headerBackground: () => (
        <View className="absolute inset-0 bg-primary-foreground" />
      ),
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation, router]);

  useEffect(() => {
    fetchUserAchivements();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>jeszcze raz</Text>
      </View>
    </SafeAreaView>
  );
}
