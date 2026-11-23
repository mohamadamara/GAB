import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal, MaskReveal } from "../animations/Reveal";

export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  index?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow index={index} tone={tone} className={align === "center" ? "justify-center" : undefined}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Tag
          className={cn(
            "mt-5 text-balance font-sans font-medium tracking-[-0.045em] text-ink-900",
            Tag === "h1"
              ? "text-[2.6rem] leading-[1] sm:text-6xl lg:text-[5.25rem]"
              : "text-[2.2rem] leading-[1.02] sm:text-5xl lg:text-[3.6rem]",
          )}
        >
          <MaskReveal delay={0.05}>{title}</MaskReveal>
        </Tag>
      {lead && (
        <Reveal delay={0.1}>
          <p className={cn("mt-6 text-pretty text-lg leading-relaxed", "text-ink-600")}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Serif italic accent inside headlines */
export function Accent({ children }: { children: React.ReactNode }) {
  return <em className="text-accent-metal pr-1 font-serif font-normal italic tracking-[-0.01em]">{children}</em>;
}
