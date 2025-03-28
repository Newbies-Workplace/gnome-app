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
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
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
  }, [navigation]);

  useEffect(() => {
    fetchGnomes();
  }, []);

  if (loading) return <Text>Ładowanie...</Text>;
  if (error) return <Text>Błąd: {error}</Text>;

  return (
    <View style={{ padding: 20, backgroundColor: "#131413", flex: 1 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 16,
          color: "white",
        }}
      >
        Kolekcja
      </Text>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={gnomes}
        keyExtractor={(item) => item.id?.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <GnomeCard
            image={require("@/assets/images/placeholder.png")} // Change later for real images
            text={item.name}
            onClick={() => router.push(`/collection-pages/${item.id}`)} // Correct navigation
          />
        )}
      />
    </View>
  );
};

export default Collection;
