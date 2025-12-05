import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import BerryIcon from "@/assets/icons/berry-icon.svg";
import CameraIcon from "@/assets/icons/camera.svg";
import StoneIcon from "@/assets/icons/stone-icon.svg";
import WoodIcon from "@/assets/icons/wood-icon.svg";
import { getClosestGnome } from "@/lib/getClosestGnome";

const placeholder = require("@/assets/images/placeholder.png");

interface InteractionSheetProps {
  onClose: () => void;
  name?: string;
  pictureUrl?: string;
  gnomeId: string;
  gatheredResources?: {
    berries?: number;
    stones?: number;
    sticks?: number;
  };
}

const InteractionBottomSheet: React.FC<InteractionSheetProps> = ({
  onClose,
  name,
  pictureUrl,
  gnomeId,
  gatheredResources,
}) => {
  const router = useRouter();
  const { navigate } = useRouter();
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
      onClose={onClose}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView className="flex flex-col gap-3 px-4 pt-2 pb-12 z-10">
        <View className="flex items-center">
          <Text className="text-tekst font-bold text-xl">
            Nowy krasnal dołączył do twojej kolekcji
          </Text>
        </View>
        <View className="flex flex-row gap-3">
          <Image
            className="w-28 h-32 rounded-xl"
            source={pictureUrl ? { uri: pictureUrl } : placeholder}
          />
          <View className="flex flex-col place-items-start">
            <Text className="text-tekst font-bold text-lg">{name}</Text>
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
            <Text className="text-tekst text-lg">Sprawdź szczegóły</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate(`/camera?gnomeid=${gnomeId}`)}
            className="bg-primary py-2 px-10 rounded-lg"
          >
            <View className="flex-row gap-2 items-center">
              <Text className="text-tekst text-lg">Zrób zdjęcie</Text>
              <CameraIcon height={18} width={18} className={"text-tekst"} />
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default InteractionBottomSheet;
