"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionIntro } from "../layout/SectionIntro";
import { DemoBadge } from "../ui/DemoBadge";
import { PlatformExplorer } from "./PlatformExplorer";

/** "Work": the planned GAB platform, shown as clearly labelled concept previews (no client projects are claimed). */
export function WorkView() {
  const { t } = useLanguage();
  return (
    <section className="pb-20 pt-[120px] sm:pt-[136px]">
      <div className="container-wide">
        <SectionIntro eyebrow={t.work.eyebrow} title={t.work.title} lead={t.work.lead}>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <DemoBadge>{t.work.badge}</DemoBadge>
            {t.work.englishUi && <span className="font-mono text-[0.75rem] text-ink-500">{t.work.englishUi}</span>}
          </div>
        </SectionIntro>
        <div className="mt-14 border-t border-ink-900/15 pt-10 sm:mt-16 sm:pt-12">
          <PlatformExplorer />
        </div>
      </div>
    </section>
  );
}
