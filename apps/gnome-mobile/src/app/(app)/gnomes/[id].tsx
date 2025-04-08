import ArrowLeft from "@/assets/icons/arrow-left.svg";
import DateIcon from "@/assets/icons/date.svg";
import FoundIcon from "@/assets/icons/found.svg";
import { GnomeCard } from "@/components/ui/GnomeCard";
import { GnomesService } from "@/lib/api/Gnomes.service";
import { useGnomeStore } from "@/store/useGnomeStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GnomeResponse } from "@repo/shared/responses";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GnomeDetail = () => {
  const route = useRoute();
  const gnomeId = route.params?.id;

  const { gnomes, interactions } = useGnomeStore();
  const [gnome, setGnome] = useState<GnomeResponse>();
  const [nearestGnomes, setNearestGnomes] = useState<GnomeResponse[]>([]);
  const router = useRouter();
  const navigation = useNavigation();

  const interaction = useMemo(
    () => interactions.find((i) => i.gnomeId === gnomeId),
    [interactions],
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitle: "",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#131413",
      },
      headerShadowVisible: false,
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    if (gnomeId) {
      const foundGnome = gnomes.find((g) => g.id === gnomeId);

      if (foundGnome) {
        setGnome(foundGnome);
      }
    }
  }, [gnomeId, gnomes]);

  useEffect(() => {
    if (gnome) {
      GnomesService.getGnomeById(gnome.id)
        .then((gnome) => setNearestGnomes(gnome.nearest))
        .catch((error) => console.error(error));
    }
  }, [gnome]);

  if (!gnome) {
    return (
      <View className="flex-1 justify-center items-center bg-[#131413]">
        <Text className="text-white text-lg">Ładowanie...</Text>
      </View>
    );
  }

  const getImageSource = () => {
    if (!!interaction && interaction?.userPicture)
      return { uri: interaction.userPicture };
    if (interaction) return { uri: gnome.pictureUrl };
    return require("@/assets/images/placeholder.png");
  };

  return (
    <SafeAreaView
      className="bg-background flex-1"
      edges={["bottom", "left", "right"]}
    >
      <ScrollView className={"px-4"}>
        <View className="items-center mb-5 mt-5">
          <Image
            source={getImageSource()}
            style={{ width: 379, height: 455 }}
            className={"rounded-xl"}
          />
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
            Data znalezienia:{" "}
            {interaction
              ? dayjs(interaction.interactionDate).format("DD.MM.YYYY")
              : "Krasnal jeszcze nie znaleziony"}
          </Text>
        </View>

        <View className="flex-row items-center mb-2.5">
          <DateIcon width={20} height={20} />
          <Text className="text-white ml-2.5">
            Data postawienia: {dayjs(gnome.creationDate).format("DD.MM-YYYY")}
          </Text>
        </View>
        <View className="border-b border-primary my-2.5 w-4/5 self-center" />

        <Text className="text-white mb-2.5">{gnome.description}</Text>

        <Text className="text-white font-bold text-xl font-afacad my-2">
          Ciekawostka:
        </Text>
        <Text className="text-white font-afacad my-2">{gnome.funFact}</Text>

        <View className="flex-row justify-center">
          {nearestGnomes.slice(0, 3).map((gnome) => (
            <GnomeCard
              key={gnome.id}
              image={require("@/assets/images/placeholder.png")}
              text={gnome.name}
              onClick={() => router.push(`/gnomes/${gnome.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GnomeDetail;
