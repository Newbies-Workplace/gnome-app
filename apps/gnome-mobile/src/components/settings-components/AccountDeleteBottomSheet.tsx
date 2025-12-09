import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CancelIcon from "@/assets/icons/close.svg";
import TrashcanIcon from "@/assets/icons/trashcan.svg";
import { Button } from "../ui/button";

interface DeleteAccountBottomSheetProps {
  onDelete: () => void;
  deleteAccountBottomSheetRef: React.RefObject<any>;
}

export const DeleteAccountBottomSheet: React.FC<
  DeleteAccountBottomSheetProps
> = ({ onDelete, deleteAccountBottomSheetRef }) => {
  const closeSheet = () => {
    deleteAccountBottomSheetRef.current?.close();
  };
  const [confirmation, setConfirmation] = useState("");
  const canDelete = confirmation.trim().toLowerCase() === "zgadzam się";

  return (
    <BottomSheet
      ref={deleteAccountBottomSheetRef}
      index={-1}
      enablePanDownToClose
      backgroundClassName={"bg-background"}
      handleIndicatorClassName={"bg-tekst w-24 mt-2 rounded-lg"}
    >
      <BottomSheetView className="px-5 py-4">
        <SafeAreaView className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-tekst mb-2 text-center">
            Czy na pewno chcesz usunąć konto?
          </Text>

          <Text className="text-base text-tekst mb-8 text-center">
            Cały Twój postęp zostanie bezpowrotnie usunięty!
          </Text>

          <BottomSheetTextInput
            placeholder={`Wpisz "zgadzam się"`}
            onChangeText={setConfirmation}
            value={confirmation}
            className="border border-muted rounded-2xl px-3 py-2 text-tekst mb-5 w-full"
          />

          <View className="flex-row gap-4 w-full">
            <Button
              className="flex-1 flex-row gap-2 items-center bg-primary-foreground justify-center"
              onPress={() => {
                closeSheet();
                Keyboard.dismiss();
              }}
            >
              <CancelIcon className="w-7 h-7 text-tekst" />
              <Text className="text-tekst">Anuluj</Text>
            </Button>

            <Button
              className={`flex-1 flex-row gap-2 items-center justify-center ${
                canDelete ? "bg-primary" : "bg-primary"
              }`}
              disabled={!canDelete}
              onPress={() => {
                onDelete();
                closeSheet();
              }}
            >
              <TrashcanIcon className="w-7 h-7 text-tekst" />
              <Text className="text-tekst">Usuń</Text>
            </Button>
          </View>
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default DeleteAccountBottomSheet;
