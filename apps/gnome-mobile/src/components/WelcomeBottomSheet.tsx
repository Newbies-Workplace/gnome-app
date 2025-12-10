import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import StandingGnomeImage from "@/assets/images/StandingGnome.svg";

export const WelcomeBottomSheet = ({
  setIsFirstAppEntryToFalse,
}: {
  setIsFirstAppEntryToFalse: () => void;
}) => {
  const { t } = useTranslation();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClose = () => {
    if (!setIsFirstAppEntryToFalse)
      throw new Error("setIsFirstAppEntryToFalse is not defined");

    setIsFirstAppEntryToFalse();
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      backgroundClassName="bg-primary-foreground"
      handleIndicatorClassName="bg-tekst w-20 mt-2 rounded-lg"
      enablePanDownToClose
      onClose={handleClose}
      ref={bottomSheetRef}
    >
      <BottomSheetView className="relative flex flex-col items-center px-10 pt-10 pb-32 gap-6 z-10">
        <Text className="text-center text-[16px] text-tekst font-bold">
          {t("welcome.sheet.title")}
        </Text>
        <Text className="text-center text-[16px] text-tekst font-bold">
          {t("welcome.sheet.description")}
        </Text>
        <View className="absolute bottom-5 right-5">
          <StandingGnomeImage width={80} height={80} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
