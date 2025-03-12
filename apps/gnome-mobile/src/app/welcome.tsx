import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

export default function SignInScreen() {
  const { replace } = useRouter();

  return (
    <View className="flex-1 justify-end">
      <Image
        source={require("@/assets/images/bgmax.png")}
        className="w-full h-full flex-1 object-cover"
        style={{
          transform: "scale(1)",
        }}
      />

      <View className="bg-background p-10 ">
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
          }}
          className="text-center text-base/10 font-Afacad"
        >
          Znajdź swojego ulubionego krasnala!
        </Text>
        <Text
          style={{ color: "white", fontSize: 18, marginBottom: 20 }}
          className="text-center font-Afacad"
        >
          Dołącz do nas i odkryj swojego idealnego krasnala we Wrocławiu!
        </Text>
        <Button
          onPress={() => replace("/register")}
          className="w-full mb-4 rounded-3xl bg-primary font-Afacad"
        >
          <Text className="text-white">Załóż konto</Text>
        </Button>
        <Button
          onPress={() => replace("/login")}
          className="w-full rounded-3xl bg-secondary font-Afacad"
        >
          <Text className="text-white">Zaloguj się</Text>
        </Button>
      </View>
    </View>
  );
}
