import { cn } from "@/lib/cn";

/** Honest labelling for any simulated data or conceptual interface. */
export function DemoBadge({
  children = "Demonstration · simulated data",
  className,
  tone = "dark",
}: {
  children?: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[3px] border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em]",
        tone === "dark"
          ? "border-accent-500/40 bg-accent-500/10 text-accent-600"
          : "border-accent-600/40 bg-accent-500/10 text-accent-700",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-accent-400 [animation:pulse-dot_2s_ease-in-out_infinite]" />
      {children}
    </span>
  );
}
