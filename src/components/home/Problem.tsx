import { SectionHeading, Accent } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../animations/Reveal";

const problems = [
  {
    t: "Not knowing where to start",
    d: "You know the business problem. You don't know whether it needs a website, an app, an integration — or who to ask first.",
  },
  {
    t: "Finding reliable developers",
    d: "Talent is spread across freelance sites, agencies, referrals and social networks, each with different signals of quality.",
  },
  {
    t: "Unclear technology choices",
    d: "Frameworks, platforms, hosting, no-code or custom — technical decisions arrive before you have the vocabulary to make them.",
  },
  {
    t: "Comparing proposals fairly",
    d: "Quotes arrive in different formats, with different assumptions, making like-for-like comparison close to impossible.",
  },
  {
    t: "Unclear expectations",
    d: "Without a shared definition of scope, timelines and deliverables, projects drift and relationships suffer.",
  },
  {
    t: "Business needs → technical specs",
    d: "Translating “we lose customers after hours” into features, data and requirements is a skill in itself.",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 text-ink-900 sm:py-36">
      <div className="container-gab relative grid gap-16 lg:grid-cols-[0.9fr_1.4fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            tone="light"
            index="01"
            eyebrow="The problem"
            title={
              <>
                Software is essential. Finding the right people to build it <Accent>shouldn’t be this hard.</Accent>
              </>
            }
            lead="Most businesses don't struggle with ideas. They struggle with everything between the idea and the people who can build it."
          />
        </div>
        <Stagger className="grid border-t border-ink-900/10 sm:grid-cols-2">
          {problems.map((p, i) => (
            <StaggerItem
              key={p.t}
              className="group relative border-b border-ink-900/10 py-9 sm:px-8 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:pl-0"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-accent-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-medium tracking-[-0.025em]">{p.t}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{p.d}</p>
              <span
                aria-hidden
                className="absolute bottom-[-1px] left-0 h-px w-0 bg-accent-500 transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
