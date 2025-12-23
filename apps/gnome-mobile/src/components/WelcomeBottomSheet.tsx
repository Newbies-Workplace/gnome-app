import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import StandingGnomeImage from "@/assets/images/StandingGnome.svg";
import { BottomSheetWrapper } from "./BottomSheetWrapper";

export const WelcomeBottomSheet = ({
  setIsFirstAppEntryToFalse,
}: {
  setIsFirstAppEntryToFalse: () => void;
}) => {
  const { t } = useTranslation();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleClose = () => {
    if (!setIsFirstAppEntryToFalse)
      throw new Error("setIsFirstAppEntryToFalse is not defined");

    setIsFirstAppEntryToFalse();
    bottomSheetRef.current?.dismiss();
  };

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <BottomSheetWrapper onDismiss={handleClose} ref={bottomSheetRef}>
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
    </BottomSheetWrapper>
  );
};
