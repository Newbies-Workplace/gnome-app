import { BottomSheetView } from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";
import AchievementLocked from "@/assets/icons/achievementLocked.svg";
import AchievementUnlocked from "@/assets/icons/achievementUnlocked.svg";
import { Achievement } from "@/components/Achievement";
import { useAchievementsStore } from "@/store/useAchievementsStore";

type AchievementDetailsBottomSheetProps = {
  achievementId: string;
};

export const AchievementDetailsBottomSheet: React.FC<
  AchievementDetailsBottomSheetProps
> = ({ achievementId }) => {
  const { t } = useTranslation();
  const achievement = useAchievementsStore((state) =>
    state.achievements.find((ach) => ach.id === achievementId),
  );
  const userAchievement = useAchievementsStore((state) =>
    state.userAchievements.find((ua) => ua.achievement.id === achievementId),
  );

  if (!achievement) {
    return (
      <BottomSheetView className={"p-4"}>
        <ActivityIndicator />
      </BottomSheetView>
    );
  }

  return (
    <BottomSheetView className="p-4">
      <View className="flex-row">
        <Achievement />
        <View className="w-2/3 gap-2">
          <Text className="text-xs text-tekst">{achievement.name}</Text>
          <Text className="text-xs text-tekst/50">
            {achievement.description}
          </Text>
          <View className="flex-row gap-2 items-center">
            {userAchievement?.earnedAt ? (
              <>
                <AchievementUnlocked className="size-5 text-tekst" />
                <Text className="pt-0.5 text-xs  text-tekst">
                  {dayjs(userAchievement.earnedAt).format("DD.MM.YYYY")}
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
  );
};
