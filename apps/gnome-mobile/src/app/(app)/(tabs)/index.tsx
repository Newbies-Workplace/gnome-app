import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const MapScreen = () => {
  const region = {
    latitude: 51.1079, // współrzędne Wrocławia
    longitude: 17.0385,
    latitudeDelta: 0.01,
    longitudeDelta: 0.03,
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
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
});

export default MapScreen;
