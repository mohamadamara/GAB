"use client";

import { MotionConfig } from "framer-motion";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { LANG_COOKIE, dirOf, type Lang } from "./config";
import { dictionaries, type Dict } from "./dictionary";

type Ctx = { lang: Lang; dir: "ltr" | "rtl"; t: Dict; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx | null>(null);

/**
 * Holds the active language. The choice is stored in a cookie so the server renders
 * `<html lang dir>` correctly on the next request (no flash of the wrong direction).
 * Also opts every Framer Motion animation into the user's reduced-motion preference.
 */
export function LanguageProvider({ initialLang, children }: { initialLang: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const router = useRouter();

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.lang = next;
      document.documentElement.dir = dirOf(next);
      router.refresh();
    },
    [router],
  );

  const value = useMemo<Ctx>(() => ({ lang, dir: dirOf(lang), t: dictionaries[lang], setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
