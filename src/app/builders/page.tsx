import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ScaledFrame } from "@/components/mockups/AppFrame";
import { BuilderDashboardScreen, BuilderProfileScreen } from "@/components/mockups/screens";

export const metadata: Metadata = {
  title: "For Builders",
  description:
    "Why independent developers, software studios and development teams should join the GAB marketplace: professional profiles, portfolios, services and relevant project opportunities.",
};

const features = [
  { t: "Professional profiles", d: "A consistent, credible profile that presents who you are, how you work and what you're best at.", k: "PRF" },
  { t: "Technical skills", d: "Show the depth of your expertise — from domains like booking or ERP to disciplines like UX or DevOps.", k: "SKL" },
  { t: "Technologies", d: "List the languages, frameworks and platforms you actually work with, so matches are meaningful.", k: "TEC" },
  { t: "Portfolio", d: "Case studies structured around the problem, the solution and your role — not just screenshots.", k: "PFL" },
  { t: "Services", d: "Define what you offer: discovery, design, development, integration, maintenance and more.", k: "SRV" },
  { t: "Project opportunities", d: "Browse projects that arrive already organised into goals, users and prioritised features.", k: "OPP" },
  { t: "Customer discovery", d: "Be found by businesses searching for exactly the skills and experience you bring.", k: "DSC" },
  { t: "Project matching", d: "Planned matching that relates project scopes to builder profiles, highlighting relevant opportunities.", k: "MCH" },
];

const who = [
  { t: "Independent developers", d: "Freelancers and solo engineers who want quality projects without endless cold outreach." },
  { t: "Development studios", d: "Small and mid-sized studios looking for clients whose projects fit their specialism." },
  { t: "Technical teams", d: "Established teams that take on larger platforms and long-term engagements." },
];

export default function BuildersPage() {
  return (
    <>
      <PageHero
        eyebrow="For builders"
        title={
          <>
            Your skills, <Accent>in front of the right projects.</Accent>
          </>
        }
        lead="GAB is being built for independent developers, software studios and technical teams who want to be discovered for what they do best — and spend less time chasing work that doesn't fit."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?topic=developer" size="lg" arrow>
            Become a Builder
          </ButtonLink>
          <ButtonLink href="#profile" size="lg" variant="secondary">
            See an example profile
          </ButtonLink>
        </div>
        <p className="mt-5 text-sm text-ink-500">
          Builder registration isn't open yet. “Become a Builder” lets you register interest so we can keep you informed.
        </p>
      </PageHero>

      {/* Who */}
      <section className="border-t border-ink-900/[0.07] py-20">
        <div className="container-gab grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-ink-900/10 bg-white/10 md:grid-cols-3">
          {who.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.06} className="bg-white p-8 sm:p-10">
              <span className="font-mono text-xs text-accent-600">0{i + 1}</span>
              <h2 className="mt-5 text-2xl font-medium tracking-[-0.03em] text-ink-900">{w.t}</h2>
              <p className="mt-3 leading-relaxed text-ink-600">{w.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-sand py-24 text-ink-900 sm:py-32">
        <div className="container-gab">
          <SectionHeading
            tone="light"
            eyebrow="Why join GAB"
            title={
              <>
                Everything you need to be <Accent>understood and chosen.</Accent>
              </>
            }
            lead="These are the capabilities GAB is being designed to give builders. They are planned features of a platform in development."
          />
          <Stagger className="mt-16 grid border-l border-t border-ink-900/10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <StaggerItem key={f.t} className="group relative border-b border-r border-ink-900/10 p-7 transition-colors duration-500 hover:bg-stone-100">
                <span className="font-mono text-[0.68rem] tracking-[0.2em] text-accent-600">{f.k}</span>
                <h3 className="mt-6 text-lg font-medium tracking-[-0.02em]">{f.t}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-600">{f.d}</p>
                <span aria-hidden className="absolute left-0 top-0 h-[2px] w-0 bg-accent-500 transition-[width] duration-700 group-hover:w-full" />
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
              eyebrow="Example builder profile"
              title={
                <>
                  A profile that <Accent>does the explaining.</Accent>
                </>
              }
              lead="Skills, technologies, services, portfolio and availability — presented the same way for every builder, so customers can compare with confidence."
            />
            <DemoBadge className="self-start lg:self-auto">Fictional sample profile</DemoBadge>
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
              eyebrow="Your workspace"
              title={
                <>
                  Opportunities, <Accent>organised.</Accent>
                </>
              }
              lead="A planned builder dashboard surfaces projects relevant to your profile, tracks the proposals you've sent and shows how to strengthen your presence."
            />
            <ul className="mt-10 space-y-4">
              {["Projects related to your skills", "Proposal pipeline at a glance", "Profile strength guidance"].map((t) => (
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
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-500">Concept preview · demonstration values</p>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title="Build what matters. Get found for it."
        text="Register your interest as a developer, studio or technical team. We'll share updates as GAB moves toward its first release."
        cta={{ label: "Become a Builder", href: "/contact?topic=developer" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
