import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/button";

export default function FunnelIntro() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center px-6 gap-6">
        <Image
          source={require("../../assets/images/icon.png")}
          style={{ width: 96, height: 96 }}
        />
        <Text className="text-2xl font-bold text-center">Bienvenue</Text>
        <Text className="text-base text-center text-neutral-500">
          Découvrez notre app en 3 étapes simples
        </Text>
        <Link href="/onboarding/highlights" asChild>
          <Button title="Commencer" />
        </Link>
      </View>
    </SafeAreaView>
  );
}
