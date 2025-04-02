import BackIcon from "@/assets/icons/arrow-left.svg";
import { axiosInstance } from "@/lib/api/axios";
import { useGnomeStore } from "@/store/useGnomeStore";
import axios from "axios";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Camera,
  CameraDevice,
  CameraRuntimeError,
  useCameraDevices,
} from "react-native-vision-camera";

const CameraScreen = () => {
  const { addInteraction } = useGnomeStore();
  const { gnomeid } = useLocalSearchParams<{ gnomeid: string }>();
  const devices = useCameraDevices();
  const [device, setDevice] = useState<CameraDevice | null>(null);
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">("off");

  //Header
  const navigation = useNavigation();
  const router = useRouter();
  console.log("Closest gnome in camera: ", gnomeid);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <BackIcon className="w-7 h-7" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View className="text-center">
          <Text className="text-white text-lg font-bold text-center tracking-wide">
            Znalazłeś krasnala?{"\n"}Zrób mu zdjęcie!
          </Text>
        </View>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#131413",
      },
      headerShadowVisible: false,
      headerShown: true,
    });
  });

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === "granted");
    })();
  }, []);

  useEffect(() => {
    if (backCamera) {
      setDevice(backCamera);
    }
  }, [devices]);

  // Robienie zdj
  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        flash: flashMode,
      });
      const photoUrl = `file://${photo.path}`;
      await addInteraction(gnomeid, photoUrl);
    }
  };

  // Przełączenie flasha
  const toggleFlash = () => {
    setFlashMode((prev) => (prev === "off" ? "on" : "off"));
  };

  // Zmiana kierunku kamery
  const backCamera = devices.find((device) => device.position === "back");
  const frontCamera = devices.find((device) => device.position === "front");

  const switchCamera = () => {
    setDevice((prev) =>
      prev?.position === "back" ? (frontCamera ?? prev) : (backCamera ?? prev),
    );
  };

  return (
    <View className="flex-1 justify-center items-center bg-background relative">
      <View className="w-[90%] h-[80%] rounded-2xl border-4 border-red-500 overflow-hidden flex justify-center items-center">
        {device && hasPermission ? (
          <Camera
            style={StyleSheet.absoluteFill}
            ref={cameraRef}
            className="flex-1"
            device={device}
            isActive={true}
            photo={true}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">No camera available</Text>
          </View>
        )}
      </View>

      <View className="absolute inset-x-0 bottom-5 flex-row justify-center gap-5">
        <TouchableOpacity
          onPress={toggleFlash}
          className={`p-4 rounded-full ${device && hasPermission ? "bg-background" : "bg-gray-500"}`}
          disabled={!device || !hasPermission}
        >
          <Image
            source={require("@/assets/icons/flash-off.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={takePhoto}
          className={`w-16 h-16 rounded-full flex justify-center items-center ${device && hasPermission ? "bg-white" : "bg-gray-700"}`}
          disabled={!device || !hasPermission}
        />

        <TouchableOpacity
          onPress={switchCamera}
          className={`p-4 rounded-full ${device && hasPermission ? "bg-background" : "bg-gray-500"}`}
          disabled={!device || !hasPermission}
        >
          <Image
            source={require("@/assets/icons/reload.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;
