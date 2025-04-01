import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";

//Import ikon
import BackIcon from "@/assets/icons/arrow-left.svg";

const CameraScreen = () => {
  const { gnomeid } = useLocalSearchParams<{ gnomeid: string }>();
  const devices = useCameraDevices();
  const [device, setDevice] = useState(null);
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [flashMode, setFlashMode] = useState("off");

  //Header
  const navigation = useNavigation();
  const router = useRouter();

  console.log("Closest gnome in camera: ", gnomeid);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <BackIcon className="w-7 h-7"></BackIcon>
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
      setHasPermission(cameraPermission === "authorized");
    })();
  }, []);

  useEffect(() => {
    if (devices.back) {
      setDevice(devices.back);
    }
  }, [devices]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      console.log("Photo captured:", photo);
      sendInteractionData(
        closestGnome.gnome.id,
        closestGnome.gnome.name,
        data.uri,
      );
    }
  };

  const sendInteractionData = async (gnomeId, userPictureUri) => {
    const userId = user.id; // Zakładając, że masz dostęp do użytkownika
    const interactionDate = new Date().toISOString();

    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        gnomeId,
        interactionDate,
        userPicture: userPictureUri,
      }),
    });

    if (response.ok) {
      console.log("Interaction data sent successfully");
    } else {
      console.error("Failed to send interaction data");
    }
  };

  const toggleFlash = () => {
    setFlashMode((prev) => (prev === "off" ? "on" : "off"));
  };

  const switchCamera = () => {
    setDevice((prev) => (prev === devices.back ? devices.front : devices.back));
  };

  return (
    <View className="flex-1 justify-center items-center bg-background relative">
      <View className="w-[90%] h-[80%] rounded-2xl border-4 border-red-500 overflow-hidden bg-black flex justify-center items-center">
        {device && hasPermission ? (
          <Camera
            ref={cameraRef}
            className="flex-1"
            device={device}
            isActive={true}
            photo={true}
            flashMode={flashMode}
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
