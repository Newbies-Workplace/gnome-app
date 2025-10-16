import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeTabs from "@/app/(app)/navigator/HomeTabs";
import LoadingScreen from "@/components/LoadingScreen";
import { WelcomeBottomSheet } from "@/components/WelcomeBottomSheet";
import { useAuthStore } from "@/store/useAuthStore";
import { useIsFirstTimeStore } from "@/store/useIsFirstTimeStore";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuthStore();
  const { isFirstTime, setIsFirstTimeToFalse } = useIsFirstTimeStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!accessToken) {
    return <Redirect href={"/welcome"} />;
  }

  return (
    <SafeAreaView edges={[]} className={"flex-1 bg-background"}>
      <HomeTabs />
      {isFirstTime && (
        <WelcomeBottomSheet setIsFirstTimeToFalse={setIsFirstTimeToFalse} />
      )}
    </SafeAreaView>
  );
}
