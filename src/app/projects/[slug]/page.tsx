import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findProject, projects } from "@/data/projects";
import { dictionaries } from "@/i18n/dictionary";
import { getLang } from "@/i18n/server";
import { ButtonLink } from "@/components/ui/Button";
import { categoryName } from "@/components/projects/ProjectCard";
import { rise } from "@/components/animations/rise";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = findProject((await params).slug);
  if (!p) return {};
  const lang = await getLang();
  return { title: p.name[lang], description: p.summary[lang] };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = findProject((await params).slug);
  if (!p) notFound();
  const lang = await getLang();
  const t = dictionaries[lang].projects;

  const facts = [
    [t.client, p.client[lang]],
    [t.category, categoryName(p.category, lang)],
    ...(p.year ? [[t.year, p.year]] : []),
  ];
  const story = [
    [t.challenge, p.challenge[lang]],
    [t.solution, p.solution[lang]],
    [t.result, p.result[lang]],
  ];

  return (
    <article className="pb-20 pt-[120px] sm:pt-[136px]">
      <div className="container-wide">
        <Link
          href="/projects"
          className="tracking-label inline-flex items-center gap-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ink-600 transition-colors hover:text-accent-600"
        >
          <span aria-hidden className="inline-block rtl:-scale-x-100">←</span>
          {t.back}
        </Link>

        <h1 {...rise(0.04, "font-display mt-8 max-w-4xl text-balance text-[clamp(2.1rem,7.5vw,4.4rem)] leading-[1] text-ink-950")}>{p.name[lang]}</h1>
        <p {...rise(0.1, "mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-700")}>{p.summary[lang]}</p>

        <dl {...rise(0.16, "mt-10 grid gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-3")}>
          {facts.map(([k, v]) => (
            <div key={k} className="bg-paper p-5">
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">{k}</dt>
              <dd className="mt-2 font-mono text-[0.95rem] text-ink-900">{v}</dd>
            </div>
          ))}
        </dl>

        {p.cover && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden border border-ink-900/15">
            <Image src={p.cover} alt={p.name[lang]} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          </div>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_minmax(220px,0.4fr)] lg:gap-16">
          <div className="space-y-12">
            {story.map(([k, v]) => (
              <section key={k}>
                <h2 className="tracking-label font-mono text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-accent-600">{k}</h2>
                <p className="mt-4 max-w-3xl whitespace-pre-line text-[1.05rem] leading-[1.8] text-ink-800">{v}</p>
              </section>
            ))}
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="tracking-label font-mono text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-accent-600">{t.tech}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((x) => (
                <li key={x} dir="ltr" className="border border-ink-900/15 px-2.5 py-1 font-mono text-[0.8rem] text-ink-800">
                  {x}
                </li>
              ))}
            </ul>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 border-b border-accent-500/60 pb-1 font-mono text-[0.8rem] font-semibold text-accent-600 hover:text-accent-700"
              >
                {t.visit} <span aria-hidden>↗</span>
              </a>
            )}
          </aside>
        </div>

        {p.gallery && p.gallery.length > 0 && (
          <ul className="mt-16 grid gap-4 sm:grid-cols-2">
            {p.gallery.map((src) => (
              <li key={src} className="relative aspect-[16/10] overflow-hidden border border-ink-900/15">
                <Image src={src} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-20 border-t border-ink-900/15 pt-10 sm:flex sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="font-display text-2xl text-ink-950 sm:text-3xl">{t.nextTitle}</p>
            <p className="mt-3 text-ink-600">{t.nextText}</p>
          </div>
          <div className="mt-6 sm:mt-0">
            <ButtonLink href="/contact?topic=project" arrow>
              {dictionaries[lang].nav.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
