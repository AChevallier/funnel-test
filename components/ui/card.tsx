import clsx from "clsx";
import React from "react";
import type { ViewProps } from "react-native";
import { useWindowDimensions, View } from "react-native";
type CardProps = ViewProps & {
  elevated?: boolean;
};

export const Card: React.FC<CardProps> = ({
  children,
  elevated = true,
  ...rest
}) => {
  const { width, height } = useWindowDimensions();
  console.log(width, height);
  console.log(`w-[${width - 32}px] h-[${height - 32}px]`);
  return (
    <View
      {...rest}
      className={clsx(
        `rounded-2xl p-4 ${
          elevated ? "bg-white dark:bg-neutral-800" : "bg-transparent"
        }`,
        "m-4"
      )}
      style={{
        width: width - 32,
        height: width,
      }}
    >
      <View className="flex-1 items-center justify-center">{children}</View>
    </View>
  );
};
