import { EnglishOnly } from "@/components/i18n/EnglishOnly";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "About GAB",
  description:
    "Why GAB exists: software is essential for modern businesses, but finding the right people to build it remains complicated. Our mission, vision and philosophy.",
};

const philosophy = [
  { t: "Technology should solve real problems.", d: "Software is a means, not an end. Every project on GAB starts with what needs to change for the people involved." },
  { t: "Great ideas should not be limited by technical knowledge.", d: "You shouldn't need to speak the language of frameworks to commission excellent software." },
  { t: "Finding the right developer should be easier.", d: "The right match depends on fit — skills, experience, scale and working style — and that should be visible." },
  { t: "Clear expectations create better projects.", d: "Shared definitions of scope and outcomes protect both customers and builders from misunderstanding." },
  { t: "Quality software starts with understanding the problem.", d: "The most expensive code is code that solves the wrong problem. Clarity comes first." },
];

const horizon = [
  {
    phase: "Foundation",
    status: "In progress",
    items: ["Brand, website and product concept", "Core platform design system", "Customer and builder journeys defined"],
  },
  {
    phase: "First platform release",
    status: "Planned",
    items: ["Project creation and requirement structuring", "Builder profiles and portfolios", "Discovery and proposal comparison"],
  },
  {
    phase: "Marketplace growth",
    status: "Exploring",
    items: ["Smarter matching between projects and builders", "Collaboration tools after selection", "Support for more languages and regions"],
  },
];

export default function AboutPage() {
  return (
    <EnglishOnly>
      <PageHero
        eyebrow="About GAB"
        title={
          <>
            Bringing ideas and builders <Accent>closer together.</Accent>
          </>
        }
        lead="GAB is a software development marketplace in the making — designed to connect the people who need software with the people who know how to build it."
      />

      {/* Story */}
      <section className="relative bg-sand py-24 text-ink-900 sm:py-32">
        <div className="container-gab grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow tone="light" index="01">
                Our story
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-8 font-serif text-[2rem] italic leading-[1.15] text-ink-900 sm:text-[2.6rem]">
                “Every business now needs software. Very few know how to find the people to build it.”
              </p>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink-700">
            <Reveal>
              <p>
                Software sits at the centre of how modern businesses operate — how they sell, schedule, serve customers
                and make decisions. Yet for most business owners, getting the right software built remains a confusing
                and uncertain process.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                The talent exists. Independent developers, development studios and technical teams around the world are
                ready to build. But the connection between a business need and the right builder is scattered across
                referrals, generic freelance platforms and agency websites — each speaking a different language.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                GAB began with a simple question: what if there were one place designed specifically for this
                connection? A place where a business problem can become a clear project, and where builders can be
                discovered and compared on the substance of their work.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-ink-900">That place is what we're building.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="container-gab grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-ink-900/10 bg-white/10 lg:grid-cols-2">
          <Reveal className="relative bg-white p-10 sm:p-14">
            <Eyebrow index="02">Our mission</Eyebrow>
            <p className="mt-10 text-balance text-3xl font-medium leading-[1.12] tracking-[-0.035em] text-ink-900 sm:text-[2.6rem]">
              Make software development more accessible by connecting ideas with <Accent>the right people.</Accent>
            </p>
          </Reveal>
          <Reveal delay={0.08} className="relative bg-white p-10 sm:p-14">
            <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-accent-500/15 blur-[90px]" />
            <Eyebrow index="03">Our vision</Eyebrow>
            <p className="relative mt-10 text-xl leading-relaxed text-ink-600">
              A marketplace where businesses, entrepreneurs, independent developers, studios and technical teams can
              find opportunities to collaborate — with the clarity and trust that good work depends on.
            </p>
            <div className="relative mt-10 flex flex-wrap gap-2">
              {["Businesses", "Entrepreneurs", "Independent developers", "Studios", "Technical teams"].map((t) => (
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
            eyebrow="Our philosophy"
            title={
              <>
                Five beliefs that <Accent>shape every decision.</Accent>
              </>
            }
          />
          <Stagger className="mt-16 border-t border-ink-900/10">
            {philosophy.map((p, i) => (
              <StaggerItem key={p.t} className="group grid gap-4 border-b border-ink-900/10 py-9 transition-colors hover:bg-white/[0.02] md:grid-cols-[80px_1.2fr_1fr] md:gap-10">
                <span className="font-mono text-sm text-accent-600">0{i + 1}</span>
                <h3 className="text-2xl font-medium tracking-[-0.03em] text-ink-900 transition-colors group-hover:text-accent-600 sm:text-[1.75rem]">{p.t}</h3>
                <p className="leading-relaxed text-ink-600">{p.d}</p>
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
            eyebrow="The future of GAB"
            title={
              <>
                Where we're heading — <Accent>honestly stated.</Accent>
              </>
            }
            lead="This is the intended direction of the platform. Nothing below should be read as a launched feature; plans may change as we learn from customers and builders."
          />
          <div className="relative mt-16 grid gap-4 lg:grid-cols-3">
            <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-accent-500 via-accent-500/40 to-ink-900/10 lg:block" />
            {horizon.map((h, i) => (
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
        title="Building GAB in the open."
        text="We're shaping the platform around real needs. Whether you'd use GAB to find a builder or to find work, your input matters now."
        cta={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Preview the platform", href: "/work" }}
      />
    </EnglishOnly>
  );
}
