import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import type { PressableProps, ViewStyle } from "react-native";
import { Pressable, Text, View } from "react-native";

type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
} & Omit<PressableProps, "onPress">;

const sizeToDim: Record<NonNullable<CheckboxProps["size"]>, number> = {
  sm: 18,
  md: 22,
  lg: 28,
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  onCheckedChange,
  label,
  disabled,
  size = "md",
  style,
  accessibilityLabel,
  ...rest
}) => {
  const [internalChecked, setInternalChecked] = useState<boolean>(
    defaultChecked ?? false
  );

  const isControlled = typeof checked === "boolean";
  const value = isControlled ? !!checked : internalChecked;

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
  }, [disabled, isControlled, onCheckedChange, value]);

  const dim = sizeToDim[size];

  const boxClasses = useMemo(() => {
    const base = "items-center justify-center rounded-md border";
    const colors = value
      ? "bg-blue-600 border-blue-600"
      : "bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700";
    const state = disabled ? " opacity-60" : " active:opacity-80";
    return `${base} ${colors}${state}`;
  }, [value, disabled]);

  return (
    <Pressable
      {...rest}
      onPress={toggle}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel ?? label}
      className="flex-row items-center"
      style={style}
    >
      <View className={boxClasses} style={{ width: dim, height: dim }}>
        {value ? (
          <Ionicons
            name="checkmark"
            size={Math.max(14, dim - 8)}
            color="#fff"
          />
        ) : null}
      </View>
      {label ? (
        <Text className="ml-2 text-base text-black dark:text-white">
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default Checkbox;
