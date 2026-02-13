import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import {
  magnetometer,
  SensorTypes,
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

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.magnetometer, 1000);

    const subscription = magnetometer.subscribe(({ x, y }) => {
      if (!(x !== 0 && y !== 0)) {
        return;
      }

      let newAngle = Math.atan2(y, x) * (180 / Math.PI);
      newAngle = newAngle < 0 ? newAngle + 360 : newAngle;
      const compassPosition = ((180 - newAngle) / 360) * COMPASS_WIDTH;
      Animated.spring(translateX, {
        toValue: compassPosition,
        useNativeDriver: true,
        speed: 10,
        bounciness: 0,
      }).start();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container} className={"bg-background"}>
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

            const isMainDirection = ["N", "S", "W", "E"].includes(
              String(label),
            );

            return (
              <SvgText
                // biome-ignore lint/suspicious/noArrayIndexKey: finite number of markers
                key={i}
                className="fill-tekst"
                x={position % (COMPASS_WIDTH * 3)}
                y={isMainDirection ? 28 : 25}
                fontSize={isMainDirection ? 20 : 12}
                fontWeight={isMainDirection ? "bold" : "normal"}
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
    alignSelf: "center",
    width: width - 32,
    height: 24,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  compass: {
    marginTop: 0,
  },
});

export default Compass;
