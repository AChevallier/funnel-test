import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { continueAsGuest, login } from "../../services/auth";
import { useFunnelStore } from "../../store/funnel";

export default function FunnelAuth() {
  const router = useRouter();
  const email = useFunnelStore((s) => s.email);
  const setEmail = useFunnelStore((s) => s.setEmail);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [checked, setChecked] = useState(false);
  const onContinue = async () => {
    setSubmitting(true);
    setError(undefined);
    try {
      if (email) {
        await login(email);
      } else {
        await continueAsGuest();
      }
      router.push("/onboarding/offers");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4 py-6 gap-4">
        <Text className="text-xl font-semibold text-center">
          Authentification
        </Text>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email (optionnel)"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Checkbox
          label="I agree to the terms"
          onCheckedChange={(v: boolean) => {
            console.log("checked:", v);
            setChecked(v === true ? true : false);
          }}
          checked={checked}
        />
        {error ? <Text className="text-red-500">{error}</Text> : null}
        <Button title="Continuer" onPress={onContinue} loading={submitting} />
        <Button
          title="Plus tard"
          onPress={onContinue}
          variant="secondary"
          disabled={submitting}
        />
      </View>
    </SafeAreaView>
  );
}
