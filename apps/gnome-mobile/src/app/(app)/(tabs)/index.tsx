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

const MapScreen = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const { replace } = useRouter();

  const region = {
    latitude: 51.1079,
    longitude: 17.0385,
    latitudeDelta: 0.01,
    longitudeDelta: 0.03,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
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
        >
          <Image
            source={require("@/assets/images/krasnal.png")}
            style={{ width: 30, height: 30 }}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: 51.10894028789954,
            longitude: 17.03288804137201,
          }}
          title="Krasnale Syzyfki"
          description="Ciągle pchają ten nieszczęsny kamień"
        >
          <Image
            source={require("@/assets/images/krasnal.png")}
            style={{ width: 30, height: 30 }}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: 51.10947379220885,
            longitude: 17.057842134960516,
          }}
          title="Krasnal Mędruś"
          description="Ponąć studenci przychodzą do niego po porady"
        >
          <Image
            source={require("@/assets/images/krasnal.png")}
            style={{ width: 30, height: 30 }}
          />
        </Marker>
      </MapView>
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          right: 10,
          backgroundColor: "transparent",
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View className="flex flex-row items-center gap-5 mb-5 rounded-lg w-full justify-between">
          <TouchableOpacity
            onPress={() => {
              replace("/profile");
            }}
          >
            <Avatar alt="Your avatar" className="w-16 h-16">
              <AvatarImage source={{ uri: user.pictureUrl }} />
              <AvatarFallback>
                <Text className="text-md">You</Text>
              </AvatarFallback>
            </Avatar>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                replace("/addfriend");
              }}
              className="w-16 h-16 bg-background rounded-full justify-center items-center mr-2"
            >
              <FriendIcon width={20} height={20} fill="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                replace("/teams");
              }}
              className="w-16 h-16 bg-background rounded-full justify-center items-center"
            >
              <TeamIcon width={20} height={20} fill="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;
