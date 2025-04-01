import ArrowLeft from "@/assets/icons/arrow-left.svg";
import DateIcon from "@/assets/icons/date.svg";
import FoundIcon from "@/assets/icons/found.svg";
import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeStore } from "@/store/useGnomeStore";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const GnomeDetail = () => {
  const { id } = useLocalSearchParams(); // Get gnome ID from URL
  const { gnomes } = useGnomeStore(); // Fetch gnome list from store
  const [gnome, setGnome] = useState(null);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#131413",
      },
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    if (id) {
      const foundGnome = gnomes.find((g) => g.id.toString() === id);
      setGnome(foundGnome);
    }
  }, [id, gnomes]);

  if (!gnome) {
    return (
      <View className="flex-1 justify-center items-center bg-[#131413]">
        <Text className="text-white text-lg">Ładowanie...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-background p-4">
      <View className="items-center mb-5">
        <Image source={require("@/assets/icons/gnome-detail.png")} />
      </View>
      <Text className="text-center text-white text-3xl font-bold mb-2.5">
        {gnome.name}
      </Text>
      <Text className="text-center text-white text-lg mb-2.5">
        {gnome.location}
      </Text>

      <View className="border-b border-primary my-2.5 w-4/5 self-center" />

      <View className="flex-row items-center mb-2.5">
        <FoundIcon width={20} height={20} />
        <Text className="text-white ml-2.5">
          Data znalezienia: {gnome.foundDate}
        </Text>
      </View>

      <View className="flex-row items-center mb-2.5">
        <DateIcon width={20} height={20} />
        <Text className="text-white ml-2.5">
          Data postawienia: {gnome.creationDate}
        </Text>
      </View>

      <View className="border-b border-primary my-2.5 w-4/5 self-center" />

      <Text className="text-white mb-2.5">{gnome.description}</Text>

      <View className="flex-row justify-center mt-5">
        <GnomeCard
          image={require("@/assets/images/placeholder.png")}
          text="?"
          onClick={() => router.push("/collection")}
        />
        <GnomeCard
          image={require("@/assets/images/placeholder.png")}
          text="?"
          onClick={() => router.push("/collection")}
        />
        <GnomeCard
          image={require("@/assets/images/placeholder.png")}
          text="?"
          onClick={() => router.push("/collection")}
        />
      </View>
    </ScrollView>
  );
};

export default GnomeDetail;
