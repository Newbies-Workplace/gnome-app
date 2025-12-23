import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

import { useCallback } from "react";
import { StyleSheet } from "react-native";

export function BottomSheetWrapper({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref: React.RefObject<BottomSheetModal | null>;
}) {
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: "bg-background" }}
      ref={ref}
      backdropComponent={renderBackdrop}
      enableDismissOnClose
      onDismiss={ref.current?.close}
    >
      {children}
    </BottomSheetModal>
  );
}
