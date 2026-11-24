"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Wraps pages whose long-form copy is not translated yet. In Hebrew mode it shows a
 * notice (inside the page hero's top padding) and keeps the English content
 * left-to-right so it stays readable.
 */
export function EnglishOnly({ children }: { children: React.ReactNode }) {
  const { lang, t } = useLanguage();
  if (lang === "en") return <>{children}</>;
  return (
    <div className="relative">
      <div dir="rtl" className="container-gab absolute inset-x-0 top-[88px] z-10">
        <p className="inline-block border border-accent-500/40 bg-paper px-3 py-2 font-mono text-[0.78rem] text-accent-600">
          {t.englishOnly}
        </p>
      </div>
      <div lang="en" dir="ltr">
        {children}
      </div>
    </div>
  );
}
