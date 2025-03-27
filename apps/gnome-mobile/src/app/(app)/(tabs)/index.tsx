import FriendIcon from "@/assets/icons/add-friend.svg";
import TeamIcon from "@/assets/icons/team.svg";
import DistanceTracker from "@/components/ui/DistanceTracker";
import DraggableGnome from "@/components/ui/DraggableGnome";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { createRef, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
  const [markers, setMarkers] = useState([
    {
      latitude: 51.09701966184086,
      longitude: 17.035843526079727,
      title: "Krasnal Podróżnik",
      description: "Krasnal wysiadający z autobusu",
    },
    {
      latitude: 51.10894028789954,
      longitude: 17.03288804137201,
      title: "Krasnale Syzyfki",
      description: "Ciągle pchają ten nieszczęsny kamień",
    },
    {
      latitude: 51.10947379220885,
      longitude: 17.057842134960516,
      title: "Krasnal Mędruś",
      description: "Ponoć studenci przychodzą do niego po porady",
    },
  ]);
  const [userLocation, setUserLocation] = useState({
    latitude: 51.1079,
    longitude: 17.0385,
  });
  const [distance, setDistance] = useState(0);
  const [reachedMarker, setReachedMarker] = useState(false);
  const [showDistanceTracker, setShowDistanceTracker] = useState(false);

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
            setUserLocation({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const calculateDistance = (lat1, lon1, markers) => {
        const R = 6371; // km
        const distances = markers.map((marker) => {
          const dLat = ((marker.latitude - lat1) * Math.PI) / 180;
          const dLon = ((marker.longitude - lon1) * Math.PI) / 180;
          const lat1Rad = (lat1 * Math.PI) / 180;
          const lat2Rad = (marker.latitude * Math.PI) / 180;

          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
              Math.sin(dLon / 2) *
              Math.cos(lat1Rad) *
              Math.cos(lat2Rad);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const d = R * c;

          return d;
        });

        return distances;
      };

      const distances = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        markers,
      );
      const closestMarkerIndex = distances.indexOf(Math.min(...distances));
      const closestMarkerDistance = distances[closestMarkerIndex] * 1000;

      if (closestMarkerDistance <= 50 && closestMarkerDistance > 5) {
        setShowDistanceTracker(true);
      } else {
        setShowDistanceTracker(false);
      }
      if (closestMarkerDistance <= 5) {
        setReachedMarker(true);
      } else {
        setReachedMarker(false);
      }
      setDistance(Math.round(closestMarkerDistance));
    }, 15);

    return () => clearInterval(intervalId);
  }, [userLocation, markers]);

  return (
    <View className="flex-1">
      <MapView
        style={styles.map}
        initialRegion={defaultRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        zoomControlEnabled={false}
        scrollEnabled={false}
        customMapStyle={MapStyle}
        showsCompass={false}
        showsMyLocationButton={false}
        minZoomLevel={18}
        maxZoomLevel={20}
        ref={ref}
        onRegionChangeComplete={(region) => {
          if (
            region.latitude !== userLocation.latitude ||
            region.longitude !== userLocation.longitude
          ) {
            ref.current?.animateToRegion(
              {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: defaultRegion.latitudeDelta,
                longitudeDelta: defaultRegion.longitudeDelta,
              },
              100,
            );
          }
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          >
            <Image
              source={require("@/assets/images/krasnal.png")}
              style={{ width: 30, height: 30 }}
            />
          </Marker>
        ))}
      </MapView>

      <HeaderControls user={user} replace={replace} />

      <View className="absolute bottom-0 left-0 right-0 p-4 bg-transparent">
        {reachedMarker ? (
          <DraggableGnome onUnlock={() => Alert.alert("Gnome Unlocked!")} />
        ) : (
          <DistanceTracker
            distance={distance}
            showDistanceTracker={showDistanceTracker}
          />
        )}
      </View>
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
