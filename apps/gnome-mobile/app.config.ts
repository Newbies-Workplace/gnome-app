import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Krasnal GO",
  slug: "Krasnal GO",
  owner: "rstnewbies",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/applogo.png",
  scheme: "gnome-mobile",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    bundleIdentifier: "pl.newbies.gnomes",
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/applogo.png",
      backgroundColor: "#ffffff",
    },
    package: "pl.newbies.gnomes",
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./src/assets/images/favicon.png",
  },
  plugins: [
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow $(PRODUCT_NAME) to use your location.",
      },
    ],
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme:
          "com.googleusercontent.apps.1072736295761-veuj45s0ngd02p3mmhfh5fc14btkuh6r",
      },
    ],
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    "expo-font",
    [
      "react-native-vision-camera",
      {
        cameraPermissionText: "$(PRODUCT_NAME) needs access to your Camera.",
        enableCodeScanner: true,
      },
    ],
    "expo-build-properties",
    "expo-web-browser",
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "99a23e0d-ee59-4773-9c6d-90ad35da26d1",
    },
  },
});
