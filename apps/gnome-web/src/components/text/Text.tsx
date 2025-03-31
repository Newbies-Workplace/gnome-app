import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

interface TextCompProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "bodyS" | "bodyM" | "bodyL" | "headS" | "headM" | "headL";
  bold?: boolean;
  className?: string;
}

const textStyles = cva("font-normal", {
  variants: {
    variant: {
      bodyS: "text-xs font-lato",
      bodyM: "text-sm font-lato",
      bodyL: "text-base font-lato",
      headS: "text-lg font-inter",
      headM: "text-xl font-inter",
      headL: "text-2xl font-inter",
    },
    bold: {
      true: "font-bold",
      false: "font-normal",
    },
  },
  defaultVariants: {
    variant: "bodyM",
    bold: false,
  },
});

export const Text: React.FC<TextCompProps> = ({
  className,
  style,
  variant = "bodyM",
  bold = false,
  children,
}) => {
  return (
    <span
      className={cn(textStyles({ variant, bold }), className)}
      style={style}
    >
      {children}
    </span>
  );
};
