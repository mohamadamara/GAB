import { SectionHeading, Accent } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../animations/Reveal";

const customers = [
  "Turn an idea into a project",
  "Discover suitable software builders",
  "Understand available services",
  "Compare relevant portfolios and skills",
  "Find a suitable development partner",
];
const builders = [
  "Present your skills",
  "Showcase your portfolio",
  "Display your services",
  "Discover software development opportunities",
  "Connect with potential customers",
];

export function TwoSides() {
  return (
    <section className="relative py-24 sm:py-36">
      <div className="container-gab">
        <SectionHeading
          align="center"
          index="05"
          eyebrow="Two sides, one marketplace"
          title={
            <>
              Built for the people who need software <Accent>and the people who build it.</Accent>
            </>
          }
        />
        <div className="relative mt-16 grid gap-3 lg:grid-cols-2">
          {/* connector */}
          <div aria-hidden className="absolute left-1/2 top-1/2 z-10 hidden size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[6px] border-[#080808] bg-accent-500 lg:grid">
            <span className="font-sans text-lg font-semibold tracking-[-0.06em] text-[#080808]">GAB</span>
          </div>

          <Reveal className="theme-inverse relative rounded-[var(--radius-panel)] p-8 sm:p-12 lg:p-16">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent-600">For customers</p>
            <h3 className="mt-4 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">You have the idea.</h3>
            <p className="mt-3 max-w-sm text-ink-600">Businesses, founders and organisations that need software built.</p>
            <ul className="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {customers.map((c, i) => (
                <li key={c} className="flex items-center gap-4 py-4">
                  <span className="font-mono text-xs text-accent-600">0{i + 1}</span>
                  <span className="text-[1.05rem]">{c}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/how-it-works" variant="dark" size="lg" arrow className="mt-10">
              Find a Builder
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1} className="relative rounded-[var(--radius-panel)] bg-mist p-8 sm:p-12 lg:p-16">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
            <div className="relative">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent-600">For builders</p>
              <h3 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-ink-900 sm:text-4xl">You have the skills.</h3>
              <p className="mt-3 max-w-sm text-ink-600">Independent developers, development studios and technical teams.</p>
              <ul className="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10">
                {builders.map((c, i) => (
                  <li key={c} className="flex items-center gap-4 py-4">
                    <span className="font-mono text-xs text-accent-600">0{i + 1}</span>
                    <span className="text-[1.05rem] text-ink-900">{c}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/builders" size="lg" arrow className="mt-10">
                Become a Builder
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
