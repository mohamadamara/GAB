"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { services } from "@/data/services";
import { servicesHe } from "@/i18n/services.he";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionIntro } from "../layout/SectionIntro";
import { easeOutExpo } from "../animations/Reveal";

/** Services as a selectable list: one category open at a time instead of a long scroll. */
export function ServicesView() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState<string | null>(services[0].slug);
  const uid = useId();

  return (
    <section className="pb-16 pt-[120px] sm:pt-[136px]">
      <div className="container-wide">
        <SectionIntro eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />

        <ul className="mt-14 border-t border-ink-900/15 sm:mt-16">
          {services.map((s, i) => {
            const copy = lang === "he" ? { ...s, ...servicesHe[s.slug] } : s;
            const isOpen = open === s.slug;
            const panelId = `${uid}-${s.slug}`;
            return (
              <li key={s.slug} className={cn("border-b border-ink-900/15 transition-colors", isOpen && "bg-accent-500/[0.03]")}>
                <h2>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : s.slug)}
                    className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-start gap-x-3 py-6 text-start sm:grid-cols-[4.5rem_1fr_auto] sm:py-7 lg:grid-cols-[minmax(240px,0.55fr)_0.8fr_0.65fr_2.25rem] lg:gap-x-12"
                  >
                    <span className="pt-1.5 font-mono text-[0.75rem] font-semibold text-accent-600 sm:pt-2.5">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={cn(
                        "font-display text-[1.35rem] leading-[1.1] transition-colors sm:text-[1.9rem] lg:text-[2.1rem]",
                        isOpen ? "text-accent-600" : "text-ink-900 group-hover:text-accent-600",
                      )}
                    >
                      {copy.name}
                    </span>
                    <span className="col-start-2 row-start-2 mt-2 max-w-md text-[0.9rem] leading-[1.7] text-ink-600 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:pt-1">
                      {copy.short}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "col-start-3 row-start-1 grid size-9 place-items-center text-2xl font-light leading-none text-accent-500 transition-transform duration-300 lg:col-start-4",
                        isOpen && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                </h2>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-label={copy.name}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-9 ps-[calc(2.25rem+0.75rem)] sm:ps-[calc(4.5rem+0.75rem)] lg:grid-cols-[minmax(240px,0.55fr)_0.8fr_0.65fr_2.25rem] lg:gap-x-12 lg:ps-0">
                        <div className="lg:col-start-2">
                          <p className="tracking-label font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">{t.services.what}</p>
                          <p className="mt-3 max-w-2xl text-[0.98rem] leading-[1.8] text-ink-800">{copy.what}</p>
                          <p className="tracking-label mt-7 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">{t.services.features}</p>
                          <p className="mt-3 font-mono text-[0.74rem] font-medium uppercase leading-[2] tracking-[0.16em] text-accent-600">
                            {copy.features.join(" / ")}
                          </p>
                        </div>
                        <div>
                          <p className="tracking-label font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500">{t.services.who}</p>
                          <ul className="mt-3 space-y-2">
                            {copy.who.map((w) => (
                              <li key={w} className="flex gap-3 text-[0.92rem] text-ink-700">
                                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-500" />
                                {w}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/contact"
                            className="tracking-label mt-7 inline-flex items-center gap-2 border-b border-accent-500/60 pb-1 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-accent-600 transition-colors hover:border-accent-500 hover:text-accent-700"
                          >
                            {t.services.ask}
                            <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex items-center justify-between gap-4 font-mono text-[0.72rem] uppercase tracking-[0.2em]">
          <span className="tracking-label text-ink-500">{t.services.footLeft}</span>
          <Link
            href="/how-it-works"
            className="tracking-label border-b border-accent-500/60 pb-1 font-semibold text-accent-600 transition-colors hover:text-accent-700"
          >
            {t.services.footLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
