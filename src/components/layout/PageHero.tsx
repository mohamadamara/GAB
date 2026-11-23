import { cn } from "@/lib/cn";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, MaskReveal } from "../animations/Reveal";

/** Shared hero for interior pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  aside,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("grain relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44", className)}>
      <div className="container-gab relative grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="mt-6 max-w-5xl text-balance text-[2.75rem] font-medium leading-[1] tracking-[-0.05em] text-ink-900 sm:text-7xl lg:text-[6rem]">
            <MaskReveal immediate delay={0.05}>
              {title}
            </MaskReveal>
          </h1>
          {lead && (
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600 sm:text-xl">{lead}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.18}>
              <div className="mt-10">{children}</div>
            </Reveal>
          )}
        </div>
        {aside && <Reveal delay={0.2}>{aside}</Reveal>}
      </div>
    </section>
  );
}
