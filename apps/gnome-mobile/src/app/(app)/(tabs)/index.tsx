import FriendIcon from "@/assets/icons/add-friend.svg";
import TeamIcon from "@/assets/icons/team.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function MapScreen() {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const { replace } = useRouter();

  const region = {
    latitude: 51.1079, // współrzędne Wrocławia
    longitude: 17.0385,
    latitudeDelta: 0.01,
    longitudeDelta: 0.03,
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 bg-gray-800">
        <Avatar alt="Your avatar" className="w-20 h-20">
          <AvatarImage source={{ uri: user.pictureUrl }} />
          <AvatarFallback>
            <Text className="text-lg">You</Text>
          </AvatarFallback>
        </Avatar>
        <View className="flex-row justify-between items-center w-20">
          <TouchableOpacity onPress={() => navigation.navigate("friends")}>
            <FriendIcon width={24} height={24} fill="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("teams")}>
            <TeamIcon width={24} height={24} fill="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1">
        <MapView
          className="flex-1"
          region={region}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          zoomControlEnabled={true}
          scrollEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: 51.09701966184086,
              longitude: 17.035843526079727,
            }}
            title="Krasnal Podróznik"
            description="Krasnal wysiadający z autobusu"
            icon={require("@/assets/images/krasnal.png")}
          />
          <Marker
            coordinate={{
              latitude: 51.10894028789954,
              longitude: 17.03288804137201,
            }}
            title="Krasnale Syzyfki"
            description="Ciągle pchają ten nieszczęsny kamień"
            icon={require("@/assets/images/krasnal.png")}
          />
          <Marker
            coordinate={{
              latitude: 51.10947379220885,
              longitude: 17.057842134960516,
            }}
            title="Krasnal Mędruś"
            description="Ponąć studenci przychodzą do niego po porady"
            icon={require("@/assets/images/krasnal.png")}
          />
        </MapView>
      </View>
    </View>
  );
}
