import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddUser from "@/assets/icons/add-user.svg";
import GnomeIcon from "@/assets/icons/gnome-icon.svg";
import SadGnome from "@/assets/images/SadGnome.svg";
import { EmptyState } from "@/components/ui/EmptyState";
import { Text } from "@/components/ui/text";
import { useFriendsStore } from "@/store/useFriendsStore";

export default function Friends() {
  const { t } = useTranslation();
  const router = useRouter();
  const { friends } = useFriendsStore();
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
        <Image
          source={{ uri: avatar }}
          className="w-10 h-10 rounded-full mr-4"
        />
        <Text className="text-tekst text-lg font-semibold">{name}</Text>
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-tekst text-lg font-semibold mr-2">{score}</Text>
        <GnomeIcon width={25} height={25} className="text-tekst" />
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center">
      <EmptyState
        image={<SadGnome className="mb-4" />}
        title={t("friends.listEmpty.title")}
        alert={t("friends.listEmpty.subtitle")}
        description={t("friends.listEmpty.description")}
        ButtonTitle={t("friends.listEmpty.addFriendButton")}
        onClick={() => router.push("/addfriend")}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-foreground">
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <TouchableOpacity
            className="p-5"
            onPress={() => router.push("/addfriend")}
          >
            <AddUser className="w-7 h-7 text-tekst" />
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <FriendItem
            name={item.name}
            avatar={item.avatar || placeholder.uri}
            score={item.interactions.toString()}
          />
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          friends.length === 0
            ? { flexGrow: 1, justifyContent: "center" }
            : undefined
        }
      />
    </SafeAreaView>
  );
}
