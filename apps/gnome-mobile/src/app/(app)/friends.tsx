import AddUser from "@/assets/icons/add-user.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import Mushroom from "@/assets/icons/mushroom.svg";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Friends() {
  const { replace, push } = useRouter();
  const navigation = useNavigation();

  // Handle navigation when clicking the AddUser icon
  const handleAddFriendClick = () => {
    push("/addfriend"); // Navigate to AddFriend screen
  };

  return (
    <SafeAreaView className="flex-1 bg-background pt-6">
      {/* Header Section */}
      <View className="px-6 py-3 bg-background">
        {/* Icons Row */}
        <View className="flex flex-row items-center justify-between">
          {/* Back Button */}
          <TouchableOpacity
            className="ml-2"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft width={36} height={36} />
          </TouchableOpacity>

          {/* Empty View for spacing */}
          <View />

          {/* Add Friend Button with onClick event */}
          <TouchableOpacity className="mr-2" onPress={handleAddFriendClick}>
            <AddUser width={28} height={28} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Centered Title */}
      <View className="absolute top-24 left-0 right-0 items-center">
        <Text className="text-white text-xl font-bold">Twoi znajomi</Text>
      </View>

      {/* Friend List Item */}
      <View className="mt-16 px-6 ml-4 mr-4 flex flex-row items-center justify-between">
        {/* Left: Avatar & Nickname */}
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=1" }}
            className="w-10 h-10 rounded-full mr-4"
          />
          <Text className="text-white text-lg font-semibold">XYZ</Text>
        </View>

        {/* Right: Score & Mushroom Icon */}
        <View className="flex flex-row items-center">
          <Text className="text-white text-lg font-semibold mr-2">39/400</Text>
          <Mushroom width={28} height={28} />
        </View>
      </View>
    </SafeAreaView>
  );
}
