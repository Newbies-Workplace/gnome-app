import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text, View } from "react-native";
import CloseIcon from "@/assets/icons/close.svg";
import { Button } from "./ui/button";

export const ConfirmDialog = ({
  title,
  description,
  onDecline,
  onConfirm,
  declineText = "Anuluj",
  confirmContent = (
    <>
      <Text className="text-tekst">Potwierdź</Text>
    </>
  ),
}: {
  title: string;
  description?: string;
  declineText?: string;
  confirmContent?: React.ReactNode;

  onDecline: () => void;
  onConfirm: () => void;
}) => {
  return (
    <BottomSheetView className="gap-4 p-10">
      <Text className="text-tekst font-bold text-lg">{title}</Text>
      {description && (
        <Text className="text-tekst font-bold text-lg">{description}</Text>
      )}
      <View className="w-full flex-row gap-4">
        <Button
          onPress={onDecline}
          style={{ backgroundColor: "hsl(0, 0%, 17%)" }}
          className="flex-1 w-full flex-row gap-2 iteems-center"
        >
          <Text className="text-white">{declineText}</Text>
          <CloseIcon width={16} height={16} />
        </Button>
        <Button
          onPress={onConfirm}
          className="flex-1 w-full flex-row gap-2 iteems-center"
        >
          {confirmContent}
        </Button>
      </View>
    </BottomSheetView>
  );
};
