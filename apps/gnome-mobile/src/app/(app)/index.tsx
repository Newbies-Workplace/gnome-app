import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [value, setValue] = useState("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View className={"p-4 flex gap-2 justify-center items-center"}>
      <Text className={""}>Edit app/index.tsx to edit this screen.</Text>

      <Input
        className={"w-full"}
        placeholder="Write some stuff..."
        value={value}
        onChangeText={onChangeText}
        aria-labelledby="inputLabel"
        aria-errormessage="inputError"
      />

      <Skeleton className="h-12 w-12 rounded-full" />
    </View>
  );
}
