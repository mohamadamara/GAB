import { cn } from "@/lib/cn";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../animations/Reveal";
import { rise } from "../animations/rise";

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
    <section className={cn("grain relative overflow-hidden pb-16 pt-32 sm:pb-28 sm:pt-44", className)}>
      <div className="container-gab relative grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div {...rise(0)}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1
            {...rise(
              0.06,
              "font-display mt-6 max-w-5xl text-balance text-[clamp(2.1rem,9vw,2.4rem)] leading-[1.02] text-ink-900 sm:text-6xl lg:text-[5.25rem] lg:leading-[0.98]",
            )}
          >
            {title}
          </h1>
          {lead && <p {...rise(0.12, "mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600 sm:text-xl")}>{lead}</p>}
          {children && <div {...rise(0.18, "mt-10")}>{children}</div>}
        </div>
        {aside && <Reveal delay={0.2}>{aside}</Reveal>}
      </div>
    </section>
  );
}
