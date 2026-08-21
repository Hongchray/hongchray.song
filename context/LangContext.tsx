"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import en from "@/lib/translations/en.json";
import km from "@/lib/translations/km.json";
import type { Locale, Bi } from "@/lib/data";

const dictionaries: Record<Locale, typeof en> = { en, km };

type LangContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: (path: string) => string;
  pick: (bi: Bi) => string;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

function getNested(obj: unknown, path: string): string {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof result === "string" ? result : path;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("chray-locale") as Locale | null;
    if (stored === "en" || stored === "km") {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("chray-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const toggleLocale = () => setLocaleState((prev) => (prev === "en" ? "km" : "en"));

  const t = (path: string) => getNested(dictionaries[locale], path);
  const pick = (bi: Bi) => bi[locale];

  return (
    <LangContext.Provider value={{ locale, setLocale, toggleLocale, t, pick }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
