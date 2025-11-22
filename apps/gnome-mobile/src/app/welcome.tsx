import { useRouter } from "expo-router";
import { Image, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

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
        <Text className="text-tekst text-[24px] font-bold mb-2 text-center text-base/10 font-Afacad">
          Znajdź swojego ulubionego krasnala!
        </Text>
        <Text className="text-tekst text-[18px] mb-5 text-center font-Afacad">
          Dołącz do nas i odkryj swojego idealnego krasnala we Wrocławiu!
        </Text>
        <Button
          onPress={() => replace("/register")}
          className="items-center justify-center w-full mb-4 rounded-3xl bg-primary font-Afacad"
        >
          <Text className="text-tekst">Załóż konto</Text>
        </Button>
        <Button
          onPress={() => replace("/login")}
          className="w-full rounded-3xl bg-secondary font-Afacad"
        >
          <Text className="text-tekst">Zaloguj się</Text>
        </Button>
      </View>
    </View>
  );
}
