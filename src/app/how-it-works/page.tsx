import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { dictionaries } from "@/i18n/dictionary";
import { getLang } from "@/i18n/server";
import { howItWorksCopy } from "@/i18n/pages/howItWorks";

export async function generateMetadata(): Promise<Metadata> {
  const c = howItWorksCopy[await getLang()];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function ProcessPage() {
  const lang = await getLang();
  const c = howItWorksCopy[lang];
  const { steps, stepLabel } = dictionaries[lang].process;

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]} <Accent>{c.title[1]}</Accent>
          </>
        }
        lead={c.lead}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?topic=project" size="lg" arrow>
            {c.start}
          </ButtonLink>
          <ButtonLink href="/services" size="lg" variant="secondary">
            {c.services}
          </ButtonLink>
        </div>
      </PageHero>

      {/* The five steps */}
      <section className="border-t border-ink-900/[0.07] py-16 sm:py-24">
        <ol className="container-gab border-t border-ink-900/10">
          {steps.map((s, i) => (
            <li key={s.key} className="border-b border-ink-900/10">
              <Reveal className="grid gap-5 py-10 md:grid-cols-[120px_1fr_minmax(220px,0.7fr)] md:gap-10 md:py-12">
                <span className="font-mono text-sm text-accent-600">
                  {stepLabel} {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-[1.9rem] leading-[1.05] text-ink-950 sm:text-[2.4rem]">{s.title}</h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">{s.text}</p>
                </div>
                <div>
                  <p className="tracking-label font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-500">{c.getLabel}</p>
                  <ul className="mt-3 space-y-2">
                    {s.get.map((g) => (
                      <li key={g} className="flex gap-3 text-[0.95rem] text-ink-800">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-500" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Principles */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-gab">
          <SectionHeading
            eyebrow={c.principlesEyebrow}
            title={
              <>
                {c.principlesTitle[0]} <Accent>{c.principlesTitle[1]}</Accent>
              </>
            }
          />
          <Stagger className="mt-12 grid gap-px border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-4">
            {c.principles.map(([title, text], i) => (
              <StaggerItem key={title} className="bg-paper p-6 sm:p-7">
                <span className="font-mono text-xs text-accent-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-semibold text-ink-900">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FinalCta
        title={c.ctaTitle}
        text={c.ctaText}
        cta={{ label: c.ctaPrimary, href: "/contact?topic=project" }}
        secondary={{ label: c.ctaSecondary, href: "/faq" }}
      />
    </>
  );
}
