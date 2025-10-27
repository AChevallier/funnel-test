import { sleep } from "../utils/sleep";

export type HighlightItem = {
  title: string;
  subtitle: string;
};

export type RemoteConfig = {
  isUserSubscribed: boolean;
  enableTrial: boolean;
  highlightItems: HighlightItem[];
  forcePurchaseFail?: boolean;
};

const DEFAULT_CONFIG: RemoteConfig = {
  isUserSubscribed: false,
  enableTrial: true,
  highlightItems: [
    { title: "Illimité", subtitle: "Accès à tout" },
    { title: "Rapide", subtitle: "Chargements instantanés" },
    { title: "Sécurisé", subtitle: "Données protégées" },
  ],
  forcePurchaseFail: false,
};

export async function fetchRemoteConfig(): Promise<RemoteConfig> {
  await sleep(300);
  return DEFAULT_CONFIG;
}
