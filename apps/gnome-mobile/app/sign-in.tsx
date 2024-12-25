import {View} from "react-native";
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import {useAuthStore} from "@/store/useAuthStore";
import {useRouter} from "expo-router";

export default function SignInScreen() {
  const {login} = useAuthStore();
  const {replace} = useRouter()

  const onLoginPress = () => {
    console.log('login');
    login();
    replace('/', {});
  }

  return (
    <View className={"p-4"}>
      <Button onPress={onLoginPress}>
        <Text>
          Zaloguj
        </Text>
      </Button>
    </View>
  )
}
