import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { colorScheme } from "nativewind";
import { useEffect, useMemo, useRef } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import LanguageIcon from "@/assets/icons/language.svg";
import ModeIcon from "@/assets/icons/mode.svg";
import NotificationsIcon from "@/assets/icons/notifications.svg";
import { SettingsOption } from "@/components/ui/SettingsOption";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";

function SettingsScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const themeBottomSheetRef = useRef<BottomSheet>(null);
  const languageBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "30%"], []);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7 " color={"gray"} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-tekst text-2xl font-bold text-center tracking-wide">
          USTAWIENIA
        </Text>
      ),
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerBackground: () => (
        <View className="absolute inset-0 bg-primary-foreground" />
      ),
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
        backgroundClassName={"bg-background"}
        handleIndicatorClassName={"bg-tekst w-24 mt-2 rounded-lg"}
      >
        <BottomSheetView className="w-full px-6 py-6">
          <TouchableOpacity
            className="py-4 border-b border-tekst flex-row justify-between items-center"
            onPress={() => {
              setColorScheme?.("dark");
              themeBottomSheetRef.current?.close();
              setStatusBarStyle("light");
            }}
          >
            <Text className="text-tekst text-xl font-bold">Ciemny</Text>
            {colorScheme.get?.() === "dark" && (
              <Text className="text-tekst text-xl">✓</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="py-4 flex-row justify-between items-center"
            onPress={() => {
              setColorScheme?.("light");
              themeBottomSheetRef.current?.close();
              setStatusBarStyle("dark");
            }}
          >
            <Text className="text-tekst text-xl font-bold">Jasny</Text>
            {colorScheme.get?.() === "light" && (
              <Text className="text-tekst text-xl">✓</Text>
            )}
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        ref={languageBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundClassName={"bg-background"}
        handleIndicatorClassName={"bg-tekst w-24 mt-2 rounded-lg"}
      >
        <BottomSheetView className="w-full px-6 py-6">
          <View className="py-4 border-b border-tekst">
            <Text
              className="text-tekst text-xl font-bold"
              onPress={() => {
                // TODO: set language to Polish
                languageBottomSheetRef.current?.close();
              }}
            >
              Polski
            </Text>
          </View>

          <View className="py-4 border-b border-tekst">
            <Text
              className="text-tekst text-xl font-bold"
              onPress={() => {
                // TODO: set language to English
                languageBottomSheetRef.current?.close();
              }}
            >
              English
            </Text>
          </View>

          <View className="py-4">
            <Text
              className="text-tekst text-xl font-bold"
              onPress={() => {
                // TODO: set language to Deutsch
                languageBottomSheetRef.current?.close();
              }}
            >
              Deutsch
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <View className="w-full px-4 mt-4">
        <SettingsOption
          text="Motyw"
          image={ModeIcon}
          onClick={() => {
            languageBottomSheetRef.current?.close();
            themeBottomSheetRef.current?.expand();
          }}
          customClass="mb-8"
        />
        <SettingsOption
          text="Powiadomienia"
          image={NotificationsIcon}
          onClick={() => Linking.openSettings()}
          customClass="mb-8"
        />
        <SettingsOption
          text="Język"
          image={LanguageIcon}
          onClick={() => {
            themeBottomSheetRef.current?.close();
            languageBottomSheetRef.current?.expand();
          }}
          extraText="Polski"
          customClass="mb-8"
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
