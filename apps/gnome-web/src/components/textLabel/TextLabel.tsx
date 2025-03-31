import { Text } from "@/components/atoms/text/Text";
import React from "react";

interface LabelProps {
  label: string;
  required?: boolean;
}

export const TextLabel: React.FC<LabelProps> = ({
  label,
  required = false,
}) => {
  return (
    <Text variant={"headS"}>
      {label}

      {required && (
        <Text className={"font-bold ml-1 text-primary"} variant={"headS"}>
          *
        </Text>
      )}
    </Text>
  );
};
