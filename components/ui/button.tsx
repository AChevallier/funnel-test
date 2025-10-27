import React from "react";
import { ActivityIndicator, Pressable, Text, ViewStyle } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  loading,
  variant = "primary",
}) => {
  const base =
    variant === "primary"
      ? "bg-blue-600 active:bg-blue-700"
      : "bg-neutral-800 active:bg-neutral-900";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`h-12 rounded-xl items-center justify-center ${base} ${
        disabled || loading ? "opacity-60" : ""
      }`}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white font-semibold text-base">{title}</Text>
      )}
    </Pressable>
  );
};
