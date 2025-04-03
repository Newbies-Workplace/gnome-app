import ArrowLeft from "@/assets/icons/arrow-left.svg";
import DateIcon from "@/assets/icons/date.svg";
import FoundIcon from "@/assets/icons/found.svg";
import { GnomeCard } from "@/components/ui/GnomeCard";
import { useGnomeStore } from "@/store/useGnomeStore";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const GnomeDetail = () => {
  const { id } = useLocalSearchParams();
  const { gnomes, interactions } = useGnomeStore(); // Add interactions here
  const [gnome, setGnome] = useState(null);
  const router = useRouter();
  const navigation = useNavigation();
  const route = useRoute();

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
  const getImageSource = () => {
    if (interaction?.found && interaction?.userPicture)
      return (
        <Image
          source={{ uri: interaction.userPicture }}
          style={{ width: 379, height: 455 }}
        />
      );
    if (interaction?.found)
      return (
        <Image
          source={{ uri: gnome.pictureUrl }}
          style={{ width: 379, height: 455 }}
        />
      );
    return (
      <Image
        source={require("@/assets/images/placeholder.png")}
        style={{ width: 379, height: 455 }}
      />
    );
  };

  const interaction = interactions.find((i) => i.gnomeId === gnome.id);

  return (
    <ScrollView className="bg-background p-4">
      <View className="items-center mb-5">{getImageSource()}</View>
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
          Data znalezienia:
          {interaction
            ? `${interaction.interactionDate.toLocaleString()}`
            : " Krasnal jeszcze nie znaleziony"}
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

      <Text className="text-white font-bold text-xl font-afacad my-2">
        Ciekawostka:
      </Text>
      <Text className="text-white font-afacad my-2">{gnome.funFact}</Text>

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
