import DraggableGnome from "@/components/ui/DraggableGnome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Text, View } from "react-native";

const GnomeOnHat = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-between">
      <Text className="text-center">GNOME</Text>
      <DraggableGnome onUnlock={navigation.replace.bind(navigation, "login")} />
      <DraggableGnome
        onUnlock={navigation.replace.bind(navigation, "register")}
      />
      <DraggableGnome onUnlock={() => Alert.alert("Gnome Unlocked!")} />
      <DraggableGnome onUnlock={() => Alert.alert("Gnome Unlocked hihi!")} />
    </View>
  );
};

export default GnomeOnHat;
