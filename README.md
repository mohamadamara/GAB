# GAB — Company Website

Website for **GAB**, a software development company: we design and build websites, mobile apps and
business systems — from planning and design to launch and ongoing support. English and Hebrew.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion

## Structure

```
src/
  app/                 Routes: / services projects projects/[slug] how-it-works (process) about faq contact
                       (+ 404, sitemap, robots). Old marketplace URLs redirect in next.config.ts:
                       /work, /platform → /projects · /builders → /contact
  components/
    layout/            Header (Home · Services · Projects · Process · About + "Start a project"), Footer, PageHero
    home/              HomeHero + Blueprint (animated diagram) + HomeSections (services, projects, process, CTA)
    projects/          ProjectCard + the honest empty state shown until projects are added
    sections/          Services list, FAQ list, contact form, final CTA
    ui/                Button, Eyebrow, SectionHeading, Logo
    animations/        Reveal / Stagger scroll animations, `rise` CSS entrance helper
  data/                services.ts (the 11 service categories), projects.ts (the portfolio)
  i18n/                dictionary.ts (shared copy, EN + HE), services.he.ts, pages/ (About, Process, FAQ copy),
                       meta.ts (page titles), server.ts (getLang), LanguageProvider (cookie, <html lang dir>)
  app/globals.css      Design tokens (black / gold / warm white, terminal-style mono type)
```

## Adding a project to the portfolio

Projects live in `src/data/projects.ts` — the file starts with a commented example to copy.

1. Add an entry with every text field in English **and** Hebrew (`name`, `client`, `summary`,
   `challenge`, `solution`, `result`), a `category` (a service slug from `src/data/services.ts`) and `tech`.
2. Put images in `public/projects/<slug>/` and set `cover` (and optionally `gallery`).
3. Set `featured: true` on up to three projects to show them on the home page.

Each project gets a card on `/projects` and on the home page, and its own page at `/projects/<slug>`.
Category filters appear automatically once there are more than three projects in more than one category.
Until the first project is added, both places show an honest "case studies on their way" state.
Only publish work you have the client's permission to show.

## Languages

English and Hebrew. The header switch stores the choice in the `gab-lang` cookie, so the server renders
`<html lang dir>` directly (RTL for Hebrew). Every page is translated, including titles and meta descriptions.
Client components read copy with `useLanguage()`; server pages call `getLang()` from `src/i18n/server.ts`.
Hebrew copy is written for Israeli readers, not translated word for word, and addresses readers in the plural (אתם).
Animations respect `prefers-reduced-motion`, and above-the-fold content never waits for JavaScript to become visible.

## Honesty rules

- No testimonials, client names, user counts or statistics are claimed. Company facts (founding year, team size,
  pricing model, code ownership) are left out until they're confirmed — add them in `src/i18n/pages/`.
- The contact form validates input but is **not connected to a backend** — it says so and does not pretend to send.
  To connect it, replace the `status === "ready"` branch in `src/components/sections/ContactForm.tsx` with a real API call.
- Set the real domain in `src/lib/site.ts` (used for metadata, sitemap and robots).
