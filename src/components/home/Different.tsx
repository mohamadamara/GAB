import { SectionHeading, Accent } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../animations/Reveal";

const principles = [
  {
    t: "Problem-first approach",
    d: "Projects start from the business problem, not a list of technologies. The right solution follows from understanding what needs to change.",
    icon: "M4 20 L12 4 L20 20 M8 13 H16",
  },
  {
    t: "Access to different professionals",
    d: "Independent developers, studios and technical teams in one place — so the size of the builder can match the size of the project.",
    icon: "M5 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0 M13 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0 M3 20c0-4 4-6 6-6s6 2 6 6 M13 14c2 0 8 1 8 6",
  },
  {
    t: "Organised project discovery",
    d: "A structured path from description to decision replaces scattered searches, cold emails and guesswork.",
    icon: "M4 6 H20 M4 12 H14 M4 18 H9",
  },
  {
    t: "Transparent builder information",
    d: "Skills, technologies, services and portfolios presented consistently, so comparisons are based on substance.",
    icon: "M12 4 a8 8 0 1 0 0.01 0 M12 8 V13 M12 16 V16.5",
  },
  {
    t: "Every type of software",
    d: "Websites, mobile apps, SaaS, ERP, automation and AI — different kinds of software under one marketplace.",
    icon: "M4 4 H10 V10 H4 Z M14 4 H20 V10 H14 Z M4 14 H10 V20 H4 Z M14 14 H20 V20 H14 Z",
  },
  {
    t: "For technical and non-technical people",
    d: "Clear language for business owners; meaningful detail for engineers. Both sides understand what's being asked.",
    icon: "M4 12 H9 M15 12 H20 M9 12 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0",
  },
];

export function Different() {
  return (
    <section className="theme-inverse relative py-24 sm:py-36">
      <div className="container-gab">
        <SectionHeading
          tone="light"
          index="06"
          eyebrow="What makes GAB different"
          title={
            <>
              Not another agency. <Accent>A better way to find one.</Accent>
            </>
          }
          lead="GAB isn't a development company selling its own services. It's being designed as neutral ground where needs and skills meet on clear terms."
        />
        <Stagger className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <StaggerItem key={p.t} className="group relative overflow-hidden rounded-[var(--radius-panel)] bg-stone-100 p-8 transition-colors duration-500 hover:bg-stone-200 sm:p-10">
              <svg viewBox="0 0 24 24" aria-hidden className="size-8 text-accent-600" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d={p.icon} />
              </svg>
              <h3 className="mt-8 text-xl font-medium tracking-[-0.025em]">{p.t}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{p.d}</p>
              <span aria-hidden className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent-500 transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
