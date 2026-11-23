import type { Metadata } from "next";
import { journey } from "@/data/journey";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { Walkthrough } from "@/components/sections/Walkthrough";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The GAB marketplace journey from first idea to selecting a software builder: describe, define, discover, compare, choose — with an interactive walkthrough.",
};

const builderSide = [
  ["Build a profile", "Skills, technologies, services and working style in one consistent format."],
  ["Show your work", "Portfolio case studies that explain the problem, the solution and your role."],
  ["See relevant projects", "Opportunities organised around clear scopes that match what you do."],
  ["Propose with context", "Respond to structured briefs, so proposals start from shared understanding."],
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            From the first idea <Accent>to the right builder.</Accent>
          </>
        }
        lead="GAB is being designed around one clear journey. Follow a simulated project — a clinic that needs an appointment booking system — through every step."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#walkthrough" size="lg" arrow>
            Start the walkthrough
          </ButtonLink>
          <ButtonLink href="/platform" size="lg" variant="secondary">
            Preview the platform
          </ButtonLink>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="border-t border-ink-900/[0.07] py-20 sm:py-24">
        <div className="container-gab">
          <Stagger className="grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-ink-900/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {journey.map((s) => (
              <StaggerItem key={s.key} className="group relative bg-white p-7 transition-colors hover:bg-white">
                <span className="font-mono text-xs tracking-[0.2em] text-accent-600">STEP {s.n}</span>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-ink-900">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">{s.text}</p>
                <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-400 transition-[width] duration-700 group-hover:w-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Walkthrough */}
      <section id="walkthrough" className="scroll-mt-20 py-20 sm:py-28">
        <div className="container-gab">
          <SectionHeading
            eyebrow="Interactive walkthrough"
            title={
              <>
                One project. <Accent>Five steps.</Accent>
              </>
            }
            lead="Use the steps or the buttons to move through the journey. Every name and number in this walkthrough is fictional and exists only to demonstrate how GAB is intended to work."
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
            eyebrow="Meanwhile, on the builder side"
            title={
              <>
                Clear briefs make <Accent>better proposals.</Accent>
              </>
            }
            lead="The same structure that helps customers decide helps builders respond. Developers, studios and teams see projects that are already organised."
          />
          <Stagger className="grid border-t border-ink-900/10 sm:grid-cols-2">
            {builderSide.map(([t, d], i) => (
              <StaggerItem key={t} className="border-b border-ink-900/10 py-8 sm:px-6 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:pl-0">
                <span className="font-mono text-xs text-accent-600">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-medium tracking-[-0.025em]">{t}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FinalCta
        title="Have a project in mind?"
        text="GAB is not open to projects yet. Tell us what you'd like to build and we'll keep you informed as the platform develops."
        cta={{ label: "Register your interest", href: "/contact?topic=general" }}
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
