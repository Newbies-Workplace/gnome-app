import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeStore } from "@/store/useGnomeStore";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const GnomeList = () => {
  const { gnomes, fetchGnomes, loading, error } = useGnomeStore();
  const router = useRouter();
  const navigation = useNavigation();

  //Header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="text-center">
          <Text className="text-white text-2xl font-bold text-center tracking-wide">
            Twoja kolekcja
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
  }, []);

  useEffect(() => {
    fetchGnomes();
  }, []);

  if (loading) return <Text>Ładowanie...</Text>;
  if (error) return <Text>Błąd: {error}</Text>;

  return (
    <View className="p-5 bg-background">
      <Text className="text-2xl font-bold mb-4 text-white">Kolekcja</Text>
      <FlatList
        contentContainerClassName="pb-8"
        data={gnomes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <GnomeCard
            image={require("@/assets/images/placeholder.png")} // później zdjecia z bazy ;D
            text={item.name}
            onClick={() => router.push("/gnome_detail")}
          />
        )}
      />
    </View>
  );
};

export default GnomeList;
