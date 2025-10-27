import React from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";

type Props = TextInputProps & {
  errorText?: string;
};

export const Input: React.FC<Props> = ({ errorText, ...rest }) => {
  return (
    <TextInput
      {...rest}
      className="h-12 px-4 rounded-xl bg-white dark:bg-neutral-800 text-base"
      placeholderTextColor="#9CA3AF"
      accessibilityHint={errorText}
    />
  );
};
