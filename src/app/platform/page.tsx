import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PlatformExplorer } from "@/components/sections/PlatformExplorer";
import { SectionHeading, Accent } from "@/components/ui/SectionHeading";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { FinalCta } from "@/components/sections/FinalCta";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Platform Preview",
  description:
    "Conceptual previews of the planned GAB platform: customer dashboard, project creation, builder discovery, profiles, proposal comparison, builder dashboard and administration.",
};

const system = [
  { t: "One component library", d: "Cards, badges, fields and tables are shared across every screen, so customers, builders and admins learn the product once." },
  { t: "Calm, legible density", d: "Warm neutral surfaces, a single yellow accent for decisions, and generous type keep complex information readable." },
  { t: "Role-aware shell", d: "The same navigation frame adapts to customers, builders and administrators — each sees only what they need." },
  { t: "Decisions, highlighted", d: "Copper is reserved for the next meaningful action: confirm, select, invite. Everything else stays quiet." },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform preview"
        title={
          <>
            What GAB is <Accent>being built</Accent> to look like.
          </>
        }
        lead="Ten interface previews from the planned GAB platform — from the first project description to the final builder selection, plus the builder and administration workspaces."
      >
        <div className="flex flex-col gap-4 rounded-[var(--radius-panel)] border border-accent-500/30 bg-accent-500/[0.06] p-5 sm:flex-row sm:items-center">
          <DemoBadge>Concept preview</DemoBadge>
          <p className="text-sm leading-relaxed text-ink-600">
            The GAB platform is in development. These are conceptual designs of planned functionality. All names,
            profiles, numbers and proposals shown are fictional demonstration data.
          </p>
        </div>
      </PageHero>

      <section className="border-t border-ink-900/[0.07] py-20 sm:py-28">
        <div className="container-gab">
          <PlatformExplorer />
        </div>
      </section>

      <section className="bg-sand py-24 text-ink-900 sm:py-32">
        <div className="container-gab">
          <SectionHeading
            tone="light"
            eyebrow="Shared design system"
            title={
              <>
                Ten screens. <Accent>One product language.</Accent>
              </>
            }
            lead="The previews are built from the same primitives, so the platform feels consistent no matter which side of the marketplace you're on."
          />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-ink-900/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {system.map((s, i) => (
              <StaggerItem key={s.t} className="bg-sand p-8">
                <span className="font-mono text-xs text-accent-600">0{i + 1}</span>
                <h3 className="mt-6 text-lg font-medium tracking-[-0.02em]">{s.t}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">{s.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-14 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex gap-2">
              {["#080808", "#1c1c1e", "#3c3c40", "#f08a6c", "#f6b39d", "#f3ece0"].map((c) => (
                <span key={c} className="size-12 rounded-[4px] border border-ink-900/10" style={{ background: c }} title={c} />
              ))}
            </div>
            <p className="text-sm text-ink-600">
              Near-black for surfaces · Grey for cards and lines · Coral for decisions · Cream for text. Typography: Inter Tight for interface,
              Instrument Serif for editorial moments, JetBrains Mono for system labels.
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        title="Help shape the platform."
        text="GAB is still being built. If you're a business with software needs or a builder with skills to offer, we'd like to hear what you need from it."
        cta={{ label: "Share your perspective", href: "/contact" }}
        secondary={{ label: "See how it works", href: "/how-it-works" }}
      />
    </>
  );
}
