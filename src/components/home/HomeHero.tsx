"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ButtonLink } from "../ui/Button";
import { rise } from "../animations/rise";
import { Blueprint } from "./Blueprint";

/** First screen of the home page: positioning, CTAs and the animated blueprint. */
export function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="flex min-h-[100svh] flex-col pt-[72px]">
      <div className="container-wide grid flex-1 gap-10 py-10 xl:grid-cols-[1.05fr_1fr] xl:gap-0 xl:py-0">
        <div className="flex flex-col justify-center xl:border-e xl:border-ink-900/10 xl:py-14 xl:pe-14">
          <p {...rise(0.05, "tracking-label flex items-center gap-4 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent-600 sm:text-[0.8rem]")}
          >
            <span aria-hidden className="h-px w-9 shrink-0 bg-accent-500/70" />
            {t.home.eyebrow}
          </p>

          <h1 className="font-display mt-7 text-[clamp(1.85rem,8.2vw,3.6rem)] leading-[1.02] text-ink-950 xl:text-[clamp(2.3rem,3.9vw,3.9rem)]">
            {t.home.title.map((line, i) => (
              <span key={line} {...rise(0.12 + i * 0.08, "block")}>
                {i === t.home.title.length - 1 ? (
                  <>
                    {line.replace(/\.$/, "")}
                    <span className="text-accent-500">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p {...rise(0.4, "mt-7 max-w-xl text-pretty text-[0.98rem] leading-[1.75] text-ink-700 sm:text-[1.08rem]")}>
            {t.home.lead}
          </p>

          <div {...rise(0.5, "mt-9 flex flex-wrap items-center gap-x-8 gap-y-4")}>
            <ButtonLink href="/contact?topic=project" size="lg" arrow>
              {t.home.primary}
            </ButtonLink>
            <Link
              href="/projects"
              className="tracking-label border-b border-ink-900/40 pb-1.5 font-mono text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-ink-900 transition-colors hover:border-accent-500 hover:text-accent-600"
            >
              {t.home.secondary}
            </Link>
          </div>

          <nav {...rise(0.6, "mt-12")} aria-label={t.home.journeyLabel}>
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-600 sm:text-[0.74rem]">
              {t.home.journey.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-ink-500">—</span>}
                  <Link href="/how-it-works" className="tracking-label transition-colors hover:text-accent-600">
                    {step}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div {...rise(0.2, "flex items-center justify-center xl:py-10 xl:ps-14")}>
          <Blueprint className="w-full max-w-[720px] xl:max-w-none" />
        </div>
      </div>

      <div className="container-wide">
        <div className="flex items-center justify-between gap-4 border-t border-accent-500/20 py-4 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ink-500 sm:text-[0.72rem]">
          <span className="tracking-label">{t.home.footLeft}</span>
          <span className="tracking-label hidden text-end sm:block">{t.home.footRight}</span>
        </div>
      </div>
    </section>
  );
}
