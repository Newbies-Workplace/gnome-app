import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "@/assets/icons/arrow-left.svg";
import CameraIcon from "@/assets/icons/camera.svg";
import { useGnomeImageStore } from "@/store/useGnomeImageStore";
import { useGnomeStore } from "@/store/useGnomeStore";

const CameraScreen = () => {
  const { t } = useTranslation();
  const { addInteraction } = useGnomeStore();
  const { setImageForGnome } = useGnomeImageStore();
  const { gnomeId } = useLocalSearchParams<{ gnomeId: string }>();
  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions(
    { writeOnly: false },
  );

  const [facing, setFacing] = useState<CameraType>("back");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [isCameraReady, setIsCameraReady] = useState(false);

  //Header
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    requestCameraPermission().then(() => {
      requestMediaPermission();
    });
  }, []);

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

  const takePhoto = async () => {
    if (
      !cameraRef.current ||
      !isCameraReady ||
      !cameraPermission?.granted ||
      !mediaPermission?.granted
    ) {
      console.log("Camera or media permission not granted or camera not ready");
      return;
    }

    const albumName = t("common.appName");
    let album = await MediaLibrary.getAlbumAsync(albumName);

    try {
      const { uri } = await cameraRef.current.takePictureAsync({});
      const asset = await MediaLibrary.createAssetAsync(uri);

      if (album == null) {
        album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      // get the newest asset in the album (the one we just added)
      const assetsInAlbum = await MediaLibrary.getAssetsAsync({
        album: album.id,
        sortBy: [MediaLibrary.SortBy.creationTime],
        first: 1,
      });

      console.log("Newest asset in album:", assetsInAlbum.assets[0]);
      if (assetsInAlbum.assets.length > 0) {
        const newestAsset = assetsInAlbum.assets[0];
        setImageForGnome({
          gnomeId: gnomeId,
          assetUri: newestAsset.uri,
        });
      } else {
        console.log("No assets found in album");
      }

      router.push("/collection");
    } catch (error) {
      console.log("Error taking photo:", error);
    }
  };

  const toggleFlash = () => {
    setFlashMode((prev) => (prev === "off" ? "on" : "off"));
  };

  const switchCamera = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-primary-foreground p-4">
      <View className=" w-full h-[80%] rounded-2xl border-4 border-red-500 overflow-hidden flex justify-center items-center p-4">
        {cameraPermission?.granted ? (
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing={facing}
            mode={"picture"}
            flash={flashMode}
            onMountError={(error) => console.log(error)}
            onCameraReady={() => setIsCameraReady(true)}
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
            cameraPermission?.granted ? "bg-background" : "bg-gray-500"
          }`}
          disabled={!cameraPermission?.granted}
        >
          <Image
            source={require("@/assets/icons/flash-off.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={takePhoto}
          className={`w-16 h-16 rounded-full flex justify-center items-center ${
            cameraPermission?.granted &&
            mediaPermission?.granted &&
            isCameraReady
              ? "bg-white"
              : "bg-gray-700"
          }`}
          disabled={
            !cameraPermission?.granted ||
            !mediaPermission?.granted ||
            !isCameraReady
          }
        >
          <CameraIcon className="w-8 h-8" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={switchCamera}
          className={`p-4 rounded-full ${
            cameraPermission?.granted ? "bg-background" : "bg-gray-500"
          }`}
          disabled={!cameraPermission?.granted}
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
