import DraggableGnome from "@/components/ui/DraggableGnome";
import React from "react";
import { View } from "react-native";

const GnomeOnHat = () => {
  return (
    <View className="flex-1">
      <DraggableGnome />
    </View>
  );
};

export default GnomeOnHat;
