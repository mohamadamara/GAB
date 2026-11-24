export type Lang = "en" | "he";

export const LANGS: Lang[] = ["en", "he"];
export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "gab-lang";

export const isLang = (v: unknown): v is Lang => v === "en" || v === "he";
export const dirOf = (lang: Lang) => (lang === "he" ? "rtl" : "ltr");
