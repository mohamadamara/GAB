import { EnglishOnly } from "@/components/i18n/EnglishOnly";
import type { Metadata } from "next";
import { faqs } from "@/data/faq";
import { PageHero } from "@/components/layout/PageHero";
import { Accent } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Honest answers about GAB: what it is, who it's for, what's available today and what's planned.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <EnglishOnly>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Honest answers, <Accent>clearly labelled.</Accent>
          </>
        }
        lead="Each answer is marked as either describing GAB itself or describing planned functionality. Nothing on this page refers to a feature that is live today."
      />
      <section className="border-t border-ink-900/[0.07] pb-24 pt-16 sm:pb-32">
        <div className="container-gab grid gap-14 lg:grid-cols-[1fr_2.2fr]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <div className="metal-plate rounded-[var(--radius-panel)] p-7">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent-600">Current status</p>
              <p className="mt-4 text-2xl font-medium tracking-[-0.03em] text-ink-900">The platform is in development.</p>
              <p className="mt-3 leading-relaxed text-ink-600">
                You can explore the concept and register interest today. Posting projects and builder registration will
                come later.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <ButtonLink href="/contact" arrow>
                  Ask another question
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary">
                  Preview the platform
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <FaqList items={faqs} />
        </div>
      </section>
    </EnglishOnly>
  );
}
