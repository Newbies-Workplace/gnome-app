import de from "@locales/de/translation.json";
import en from "@locales/en/translation.json";
import kr from "@locales/kr/translation.json";
import pl from "@locales/pl/translation.json";
import ua from "@locales/ua/translation.json";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pl: { translation: pl },
  en: { translation: en },
  ua: { translation: ua },
  de: { translation: de },
  kr: { translation: kr },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = getLocales()[0].languageCode;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources: resources,

    lng: savedLanguage ?? undefined,
    fallbackLng: ["en", "dev"],

    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (lang: string) => {
  await AsyncStorage.setItem("language", lang);
  i18n.changeLanguage(lang);
};

initI18n();

export default i18n;
