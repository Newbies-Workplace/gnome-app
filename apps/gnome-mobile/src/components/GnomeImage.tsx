import React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";
import { useGnomeImage } from "@/lib/useGnomeImage";
import { cn } from "@/lib/utils";

export type GnomeImageProps = {
  gnomeId: string;
  className?: string;
  style?: StyleProp<ImageStyle>;
};

const placeholder = require("@/assets/images/placeholder.png");

export const GnomeImage: React.FC<GnomeImageProps> = ({
  gnomeId,
  className,
  style,
}) => {
  const gnomeImage = useGnomeImage(gnomeId);

  return (
    <Image
      source={gnomeImage}
      defaultSource={placeholder}
      className={cn(className)}
      style={style}
    />
  );
};
