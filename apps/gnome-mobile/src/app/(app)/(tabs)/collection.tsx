import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/api/axios";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

const Collection = () => {
  const [krasnale, setKrasnale] = useState([]);

  const fetchKrasnale = async () => {
    try {
      const response = await axiosInstance.get("/api/rest/v1/gnomes");
      setKrasnale(response.data);
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    }
  };

  return (
    <View className="p-5">
      <Text className="text-2xl font-bold mb-4">Kolekcja</Text>
      <Button onPress={fetchKrasnale}>
        <Text className="text-white">Pobierz Krasnale</Text>
      </Button>
      <FlatList
        data={krasnale}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-lg py-1">{item.name}</Text>
        )}
      />
    </View>
  );
};

export default Collection;
