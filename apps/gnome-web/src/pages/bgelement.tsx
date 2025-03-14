import React from "react";
import { StyleSheet, View } from "react-native";

const BgElement: React.FC = () => {
  return <View style={styles.background} />;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    width: "100%",
    height: "100%",
  },
});

export default BgElement;
