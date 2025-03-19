import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";

const CameraScreen = () => {
  const devices = useCameraDevices();
  const [device, setDevice] = useState(null);
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [flashMode, setFlashMode] = useState("off");

  useEffect(() => {
    console.log("Available Devices:", devices);
    console.log("Selected Device:", device);
    console.log("Has Permission:", hasPermission);
  }, [devices, device, hasPermission]);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      setHasPermission(
        cameraPermission === "authorized" &&
          microphonePermission === "authorized",
      );
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
      <Text className="absolute top-10 text-white text-l font-bold text-center">
        Znalazłeś krasnala?{"\n"}Zrób mu zdjęcie!
      </Text>

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
