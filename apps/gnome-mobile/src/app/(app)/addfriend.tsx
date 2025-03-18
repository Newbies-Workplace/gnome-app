import ArrowLeft from "@/assets/icons/arrow-left.svg";
import SearchIcon from "@/assets/icons/search.svg";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router"; // Import routera
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddFriend() {
  const navigation = useNavigation();
  const router = useRouter(); // Inicjalizacja routera
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState([
    { id: "1", name: "EdwardJajko", avatar: "https://i.pravatar.cc/150?img=2" },
  ]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-background px-6 pt-6">
      {/* Górna nawigacja */}
      <View className="flex flex-row items-center justify-between">
        {/* Przycisk powrotu */}
        <TouchableOpacity
          onPress={() => router.replace("/friends")} // Przejście do friends.tsx
          className="w-10"
        >
          <ArrowLeft width={32} height={32} />
        </TouchableOpacity>

        {/* Pusta przestrzeń dla wyrównania */}
        <View className="w-10" />
      </View>

      {/* Tytuł strony (niżej niż strzałka) */}
      <View className="mt-8 items-center">
        <Text className="text-white text-xl font-bold">Dodaj znajomego</Text>
      </View>

      {/* Pasek wyszukiwania */}
      <View className="mt-6 flex flex-row items-center bg-background rounded-full px-4 py-3 mb-6 border border-red-500">
        <SearchIcon width={20} height={20} className="text-gray-400" />
        <TextInput
          className="flex-1 ml-2 text-white"
          placeholder="Wpisz nazwę znajomego"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Lista wyników */}
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center justify-between mb-4">
            {/* Avatar + Nickname */}
            <View className="flex flex-row items-center">
              <Image
                source={{ uri: item.avatar }}
                className="w-10 h-10 rounded-full mr-3"
              />
              <Text className="text-white text-lg font-semibold">
                {item.name}
              </Text>
            </View>

            {/* Przycisk Dodaj */}
            <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-full">
              <Text className="text-white font-semibold">+ Dodaj</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
