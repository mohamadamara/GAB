# GAB — Company & Platform Website

Marketing and product-preview website for **GAB**, a software development marketplace (in development)
connecting people who need software with the developers, studios and teams who build it.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · React Three Fiber (hero only, lazy-loaded)

## Structure

```
src/
  app/                 Routes: / services work contact (primary, in the header) + about how-it-works builders faq
                       (/platform permanently redirects to /work; + 404, sitemap, robots)
  components/
    layout/            Header (responsive nav), Footer, PageHero
    ui/                Design-system primitives: Button, Eyebrow, SectionHeading, DemoBadge, TiltCard, Logo
    animations/        Reveal / Stagger scroll animations
    three/             HeroScene — Idea → GAB → Builders → Product, in 3D
    home/              HomeHero + Blueprint (the animated "people · data · work · customers → one system" diagram)
    sections/          Shared page sections (walkthrough, platform explorer, FAQ, contact form, service visuals)
    mockups/           Product design system + the 10 platform preview screens
  data/                Content: services, journey, FAQ, nav, demo (fictional) data
  i18n/                English/Hebrew: dictionary.ts (UI copy), services.he.ts, pages/ (copy for About, How it works,
                       For builders, FAQ), meta.ts (page titles), server.ts (getLang), LanguageProvider (cookie, <html lang dir>)
  lib/                 Utilities
  app/globals.css      Design tokens (black / gold / warm white, terminal-style mono type)
```

## Languages

English and Hebrew. The header switch stores the choice in the `gab-lang` cookie, so the server renders
`<html lang dir>` directly (RTL for Hebrew). Every page is translated, including titles and meta descriptions.
Client components read copy with `useLanguage()`; server pages call `getLang()` from `src/i18n/server.ts`.
The platform mockups themselves stay in English (they sit inside `lang="en" dir="ltr"` islands) and say so.
Hebrew copy is written for Israeli readers, not translated word for word: "builders" are מפתחים / צוותי פיתוח,
and readers are addressed in the plural (אתם).
Animations respect `prefers-reduced-motion`.

## Honesty rules baked in

- Every simulated interface carries a "Concept preview" / "Demonstration" label.
- All builder names, profiles, proposals and numbers live in `src/data/demo.ts` and are fictional.
- No testimonials, user counts, partnerships or statistics are claimed.
- The contact form validates input but is **not connected to a backend** — it says so and does not pretend to send.
  To connect it, replace the `status === "ready"` branch in `src/components/sections/ContactForm.tsx` with a real API call.
- Set the real domain in `src/lib/site.ts` (used for metadata, sitemap and robots).
