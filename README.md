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
  app/                 Routes: / about services how-it-works builders platform faq contact (+ 404, sitemap, robots)
  components/
    layout/            Header (responsive nav), Footer, PageHero
    ui/                Design-system primitives: Button, Eyebrow, SectionHeading, DemoBadge, TiltCard, Logo
    animations/        Reveal / Stagger scroll animations
    three/             HeroScene — Idea → GAB → Builders → Product, in 3D
    home/              Homepage sections
    sections/          Shared page sections (walkthrough, platform explorer, FAQ, contact form, service visuals)
    mockups/           Product design system + the 10 platform preview screens
  data/                Content: services, journey, FAQ, nav, demo (fictional) data
  lib/                 Utilities
  app/globals.css      Design tokens (copper / graphite / warm white)
```

## Honesty rules baked in

- Every simulated interface carries a "Concept preview" / "Demonstration" label.
- All builder names, profiles, proposals and numbers live in `src/data/demo.ts` and are fictional.
- No testimonials, user counts, partnerships or statistics are claimed.
- The contact form validates input but is **not connected to a backend** — it says so and does not pretend to send.
  To connect it, replace the `status === "ready"` branch in `src/components/sections/ContactForm.tsx` with a real API call.
- Set the real domain in `src/lib/site.ts` (used for metadata, sitemap and robots).
