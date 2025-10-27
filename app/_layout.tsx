import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { SessionProvider, useSession } from "@/auth/ctx";
import { SplashScreenController } from "@/auth/splash";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FunnelProvider } from "@/store/funnel";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <SplashScreenController />
        <FunnelProvider>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <RootNavigator />
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </FunnelProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();
  const isAuthenticated = !!session;
  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="onboarding/intro"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onboarding/highlights"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="onboarding/auth" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding/offers"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onboarding/paywall"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onboarding/success"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
}
