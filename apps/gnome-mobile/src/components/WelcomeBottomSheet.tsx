import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, View } from "react-native";

export const WelcomeBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
      <BottomSheetView>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
};
