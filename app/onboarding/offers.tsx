import useAnalytics from "@/services/analytics";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { getOffers, Offer } from "../../services/offers";
import { useFunnelStore } from "../../store/funnel";

export default function FunnelOffers() {
  const router = useRouter();
  const selectedOfferId = useFunnelStore((s) => s.selectedOfferId);
  const setSelectedOffer = useFunnelStore((s) => s.setSelectedOffer);
  const remoteConfig = useFunnelStore((s) => s.remoteConfig);
  const [offers, setOffers] = useState<Offer[]>([]);
  const analytics = useAnalytics();

  useEffect(() => {
    getOffers().then(setOffers);
  }, []);

  const onSelectOffer = (offerId: string) => {
    setSelectedOffer(offerId);
    analytics.track("offer_selected", { offerId });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4 py-6 gap-4">
        <Text className="text-xl font-semibold text-center">
          Choisissez une offre
        </Text>
        {offers.map((o) => {
          const selected = o.id === selectedOfferId;
          return (
            <Pressable key={o.id} onPress={() => onSelectOffer(o.id)}>
              <Card
                className={`mb-3 ${selected ? "border-2 border-blue-500" : ""}`}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-lg font-medium">{o.title}</Text>
                    <Text className="text-neutral-500">
                      {o.price} / {o.per}
                    </Text>
                  </View>
                  {o.badge ? <Badge text={o.badge} /> : null}
                </View>
              </Card>
            </Pressable>
          );
        })}
        <Button
          title={remoteConfig?.enableTrial ? "Essai 7j" : "Continuer"}
          onPress={() => router.push("/onboarding/paywall")}
          disabled={!selectedOfferId}
        />
      </View>
    </SafeAreaView>
  );
}
