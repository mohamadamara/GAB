import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { IBM_Plex_Mono, IBM_Plex_Sans_Hebrew, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { DEFAULT_LANG, LANG_COOKIE, dirOf, isLang } from "@/i18n/config";
import { site } from "@/lib/site";
import "./globals.css";

// Interface sans — kept for the platform mockups.
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
// Display headlines
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-jetbrains", display: "swap" });
// Body / terminal text
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono", display: "swap" });
// Hebrew glyphs (fallback in every font stack)
const plexHebrew = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-hebrew",
  display: "swap",
});

const homeMeta = {
  en: { title: "GAB — Your Idea. The Right Builders. One Place.", description: site.description },
  he: {
    title: "GAB — הרעיון שלכם. המפתחים הנכונים. במקום אחד.",
    description: "GAB היא פלטפורמה לפיתוח תוכנה שנמצאת בהקמה — ומחברת בין אנשים ועסקים שצריכים מוצר דיגיטלי לבין מפתחים עצמאיים, סטודיואים וצוותי פיתוח.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const stored = (await cookies()).get(LANG_COOKIE)?.value;
  const m = homeMeta[isLang(stored) ? stored : DEFAULT_LANG];
  return {
    metadataBase: new URL(site.url),
    title: { default: m.title, template: "%s · GAB" },
    description: m.description,
    applicationName: "GAB",
    keywords: [
      "software development marketplace",
      "find software developers",
      "hire development studio",
      "software builders",
      "custom software",
      "GAB",
    ],
    openGraph: { type: "website", siteName: "GAB", title: m.title, description: m.description },
    twitter: { card: "summary_large_image", title: "GAB", description: m.description },
    icons: { icon: "/icon.svg" },
  };
}

export const viewport: Viewport = {
  themeColor: "#080807",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const stored = (await cookies()).get(LANG_COOKIE)?.value;
  const lang = isLang(stored) ? stored : DEFAULT_LANG;

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrains.variable} ${plexMono.variable} ${plexHebrew.variable}`}
    >
      <body>
        <LanguageProvider initialLang={lang}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
