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
        "flex items-center gap-2.5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-500",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent-500" />
      {children}
      {index && <span className="text-ink-500/70">({index})</span>}
    </p>
  );
}
