import { GnomeResponse } from "@repo/shared/responses";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  SectionList,
  SectionListRenderItem,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "@/components/LoadingScreen";
import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeImageStore } from "@/store/useGnomeImageStore";
import { useGnomeStore } from "@/store/useGnomeStore";

const Collection = () => {
  const { t } = useTranslation();
  const { gnomes, interactions, error } = useGnomeStore();
  const { getImageForGnome } = useGnomeImageStore();
  const router = useRouter();
  const navigation = useNavigation();
  const collectedGnomeIds = interactions.map((i) => i.gnomeId);
  const collectedGnomes = gnomes.filter((g) =>
    collectedGnomeIds.includes(g.id),
  );
  const uncollectedGnomes = gnomes.filter(
    (g) => !collectedGnomeIds.includes(g.id),
  );
  const gnomeSectionsData = [
    { title: t("collection.collectedGnomes"), data: collectedGnomes },
    { title: t("collection.uncollectedGnomes"), data: uncollectedGnomes },
  ];

  const renderGnome = (gnome: { id: string; name: string }) => {
    const img = getImageForGnome(gnome.id);
    return (
      <View className="w-1/3" key={gnome.id}>
        <GnomeCard
          gnomeId={gnome.id}
          text={gnome.name}
          onClick={() => router.push(`/gnomes/${gnome.id}`)}
          interaction={{
            found: !!img,
            userPicture: img?.assetUri,
          }}
        />
      </View>
    );
  };

  const renderItemList: SectionListRenderItem<GnomeResponse> = ({
    section,
    index,
  }) => {
    if (index % 3 !== 0) {
      return null;
    }

    const item = section.data[index];
    const middleItem = section.data[index + 1];
    const lastItem = section.data[index + 2];

    return (
      <View className="flex-row">
        {renderGnome(item)}
        {middleItem && renderGnome(middleItem)}
        {lastItem && renderGnome(lastItem)}
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="flex justify-center">
          <Text className="text-tekst text-2xl font-bold">
            {t("collection.yourCollection")}
          </Text>
        </View>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#131413",
      },
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation, t]);

  return (
    <SafeAreaView className={"flex-1 bg-primary-foreground"}>
      <SectionList
        sections={gnomeSectionsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItemList}
        renderSectionHeader={({ section: { title } }) => (
          <SectionTitle>{title}</SectionTitle>
        )}
        ListEmptyComponent={() =>
          error ? (
            <Text className="text-tekst">{t("common.genericError")}</Text>
          ) : (
            <LoadingScreen />
          )
        }
      />
    </SafeAreaView>
  );
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text className="text-tekst font-bold text-lg">{children}</Text>;
}

export default Collection;
