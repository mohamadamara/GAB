import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/lib/site";
import "./globals.css";

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GAB — Your Idea. The Right Builders. One Place.",
    template: "%s · GAB",
  },
  description: site.description,
  applicationName: "GAB",
  keywords: [
    "software development marketplace",
    "find software developers",
    "hire development studio",
    "software builders",
    "custom software",
    "GAB",
  ],
  openGraph: {
    type: "website",
    siteName: "GAB",
    title: "GAB — Your Idea. The Right Builders. One Place.",
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: "GAB", description: site.description },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
