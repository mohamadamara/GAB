import type { Metadata } from "next";
import { services } from "@/data/services";
import { PageHero } from "@/components/layout/PageHero";
import { Accent } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { ServiceVisual } from "@/components/sections/ServiceVisual";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { TiltCard } from "@/components/ui/TiltCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Explore Services",
  description:
    "Websites, mobile apps, SaaS, CRM, ERP, booking systems, dashboards, automation, e-commerce, AI applications and custom software — what each is, who needs it and what it does.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore services"
        title={
          <>
            Know what you need — <Accent>or discover it here.</Accent>
          </>
        }
        lead="Eleven categories of software, explained in plain language: what each one is, the problem it solves, who typically needs it, and what it usually includes."
      />

      <ServiceIndex />

      <div>
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className={cn("scroll-mt-[130px] border-b border-ink-900/[0.07] py-20 sm:py-28", flip && "bg-mist")}
            >
              <div className="container-gab grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
                <div className={cn(flip && "lg:order-2")}>
                  <Reveal>
                    <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent-600">
                      <span className="text-ink-500">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-8 bg-current opacity-60" />
                      {s.code}
                    </p>
                    <h2 id={`${s.slug}-title`} className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-ink-900 sm:text-5xl">
                      {s.name}
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-ink-600">{s.what}</p>
                  </Reveal>

                  <Reveal delay={0.05}>
                    <div className="mt-10 border-l-2 border-accent-500 pl-6">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent-600">The problem it solves</p>
                      <p className="mt-2 text-ink-900">{s.problem}</p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="mt-10 grid gap-8 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-500">Who needs it</p>
                        <ul className="mt-4 space-y-2.5">
                          {s.who.map((w) => (
                            <li key={w} className="flex gap-3 text-[0.95rem] text-ink-600">
                              <span aria-hidden className="mt-[10px] h-px w-3 shrink-0 bg-accent-400" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-500">Example use cases</p>
                        <ul className="mt-4 space-y-2.5">
                          {s.useCases.map((w) => (
                            <li key={w} className="flex gap-3 text-[0.95rem] text-ink-600">
                              <span aria-hidden className="mt-[10px] h-px w-3 shrink-0 bg-accent-400" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={0.1} className={cn("lg:sticky lg:top-40", flip && "lg:order-1")}>
                  <TiltCard max={4} className="group metal-plate rounded-[var(--radius-panel)] p-5 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-500">Interface illustration</span>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent-600">{s.code}</span>
                    </div>
                    <div className="mt-6 rounded-[4px] bg-white/80 p-4 sm:p-6">
                      <ServiceVisual kind={s.visual} className="drop-shadow-[0_24px_40px_rgb(0_0_0/0.5)]" />
                    </div>
                    <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-500">Common functionality</p>
                    <ul className="mt-4 grid grid-cols-2 gap-2">
                      {s.features.map((f) => (
                        <li
                          key={f}
                          className="rounded-[3px] border border-ink-900/10 bg-white/50 px-3 py-2 text-sm text-ink-600 transition-colors hover:border-accent-500/50 hover:text-ink-900"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-sand py-20 text-ink-900 sm:py-24">
        <div className="container-gab flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl">Not sure which category fits?</h2>
            <p className="mt-3 text-lg text-ink-600">
              That's expected. GAB is designed so you can start from the problem — the category becomes clear along the
              way.
            </p>
          </div>
          <ButtonLink href="/how-it-works" variant="dark" size="lg" arrow>
            See how it works
          </ButtonLink>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
