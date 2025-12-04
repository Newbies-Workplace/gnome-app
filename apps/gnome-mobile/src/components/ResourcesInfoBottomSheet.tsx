import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BerryIcon from "@/assets/icons/berry-icon.svg";
import StoneIcon from "@/assets/icons/stone-icon.svg";
import WoodIcon from "@/assets/icons/wood-icon.svg";
import StandingGnomeImage from "@/assets/images/StandingGnome.svg";

interface ResourcesBottomSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
  onClose?: () => void;
}

const ResourcesBottomSheet: React.FC<ResourcesBottomSheetProps> = ({
  sheetRef,
  onClose,
}) => {
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
      backgroundClassName="bg-background"
      handleIndicatorClassName="bg-tekst w-20 mt-2 rounded-lg"
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={renderBackdrop}
      ref={sheetRef}
    >
      <BottomSheetView className="flex flex-col gap-3 px-4 pt-2 pb-14 z-10">
        <Text className="text-tekst font-bold text-2xl">Surowce</Text>
        <View className="flex flex-col gap-1">
          <Text className="text-tekst font-bold text-lg">
            Podstawowe zasoby takie jak:{" "}
          </Text>
          <View className="flex flex-row gap-5 px-2">
            <View className="flex-row items-center gap-1">
              <BerryIcon width={20} height={20} />
              <Text className="text-violet-700 text-lg font-bold">jagody</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <StoneIcon width={20} height={20} />
              <Text className="text-gray-600 text-lg font-bold">kamienie</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <WoodIcon width={20} height={20} />
              <Text className="text-amber-900 text-lg font-bold">drewno</Text>
            </View>
          </View>
          <Text className="text-tekst font-bold text-lg">
            zbierzesz podczas zdobywania krasnali
          </Text>
        </View>
        <Text className="text-tekst font-bold text-lg">
          możesz je wydać na budowle oraz ulepszenia!
        </Text>
        <View className="absolute top-0 right-5">
          <StandingGnomeImage width={80} height={80} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ResourcesBottomSheet;
