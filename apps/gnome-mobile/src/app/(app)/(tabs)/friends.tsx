import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddUser from "@/assets/icons/add-user.svg";
import GnomeIcon from "@/assets/icons/gnome-icon.svg";
import { Text } from "@/components/ui/text";
import { useFriendsStore } from "@/store/useFriendsStore";

const placeholder = { uri: "https://i.pravatar.cc/150?img=1" };

const FriendItem = ({
  name,
  avatar,
  score,
}: {
  name: string;
  avatar: string;
  score: string;
}) => (
  <View className="px-4 flex flex-row items-center justify-between py-2">
    <View className="flex flex-row items-center">
      <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full mr-4" />
      <Text className="text-white text-lg font-semibold">{name}</Text>
    </View>
    <View className="flex flex-row items-center">
      <Text className="text-white text-lg font-semibold mr-2">{score}</Text>
      <GnomeIcon width={25} height={25} />
    </View>
  </View>
);

export default function Friends() {
  const router = useRouter();
  const navigation = useNavigation();
  const { friends } = useFriendsStore();

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
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <TouchableOpacity
            className="p-5"
            onPress={() => router.push("/addfriend")}
          >
            <AddUser className="w-7 h-7" />
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <FriendItem
            name={item.name}
            avatar={item.avatar || placeholder.uri}
            score={item.interactions.toString()}
          />
        )}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
}
