import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ScaledFrame } from "@/components/mockups/AppFrame";
import { BuilderDashboardScreen, BuilderProfileScreen } from "@/components/mockups/screens";
import { getLang } from "@/i18n/server";
import { buildersCopy } from "@/i18n/pages/builders";

export async function generateMetadata(): Promise<Metadata> {
  const c = buildersCopy[await getLang()];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function BuildersPage() {
  const c = buildersCopy[await getLang()];
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
          <ButtonLink href="/contact?topic=developer" size="lg" arrow>
            {c.join}
          </ButtonLink>
          <ButtonLink href="#profile" size="lg" variant="secondary">
            {c.seeProfile}
          </ButtonLink>
        </div>
        <p className="mt-5 text-sm text-ink-500">
          {c.joinNote}
        </p>
      </PageHero>

      {/* Who */}
      <section className="border-t border-ink-900/[0.07] py-20">
        <div className="container-gab grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-ink-900/10 bg-white/10 md:grid-cols-3">
          {c.who.map(([title, text], i) => (
            <Reveal key={title} delay={i * 0.06} className="bg-white p-8 sm:p-10">
              <span className="font-mono text-xs text-accent-600">0{i + 1}</span>
              <h2 className="mt-5 text-2xl font-medium tracking-[-0.03em] text-ink-900">{title}</h2>
              <p className="mt-3 leading-relaxed text-ink-600">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-sand py-24 text-ink-900 sm:py-32">
        <div className="container-gab">
          <SectionHeading
            tone="light"
            eyebrow={c.whyEyebrow}
            title={
              <>
                {c.whyTitle[0]} <Accent>{c.whyTitle[1]}</Accent>
              </>
            }
            lead={c.whyLead}
          />
          <Stagger className="mt-16 grid border-s border-t border-ink-900/10 sm:grid-cols-2 lg:grid-cols-4">
            {c.features.map(([code, title, text]) => (
              <StaggerItem key={code} className="group relative border-b border-e border-ink-900/10 p-7 transition-colors duration-500 hover:bg-stone-100">
                <span className="font-mono text-[0.68rem] tracking-[0.2em] text-accent-600">{code}</span>
                <h3 className="mt-6 text-lg font-medium tracking-[-0.02em]">{title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-600">{text}</p>
                <span aria-hidden className="absolute start-0 top-0 h-[2px] w-0 bg-accent-500 transition-[width] duration-700 group-hover:w-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Example profile */}
      <section id="profile" className="scroll-mt-20 py-24 sm:py-32">
        <div className="container-gab">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={c.profileEyebrow}
              title={
                <>
                  {c.profileTitle[0]} <Accent>{c.profileTitle[1]}</Accent>
                </>
              }
              lead={c.profileLead}
            />
            <DemoBadge className="self-start lg:self-auto">{c.profileBadge}</DemoBadge>
          </div>
          <Reveal delay={0.1} className="mt-12">
            <ScaledFrame width={1120}>
              <BuilderProfileScreen id="atlas-oak" />
            </ScaledFrame>
          </Reveal>
        </div>
      </section>

      {/* Builder dashboard */}
      <section className="border-t border-ink-900/[0.07] bg-mist py-24 sm:py-32">
        <div className="container-gab grid items-center gap-14 lg:grid-cols-[0.8fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow={c.workspaceEyebrow}
              title={
                <>
                  {c.workspaceTitle[0]} <Accent>{c.workspaceTitle[1]}</Accent>
                </>
              }
              lead={c.workspaceLead}
            />
            <ul className="mt-10 space-y-4">
              {c.workspacePoints.map((t) => (
                <li key={t} className="flex items-center gap-3 text-ink-900">
                  <span aria-hidden className="h-px w-6 bg-accent-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1}>
            <ScaledFrame width={1120}>
              <BuilderDashboardScreen />
            </ScaledFrame>
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-500">{c.workspaceNote}</p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={c.ctaTitle}
        text={c.ctaText}
        cta={{ label: c.join, href: "/contact?topic=developer" }}
        secondary={{ label: c.ctaSecondary, href: "/faq" }}
      />
    </>
  );
}
