import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeStore } from "@/store/useGnomeStore";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const Collection = () => {
  const { gnomes, fetchGnomes, interactions, fetchMyInteractions } =
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

  if (gnomes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-[#131413]">
        <Text className="text-white text-lg">Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View className="p-5 bg-background flex-1">
      <Text className="text-2xl font-bold mb-4 text-white">Kolekcja</Text>
      <FlatList
        contentContainerClassName="pb-8"
        data={gnomes}
        keyExtractor={(item) => item.id?.toString()}
        numColumns={3}
        renderItem={({ item }) => {
          const interaction = interactions.find((i) => i.id === item.id);
          return (
            <GnomeCard
              image={require("@/assets/images/placeholder.png")}
              text={item.name}
              onClick={() => router.push(`/Gnomes/${item.id}`)}
              interaction={{
                found: interaction !== undefined,
                userPicture: interaction?.userPicture,
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default Collection;
