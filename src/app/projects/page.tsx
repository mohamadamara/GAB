import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { dictionaries } from "@/i18n/dictionary";
import { pageMeta } from "@/i18n/meta";
import { getLang } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard, ProjectsEmpty, categoryName } from "@/components/projects/ProjectCard";

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta.projects[await getLang()];
}

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const lang = await getLang();
  const t = dictionaries[lang];
  const { category } = await searchParams;

  // Only offer filters for categories that actually have projects, and only when it helps.
  const used = services.filter((s) => projects.some((p) => p.category === s.slug));
  const showFilters = projects.length > 3 && used.length > 1;
  const active = showFilters && used.some((s) => s.slug === category) ? category : undefined;
  const list = active ? projects.filter((p) => p.category === active) : projects;

  const chip = (selected: boolean) =>
    cn(
      "inline-flex h-10 items-center whitespace-nowrap border px-4 font-mono text-[0.78rem] transition-colors",
      selected ? "border-accent-500 bg-accent-500/15 text-ink-950" : "border-ink-900/15 text-ink-600 hover:border-accent-500/60 hover:text-ink-900",
    );

  return (
    <section className="pb-20 pt-[120px] sm:pt-[136px]">
      <div className="container-wide">
        <SectionIntro eyebrow={t.projects.eyebrow} title={t.projects.title} lead={t.projects.lead} />

        <div className="mt-14 border-t border-ink-900/15 pt-10 sm:mt-16 sm:pt-12">
          {showFilters && (
            <nav aria-label={t.projects.filterLabel} className="scrollbar-none -mx-4 mb-8 overflow-x-auto px-4 md:-mx-8 md:px-8">
              <ul className="flex gap-2">
                <li>
                  <Link href="/projects" scroll={false} aria-current={!active ? "true" : undefined} className={chip(!active)}>
                    {t.projects.all}
                  </Link>
                </li>
                {used.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/projects?category=${s.slug}`}
                      scroll={false}
                      aria-current={active === s.slug ? "true" : undefined}
                      className={chip(active === s.slug)}
                    >
                      {categoryName(s.slug, lang)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {list.length ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} lang={lang} viewLabel={t.projects.view} />
                </li>
              ))}
            </ul>
          ) : (
            <ProjectsEmpty
              title={t.projects.emptyTitle}
              text={t.projects.emptyText}
              placeholder={t.projects.placeholder}
              slots={6}
              cta={
                <ButtonLink href="/contact?topic=project" arrow>
                  {t.projects.emptyCta}
                </ButtonLink>
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
