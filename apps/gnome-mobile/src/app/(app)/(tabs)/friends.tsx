import AddUser from "@/assets/icons/add-user.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import Mushroom from "@/assets/icons/mushroom.svg";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const friendsData = [
  {
    id: "1",
    name: "XYZ",
    avatar: "https://i.pravatar.cc/150?img=1",
    score: "39/400",
  },
  {
    id: "2",
    name: "ABC",
    avatar: "https://i.pravatar.cc/150?img=2",
    score: "120/400",
  },
  {
    id: "3",
    name: "DEF",
    avatar: "https://i.pravatar.cc/150?img=3",
    score: "260/400",
  },
];

const FriendItem = ({ name, avatar, score }) => (
  <View className="px-6 ml-4 mr-4 flex flex-row items-center justify-between py-2">
    <View className="flex flex-row items-center">
      <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full mr-4" />
      <Text className="text-white text-lg font-semibold">{name}</Text>
    </View>
    <View className="flex flex-row items-center">
      <Text className="text-white text-lg font-semibold mr-2">{score}</Text>
      <Mushroom width={28} height={28} />
    </View>
  </View>
);

export default function Friends() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          className="p-5"
          onPress={() => router.push("/addfriend")}
        >
          <AddUser className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-white text-2xl font-bold text-center tracking-wide">
          Twoi znajomi
        </Text>
      ),
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerShown: true,
      headerStyle: { backgroundColor: "#131413" },
    });
  }, [navigation, router]);

  return (
    <SafeAreaView className="flex-1 bg-background pt-6">
      <FlatList
        data={friendsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendItem
            name={item.name}
            avatar={item.avatar}
            score={item.score}
          />
        )}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
}
