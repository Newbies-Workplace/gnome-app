import * as Location from "expo-location";
import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const App = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const defaultRegion = {
    latitude: 51.1079, // Współrzędne Wrocławia
    longitude: 17.0385,
    latitudeDelta: 0.01,
    longitudeDelta: 0.05,
  };

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
      stylers: [{ color: "#252839" }],
    },
    {
      featureType: "poi.business",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffa45c" }],
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

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        // Prośba o pozwolenie na dostęp do lokalizacji
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // Rozpocznij śledzenie lokalizacji
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1, // Aktualizuj co 0.1 sekundę
            distanceInterval: 1, // Aktualizuj co 1 metrów
          },
          (newLocation) => {
            setLocation(newLocation); // Ustaw nową lokalizację
            console.log("New location:", newLocation.coords);
          },
        );
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg("Error getting location");
      }
    })();

    // Czyszczenie subskrypcji przy odmontowaniu komponentu
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={defaultRegion}
          showsUserLocation
          followsUserLocation
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          zoomControlEnabled={true}
          scrollEnabled={true}
          customMapStyle={MapStyle}
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

export default App;
