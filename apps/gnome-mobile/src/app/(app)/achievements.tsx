import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AchievementLocked from "@/assets/icons/achievementLocked.svg";
import AchievementUnlocked from "@/assets/icons/achievementUnlocked.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Achievement } from "@/components/Achievement";
import { useAchievementsStore } from "@/store/useAchievementsStore";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

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
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="px-5" onPress={() => router.back()}>
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

  const handleAchievementChange = (achievement: AchievementType) => {
    achievementRef.current?.present();
    setSelectedAchivement(achievement);
  };

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <>
      <View className="bg-primary-foreground h-full p-4">
        <FlatList
          data={achivements}
          columnWrapperStyle={{ justifyContent: "flex-start" }}
          contentContainerStyle={{ gap: 16 }}
          numColumns={3}
          renderItem={({ item }) => {
            const isEarned = userAchivements.find(
              (ach) => ach.achievement.id === item.id
            );

            if (isEarned) {
              return (
                <Achievement
                  onPress={() =>
                    handleAchievementChange({
                      ...item,
                      earnedAt: isEarned.earnedAt,
                    })
                  }
                  title={isEarned.achievement.name}
                />
              );
            }

            return (
              <Achievement
                onPress={() => handleAchievementChange(item)}
                title={item.name}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <BottomSheetModal
        handleIndicatorClassName={"bg-tekst w-24 mt-2 rounded-lg"}
        backgroundClassName={"bg-background"}
        ref={achievementRef}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        onDismiss={achievementRef.current?.close}
      >
        <BottomSheetView className="p-4">
          <View className="flex-row">
            <Achievement />
            <View className="w-2/3 gap-2">
              <Text className="text-xs text-tekst">
                {selectedAchivement?.name}
              </Text>
              <Text className="text-xs text-tekst/50">
                {selectedAchivement?.description}
              </Text>
              <View className="flex-row gap-2 items-center">
                {selectedAchivement?.earnedAt ? (
                  <>
                    <AchievementUnlocked className="size-5 text-tekst" />
                    <Text className="pt-0.5 text-xs  text-tekst">
                      {dayjs(selectedAchivement.earnedAt).format("DD.MM.YYYY")}
                    </Text>
                  </>
                ) : (
                  <>
                    <AchievementLocked className="size-5 text-tekst" />
                    <Text className="pt-0.5 text-xs  text-tekst">
                      {t("achievements.notEarnedYet")}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
