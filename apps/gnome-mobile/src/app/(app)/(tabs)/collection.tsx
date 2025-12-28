import { GnomeResponse } from "@repo/shared/responses";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionList, SectionListRenderItem, Text, View } from "react-native";
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
  const collectedGnomeIds = useMemo(
    () => interactions.map((i) => i.gnomeId),
    [interactions],
  );
  const collectedGnomes = useMemo(
    () => gnomes.filter((g) => collectedGnomeIds.includes(g.id)),
    [gnomes, collectedGnomeIds],
  );
  const uncollectedGnomes = useMemo(
    () => gnomes.filter((g) => !collectedGnomeIds.includes(g.id)),
    [gnomes, collectedGnomeIds],
  );

  const gnomeSectionsData = useMemo(
    () => [
      { title: t("collection.collectedGnomes"), data: collectedGnomes },
      { title: t("collection.uncollectedGnomes"), data: uncollectedGnomes },
    ],
    [t, collectedGnomes, uncollectedGnomes],
  );

  const renderGnome = (gnome: GnomeResponse) => {
    const img = getImageForGnome(gnome.id);
    return (
      <View className="w-1/3 h-48" key={gnome.id}>
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

  return (
    <SafeAreaView className="bg-primary-foreground">
      <SectionList
        sections={gnomeSectionsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItemList}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-tekst font-bold text-lg">{title}</Text>
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

export default Collection;
