import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Accent } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with GAB about general inquiries, business partnerships, developer interest or collaboration opportunities.",
};

const reasons = [
  { t: "General inquiries", d: "Questions about GAB, the concept, or where the platform is heading." },
  { t: "Business partnerships", d: "Organisations interested in partnering with GAB as the marketplace develops." },
  { t: "Developer interest", d: "Independent developers, studios and teams who want to be part of the builder community." },
  { t: "Collaboration opportunities", d: "Ideas for working together — research, pilots, communities or content." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's <Accent>talk.</Accent>
          </>
        }
        lead="Whether you need software, build software, or want to help shape a better way to connect the two — we'd like to hear from you."
      />
      <section className="border-t border-ink-900/[0.07] pb-24 pt-16 sm:pb-32">
        <div className="container-gab grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <div className="border-t border-ink-900/10">
              {reasons.map((r, i) => (
                <Reveal key={r.t} delay={i * 0.05}>
                  <div className="border-b border-ink-900/10 py-6">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-accent-600">0{i + 1}</span>
                      <div>
                        <h2 className="text-lg font-medium tracking-[-0.02em] text-ink-900">{r.t}</h2>
                        <p className="mt-1.5 leading-relaxed text-ink-600">{r.d}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <div className="mt-10 rounded-[var(--radius-panel)] border border-ink-900/10 p-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent-600">Please note</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  GAB is in development. This form validates your message but is not yet connected to a backend, so
                  messages are not transmitted. We'll publish direct contact channels as the company launches them.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
