/**
 * The GAB product design system (concept).
 * Shared primitives used by every platform preview so the screens read as one product.
 */
import { cn } from "@/lib/cn";

export function MCard({ children, className, title, action }: { children: React.ReactNode; className?: string; title?: string; action?: React.ReactNode }) {
  return (
    <div className={cn("rounded-[6px] border border-stone-200 bg-white", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
          <p className="text-[13px] font-semibold tracking-tight text-ink-900">{title}</p>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function MBadge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: "neutral" | "copper" | "dark" | "green" | "outline"; className?: string }) {
  const tones = {
    neutral: "bg-stone-100 text-ink-600",
    copper: "bg-accent-500/12 text-accent-700",
    dark: "bg-ink-900 text-paper",
    green: "bg-[#8fa38a]/20 text-[#b6cbb0]",
    outline: "border border-stone-200 text-ink-600",
  } as const;
  return <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-[3px] px-1.5 py-0.5 text-[11px] font-medium", tones[tone], className)}>{children}</span>;
}

export function MAvatar({ initials, size = 32, tone = "dark" }: { initials: string; size?: number; tone?: "dark" | "copper" | "light" }) {
  const tones = { dark: "bg-ink-800 text-accent-200", copper: "bg-accent-500 text-[#080808]", light: "bg-stone-100 text-ink-700" };
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full font-semibold", tones[tone])} style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {initials}
    </span>
  );
}

export function MButton({ children, variant = "primary", className }: { children: React.ReactNode; variant?: "primary" | "secondary" | "ghost"; className?: string }) {
  const v = {
    primary: "bg-ink-900 text-paper",
    secondary: "border border-stone-200 bg-white text-ink-800",
    ghost: "text-ink-600",
  } as const;
  return <span className={cn("inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-[4px] px-3 text-[12px] font-medium", v[variant], className)}>{children}</span>;
}

export function MCopperButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-[4px] bg-accent-500 px-3 text-[12px] font-semibold text-[#080808]", className)}>{children}</span>;
}

export function MField({ label, value, placeholder, className, tall }: { label: string; value?: string; placeholder?: string; className?: string; tall?: boolean }) {
  return (
    <div className={className}>
      <p className="mb-1.5 text-[11px] font-medium text-ink-600">{label}</p>
      <div className={cn("rounded-[4px] border border-stone-200 bg-white px-3 text-[12.5px]", tall ? "min-h-[84px] py-2.5 leading-relaxed" : "flex h-9 items-center")}>
        {value ? <span className="text-ink-900">{value}</span> : <span className="text-stone-400">{placeholder}</span>}
      </div>
    </div>
  );
}

export function MProgress({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("block h-1.5 overflow-hidden rounded-full bg-stone-100", className)}>
      <span className="block h-full rounded-full bg-accent-500" style={{ width: `${value}%` }} />
    </span>
  );
}

export function MStat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <MCard className="p-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-stone-400">{label}</p>
      <p className="mt-2 text-[26px] font-semibold leading-none tracking-[-0.04em] text-ink-900">{value}</p>
      {hint && <p className="mt-2 text-[11px] text-ink-500">{hint}</p>}
    </MCard>
  );
}

export function MChip({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center whitespace-nowrap rounded-full border px-3 text-[11.5px]",
        active ? "border-ink-900 bg-ink-900 text-paper" : "border-stone-200 bg-white text-ink-600",
      )}
    >
      {children}
    </span>
  );
}

export function MCheck({ checked, label }: { checked?: boolean; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[12px] text-ink-700">
      <span className={cn("grid size-3.5 place-items-center rounded-[3px] border", checked ? "border-accent-500 bg-accent-500 text-[9px] text-[#080808]" : "border-stone-300 bg-white")}>
        {checked && "✓"}
      </span>
      {label}
    </span>
  );
}

export function MIcon({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export const icons = {
  home: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  folder: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  search: "M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14 M21 21l-4.3-4.3",
  compare: "M8 4v16 M16 4v16 M4 8h8 M12 16h8",
  inbox: "M4 13l2-8h12l2 8 M4 13v6h16v-6 M4 13h5l1 2h4l1-2h5",
  user: "M12 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8 M4 21c0-4 4-6 8-6s8 2 8 6",
  settings: "M12 15a3 3 0 1 0 0-6a3 3 0 1 0 0 6 M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1z",
  grid: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
  briefcase: "M4 8h16v11H4z M9 8V5h6v3",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9c-4.5-1-8-4-8-9V6z",
  flag: "M5 21V4 M5 4h11l-2 4 2 4H5",
  plus: "M12 5v14 M5 12h14",
  spark: "M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l2.5 2.5 M15.5 15.5L18 18 M6 18l2.5-2.5 M15.5 8.5L18 6",
  check: "M5 12l5 5L20 7",
  bell: "M6 16V11a6 6 0 1 1 12 0v5l2 2H4z M10 21h4",
};
