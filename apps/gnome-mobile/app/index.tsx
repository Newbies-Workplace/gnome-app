import { Text, View } from "react-native";
import {Input} from "@/components/ui/input";
import React from "react";

export default function Index() {
  const [value, setValue] = React.useState('');

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className={""}>Edit app/index.tsx to edit this screen.</Text>

      <Input
        placeholder='Write some stuff...'
        value={value}
        onChangeText={onChangeText}
        aria-labelledby='inputLabel'
        aria-errormessage='inputError'
      />
    </View>
  );
}
