import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

const nativeMemoryStore: Record<string, string | null> = {};

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch {
        setState(null);
      }
    } else {
      setState(nativeMemoryStore[key] ?? null);
    }
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      if (Platform.OS === "web") {
        try {
          if (typeof localStorage !== "undefined") {
            if (value === null) localStorage.removeItem(key);
            else localStorage.setItem(key, value);
          }
        } catch {
          // ignore
        }
      } else {
        nativeMemoryStore[key] = value;
      }
    },
    [key]
  );

  return [state, setValue];
}
