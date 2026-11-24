import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "tracking-label flex items-center gap-2.5 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-accent-600",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-accent-500/70" />
      {children}
      {index && <span className="text-ink-500/70">({index})</span>}
    </p>
  );
}
