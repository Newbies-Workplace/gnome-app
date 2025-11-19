import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import LanguageIcon from "@/assets/icons/language.svg";
import ModeIcon from "@/assets/icons/mode.svg";
import { SettingsOption } from "@/components/ui/SettingsOption";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";

function SettingsScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const themeBottomSheetRef = useRef<BottomSheet>(null);
  const languageBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "30%"], []);
  const { toggleColorScheme } = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-white text-2xl font-bold text-center tracking-wide">
          USTAWIENIA
        </Text>
      ),
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#1E201E" },
      headerShown: true,
    });
  }, [navigation, router]);

  return (
    <SafeAreaView className="flex-1 bg-primary-foreground">
      <BottomSheet
        ref={themeBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "#1E201E" }}
        handleIndicatorStyle={{
          backgroundColor: "#D9D9D9",
          width: 94,
          marginTop: 8,
          borderRadius: 4,
        }}
      >
        <BottomSheetView className="w-full px-6 py-6">
          <View className="py-4 border-b border-gray-700">
            <Text className="text-white text-xl" onPress={toggleColorScheme}>
              Ciemny
            </Text>
          </View>

          <View className="py-4">
            <Text className="text-white text-xl">Jasny</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={languageBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "#1E201E" }}
        handleIndicatorStyle={{
          backgroundColor: "#D9D9D9",
          width: 94,
          marginTop: 8,
          borderRadius: 4,
        }}
      >
        <BottomSheetView className="w-full px-6 py-6">
          <View className="py-4 border-b border-gray-700">
            <Text className="text-white text-xl">Polski</Text>
          </View>

          <View className="py-4 border-b border-gray-700">
            <Text className="text-white text-xl">English</Text>
          </View>

          <View className="py-4">
            <Text className="text-white text-xl">Deutsch</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <View className="w-full px-4 mt-4">
        <SettingsOption
          text="Motyw"
          image={ModeIcon}
          onClick={() => themeBottomSheetRef.current?.expand()}
          customClass="mb-8"
        />
        <SettingsOption
          text="Język"
          image={LanguageIcon}
          onClick={() => languageBottomSheetRef.current?.expand()}
          extraText="Polski"
          customClass="mb-8"
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
