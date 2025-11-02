import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Linking, Text, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { Button } from "./ui/button";

export const Scanner = ({
  onCodeScanned,
}: {
  onCodeScanned: (code: string) => void;
}) => {
  const device = useCameraDevice("back");
  const permissionStatus = Camera.getCameraPermissionStatus();
  const [hasCodeScanned, setHasCodeScanned] = React.useState(false);
  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (code) => {
      console.log("Scanned code:", code);
      if (hasCodeScanned || !code[0].value) return;
      setHasCodeScanned(true);
      onCodeScanned(code[0].value);
    },
  });

  const requestCameraPermission = async () => {
    if (permissionStatus === "not-determined") {
      await Camera.requestCameraPermission();
    }

    if (permissionStatus === "denied" || permissionStatus === "restricted") {
      Linking.openSettings();
    }
  };

  return (
    <BottomSheetView>
      {!device ||
        (permissionStatus !== "granted" && (
          <View className="gap-10 p-10">
            <Text>
              Kamera jest potrzebna do zeskanowania kodu QR znajomego.
            </Text>
            <Button onPress={requestCameraPermission}>
              <Text>Zezwól na dostęp</Text>
            </Button>
          </View>
        ))}
      {device && permissionStatus === "granted" && (
        <Camera
          codeScanner={codeScanner}
          style={{ width: "100%", height: 410 }}
          device={device}
          isActive
        />
      )}
    </BottomSheetView>
  );
};
