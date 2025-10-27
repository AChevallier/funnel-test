import type { PropsWithChildren } from "react";
import React, { createContext, use } from "react";
import { useStorageState } from "./useStorageState";

type SessionContext = {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<SessionContext>({
  signIn: () => undefined,
  signOut: () => undefined,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = use(AuthContext);
  if (!value)
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  return (
    <AuthContext.Provider
      value={{
        signIn: () => setSession("1"),
        signOut: () => setSession(null),
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
