import Link from "next/link";
import Image from "next/image";
import type { Lang } from "@/i18n/config";
import type { Project } from "@/data/projects";
import { services } from "@/data/services";
import { servicesHe } from "@/i18n/services.he";

export function categoryName(slug: string, lang: Lang) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return slug;
  return lang === "he" ? (servicesHe[s.slug]?.name ?? s.name) : s.name;
}

/** Blueprint-style cover used when a project has no image yet. */
function CoverFallback({ code }: { code: string }) {
  return (
    <div className="blueprint-grid grid h-full w-full place-items-center bg-[#0d0c0a]">
      <span className="font-display text-5xl text-accent-500/40">{code}</span>
    </div>
  );
}

export function ProjectCard({ project, lang, viewLabel }: { project: Project; lang: Lang; viewLabel: string }) {
  const code = services.find((s) => s.slug === project.category)?.code ?? "GAB";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col border border-ink-900/15 transition-colors hover:border-accent-500/60 focus-visible:border-accent-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-900/15">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <CoverFallback code={code} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-600">
          {categoryName(project.category, lang)}
          {project.year && <span className="text-ink-500"> · {project.year}</span>}
        </p>
        <h3 className="font-display mt-3 text-xl leading-tight text-ink-950 sm:text-2xl">{project.name[lang]}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-600">{project.summary[lang]}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-accent-600">
          {viewLabel}
          <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

/** Honest empty state: slots that read as "coming soon", plus a way to ask for examples now. */
export function ProjectsEmpty({
  title,
  text,
  cta,
  placeholder,
  slots = 3,
}: {
  title: string;
  text: string;
  cta: React.ReactNode;
  placeholder: string;
  slots?: number;
}) {
  return (
    <div>
      <ul aria-hidden className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: slots }, (_, i) => (
          <li key={i} className={i > 0 ? "hidden sm:block" : undefined}>
            <div className="blueprint-grid grid aspect-[16/10] place-items-center border border-dashed border-accent-500/30">
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink-500">
                {String(i + 1).padStart(2, "0")} / {placeholder}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 max-w-2xl">
        <p className="font-display text-xl text-ink-950 sm:text-2xl">{title}</p>
        <p className="mt-3 leading-relaxed text-ink-600">{text}</p>
        <div className="mt-6">{cta}</div>
      </div>
    </div>
  );
}
