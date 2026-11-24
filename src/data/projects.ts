/**
 * GAB's portfolio: systems we have built. Each entry becomes a card on /projects and the home
 * page, and its own case-study page at /projects/<slug>.
 *
 * HOW TO ADD A PROJECT
 * 1. Copy the example below into the `projects` array and fill in every field in both languages.
 * 2. Put images in /public/projects/<slug>/ (e.g. cover.jpg, 1600×1000 works well) and reference
 *    them as "/projects/<slug>/cover.jpg".
 * 3. Set `featured: true` on up to three projects to show them on the home page.
 * Only publish real work you have permission to show (ask the client before naming them).
 *
 *   {
 *     slug: "clinic-booking",
 *     category: "booking",            // a service slug from src/data/services.ts
 *     year: "2025",
 *     featured: true,
 *     cover: "/projects/clinic-booking/cover.jpg",
 *     gallery: ["/projects/clinic-booking/1.jpg"],
 *     url: "https://example.com",     // optional live link
 *     tech: ["Next.js", "PostgreSQL"],
 *     name:      { en: "…", he: "…" },
 *     client:    { en: "…", he: "…" }, // or the industry, if the client prefers to stay anonymous
 *     summary:   { en: "…", he: "…" }, // one sentence for the card
 *     challenge: { en: "…", he: "…" },
 *     solution:  { en: "…", he: "…" },
 *     result:    { en: "…", he: "…" },
 *   },
 */

import type { Lang } from "@/i18n/config";

export type Localized = Record<Lang, string>;

export type Project = {
  slug: string;
  category: string;
  year?: string;
  featured?: boolean;
  cover?: string;
  gallery?: string[];
  url?: string;
  tech: string[];
  name: Localized;
  client: Localized;
  summary: Localized;
  challenge: Localized;
  solution: Localized;
  result: Localized;
};

export const projects: Project[] = [];

export const featuredProjects = () => projects.filter((p) => p.featured).slice(0, 3);
export const findProject = (slug: string) => projects.find((p) => p.slug === slug);
