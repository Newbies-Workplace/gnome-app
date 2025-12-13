import * as MediaLibrary from "expo-media-library";
import * as Network from "expo-network";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
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
import { useGnomeImageStore } from "@/store/useGnomeImageStore";
import { useGnomeInteractionStore } from "@/store/useGnomeInteractionStore";
import { useGnomeStore } from "@/store/useGnomeStore";

const CameraScreen = () => {
  const { t } = useTranslation();
  const { addInteraction } = useGnomeStore();
  const { setImageForGnome } = useGnomeImageStore();
  const { addPendingInteraction } = useGnomeInteractionStore();
  const { gnomeid } = useLocalSearchParams<{ gnomeid: string }>();
  const devices = useCameraDevices();
  const [device, setDevice] = useState<CameraDevice | null>(null);
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">("off");
  const [mediaPermissionResponse, requestMediaPermission] =
    MediaLibrary.usePermissions();

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
            addInteraction(gnomeid);
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

      if (
        !mediaPermissionResponse ||
        mediaPermissionResponse.status !== "granted"
      ) {
        await requestMediaPermission();
      }
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

      console.log("Media permission:", mediaPermissionResponse);

      if (mediaPermissionResponse?.status === "granted") {
        try {
          const asset = await MediaLibrary.createAssetAsync(photo.path);
          const albumName = "GnomeCollection";

          let album = await MediaLibrary.getAlbumAsync(albumName);

          if (!album) {
            album = await MediaLibrary.createAlbumAsync(
              albumName,
              asset,
              false,
            );
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
          }
          console.log("Saved to album: ", asset.uri);

          setImageForGnome({
            gnomeId: gnomeid,
            assetUri: asset.uri,
          });
        } catch (error) {
          console.error("Error saving photo: ", error);
        }
      }
      await addInteraction(gnomeid).catch(async () => {
        const net = await Network.getNetworkStateAsync();

        if (!net.isConnected || net.isInternetReachable === false) {
          await addPendingInteraction(gnomeid);
        } else {
          ToastAndroid.show(t("common.genericError"), ToastAndroid.SHORT);
        }
      });
      router.push("/collection");
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
    <SafeAreaView className="flex-1 items-center bg-primary-foreground p-4">
      <View className=" w-full h-[80%] rounded-2xl border-4 border-red-500 overflow-hidden flex justify-center items-center p-4">
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
