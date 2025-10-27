import React from "react";
import { Text, View } from "react-native";

type Props = {
  text: string;
};

export const Badge: React.FC<Props> = ({ text }) => {
  return (
    <View className="px-2 py-1 rounded-lg bg-amber-500">
      <Text className="text-xs font-semibold text-black">{text}</Text>
    </View>
  );
};
