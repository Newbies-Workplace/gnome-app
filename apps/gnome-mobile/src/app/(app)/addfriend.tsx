import ArrowLeft from "@/assets/icons/arrow-left.svg";
import BackIcon from "@/assets/icons/arrow-left.svg";
import SearchIcon from "@/assets/icons/search.svg";
import { Text } from "@/components/ui/text";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FriendsList = ({ friends }) => {
  const navigation = useNavigation();
  const router = useRouter();

  // const handleBackPress = () =>{
  //   if(navigation.canGoBack()){
  //     navigation.goBack();
  //   } else {
  //     navigation.navigate("gallery");
  //   }
  // };

  //Header
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <BackIcon className="w-7 h-7"></BackIcon>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-white text-2xl text-center font-bold tracking-wide">
          Dodaj znajomego
        </Text>
      ),
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation, router]);

  return (
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
  );
};

export default function AddFriend() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState([
    { id: "1", name: "EdwardJajko", avatar: "https://i.pravatar.cc/150?img=2" },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-white font-bold text-2xl text-center tracking-wide">
          Dodaj znajomego
        </Text>
      ),
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "#131413" },
      headerShadowVisible: false,
    });
  }, [navigation, router]);

  return (
    <SafeAreaView className="flex-1 bg-background px-6 pt-6">
      <View className="flex flex-row items-center justify-between">
        <View className="w-10" />
      </View>
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
      <FriendsList friends={friends} />
    </SafeAreaView>
  );
}
