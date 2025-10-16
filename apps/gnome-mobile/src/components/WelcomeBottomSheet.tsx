import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import StandingGnomeImage from "@/assets/images/StandingGnome.svg";

export const WelcomeBottomSheet = ({
  setIsFirstAppEntryToFalse,
}: {
  setIsFirstAppEntryToFalse: () => void;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClose = () => {
    if (!setIsFirstAppEntryToFalse)
      throw new Error("setIsFirstAppEntryToFalse is not defined");

    setIsFirstAppEntryToFalse();
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: "#1E201E" }}
      handleIndicatorStyle={{
        backgroundColor: "#FFFFFF",
        width: 100,
        marginTop: 8,
      }}
      enablePanDownToClose
      onClose={handleClose}
      ref={bottomSheetRef}
    >
      <BottomSheetView className="relative flex flex-col items-center px-10 pt-10 pb-32 gap-6 z-10">
        <Text className="text-center text-[16px] text-white font-bold">
          <Text className="text-primary">WITAJ W PRZYGODZIE</Text> Z
          WROCŁAWSKIMI KRASNALAMI!
        </Text>
        <Text className="text-center text-[16px] text-white font-bold">
          Twoim zadaniem jest porwanie czapek z głów wszystkich krasnali! Po
          zbliżeniu się na mapię do krasnala pojawi się opcja z przeciągnięciem
          na pasku jego czapki. Uzbieraj jak największą kolekcję gnomów ze
          swoimi unikatowymi zdjęciami.{" "}
          <Text className="text-primary">Wyrusz na poszukiwania!</Text>
        </Text>
        <View className="absolute bottom-5 right-5">
          <StandingGnomeImage width={80} height={80} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
