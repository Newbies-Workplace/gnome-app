import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Achievement } from "@/components/Achievement";
import { AchievementDetailsBottomSheet } from "@/components/AchievementDetailsBottomSheet";
import { BottomSheetWrapper } from "@/components/BottomSheetWrapper";
import { useAchievementsStore } from "@/store/useAchievementsStore";

export default function AchievementScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { achievements } = useAchievementsStore();
  const [selectedAchievementId, setSelectedAchievementId] = useState<string>();
  const { t } = useTranslation();
  const achivementRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          className="px-5"
          onPress={() => {
            router.back();
          }}
        >
          <ArrowLeft className="size-7 text-tekst" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-tekst font-bold text-2xl text-center tracking-wide">
          {t("achievements.title")}
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
      <View className="bg-primary-foreground h-full p-4">
        <FlatList
          data={achievements}
          columnWrapperClassName={"justify-start"}
          contentContainerClassName={"gap-4"}
          numColumns={3}
          renderItem={({ item }) => (
            <Achievement
              onPress={() => {
                setSelectedAchievementId(item.id);
                achivementRef.current?.present();
              }}
              title={item.name}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <BottomSheetWrapper
        ref={achivementRef}
        onDismiss={() => setSelectedAchievementId(undefined)}
      >
        <AchievementDetailsBottomSheet achievementId={selectedAchievementId!} />
      </BottomSheetWrapper>
    </>
  );
}
