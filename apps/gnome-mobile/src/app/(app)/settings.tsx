import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import LanguageIcon from "@/assets/icons/language.svg";
import ModeIcon from "@/assets/icons/mode.svg";
import AccoutDeleteIcon from "@/assets/icons/security.svg";
import { BottomSheetWrapper } from "@/components/BottomSheetWrapper";
import DeleteAccountBottomSheet from "@/components/settings-components/AccountDeleteBottomSheet";
import { LanguageSelector } from "@/components/settings-components/LanguageSelector";
import ThemeSelectorBottomSheet from "@/components/settings-components/ThemeSelectorBottomSheet";
import { SettingsOption } from "@/components/ui/SettingsOption";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthStore } from "@/store/useAuthStore";

function SettingsScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation();
  const deleteAccountBottomSheetRef = useRef<BottomSheetModal>(null);
  const themeBottomSheetRef = useRef<BottomSheetModal>(null);
  const languageBottomSheetRef = useRef<BottomSheetModal>(null);
  const { deleteAccount } = useAuthStore();
  const { theme } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7 text-tekst" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-tekst text-2xl font-bold text-center tracking-wide">
          {t("settings.title")}
        </Text>
      ),
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerBackground: () => (
        <View className="absolute inset-0 bg-primary-foreground" />
      ),
      headerShown: true,
    });
  }, [navigation, router, t]);

  return (
    <SafeAreaView className="flex-1 bg-primary-foreground">
      <View className="w-full px-4 mt-4">
        <SettingsOption
          text={t("settings.theme.title")}
          image={ModeIcon}
          onClick={() => {
            languageBottomSheetRef.current?.dismiss();
            themeBottomSheetRef.current?.present();
            deleteAccountBottomSheetRef.current?.dismiss();
          }}
          extraText={t(`settings.theme.${theme}`)}
          customClass="mb-4"
        />
        <SettingsOption
          text={t("settings.language")}
          image={LanguageIcon}
          onClick={() => {
            themeBottomSheetRef.current?.dismiss();
            languageBottomSheetRef.current?.present();
            deleteAccountBottomSheetRef.current?.dismiss();
          }}
          extraText={t("settings.languageTitle")}
          customClass="mb-4"
        />
        <SettingsOption
          text={t("settings.deleteAccount.title")}
          image={AccoutDeleteIcon}
          onClick={() => {
            deleteAccountBottomSheetRef.current?.present();
            themeBottomSheetRef.current?.dismiss();
            languageBottomSheetRef.current?.dismiss();
          }}
          customClass="mb-8 text-primary"
        />
      </View>

      <BottomSheetWrapper ref={themeBottomSheetRef}>
        <ThemeSelectorBottomSheet
          onDismiss={() => {
            themeBottomSheetRef.current?.dismiss();
          }}
        />
      </BottomSheetWrapper>
      <BottomSheetWrapper ref={languageBottomSheetRef}>
        <LanguageSelector
          onDismiss={() => {
            languageBottomSheetRef.current?.dismiss();
          }}
        />
      </BottomSheetWrapper>
      <BottomSheetWrapper ref={deleteAccountBottomSheetRef}>
        <DeleteAccountBottomSheet
          onDelete={() => {
            deleteAccount();
            router.replace("/welcome");
          }}
          onDismiss={() => {
            deleteAccountBottomSheetRef.current?.dismiss();
          }}
        />
      </BottomSheetWrapper>
    </SafeAreaView>
  );
}

export default SettingsScreen;
