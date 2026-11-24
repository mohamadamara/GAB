"use client";

import Link from "next/link";
import { services } from "@/data/services";
import { featuredProjects, projects } from "@/data/projects";
import { servicesHe } from "@/i18n/services.he";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal, Stagger, StaggerItem } from "../animations/Reveal";
import { ButtonLink } from "../ui/Button";
import { ProjectCard, ProjectsEmpty } from "../projects/ProjectCard";

function SectionHead({ index, eyebrow, title, link }: { index: string; eyebrow: string; title: string; link: { href: string; label: string } }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="tracking-label flex items-center gap-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent-600">
          <span aria-hidden className="h-px w-8 bg-accent-500/70" />
          {index} / {eyebrow}
        </p>
        <h2 className="font-display mt-5 max-w-3xl text-balance text-[clamp(1.8rem,6vw,3.2rem)] leading-[1.05] text-ink-950">{title}</h2>
      </div>
      <Link
        href={link.href}
        className="tracking-label inline-flex shrink-0 items-center gap-2 self-start border-b border-accent-500/60 pb-1 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-accent-600 transition-colors hover:text-accent-700 sm:self-auto"
      >
        {link.label}
        <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
      </Link>
    </div>
  );
}

/** Home page below the hero: what we build, selected projects, how we work, call to action. */
export function HomeSections() {
  const { t, lang } = useLanguage();
  const s = t.homeSections;
  const featured = featuredProjects().length ? featuredProjects() : projects.slice(0, 3);

  return (
    <>
      {/* What we build */}
      <section className="border-t border-accent-500/15 py-20 sm:py-28">
        <div className="container-wide">
          <SectionHead index="02" eyebrow={s.servicesEyebrow} title={s.servicesTitle} link={{ href: "/services", label: s.servicesLink }} />
          <Stagger className="mt-12 grid grid-cols-2 border-s border-t border-ink-900/15 lg:grid-cols-4">
            {services.map((sv) => {
              const copy = lang === "he" ? { ...sv, ...servicesHe[sv.slug] } : sv;
              return (
                <StaggerItem key={sv.slug} className="border-b border-e border-ink-900/15">
                  <Link href="/services" className="group block h-full p-4 transition-colors hover:bg-accent-500/[0.04] sm:p-6">
                    <span className="font-mono text-[0.68rem] tracking-[0.2em] text-accent-600">{sv.code}</span>
                    <h3 className="mt-2 font-mono text-[0.92rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-accent-600 sm:mt-3 sm:text-[1.02rem]">
                      {copy.name}
                    </h3>
                    <p className="mt-2 hidden text-[0.88rem] leading-relaxed text-ink-600 sm:block">{copy.short}</p>
                  </Link>
                </StaggerItem>
              );
            })}
            <StaggerItem className="border-b border-e border-ink-900/15">
              <Link
                href="/contact?topic=project"
                className="flex h-full flex-col justify-between bg-accent-500/[0.06] p-4 transition-colors hover:bg-accent-500/15 sm:p-6"
              >
                <span className="font-mono text-[0.68rem] tracking-[0.2em] text-accent-600">GAB</span>
                <span className="mt-2 flex items-center gap-2 font-mono text-[0.92rem] font-semibold text-accent-600 sm:mt-6 sm:text-[0.95rem]">
                  {s.ctaPrimary}
                  <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
                </span>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Selected projects */}
      <section className="border-t border-ink-900/10 py-20 sm:py-28">
        <div className="container-wide">
          <SectionHead index="03" eyebrow={s.projectsEyebrow} title={s.projectsTitle} link={{ href: "/projects", label: s.projectsLink }} />
          <Reveal className="mt-12">
            {featured.length ? (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
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
                cta={
                  <ButtonLink href="/contact?topic=project" variant="secondary" arrow>
                    {t.projects.emptyCta}
                  </ButtonLink>
                }
              />
            )}
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-ink-900/10 py-20 sm:py-28">
        <div className="container-wide">
          <SectionHead index="04" eyebrow={s.processEyebrow} title={s.processTitle} link={{ href: "/how-it-works", label: s.processLink }} />
          <Stagger className="mt-12 grid gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-2 lg:grid-cols-5">
            {t.process.steps.map((step, i) => (
              <StaggerItem key={step.key} className="bg-paper p-5 sm:p-6">
                <span className="font-mono text-[0.7rem] tracking-[0.16em] text-accent-600">
                  {t.process.stepLabel} {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-xl text-ink-950">{step.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-600">{step.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative overflow-hidden border-t border-ink-900/10 py-24 sm:py-32">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgb(198_160_82/0.2),transparent_60%)]" />
        <div className="container-wide relative text-center">
          <Reveal>
            <h2 className="font-display mx-auto max-w-4xl text-balance text-[clamp(2rem,7vw,4rem)] leading-[1.02] text-ink-950">{s.ctaTitle}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">{s.ctaText}</p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact?topic=project" size="lg" arrow>
                {s.ctaPrimary}
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="secondary">
                {s.ctaSecondary}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
