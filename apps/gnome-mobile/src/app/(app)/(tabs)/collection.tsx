import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeStore } from "@/store/useGnomeStore";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const Collection = () => {
  const { gnomes, fetchGnomes, loading, error } = useGnomeStore();
  const router = useRouter();
  const navigation = useNavigation();

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
  }, []);

  if (loading) return <Text className="text-white">Ładowanie...</Text>;
  if (error) return <Text className="text-white">Błąd: {error}</Text>;

  return (
    <View className="p-5 bg-background flex-1">
      <Text className="text-2xl font-bold mb-4 text-white">Kolekcja</Text>
      <FlatList
        contentContainerClassName="pb-8"
        data={gnomes}
        keyExtractor={(item) => item.id?.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <GnomeCard
            image={require("@/assets/images/placeholder.png")} // później zdjecia z bazy ;D
            text={item.name}
            onClick={() => router.push(`/Gnomes/${item.id}`)}
          />
        )}
      />
    </View>
  );
};

export default Collection;
