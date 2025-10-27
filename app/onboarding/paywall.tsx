import useAnalytics from "@/services/analytics";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/button";
import { purchase } from "../../services/purchase";
import { useFunnelStore } from "../../store/funnel";

export default function FunnelPaywall() {
  const router = useRouter();
  const selectedOfferId = useFunnelStore((s) => s.selectedOfferId);
  const remoteConfig = useFunnelStore((s) => s.remoteConfig);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const analytics = useAnalytics();
  useEffect(() => {
    if (remoteConfig?.isUserSubscribed) {
      router.replace("/onboarding/success");
    }
  }, [remoteConfig, router]);

  const onPurchase = async () => {
    if (!selectedOfferId) return;
    setLoading(true);
    setError(undefined);
    try {
      await purchase(selectedOfferId, {
        shouldFail: remoteConfig?.forcePurchaseFail,
        trial: remoteConfig?.enableTrial,
      });
      analytics.track("purchase_success", { offerId: selectedOfferId });
      router.replace("/onboarding/success");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4 py-6 gap-4">
        <Text className="text-xl font-semibold text-center">Paiement</Text>
        <Text className="text-center text-neutral-600">
          Offre sélectionnée: {selectedOfferId || "Aucune"}
        </Text>
        {error ? (
          <Text className="text-center text-red-500">{error}</Text>
        ) : null}
        <Button
          title={"S'abonner"}
          onPress={onPurchase}
          loading={loading}
          disabled={!selectedOfferId}
        />
        <Text className="text-center text-xs text-neutral-500">
          En vous abonnant, vous acceptez les conditions d&apos;utilisation.
        </Text>
      </View>
    </SafeAreaView>
  );
}
