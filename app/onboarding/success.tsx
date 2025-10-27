import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../auth/ctx";
import { Button } from "../../components/ui/button";
import { useFunnelStore } from "../../store/funnel";

export default function FunnelSuccess() {
  const router = useRouter();
  const reset = useFunnelStore((s) => s.reset);
  const { signIn } = useSession();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-5xl">✅</Text>
        <Text className="text-2xl font-bold">Bienvenue !</Text>
        <Button
          title="Aller à l'app"
          onPress={() => {
            if (reset) {
              reset();
            }
            signIn();
            router.replace("/(tabs)");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
