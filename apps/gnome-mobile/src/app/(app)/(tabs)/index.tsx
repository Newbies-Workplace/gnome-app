import FriendIcon from "@/assets/icons/add-friend.svg";
import TeamIcon from "@/assets/icons/team.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { createRef, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const HeaderControls = ({ user, replace }) => {
  return (
    <View className="absolute top-5 left-2 right-2 p-2 flex-row justify-between items-center">
      <View className="flex flex-row items-center gap-5 w-full justify-between">
        <TouchableOpacity onPress={() => replace("/profile")}>
          <Avatar alt="Your avatar" className="w-16 h-16">
            <AvatarImage source={{ uri: user.pictureUrl }} />
            <AvatarFallback>
              <Text className="text-md">You</Text>
            </AvatarFallback>
          </Avatar>
        </TouchableOpacity>
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => replace("/addfriend")}
            className="w-16 h-16 bg-background rounded-full flex justify-center items-center mr-2"
          >
            <FriendIcon width={20} height={20} fill="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => replace("/teams")}
            className="w-16 h-16 bg-background rounded-full flex justify-center items-center"
          >
            <TeamIcon width={20} height={20} fill="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const MapScreen = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const { replace } = useRouter();
  const ref = createRef<MapView>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  const defaultRegion = {
    latitude: 51.1079,
    longitude: 17.0385,
    latitudeDelta: 0.01,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1,
            distanceInterval: 1,
          },
          (newLocation) => {
            ref.current?.animateToRegion(
              {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
                latitudeDelta: defaultRegion.latitudeDelta,
                longitudeDelta: defaultRegion.longitudeDelta,
              },
              100,
            );
          },
        );
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg("Error getting location");
      }
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  }

  return (
    <View className="flex-1">
      <MapView
        style={styles.map}
        initialRegion={defaultRegion}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={false}
        zoomControlEnabled={false}
        scrollEnabled={false}
        customMapStyle={MapStyle}
        showsCompass={false}
        showsMyLocationButton={false}
        minZoomLevel={18}
        maxZoomLevel={20}
        ref={ref}
      >
        <Marker
          coordinate={{
            latitude: 51.09701966184086,
            longitude: 17.035843526079727,
          }}
          title="Krasnal Podróżnik"
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
          description="Ponoć studenci przychodzą do niego po porady"
        >
          <Image
            source={require("@/assets/images/krasnal.png")}
            style={{ width: 30, height: 30 }}
          />
        </Marker>
      </MapView>

      <HeaderControls user={user} replace={replace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

const MapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1a1d2a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#c0c0c8" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1d2a" }] },

  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#33354a" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d8d8df" }],
  },

  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2c2f3e" }],
  },

  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#b0b0b8" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#404354" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#e0e0e6" }],
  },

  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#1f2637" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#5878a5" }],
  },

  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1d3c2c" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#60d158" }],
  },
];

export default MapScreen;
