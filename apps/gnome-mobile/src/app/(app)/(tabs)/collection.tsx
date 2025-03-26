import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/api/axios";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

//Import ikon
import BackIcon from "@/assets/icons/arrow-left.svg";

const Collection = () => {
  //Header
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <BackIcon className="w-7 h-7"></BackIcon>
        </TouchableOpacity>
      ),

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
  }, [navigation, router]);

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
