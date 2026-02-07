import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import CloseIcon from "@/assets/icons/close.svg";
import { Button } from "./ui/button";

export const ConfirmDialog = ({
  title,
  description,
  onDecline,
  onConfirm,
  confirmContent,
}: {
  title: string;
  description?: string;
  declineText?: string;
  confirmContent?: React.ReactNode;

  onDecline: () => void;
  onConfirm: () => void;
}) => {
  const { t } = useTranslation();

  const confirmContentDefault = (
    <Text className="text-tekst">{t("common.confirm")}</Text>
  );

  return (
    <BottomSheetView className="gap-4 p-10">
      <Text className="text-tekst font-bold text-lg">{title}</Text>

      {description && (
        <Text className="text-tekst font-bold text-lg">{description}</Text>
      )}

      <View className="w-full flex-row gap-4">
        <Button
          onPress={onDecline}
          className="flex-1 w-full flex-row gap-2 iteems-center bg-primary-foreground"
        >
          <Text className="text-tekst">{t("common.cancel")}</Text>
          <CloseIcon width={20} height={20} className="text-tekst" />
        </Button>

        <Button
          onPress={onConfirm}
          className="flex-1 w-full flex-row gap-2 items-center"
        >
          {confirmContent ? confirmContent : confirmContentDefault}
        </Button>
      </View>
    </BottomSheetView>
  );
};
