import React, { createContext, useContext, useMemo, useState } from "react";
import type { RemoteConfig } from "../services/remoteConfig";

type FunnelContextState = {
  email: string;
  selectedOfferId?: string;
  remoteConfig?: RemoteConfig;
  setEmail: (email: string) => void;
  setSelectedOffer: (id: string) => void;
  setRemoteConfig: (cfg: RemoteConfig) => void;
  reset: () => void;
};

const FunnelContext = createContext<FunnelContextState | undefined>(undefined);

export const FunnelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState("");
  const [selectedOfferId, setSelectedOffer] = useState<string | undefined>(
    undefined
  );
  const [remoteConfig, setRemoteConfig] = useState<RemoteConfig | undefined>(
    undefined
  );

  const value = useMemo<FunnelContextState>(
    () => ({
      email,
      selectedOfferId,
      remoteConfig,
      setEmail,
      setSelectedOffer,
      setRemoteConfig,
      reset: () => {
        setEmail("");
        setSelectedOffer(undefined);
      },
    }),
    [email, selectedOfferId, remoteConfig]
  );

  return (
    <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
  );
};

export function useFunnelStore(): FunnelContextState;
export function useFunnelStore<R>(selector: (s: FunnelContextState) => R): R;
export function useFunnelStore<R>(selector?: (s: FunnelContextState) => R) {
  const ctx = useContext(FunnelContext);
  if (!ctx) {
    throw new Error("useFunnelStore must be used within FunnelProvider");
  }
  return selector ? selector(ctx) : ctx;
}
