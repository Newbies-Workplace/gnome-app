import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import BerryIcon from "@/assets/icons/berry-icon.svg";
import StoneIcon from "@/assets/icons/stone-icon.svg";
import WoodIcon from "@/assets/icons/wood-icon.svg";
import StandingGnomeImage from "@/assets/images/StandingGnome.svg";

interface ResourcesBottomSheetProps {
  onDismiss?: () => void;
}

const ResourcesBottomSheet: React.FC<ResourcesBottomSheetProps> = ({
  onDismiss,
}) => {
  const { t } = useTranslation();
  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );

  return (
    <BottomSheet
      backgroundClassName="bg-primary-foreground"
      handleIndicatorClassName="bg-tekst w-20 mt-2 rounded-lg"
      enablePanDownToClose
      onClose={onDismiss}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView className="flex flex-col gap-3 px-4 pt-2 pb-14 z-10">
        <Text className="text-tekst font-bold text-2xl">
          {t("resources.title")}
        </Text>
        <View className="flex flex-col gap-1">
          <Text className="text-tekst font-bold text-lg">
            {t("resources.description")}
          </Text>

          <View className="flex flex-col gap-5 px-2">
            <View className="flex-row items-center gap-1">
              <BerryIcon width={20} height={20} />
              <Text className="text-violet-700 text-lg font-bold">
                {t("resources.berries")}
              </Text>
            </View>

            <View className="flex-row items-center gap-1">
              <StoneIcon width={20} height={20} />
              <Text className="text-gray-600 text-lg font-bold">
                {t("resources.stones")}
              </Text>
            </View>

            <View className="flex-row items-center gap-1">
              <WoodIcon width={20} height={20} />
              <Text className="text-amber-900 text-lg font-bold">
                {t("resources.sticks")}
              </Text>
            </View>
          </View>

          <Text className="text-tekst font-bold text-lg">
            {t("resources.description2")}
          </Text>
        </View>
        <Text className="text-tekst font-bold text-lg">
          {t("resources.description3")}
        </Text>
        <View className="absolute top-0 right-5">
          <StandingGnomeImage width={80} height={80} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ResourcesBottomSheet;
