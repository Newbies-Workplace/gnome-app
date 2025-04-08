import LoadingScreen from "@/components/LoadingScreen";
import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeStore } from "@/store/useGnomeStore";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const Collection = () => {
  const {
    gnomes,
    fetchGnomes,
    interactions,
    fetchMyInteractions,
    loading,
    error,
  } = useGnomeStore();
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

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Text className="text-white">Błąd: {error}</Text>;
  }

  if (gnomes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-[#131413]">
        <Text className="text-white text-lg">Ładowanie...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={gnomes}
      className={"bg-background"}
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
    />
  );
};

export default Collection;
