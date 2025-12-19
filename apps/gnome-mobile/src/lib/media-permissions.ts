import { PermissionsAndroid, Platform } from "react-native";

export async function checkAndroidMediaPermission() {
  const getCheckPermissionPromise = () => {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }

  const getRequestPermissionPromise = () => {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ).then((result) => result === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}
