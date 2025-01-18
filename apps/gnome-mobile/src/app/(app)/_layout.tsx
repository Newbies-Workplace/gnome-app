import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
  const { accessToken, isLoading } = useAuthStore();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (!accessToken) {
    return <Redirect href={"/sign-in"} />;
  }

  return <Slot />;
}
