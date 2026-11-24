"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionIntro } from "../layout/SectionIntro";
import { ContactForm } from "./ContactForm";

export function ContactView() {
  const { t } = useLanguage();
  return (
    <section className="pb-20 pt-[120px] sm:pt-[136px]">
      <div className="container-wide">
        <SectionIntro eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />

        <div className="mt-14 grid gap-12 border-t border-ink-900/15 pt-10 *:min-w-0 sm:mt-16 lg:grid-cols-[minmax(240px,0.55fr)_1.45fr] lg:gap-12">
          <div>
            <ol>
              {t.contact.reasons.map(([title, text], i) => (
                <li key={title} className="flex gap-4 border-b border-ink-900/10 py-5 first:pt-0">
                  <span className="pt-0.5 font-mono text-xs font-semibold text-accent-600">0{i + 1}</span>
                  <div>
                    <h2 className="font-mono text-[0.95rem] font-semibold text-ink-900">{title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 border border-accent-500/30 p-5">
              <p className="tracking-label font-mono text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-accent-600">
                {t.contact.noteTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{t.contact.note}</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
