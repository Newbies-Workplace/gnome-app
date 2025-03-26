import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeStore } from "@/store/useGnomeStore";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const GnomeList = () => {
  const { gnomes, fetchGnomes, loading, error } = useGnomeStore();
  const { replace } = useRouter();

  useEffect(() => {
    fetchGnomes();
  }, []);

  if (loading) return <Text>Ładowanie...</Text>;
  if (error) return <Text>Błąd: {error}</Text>;

  return (
    <View className="p-5 bg-background">
      <Text className="text-2xl font-bold mb-4 text-white">Kolekcja</Text>
      <FlatList
        data={gnomes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View className="w-1/3">
            <GnomeCard
              image={require("@/assets/images/placeholder.png")} // później zdjecia z bazy ;D
              text={item.name}
              onClick={() => replace("/gnome_detail")}
            />
          </View>
        )}
      />
    </View>
  );
};

export default GnomeList;
