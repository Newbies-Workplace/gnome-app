import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const GnomeScreen = () => {
  return (
    <ScrollView className="bg-background my-2">
      <View className="p-5 my-2">
        <Image source={require("@/assets/icons/gnome-detail.png")} />
        <View>
          <Text className="text-center text-white text-3xl text-bold font-afacad my-2">
            Movemenciak
          </Text>
          <Text className="text-center text-white text-xl text-bold font-afacad my-2">
            Bar mleczny | Kuźnicza 48, 50-138 Wrocław
          </Text>
          <View
            className="border-b border-primary my-2"
            style={{ width: "80%", alignSelf: "center" }}
          />
          <Text className="text-white font-afacad my-2">
            Data znalezienia: 05-04-2024
          </Text>
          <Text className="text-white font-afacad my-2">
            Data postawienia: 04-03-2023
          </Text>
          <View
            className="border-b border-primary my-2"
            style={{ width: "80%", alignSelf: "center" }}
          />
          <Text className="text-white font-afacad my-2">
            Krasnal został stworzony z inicjatywy 7 fanek rapera OKI. -
            Chciałyśmy coś po sobie zostawić, stąd nazwa, aby krasnal nie był
            poświęcony samemu OKIEMU, tylko również społeczności fanowskiej,
            która jest świetna – zapewnia jedna z fundatorek Movemenciaka.
          </Text>
          <Text className="text-white font-afacad my-2">
            Pierwotnie krasnal miał stanąć na ul. Zakładowej, bo ta ulica
            pojawia się w utworze „Total Bandits Polne” OKIEGO, ale nie udało
            się załatwić zgody. Zamiast tego Movemenciak stanął przy Barze
            Mlecznym Miś.
          </Text>
          <Text className="text-white font-afacad my-2">
            Okazało się, że wybrane przypadkiem miejsce okazało się znaczące, bo
            OKI przyznał, że jadał tu, kiedy musiał się liczyć z każdym groszem.
          </Text>
          <Text className="text-white text-bold text-xl font-afacad my-2">
            Ciekawostka:
          </Text>
          <Text className="text-white font-afacad my-2">
            Krasnala nie da się już zobaczyć, został on przekazany przez autorki
            w ręce Oki’ego, po koncercie z trasy ERA47.
          </Text>
        </View>
        <View
          className="flex-row justify-center my-4 p-4"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Image
              source={require("@/assets/images/placeholder.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
            <Text className="text-center text-white text-lg font-afacad my-2">
              ?
            </Text>
          </View>
          <View>
            <Image
              source={require("@/assets/images/placeholder.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
            <Text className="text-center text-white text-lg font-afacad my-2">
              ?
            </Text>
          </View>
          <View>
            <Image
              source={require("@/assets/images/placeholder.png")}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
            <Text className="text-center text-white text-lg font-afacad my-2">
              ?
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default GnomeScreen;
