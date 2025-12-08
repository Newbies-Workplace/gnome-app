import { PortalHost } from "@rn-primitives/portal";
import * as Network from "expo-network";
import { Redirect, Slot } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeTabs from "@/app/(app)/navigator/HomeTabs";
import LoadingScreen from "@/components/LoadingScreen";
import { WelcomeBottomSheet } from "@/components/WelcomeBottomSheet";
import { useAuthStore } from "@/store/useAuthStore";
import { useGnomeInteractionStore } from "@/store/useGnomeInteractionStore";
import { isFirstAppEntryStore } from "@/store/useisFirstAppEntryStore";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuthStore();
  const { isFirstAppEntry, setIsFirstAppEntryToFalse } = isFirstAppEntryStore();
  const syncPending = useGnomeInteractionStore((s) => s.syncPending);

  useEffect(() => {
    const subscription = Network.addNetworkStateListener(
      ({ isConnected, isInternetReachable }) => {
        console.log(
          `Connected: ${isConnected}, Internet Reachable: ${isInternetReachable}`,
        );
        if (isConnected && isInternetReachable) {
          syncPending();
        }
      },
    );
    return () => {
      subscription?.remove();
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!accessToken) {
    return <Redirect href={"/welcome"} />;
  }

  return (
    <SafeAreaView edges={[]} className={"flex-1 bg-background"}>
      <HomeTabs />
      {isFirstAppEntry && (
        <WelcomeBottomSheet
          setIsFirstAppEntryToFalse={setIsFirstAppEntryToFalse}
        />
      )}
    </SafeAreaView>
  );
}
