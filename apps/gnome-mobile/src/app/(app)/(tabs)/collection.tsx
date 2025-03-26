import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeStore } from "@/store/useGnomeStore";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const GnomeList = () => {
  const { gnomes, fetchGnomes, loading, error } = useGnomeStore();

  useEffect(() => {
    fetchGnomes();
  }, []);

  if (loading) return <Text>Ładowanie...</Text>;
  if (error) return <Text>Błąd: {error}</Text>;

  return (
    <View className="p-5 bg-background min-h-screen">
      <Text className="text-2xl font-bold mb-4 color-white">Kolekcja</Text>
      <View className="flex flex-row gap-4 mt-4 justify-center">
        {gnomes.map((item) => (
          <View key={item.id} className="w-1/3 p-1">
            <GnomeCard
              image={require("@/assets/images/placeholder.png")}
              text={item.name}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default GnomeList;
