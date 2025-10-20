import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { use, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { QrCodeSvg } from "react-native-qr-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import BackIcon from "@/assets/icons/arrow-left.svg";
import SearchIcon from "@/assets/icons/search.svg";
import { Text } from "@/components/ui/text";
import { FriendsService } from "@/lib/api/Friends.service";
import { UserService } from "@/lib/api/User.service";
import { useAuthStore } from "@/store/useAuthStore";

type FriendsListProps = {
  friends: { id: string; name: string; avatar?: string }[];
};

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  const navigation = useNavigation();
  const router = useRouter();
  //Header
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <BackIcon className="w-7 h-7" />
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

  const { user, regenerateInviteCode } = useAuthStore();
  const [friends, setFriends] = useState([
    { id: "1", name: "EdwardJajko", avatar: "https://i.pravatar.cc/150?img=2" },
  ]);

  useEffect(() => {
    FriendsService.findUserFriends().then((data) => {
      setFriends(data);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background px-6 pt-6 items-center gap-10">
      <QrCodeSvg
        value={user!.inviteCode}
        dotColor="hsl(359 63.4% 56.1%)"
        backgroundColor="transparent"
        frameSize={350}
        contentCells={5}
      />
      <View className="flex-row gap-5">
        <TouchableOpacity onPress={() => console.log("Skanuje kod")}>
          <Text className="text-white">ZESKANUJ KOD</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => regenerateInviteCode()}>
          <Text className="text-white">NOWY KOD</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full">
        <FriendsList friends={friends} />
      </View>
    </SafeAreaView>
  );
}
