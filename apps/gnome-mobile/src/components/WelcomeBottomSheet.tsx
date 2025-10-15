import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const WelcomeBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
      <BottomSheetView className="flex flex-col items-center p-5 z-10">
        <Text>Witaj Kolego 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
};
