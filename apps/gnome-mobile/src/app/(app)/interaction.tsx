import DistanceTracker from "@/components/ui/DistanceTracker";
import DraggableGnome from "@/components/ui/DraggableGnome";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const App = () => {
  const [region, setRegion] = useState({
    latitude: 51.1079,
    longitude: 17.0385,
    latitudeDelta: 0.01,
    longitudeDelta: 0.05,
  });

  const [marker, setMarker] = useState({
    latitude: 51.10894028789954,
    longitude: 17.03288804137201,
  });

  const [userLocation, setUserLocation] = useState({
    latitude: 51.1079,
    longitude: 17.0385,
  });

  const [distance, setDistance] = useState(0);
  const [reachedMarker, setReachedMarker] = useState(false);
  const [showDistanceTracker, setShowDistanceTracker] = useState(false);

  const ref = React.createRef<MapView>();

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 20,
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
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              },
              100,
            );
          },
        );
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error getting location");
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
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        marker.latitude,
        marker.longitude,
      );
      setDistance(Math.round(distance * 1000));
      if (distance * 1000 <= 50 && distance * 1000 > 5) {
        setShowDistanceTracker(true);
      } else {
        setShowDistanceTracker(false);
      }
      if (distance * 1000 <= 5) {
        setReachedMarker(true);
      } else {
        setReachedMarker(false);
      }
    }, 15);

    return () => clearInterval(intervalId);
  }, [userLocation, marker]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation={true}
        followsUserLocation={true}
        onRegionChangeComplete={(region) => setRegion(region)}
        initialRegion={region}
        ref={ref}
      >
        <Marker
          coordinate={marker}
          title="Marker"
          description="This is a marker"
        />
        <Marker
          coordinate={userLocation}
          title="User               Location"
          description="This is your location"
        />
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          backgroundColor: "transparent",
        }}
      >
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

export default App;
