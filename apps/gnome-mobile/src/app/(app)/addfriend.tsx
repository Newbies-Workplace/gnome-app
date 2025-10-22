import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { QrCodeSvg } from "react-native-qr-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Scanner } from "@/components/Scanner";
import { Text } from "@/components/ui/text";
import { FriendsService } from "@/lib/api/Friends.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useFriendsStore } from "@/store/useFriendsStore";

export default function AddFriend() {
  const navigation = useNavigation();
  const router = useRouter();
  const { user, regenerateInviteCode } = useAuthStore();
  const { friends } = useFriendsStore();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleBottomSheetOpen = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleBottomSheetClose = () => {
    bottomSheetModalRef.current?.close();
  };

  const onCodeScanned = (code: string) => {
    bottomSheetModalRef.current?.close();
    console.log("Scanned code:", code);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <ArrowLeft className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text className="text-white font-bold text-2xl text-center tracking-wide">
          Dodaj znajomego
        </Text>
      ),
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "#131413" },
      headerShadowVisible: false,
    });
  }, [navigation, router]);

  return (
    <SafeAreaView className="flex-1 bg-background p-6 items-center gap-10">
      <QrCodeSvg
        value={user!.inviteCode}
        dotColor="hsl(359 63.4% 56.1%)"
        backgroundColor="transparent"
        frameSize={350}
        contentCells={5}
      />
      <View className="flex-row gap-5">
        <TouchableOpacity onPress={handleBottomSheetOpen}>
          <Text className="text-white">SKANUJ KOD</Text>
        </TouchableOpacity>
        <BottomSheetModal
          handleIndicatorStyle={{
            backgroundColor: "#1E1E1E",
            width: 100,
            marginTop: 8,
          }}
          ref={bottomSheetModalRef}
          enableDismissOnClose
          onDismiss={handleBottomSheetClose}
        >
          <Scanner onCodeScanned={onCodeScanned} />
        </BottomSheetModal>

        <TouchableOpacity onPress={() => regenerateInviteCode()}>
          <Text className="text-white">NOWY KOD</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full">
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex flex-row items-center justify-between mb-4">
              <View className="flex flex-row items-center">
                <Image
                  source={{
                    uri: item.avatar ?? "https://i.pravatar.cc/150?img=2",
                  }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <Text className="text-white text-lg font-semibold">
                  {item.name}
                </Text>
              </View>

              <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-full">
                <Text className="text-white font-semibold">+ Dodaj</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
