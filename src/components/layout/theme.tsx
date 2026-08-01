import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useStore } from "@/lib/store";
import type { Language } from "@/lib/types";

interface SettingsContextType {
  lang: Language;
  setLang: (l: Language) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { user, setTheme, setLanguage } = useStore();

  const lang: Language = user?.language ?? "ar";
  const isDark = (user?.theme ?? "dark") === "dark";

  // Apply theme + language to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
  }, [isDark, lang]);

  const setLang = (l: Language) => setLanguage(l);
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <SettingsContext.Provider value={{ lang, setLang, toggleTheme, isDark }}>
      {children}
    </SettingsContext.Provider>
  );
}

