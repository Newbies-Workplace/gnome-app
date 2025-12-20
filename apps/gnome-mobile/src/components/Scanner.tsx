import { BottomSheetView } from "@gorhom/bottom-sheet";
import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, Text, View } from "react-native";
import { Button } from "./ui/button";

export const Scanner = ({
  onCodeScanned,
}: {
  onCodeScanned: (code: string) => void;
}) => {
  const { t } = useTranslation();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [hasCodeScanned, setHasCodeScanned] = React.useState(false);
  const handleCodeScanned = (code: string) => {
    if (hasCodeScanned) return;

    setHasCodeScanned(true);
    onCodeScanned(code);
  };

  const requestPermission = async () => {
    if (cameraPermission?.status === "undetermined") {
      await requestCameraPermission();
    }

    if (cameraPermission?.status === "denied") {
      Linking.openSettings();
    }
  };

  return (
    <BottomSheetView>
      {cameraPermission?.status !== "granted" && (
        <View className="gap-10 p-10">
          <Text className="text-tekst">{t("friends.scanner.rationale")}</Text>
          <Button onPress={requestPermission}>
            <Text>{t("friends.scanner.allow")}</Text>
          </Button>
        </View>
      )}
      {cameraPermission?.status === "granted" && (
        <CameraView
          onBarcodeScanned={(result) => {
            handleCodeScanned(result.data);
          }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={{ width: "100%", height: 410 }}
        />
      )}
    </BottomSheetView>
  );
};
