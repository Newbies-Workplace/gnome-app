import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Portal } from "@rn-primitives/portal";
import { useRouter } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { colorScheme } from "nativewind";
import { useEffect, useRef } from "react";
import { Alert, Linking, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import LanguageIcon from "@/assets/icons/language.svg";
import ModeIcon from "@/assets/icons/mode.svg";
import NotificationsIcon from "@/assets/icons/notifications.svg";
import AccoutDeleteIcon from "@/assets/icons/security.svg";
import DeleteAccountBottomSheet from "@/components/settings-components/AccountDeleteBottomSheet";
import ThemeSelector from "@/components/settings-components/ThemeSelector";
import { SettingsOption } from "@/components/ui/SettingsOption";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { useAuthStore } from "@/store/useAuthStore";

function SettingsScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const deleteAccountBottomSheetRef = useRef<BottomSheet>(null);
  const themeBottomSheetRef = useRef<BottomSheet>(null);
  const languageBottomSheetRef = useRef<BottomSheet>(null);
  const { setColorScheme } = useColorScheme();
  const { deleteAccount } = useAuthStore();

  const handleAccountDelete = () => {
    Alert.alert(
      "Usuwanie konta",
      "Czy jesteś pewien tego ,że chcesz usunąć swoje konto?\n \nProces ten możebyć nie odwracalny i utracisz progres swojego konta!",
      [
        { text: "Anuluj", style: "cancel" },
        {
          text: "Usuń",
          onPress: () => {
            deleteAccount();
            router.replace("/welcome");
          },
        },
      ],
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7 text-tekst" />
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
      <Portal name={"bottom-sheets"}>
        <BottomSheet
          ref={themeBottomSheetRef}
          index={-1}
          enablePanDownToClose
          backgroundClassName={"bg-background"}
          handleIndicatorClassName={"bg-tekst w-24 mt-2 rounded-lg"}
        >
          <ThemeSelector
            colorScheme={colorScheme}
            setColorScheme={setColorScheme}
            themeBottomSheetRef={themeBottomSheetRef}
            setStatusBarStyle={setStatusBarStyle}
          />
        </BottomSheet>
        <BottomSheet
          ref={languageBottomSheetRef}
          index={-1}
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
        <DeleteAccountBottomSheet
          onDelete={() => {
            deleteAccount();
            router.replace("/welcome");
          }}
          deleteAccountBottomSheetRef={deleteAccountBottomSheetRef}
        />
      </Portal>
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
        <SettingsOption
          text="Usuń konto"
          image={AccoutDeleteIcon}
          onClick={() => {
            deleteAccountBottomSheetRef.current?.expand();
          }}
          customClass="mb-8 text-primary"
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
