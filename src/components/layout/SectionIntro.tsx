import { rise } from "../animations/rise";

/** Header block shared by the Services, Work and Contact sections. */
export function SectionIntro({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: React.ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(240px,0.55fr)_1.45fr] lg:gap-12">
      <p {...rise(0, "tracking-label pt-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent-600 sm:text-[0.8rem]")}
      >
        {eyebrow}
      </p>
      <div>
        <h1 {...rise(0.06, "font-display text-[clamp(2.1rem,7.5vw,4.6rem)] leading-[1] text-ink-950")}>
          {title.replace(/\.$/, "")}
          <span className="text-accent-500">.</span>
        </h1>
        <p {...rise(0.14, "mt-6 max-w-2xl text-pretty text-[0.98rem] leading-[1.75] text-ink-700 sm:text-[1.05rem]")}>
          {lead}
        </p>
        {children && <div {...rise(0.2)}>{children}</div>}
      </div>
    </div>
  );
}
