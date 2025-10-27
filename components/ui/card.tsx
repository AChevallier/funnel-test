import React from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";

type CardProps = ViewProps & {
  elevated?: boolean;
};

export const Card: React.FC<CardProps> = ({
  children,
  elevated = true,
  ...rest
}) => {
  return (
    <View
      {...rest}
      className={`rounded-2xl p-4 ${
        elevated ? "bg-white dark:bg-neutral-800" : "bg-transparent"
      }`}
    >
      {children}
    </View>
  );
};
