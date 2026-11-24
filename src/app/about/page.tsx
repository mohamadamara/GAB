import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getLang } from "@/i18n/server";
import { aboutCopy } from "@/i18n/pages/about";

export async function generateMetadata(): Promise<Metadata> {
  const c = aboutCopy[await getLang()];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function AboutPage() {
  const c = aboutCopy[await getLang()];
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
      />

      {/* Story */}
      <section className="relative bg-sand py-24 text-ink-900 sm:py-32">
        <div className="container-gab grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow tone="light" index="01">
                {c.storyEyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-8 font-serif text-[2rem] italic leading-[1.15] text-ink-900 sm:text-[2.6rem]">
                {c.quote}
              </p>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink-700">
            {c.story.map((para, k) => (
              <Reveal key={k} delay={k * 0.05}>
                <p>{para}</p>
              </Reveal>
            ))}
            <Reveal delay={0.15}>
              <p className="text-ink-900">{c.storyEnd}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="container-gab grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-ink-900/10 bg-white/10 lg:grid-cols-2">
          <Reveal className="relative bg-white p-10 sm:p-14">
            <Eyebrow index="02">{c.missionEyebrow}</Eyebrow>
            <p className="mt-10 text-balance text-3xl font-medium leading-[1.12] tracking-[-0.035em] text-ink-900 sm:text-[2.6rem]">
              {c.mission[0]} <Accent>{c.mission[1]}</Accent>
            </p>
          </Reveal>
          <Reveal delay={0.08} className="relative bg-white p-10 sm:p-14">
            <div aria-hidden className="absolute -end-24 -top-24 size-72 rounded-full bg-accent-500/15 blur-[90px]" />
            <Eyebrow index="03">{c.visionEyebrow}</Eyebrow>
            <p className="relative mt-10 text-xl leading-relaxed text-ink-600">
              {c.vision}
            </p>
            <div className="relative mt-10 flex flex-wrap gap-2">
              {c.audiences.map((t) => (
                <span key={t} className="rounded-[3px] border border-ink-900/15 px-3 py-1.5 text-sm text-ink-600">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-ink-900/[0.07] py-24 sm:py-32">
        <div className="container-gab">
          <SectionHeading
            index="04"
            eyebrow={c.philosophyEyebrow}
            title={
              <>
                {c.philosophyTitle[0]} <Accent>{c.philosophyTitle[1]}</Accent>
              </>
            }
          />
          <Stagger className="mt-16 border-t border-ink-900/10">
            {c.philosophy.map(([title, text], i) => (
              <StaggerItem key={title} className="group grid gap-4 border-b border-ink-900/10 py-9 transition-colors hover:bg-white/[0.02] md:grid-cols-[80px_1.2fr_1fr] md:gap-10">
                <span className="font-mono text-sm text-accent-600">0{i + 1}</span>
                <h3 className="text-2xl font-medium tracking-[-0.03em] text-ink-900 transition-colors group-hover:text-accent-600 sm:text-[1.75rem]">{title}</h3>
                <p className="leading-relaxed text-ink-600">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Future */}
      <section className="relative overflow-hidden bg-mist py-24 sm:py-32">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
        <div className="container-gab relative">
          <SectionHeading
            index="05"
            eyebrow={c.futureEyebrow}
            title={
              <>
                {c.futureTitle[0]} <Accent>{c.futureTitle[1]}</Accent>
              </>
            }
            lead={c.futureLead}
          />
          <div className="relative mt-16 grid gap-4 lg:grid-cols-3">
            <div aria-hidden className="absolute inset-x-0 top-[27px] hidden h-px bg-gradient-to-r rtl:bg-gradient-to-l from-accent-500 via-accent-500/40 to-ink-900/10 lg:block" />
            {c.horizon.map((h, i) => (
              <Reveal key={h.phase} delay={i * 0.08}>
                <div className="relative">
                  <span
                    className={
                      "relative z-10 grid size-14 place-items-center rounded-full border font-mono text-sm " +
                      (i === 0 ? "border-accent-400 bg-accent-500 text-[#080808]" : "border-ink-900/20 bg-white text-ink-600")
                    }
                  >
                    0{i + 1}
                  </span>
                  <div className="metal-plate mt-6 rounded-[var(--radius-panel)] p-7">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-medium tracking-[-0.025em] text-ink-900">{h.phase}</h3>
                      <span
                        className={
                          "rounded-[3px] px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] " +
                          (i === 0 ? "bg-accent-500/20 text-accent-600" : "border border-ink-900/15 text-ink-500")
                        }
                      >
                        {h.status}
                      </span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {h.items.map((it) => (
                        <li key={it} className="flex gap-3 text-ink-600">
                          <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-accent-400" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title={c.ctaTitle}
        text={c.ctaText}
        cta={{ label: c.ctaPrimary, href: "/contact" }}
        secondary={{ label: c.ctaSecondary, href: "/work" }}
      />
    </>
  );
}
