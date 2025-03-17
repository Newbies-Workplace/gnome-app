import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { UrlTile } from "react-native-maps";

const MapScreen = () => {
  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        mapType="none" // Ensures no default map layer is shown
      >
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19} // Maximum zoom level
          flipY={false} // Adjust if your tiles require flipping
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
