import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Accent } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { getLang } from "@/i18n/server";
import { faqCopy } from "@/i18n/pages/faq";

export async function generateMetadata(): Promise<Metadata> {
  const c = faqCopy[await getLang()];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function FaqPage() {
  const lang = await getLang();
  const c = faqCopy[lang];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: c.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]} <Accent>{c.title[1]}</Accent>
          </>
        }
        lead={c.lead}
      />
      <section className="border-t border-ink-900/[0.07] pb-24 pt-16 sm:pb-32">
        <div className="container-gab grid gap-14 lg:grid-cols-[1fr_2.2fr]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <div className="metal-plate rounded-[var(--radius-panel)] p-7">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent-600">{c.statusEyebrow}</p>
              <p className="mt-4 text-2xl font-medium tracking-[-0.03em] text-ink-900">{c.statusTitle}</p>
              <p className="mt-3 leading-relaxed text-ink-600">
                {c.statusText}
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <ButtonLink href="/contact" arrow>
                  {c.ask}
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary">
                  {c.preview}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <FaqList items={c.items} labels={c.labels} />
        </div>
      </section>
    </>
  );
}
