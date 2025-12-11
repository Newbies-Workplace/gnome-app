import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Achievement } from "@/components/Achievement";
import { useAchievementsStore } from "@/store/useAchievementsStore";

type AchievementType = {
  id: string;
  name: string;
  description: string;
  earnedAt?: Date;
};

export default function AchivementScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { achivements, userAchivements } = useAchievementsStore();
  const achievementRef = useRef<BottomSheetModal>(null);
  const [selectedAchivement, setSelectedAchivement] =
    useState<AchievementType | null>(null);

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
    <>
      <SafeAreaView>
        <FlatList
          data={achivements}
          columnWrapperStyle={{ justifyContent: "flex-start" }}
          numColumns={3}
          renderItem={({ item }) => {
            const isEarned = userAchivements.find(
              (ach) => ach.achievement.id === item.id,
            );

            if (isEarned) {
              return (
                <Achievement
                  onPress={() => {
                    setSelectedAchivement({
                      ...item,
                      earnedAt: isEarned.earnedAt,
                    });
                    achievementRef.current?.present();
                  }}
                  title={isEarned.achievement.name}
                />
              );
            }

            return (
              <Achievement
                onPress={() => setSelectedAchivement(item)}
                title={item.name}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <BottomSheet
        handleIndicatorClassName={"bg-tekst w-24 mt-2 rounded-lg"}
        backgroundClassName={"bg-background"}
        ref={achievementRef}
        enableDismissOnClose
        onDismiss={achievementRef.current?.close}
      >
        <BottomSheetView className="pr-10">
          <View className="flex-row">
            <Achievement />
            <View>
              <Text>{selectedAchivement?.name}</Text>
              <Text>{selectedAchivement?.description}</Text>
              {selectedAchivement?.earnedAt && (
                <Text>
                  {dayjs(selectedAchivement.earnedAt).format("DD.MM.YYYY")}
                </Text>
              )}
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
