import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { Walkthrough } from "@/components/sections/Walkthrough";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { getLang } from "@/i18n/server";
import { howItWorksCopy } from "@/i18n/pages/howItWorks";

export async function generateMetadata(): Promise<Metadata> {
  const c = howItWorksCopy[await getLang()];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function HowItWorksPage() {
  const c = howItWorksCopy[await getLang()];
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
          <ButtonLink href="#walkthrough" size="lg" arrow>
            {c.start}
          </ButtonLink>
          <ButtonLink href="/work" size="lg" variant="secondary">
            {c.preview}
          </ButtonLink>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="border-t border-ink-900/[0.07] py-20 sm:py-24">
        <div className="container-gab">
          <Stagger className="grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-ink-900/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {c.steps.map((s) => (
              <StaggerItem key={s.key} className="group relative bg-white p-7 transition-colors hover:bg-white">
                <span className="font-mono text-xs tracking-[0.2em] text-accent-600">{c.stepLabel} {s.n}</span>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-ink-900">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">{s.text}</p>
                <span aria-hidden className="absolute bottom-0 start-0 h-[2px] w-0 bg-accent-400 transition-[width] duration-700 group-hover:w-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Walkthrough */}
      <section id="walkthrough" className="scroll-mt-20 py-20 sm:py-28">
        <div className="container-gab">
          <SectionHeading
            eyebrow={c.walkEyebrow}
            title={
              <>
                {c.walkTitle[0]} <Accent>{c.walkTitle[1]}</Accent>
              </>
            }
            lead={c.walkLead}
          />
          <Reveal delay={0.1} className="mt-12">
            <Walkthrough />
          </Reveal>
        </div>
      </section>

      {/* Builder side */}
      <section className="bg-sand py-24 text-ink-900 sm:py-32">
        <div className="container-gab grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <SectionHeading
            tone="light"
            eyebrow={c.builderEyebrow}
            title={
              <>
                {c.builderTitle[0]} <Accent>{c.builderTitle[1]}</Accent>
              </>
            }
            lead={c.builderLead}
          />
          <Stagger className="grid border-t border-ink-900/10 sm:grid-cols-2">
            {c.builderSide.map(([t, d], i) => (
              <StaggerItem key={t} className="border-b border-ink-900/10 py-8 sm:px-6 sm:[&:nth-child(odd)]:border-e sm:[&:nth-child(odd)]:ps-0">
                <span className="font-mono text-xs text-accent-600">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-medium tracking-[-0.025em]">{t}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FinalCta
        title={c.ctaTitle}
        text={c.ctaText}
        cta={{ label: c.ctaPrimary, href: "/contact?topic=general" }}
        secondary={{ label: c.ctaSecondary, href: "/services" }}
      />
    </>
  );
}
