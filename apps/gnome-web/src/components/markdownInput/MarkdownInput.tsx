"use client";

import { Text } from "@/components/atoms/text/Text";
import { TextLabel } from "@/components/atoms/textLabel/TextLabel";
import MDEditor from "@uiw/react-md-editor";
// @ts-ignore
import { ITextAreaProps } from "@uiw/react-md-editor/lib/components/TextArea";
import React from "react";

export interface MarkdownInputProps {
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  setValue: (value?: string) => void;
  onBlur?: () => void;
  height?: number;
  textareaProps?: ITextAreaProps;
}

export const MarkdownInput: React.FC<MarkdownInputProps> = ({
  label,
  error,
  required = false,
  placeholder,
  value,
  setValue,
  onBlur,
  height,
  textareaProps,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <TextLabel label={label} required={required} />

      <div data-color-mode="light">
        <MDEditor
          textareaProps={textareaProps}
          height={height}
          value={value}
          // placeholder={placeholder}
          onBlur={onBlur}
          onChange={setValue}
        />
      </div>

      {error && (
        <Text className={"text-live"} variant={"bodyS"}>
          {error}
        </Text>
      )}
    </div>
  );
};
