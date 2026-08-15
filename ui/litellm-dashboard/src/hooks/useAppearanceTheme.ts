import { useCallback, useSyncExternalStore } from "react";
import {
  APPEARANCE_THEME_STORAGE_KEY,
  AppearanceTheme,
  parseAppearanceTheme,
} from "@/utils/appearanceTheme";
import {
  LOCAL_STORAGE_EVENT,
  emitLocalStorageChange,
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorageUtils";

function subscribe(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === APPEARANCE_THEME_STORAGE_KEY) {
      callback();
    }
  };

  const onCustom = (e: Event) => {
    const { key } = (e as CustomEvent).detail;
    if (key === APPEARANCE_THEME_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(LOCAL_STORAGE_EVENT, onCustom);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LOCAL_STORAGE_EVENT, onCustom);
  };
}

function getSnapshot(): AppearanceTheme {
  return parseAppearanceTheme(getLocalStorageItem(APPEARANCE_THEME_STORAGE_KEY));
}

function getServerSnapshot(): AppearanceTheme {
  return "light";
}

export function useAppearanceTheme(): [AppearanceTheme, (theme: AppearanceTheme) => void] {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: AppearanceTheme) => {
    setLocalStorageItem(APPEARANCE_THEME_STORAGE_KEY, next);
    emitLocalStorageChange(APPEARANCE_THEME_STORAGE_KEY);
  }, []);

  return [theme, setTheme];
}
