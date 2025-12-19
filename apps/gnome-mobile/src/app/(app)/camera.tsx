import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from "react-native-vision-camera";
import BackIcon from "@/assets/icons/arrow-left.svg";
import { checkAndroidMediaPermission } from "@/lib/media-permissions";
import { useGnomeImageStore } from "@/store/useGnomeImageStore";
import { useGnomeStore } from "@/store/useGnomeStore";

const CameraScreen = () => {
  const { t } = useTranslation();
  const { addInteraction } = useGnomeStore();
  const { setImageForGnome } = useGnomeImageStore();
  const { gnomeId } = useLocalSearchParams<{ gnomeId: string }>();
  const devices = useCameraDevices();
  const [device, setDevice] = useState<CameraDevice | null>(null);
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">("off");

  //Header
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity className="p-5" onPress={() => router.back()}>
          <BackIcon className="w-7 h-7 text-tekst" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View className="text-center">
          <Text className="text-tekst text-lg font-bold text-center tracking-wide">
            {t("addGnome.camera.title")}
            {"\n"}
            {t("addGnome.camera.subtitle")}
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          className="p-5"
          onPress={() => {
            addInteraction(gnomeId);
            router.push("/collection");
          }}
        >
          <Text className="text-tekst text-lg font-bold text-center tracking-wide">
            {t("common.skip")}
          </Text>
        </TouchableOpacity>
      ),
      headerBackground: () => (
        <View className="absolute inset-0 bg-primary-foreground" />
      ),
      headerTitleAlign: "center",
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

  const takePhoto = async () => {
    if (cameraRef.current) {
      const file = await cameraRef.current.takePhoto({
        flash: flashMode,
      });

      if (Platform.OS === "android" && !(await checkAndroidMediaPermission())) {
        return;
      }

      const photo = await CameraRoll.saveAsset(`file://${file.path}`, {
        type: "photo",
        album: t("common.appName"),
      });
      setImageForGnome({
        gnomeId: gnomeId,
        assetUri: photo.node.image.uri,
      });
      router.push("/collection");
    }
  };

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
    <SafeAreaView className="flex-1 items-center bg-primary-foreground p-4">
      <View className=" w-full h-[80%] rounded-2xl border-4 border-red-500 overflow-hidden flex justify-center items-center p-4">
        {device && hasPermission ? (
          <Camera
            style={StyleSheet.absoluteFill}
            ref={cameraRef}
            className="flex-1"
            device={device}
            isActive
            photo
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-tekst text-lg">
              {t("addGnome.camera.noCameraAvailable")}
            </Text>
          </View>
        )}
      </View>

      <View className="absolute inset-x-0 bottom-5 flex-row justify-center gap-5">
        <TouchableOpacity
          onPress={toggleFlash}
          className={`p-4 rounded-full ${
            device && hasPermission ? "bg-background" : "bg-gray-500"
          }`}
          disabled={!device || !hasPermission}
        >
          <Image
            source={require("@/assets/icons/flash-off.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={takePhoto}
          className={`w-16 h-16 rounded-full flex justify-center items-center ${
            device && hasPermission ? "bg-white" : "bg-gray-700"
          }`}
          disabled={!device || !hasPermission}
        />

        <TouchableOpacity
          onPress={switchCamera}
          className={`p-4 rounded-full ${
            device && hasPermission ? "bg-background" : "bg-gray-500"
          }`}
          disabled={!device || !hasPermission}
        >
          <Image
            source={require("@/assets/icons/reload.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;
