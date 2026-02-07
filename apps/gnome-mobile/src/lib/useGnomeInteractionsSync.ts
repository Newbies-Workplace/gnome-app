import * as Network from "expo-network";
import { useEffect } from "react";
import { useGnomeStore } from "@/store/useGnomeStore";

export const useGnomeInteractionsSync = () => {
  const { syncPendingInteractions } = useGnomeStore();

  useEffect(() => {
    const subscription = Network.addNetworkStateListener(
      ({ isConnected, isInternetReachable }) => {
        console.log(
          `Connected: ${isConnected}, Internet Reachable: ${isInternetReachable}`,
        );
        if (isConnected && isInternetReachable) {
          syncPendingInteractions();
        }
      },
    );

    return () => {
      subscription?.remove();
    };
  }, []);
};
