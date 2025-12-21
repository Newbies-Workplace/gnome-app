import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import BerryIcon from "@/assets/icons/berry-icon.svg";
import CameraIcon from "@/assets/icons/camera.svg";
import StoneIcon from "@/assets/icons/stone-icon.svg";
import WoodIcon from "@/assets/icons/wood-icon.svg";
import { GnomeImage } from "@/components/GnomeImage";
import { useGnomeStore } from "@/store/useGnomeStore";

interface InteractionSheetProps {
  onDismiss: () => void;
  gnomeId: string;
  gatheredResources?: {
    berries?: number;
    stones?: number;
    sticks?: number;
  };
}

const InteractionBottomSheet: React.FC<InteractionSheetProps> = ({
  onDismiss,
  gnomeId,
  gatheredResources,
}) => {
  const { t } = useTranslation();
  const gnome = useGnomeStore((state) =>
    state.gnomes.find((g) => g.id === gnomeId),
  );
  const router = useRouter();

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
      <BottomSheetView className="flex flex-col gap-3 px-4 pt-2 pb-12 z-10">
        <View className="flex items-center">
          <Text className="text-tekst font-bold text-xl">
            {t("addGnome.sheet.title")}
          </Text>
        </View>
        <View className="flex flex-row gap-3">
          <GnomeImage gnomeId={gnomeId} className="w-28 h-32 rounded-xl" />

          <View className="flex flex-col place-items-start">
            <Text className="text-tekst font-bold text-lg">{gnome?.name}</Text>

            {gatheredResources?.berries ? (
              <View className="flex flex-row items-center gap-1">
                <Text className="text-tekst font-bold text-lg">
                  +{gatheredResources?.berries}
                </Text>
                <BerryIcon width={18} height={18} />
              </View>
            ) : null}

            {gatheredResources?.stones ? (
              <View className="flex flex-row items-center gap-1">
                <Text className="text-tekst font-bold text-lg">
                  +{gatheredResources?.stones}
                </Text>
                <StoneIcon width={18} height={18} />
              </View>
            ) : null}

            {gatheredResources?.sticks ? (
              <View className="flex flex-row items-center gap-1">
                <Text className="text-tekst font-bold text-lg">
                  +{gatheredResources?.sticks}
                </Text>
                <WoodIcon width={18} height={18} />
              </View>
            ) : null}
          </View>
        </View>
        <View className="flex flex-row justify-center gap-4">
          <TouchableOpacity
            onPress={() => router.push(`/gnomes/${gnomeId}`)}
            className="bg-background py-2 px-8 rounded-lg"
          >
            <Text className="text-tekst text-lg">
              {t("addGnome.sheet.seeDetails")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/camera?gnomeId=${gnomeId}`)}
            className="bg-primary py-2 px-10 rounded-lg"
          >
            <View className="flex-row gap-2 items-center">
              <Text className="text-tekst text-lg">
                {t("addGnome.sheet.takePhoto")}
              </Text>
              <CameraIcon height={18} width={18} className={"text-tekst"} />
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default InteractionBottomSheet;
