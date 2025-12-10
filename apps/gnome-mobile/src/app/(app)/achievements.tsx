import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Achievement } from "@/components/Achievements";
import { useAchievementsStore } from "@/store/useAchievementsStore";

export default function AchivementScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { achivements, userAchivements } = useAchievementsStore();

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

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={achivements}
          columnWrapperStyle={{ justifyContent: "flex-start" }}
          numColumns={3}
          renderItem={({ item }) => <Achievement title={item.name} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
