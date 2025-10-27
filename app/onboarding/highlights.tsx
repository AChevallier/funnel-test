import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { fetchRemoteConfig } from "../../services/remoteConfig";
import { useFunnelStore } from "../../store/funnel";

export default function FunnelHighlights() {
  const setRemoteConfig = useFunnelStore((s) => s.setRemoteConfig);
  const [items, setItems] = useState<{ title: string; subtitle: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const cfg = await fetchRemoteConfig();
      setRemoteConfig(cfg);
      setItems(cfg.highlightItems);
      setLoading(false);
    })();
  }, [setRemoteConfig]);

  return (
    <SafeAreaView className="flex-1 px-4 py-6 gap-4">
      <Text className="text-xl font-semibold text-center mb-2">
        Points forts
      </Text>
      {loading ? (
        <Text className="text-center text-neutral-500">Chargement…</Text>
      ) : (
        <FlatList
          data={items}
          pagingEnabled
          horizontal
          keyExtractor={(it) => it.title}
          renderItem={({ item }) => (
            <Card className="mb-3">
              <Text className="text-lg font-medium">{item.title}</Text>
              <Text className="text-neutral-500">{item.subtitle}</Text>
            </Card>
          )}
        />
      )}
      <Link href="/onboarding/auth" asChild>
        <Button title="Continuer" />
      </Link>
    </SafeAreaView>
  );
}
