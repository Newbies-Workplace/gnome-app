import FriendIcon from "@/assets/icons/add-friend.svg";
import LocationOffIcon from "@/assets/icons/location-off.svg";
import TeamIcon from "@/assets/icons/team.svg";
import GnomePin from "@/assets/images/GnomePin.svg";
import GnomePinCatch from "@/assets/images/GnomePinCatch.svg";
import { MapStyle } from "@/components/map-styles";
import DistanceTracker from "@/components/ui/DistanceTracker";
import DraggableGnome from "@/components/ui/DraggableGnome";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Compass from "@/components/ui/compass";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useGnomeStore } from "@/store/useGnomeStore";
import { GnomeResponse } from "@repo/shared/responses";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { getDistance } from "geolib";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MIN_TRACKER_DISTANCE = 50;
const MIN_REACHED_DISTANCE = 15;

interface HeaderControlsProps {
  user: { pictureUrl: string }; // Adjust the type based on your user object structure
  errorMsg: string | null;
  setErrorMsg: (msg: string | null) => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({
  user,
  errorMsg,
  setErrorMsg,
}) => {
  const router = useRouter();
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setErrorMsg(null);
      } else if (status === "denied") {
        Alert.alert(
          "Krasnal kartograf zgubił Cię na mapie!",
          "Pomóż biednemu krasnalowi! Włącz lokalizację, zanim zacznie pytać smoki o drogę! ",
          [
            {
              text: "Nie chce :(",
              style: "cancel",
            },
            {
              text: "Już włączam!",
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  return (
    <View className="absolute top-5 left-2 right-2 p-2 flex-row justify-between items-center">
      <View className="flex flex-row items-center gap-5 w-full justify-between">
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Avatar alt="Your avatar" className="w-10 h-10">
            <AvatarImage source={{ uri: user.pictureUrl }} />
            <AvatarFallback>
              <Text className="text-md">You</Text>
            </AvatarFallback>
          </Avatar>
        </TouchableOpacity>

        <View className="flex-row">
          {errorMsg && (
            <TouchableOpacity
              onPress={requestLocationPermission}
              className="w-10 h-10 bg-primary rounded-full flex justify-center items-center mr-2"
            >
              <LocationOffIcon width={20} height={20} fill="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => router.push("/addfriend")}
            className="w-10 h-10 bg-background rounded-full flex justify-center items-center mr-2"
          >
            <FriendIcon width={20} height={20} fill="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/teams")}
            className="w-10 h-10 bg-background rounded-full flex justify-center items-center"
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
  const { navigate } = useRouter();
  const { gnomes, fetchGnomes, interactions, fetchMyInteractions } =
    useGnomeStore();
  const ref = useRef<MapView>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const maxDistance = 400; // Maksymalna odległość w metrach
  const [userLocation, setUserLocation] = useState({
    latitude: 51.1079,
    longitude: 17.0385,
  });
  const [distance, setDistance] = useState<number>();
  const [reachedMarker, setReachedMarker] = useState(false);
  const [showDistanceTracker, setShowDistanceTracker] = useState(false);
  const [closestGnomeId, setClosestGnomeId] = useState<string>();

  const defaultRegion = {
    latitude: 51.1079,
    longitude: 17.0385,
    latitudeDelta: 0.01,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    fetchGnomes();
    fetchMyInteractions();
  }, []);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;
    let headingSubscription: Location.LocationSubscription | null = null;

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
            const { latitude, longitude } = newLocation.coords;
            setUserLocation({ latitude, longitude });

            ref.current?.animateCamera({
              center: { latitude, longitude },
            });
          },
        );
        headingSubscription = await Location.watchHeadingAsync(
          (headingData) => {
            if (ref.current) {
              ref.current.animateCamera({
                heading: headingData.trueHeading,
              });
            }
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
      if (headingSubscription) {
        headingSubscription.remove();
      }
    };
  }, []);

  // filtrowanie
  const filteredGnomes = gnomes.filter((gnome) => {
    const distance = getDistance(userLocation, {
      latitude: gnome.latitude,
      longitude: gnome.longitude,
    });

    return distance <= maxDistance;
  });

  useEffect(() => {
    const distances = gnomes.map((gnome) => {
      const distance = getDistance(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        { latitude: gnome.latitude, longitude: gnome.longitude },
      );

      return { gnome, distance };
    });

    // Znajdź najbliższego gnoma
    const closestGnome = distances.reduce<{
      gnome: GnomeResponse;
      distance: number;
    } | null>((closest, current) => {
      if (!closest || current.distance < closest.distance) {
        return current;
      }
      return closest;
    }, null);

    if (closestGnome) {
      setClosestGnomeId(closestGnome.gnome.id);
    }

    if (closestGnome && closestGnome.distance <= MIN_REACHED_DISTANCE) {
      setShowDistanceTracker(true);
    } else {
      setShowDistanceTracker(false);
    }
    if (closestGnome && closestGnome.distance <= MIN_REACHED_DISTANCE) {
      setReachedMarker(true);
    } else {
      setReachedMarker(false);
    }
    if (closestGnome) {
      setDistance(Math.round(closestGnome.distance));
    }
  }, [userLocation, gnomes]);

  return (
    <View className="flex-1">
      <MapView
        style={styles.map}
        initialRegion={defaultRegion}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        zoomControlEnabled={false}
        scrollEnabled={false}
        customMapStyle={MapStyle}
        showsCompass={false}
        showsMyLocationButton={false}
        rotateEnabled={true}
        minZoomLevel={17}
        maxZoomLevel={20}
        ref={ref}
      >
        {filteredGnomes.map((gnome) => (
          <Marker
            className=""
            key={gnome.id}
            coordinate={{
              latitude: gnome.latitude,
              longitude: gnome.longitude,
            }}
            title={gnome.name}
            description={gnome.description}
          >
            {interactions.find(
              (interactions) => interactions.gnomeId === gnome.id,
            ) !== undefined ? (
              <GnomePinCatch />
            ) : (
              <GnomePin />
            )}
          </Marker>
        ))}
      </MapView>

      {user && (
        <HeaderControls
          user={user}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      )}

      <View className="absolute bottom-0 left-0 right-0 p-4 bg-transparent">
        {distance !== undefined &&
          (distance > MIN_REACHED_DISTANCE &&
          distance <= MIN_TRACKER_DISTANCE ? (
            <DistanceTracker distance={distance} showDistanceTracker={true} />
          ) : distance <= MIN_REACHED_DISTANCE ? (
            <DraggableGnome
              onUnlock={() => navigate(`/camera?gnomeid=${closestGnomeId}`)}
            />
          ) : null)}
      </View>

      <View className="absolute top-20 left-1/2 -translate-x-1/2 z-50">
        <Compass />
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

export default MapScreen;
