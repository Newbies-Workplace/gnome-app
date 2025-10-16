import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeTabs from "@/app/(app)/navigator/HomeTabs";
import LoadingScreen from "@/components/LoadingScreen";
import { WelcomeBottomSheet } from "@/components/WelcomeBottomSheet";
import { useAuthStore } from "@/store/useAuthStore";
import { isFirstAppEntryStore } from "@/store/useisFirstAppEntryStore";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuthStore();
  const { isFirstAppEntry, setIsFirstAppEntryToFalse } = isFirstAppEntryStore();

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
