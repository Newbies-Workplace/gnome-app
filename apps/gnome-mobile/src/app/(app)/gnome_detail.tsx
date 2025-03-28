import BackIcon from "@/assets/icons/arrow-left.svg";
import DateIcon from "@/assets/icons/date.svg";
import FoundIcon from "@/assets/icons/found.svg";
import { GnomeCard } from "@/components/ui/GnomeCard";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const GnomeScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <BackIcon className="w-7 h-7"></BackIcon>
        </TouchableOpacity>
      ),
      headerTitle: "",
      headerStyle: { backgroundColor: "#131413" },
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation, router]);
  return (
    <ScrollView className="bg-background">
      <View className="p-5 my-2">
        <View className="justify-center items-center">
          <Image source={require("@/assets/icons/gnome-detail.png")} />
        </View>
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
          <View className="flex-row items-center">
            <FoundIcon width={20} height={20} />
            <Text className="text-white font-afacad my-2 ml-2">
              Data znalezienia: 05-04-2024
            </Text>
          </View>
          <View className="flex-row items-center">
            <DateIcon width={20} height={20} />
            <Text className="text-white font-afacad my-2 ml-2">
              Data postawienia: 04-03-2023
            </Text>
          </View>
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
        <View className="justify-center flex-row">
          <GnomeCard
            image={require("@/assets/images/placeholder.png")}
            text="?"
            onClick={() => router.replace("/collection")}
          />
          <GnomeCard
            image={require("@/assets/images/placeholder.png")}
            text="?"
            onClick={() => router.replace("/collection")}
          />
          <GnomeCard
            image={require("@/assets/images/placeholder.png")}
            text="?"
            onClick={() => router.replace("/collection")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default GnomeScreen;
