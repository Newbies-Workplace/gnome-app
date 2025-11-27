import * as Network from "expo-network";
import { Redirect, Slot } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeTabs from "@/app/(app)/navigator/HomeTabs";
import LoadingScreen from "@/components/LoadingScreen";
import { WelcomeBottomSheet } from "@/components/WelcomeBottomSheet";
import { useAuthStore } from "@/store/useAuthStore";
import { isFirstAppEntryStore } from "@/store/useisFirstAppEntryStore";
import { useOfflineInteractionStore } from "@/store/useOfflineInteractionStore";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuthStore();
  const { isFirstAppEntry, setIsFirstAppEntryToFalse } = isFirstAppEntryStore();
  const syncPending = useOfflineInteractionStore((s) => s.syncPending);

  useEffect(() => {
    const interval = setInterval(async () => {
      const net = await Network.getNetworkStateAsync();
      if (net.isConnected && net.isInternetReachable) {
        syncPending();
      }
    }, 5000);

    return () => clearInterval(interval);
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
