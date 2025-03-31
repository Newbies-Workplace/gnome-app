import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import {
  SensorTypes,
  magnetometer,
  setUpdateIntervalForType,
} from "react-native-sensors";
import Svg, { Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
const COMPASS_WIDTH = width * 2; // Zwiększona szerokość dla lepszego rozkładu

// Pełen zestaw markerów z głównymi kierunkami
const MARKERS = [
  "N",
  15,
  30,
  45,
  60,
  75,
  "E",
  105,
  120,
  135,
  150,
  165,
  "S",
  195,
  210,
  225,
  240,
  255,
  "W",
  285,
  300,
  315,
  330,
  345,
];

// Powielanie markerów dla efektu płynnego przewijania
const EXTENDED_MARKERS = [...MARKERS, ...MARKERS, ...MARKERS];

const Compass: React.FC = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.magnetometer, 200);

    const subscription = magnetometer.subscribe(({ x, y }) => {
      if (x !== 0 && y !== 0) {
        let newAngle = Math.atan2(y, x) * (180 / Math.PI);
        newAngle = newAngle < 0 ? newAngle + 360 : newAngle; // Normalizacja do 0-360°

        setAngle(newAngle);

        // Poprawione przesunięcie, aby "N" było na środku
        const compassPosition = ((180 - newAngle) / 360) * COMPASS_WIDTH;

        Animated.spring(translateX, {
          toValue: compassPosition,
          useNativeDriver: true,
          speed: 10,
          bounciness: 0,
        }).start();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.compass, { transform: [{ translateX }] }]}>
        <Svg
          width={COMPASS_WIDTH * 3}
          height={40}
          viewBox={`0 0 ${COMPASS_WIDTH * 3} 40`}
        >
          {EXTENDED_MARKERS.map((label, i) => {
            const totalMarkers = MARKERS.length;
            const position =
              ((i - totalMarkers / 2) * COMPASS_WIDTH) / totalMarkers;

            return (
              <SvgText
                key={i}
                x={position % (COMPASS_WIDTH * 3)}
                y="30"
                fill={
                  ["N", "S", "W", "E"].includes(String(label))
                    ? "white"
                    : "gray"
                }
                fontSize="14"
                fontWeight={
                  ["N", "S", "W", "E"].includes(String(label))
                    ? "bold"
                    : "normal"
                }
                textAnchor="middle"
              >
                {label}
              </SvgText>
            );
          })}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -width / 2 }],
    width: width - 40,
    height: 40,
    backgroundColor: "#1E201E",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  compass: {
    marginTop: 0,
  },
});

export default Compass;
