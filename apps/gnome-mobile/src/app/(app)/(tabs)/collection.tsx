import { Button } from "@/components/ui/button";
import { useGnomeStore } from "@/store/useGnomeStore";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const GnomeList = () => {
  const { gnomes, fetchGnomes, loading, error } = useGnomeStore();

  if (loading) return <Text>Ładowanie...</Text>;
  if (error) return <Text>Błąd: {error}</Text>;

  return (
    <View className="p-5">
      <Text className="text-2xl font-bold mb-4">Kolekcja</Text>
      <Button
        onPress={() => {
          fetchGnomes();
        }}
      >
        <Text className="text-white">Pobierz Krasnale</Text>
      </Button>
      <FlatList
        data={gnomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, marginTop: 5, color: "black" }}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
};

export default GnomeList;
