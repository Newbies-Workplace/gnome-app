import LoadingScreen from "@/components/LoadingScreen";
import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeStore } from "@/store/useGnomeStore";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Collection = () => {
  const { gnomes, fetchGnomes, interactions, fetchMyInteractions, error } =
    useGnomeStore();
  const router = useRouter();
  const navigation = useNavigation();

  //Header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="flex justify-center">
          <Text className="text-white text-2xl font-bold">Twoja kolekcja</Text>
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
    <SafeAreaView className={"flex-1 bg-background"}>
      <FlatList
        data={gnomes}
        contentContainerClassName={"bg-background"}
        keyExtractor={(item) => item.id?.toString()}
        numColumns={3}
        renderItem={({ item }) => {
          const interaction = interactions.find((i) => i.gnomeId === item.id);
          return (
            <GnomeCard
              image={item.pictureUrl}
              text={item.name}
              onClick={() => router.push(`/gnomes/${item.id}`)}
              interaction={{
                found: !!interaction,
                userPicture: interaction?.userPicture,
              }}
            />
          );
        }}
        ListEmptyComponent={() =>
          error ? (
            <Text className="text-white">Błąd: {error}</Text>
          ) : (
            <LoadingScreen />
          )
        }
      />
    </SafeAreaView>
  );
};

export default Collection;
