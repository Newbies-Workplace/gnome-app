import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Text } from "@/components/ui/text";

const AddToTeamList = ({ users, onAdd }) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="flex flex-row items-center justify-between mb-4">
          <View className="flex flex-row items-center">
            <Image
              source={{ uri: item.avatar }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <Text className="text-white text-lg font-semibold">
              {item.name}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-full"
            onPress={() => onAdd(item)}
          >
            <Text className="text-white font-semibold">+ Dodaj</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const TeamList = ({ users, onRemove }) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="flex flex-row items-center justify-between mb-6">
          <View className="flex flex-row items-center">
            <Image
              source={{ uri: item.avatar }}
              className="w-10 h-10 rounded-full mr-5"
            />
            <Text className="text-white text-lg font-semibold">
              {item.name}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-full"
            onPress={() => onRemove(item)}
          >
            <Text className="text-white font-semibold">- Usuń</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default function Teams() {
  const navigation = useNavigation();
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "4",
      name: "AnnaKowalska",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "5",
      name: "MarekNowicki",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
  ]);

  const [users, setUsers] = useState([
    { id: "1", name: "EdwardJajko", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: "2", name: "KasiaNowak", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: "3", name: "TomekKowal", avatar: "https://i.pravatar.cc/150?img=8" },
  ]);

  // Dodaje użytkownika do zespołu
  const handleAddToTeam = (user) => {
    setUsers(users.filter((u) => u.id !== user.id));
    setTeamMembers([...teamMembers, user]);
  };

  // Usuwa użytkownika z zespołu
  const handleRemoveFromTeam = (user) => {
    setTeamMembers(teamMembers.filter((u) => u.id !== user.id));
    setUsers([...users, user]);
  };

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitle: "",
      headerStyle: { backgroundColor: "#1E201E" },
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation, router]);

  return (
    <SafeAreaView className="flex-1 bg-background px-6 pt-6">
      <View className="items-center">
        <Text className="text-white text-xl font-bold">Twój zespół</Text>
      </View>
      <View className="mt-4">
        <TeamList users={teamMembers} onRemove={handleRemoveFromTeam} />
      </View>
      <View className="items-center mt-6">
        <Text className="text-white text-xl font-bold">Dodaj do zespołu</Text>
      </View>
      <View className="mt-6">
        <AddToTeamList users={users} onAdd={handleAddToTeam} />
      </View>
    </SafeAreaView>
  );
}
