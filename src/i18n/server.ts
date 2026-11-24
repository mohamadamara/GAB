import { cookies } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from "./config";

/** The active language on the server (same cookie the root layout uses for `<html lang dir>`). */
export async function getLang(): Promise<Lang> {
  const stored = (await cookies()).get(LANG_COOKIE)?.value;
  return isLang(stored) ? stored : DEFAULT_LANG;
}
