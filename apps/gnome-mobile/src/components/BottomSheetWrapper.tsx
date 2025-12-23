import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useCallback } from "react";

export function BottomSheetWrapper({
  children,
  ref,
  onDismiss,
}: {
  children: React.ReactNode;
  ref: React.RefObject<BottomSheetModal | null>;
  onDismiss?: () => void;
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
      handleIndicatorClassName="bg-tekst w-24 mt-2 rounded-lg"
      backgroundClassName="bg-background"
      ref={ref}
      backdropComponent={renderBackdrop}
      enableDismissOnClose
      enablePanDownToClose
      onDismiss={() => onDismiss?.()}
    >
      {children}
    </BottomSheetModal>
  );
}
