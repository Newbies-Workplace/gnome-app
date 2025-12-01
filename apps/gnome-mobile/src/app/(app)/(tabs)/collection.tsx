import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "@/components/LoadingScreen";
import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeImageStore } from "@/store/useGnomeImageStore";
import { useGnomeStore } from "@/store/useGnomeStore";

const Collection = () => {
  const { gnomes, fetchGnomes, interactions, fetchMyInteractions, error } =
    useGnomeStore();
  const { getImageForGnome } = useGnomeImageStore();

  const router = useRouter();
  const navigation = useNavigation();

  //Header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="flex justify-center">
          <Text className="text-tekst text-2xl font-bold">Twoja kolekcja</Text>
        </View>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#131413",
      },
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    fetchGnomes();
    fetchMyInteractions(); // Fetch interactions when component mounts
  }, []);

  return (
    <SafeAreaView className={"flex-1 bg-primary-foreground"}>
      <FlatList
        data={gnomes}
        contentContainerClassName={"bg-primary-foreground"}
        columnWrapperStyle={{ justifyContent: "flex-start" }}
        keyExtractor={(item) => item.id?.toString()}
        numColumns={3}
        renderItem={({ item }) => {
          const img = getImageForGnome(item.id);
          return (
            <View style={{ width: "33.3333%" }}>
              <GnomeCard
                image={img?.assetUri || item.pictureUrl}
                text={item.name}
                onClick={() => router.push(`/gnomes/${item.id}`)}
                interaction={{
                  found: !!img,
                  userPicture: img?.assetUri,
                }}
              />
            </View>
          );
        }}
        ListEmptyComponent={() =>
          error ? (
            <Text className="text-tekst">Błąd: {error}</Text>
          ) : (
            <LoadingScreen />
          )
        }
      />
    </SafeAreaView>
  );
};

export default Collection;
