"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { MAvatar, MIcon, icons } from "./primitives";
import { Logo } from "../ui/Logo";
import { useLanguage } from "@/i18n/LanguageProvider";

export type AppRole = "customer" | "builder" | "admin";

const navByRole: Record<AppRole, { label: string; icon: keyof typeof icons }[]> = {
  customer: [
    { label: "Overview", icon: "home" },
    { label: "My projects", icon: "folder" },
    { label: "Discover builders", icon: "search" },
    { label: "Proposals", icon: "compare" },
    { label: "Messages", icon: "inbox" },
    { label: "Settings", icon: "settings" },
  ],
  builder: [
    { label: "Overview", icon: "home" },
    { label: "Opportunities", icon: "briefcase" },
    { label: "My proposals", icon: "compare" },
    { label: "Profile", icon: "user" },
    { label: "Portfolio", icon: "grid" },
    { label: "Messages", icon: "inbox" },
  ],
  admin: [
    { label: "Overview", icon: "home" },
    { label: "Review queue", icon: "shield" },
    { label: "Categories", icon: "grid" },
    { label: "Reports", icon: "flag" },
    { label: "Users", icon: "user" },
    { label: "Settings", icon: "settings" },
  ],
};

/** Browser + application shell shared by every platform preview. */
export function AppFrame({
  role = "customer",
  active = "Overview",
  path = "app.gab/overview",
  children,
  user = { initials: "EB", name: "Example user" },
}: {
  role?: AppRole;
  active?: string;
  path?: string;
  children: React.ReactNode;
  user?: { initials: string; name: string };
}) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-paper/10 bg-[#111113] text-ink-900 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)]">
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-stone-200 bg-[#18181b] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-accent-500" />
          <span className="size-2.5 rounded-full bg-stone-300" />
          <span className="size-2.5 rounded-full bg-stone-300" />
        </div>
        <div className="mx-auto flex h-6 w-[340px] items-center justify-center rounded-[4px] bg-white/70 font-mono text-[11px] text-ink-500">{path}</div>
        <span className="rounded-[3px] border border-accent-500/40 bg-accent-500/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-700">
          Concept preview
        </span>
      </div>
      <div className="grid min-h-[600px] grid-cols-[208px_1fr]">
        {/* sidebar */}
        <aside className="flex flex-col border-r border-stone-200 bg-[#0b0b0c] px-3 py-4 text-ink-900">
          <div className="flex items-center gap-2 px-2">
            <Logo className="h-8" cutout="#0b0b0c" />
            <span className="ml-auto rounded-[3px] bg-stone-200 px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.1em] text-ink-600">{role}</span>
          </div>
          <nav className="mt-6 space-y-0.5">
            {navByRole[role].map((n) => (
              <span
                key={n.label}
                className={cn(
                  "flex items-center gap-2.5 rounded-[4px] px-2.5 py-2 text-[12.5px]",
                  n.label === active ? "bg-stone-100 text-ink-900" : "text-stone-400",
                )}
              >
                <MIcon d={icons[n.icon]} className={n.label === active ? "text-accent-300" : undefined} />
                {n.label}
              </span>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2.5 rounded-[4px] border border-stone-200 p-2.5">
            <MAvatar initials={user.initials} size={28} tone="copper" />
            <div className="min-w-0">
              <p className="truncate text-[12px] text-ink-900">{user.name}</p>
              <p className="text-[10.5px] text-stone-400">Demo account</p>
            </div>
          </div>
        </aside>
        <div className="min-w-0">
          <div className="flex h-12 items-center gap-3 border-b border-stone-200 bg-white px-5">
            <div className="flex h-8 w-64 items-center gap-2 rounded-[4px] border border-stone-200 px-2.5 text-[12px] text-stone-400">
              <MIcon d={icons.search} />
              Search projects, builders, skills
            </div>
            <span className="ml-auto text-stone-400">
              <MIcon d={icons.bell} />
            </span>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a fixed-width product screen and scales it to fit its container, so mockups keep
 * their proportions on tablet and mobile. Below `minScale` the text would be unreadable
 * (a 1120px screen on a 375px phone is ~0.3×), so instead it stays at `minScale` and the
 * frame becomes horizontally swipeable, with a short hint underneath.
 */
export function ScaledFrame({
  width = 1120,
  minScale = 0.55,
  children,
  className,
}: {
  width?: number;
  minScale?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const { t } = useLanguage();
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [pans, setPans] = useState(false);

  useEffect(() => {
    if (!outer.current || !inner.current) return;
    const update = () => {
      const fit = Math.min(1, outer.current!.clientWidth / width);
      const s = Math.max(fit, minScale);
      setScale(s);
      setPans(fit < minScale);
      setHeight(inner.current!.offsetHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer.current);
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, [width, minScale]);

  // `contain: inline-size` keeps the 1120px screen from widening the frame's own box: otherwise,
  // inside an auto-sized grid column, the frame would measure its content and never scale down.
  return (
    <div className={cn("w-full min-w-0", className)}>
      <div
        ref={outer}
        lang="en"
        dir="ltr"
        className={cn("relative w-full font-sans [contain:inline-size]", pans && "scrollbar-none overflow-x-auto overscroll-x-contain")}
        style={{ height }}
        tabIndex={pans ? 0 : undefined}
        role={pans ? "region" : undefined}
        aria-label={pans ? t.work.panLabel : undefined}
      >
        <div className="relative" style={{ width: width * scale, height }}>
          <div ref={inner} style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }} className="absolute left-0 top-0">
            {children}
          </div>
        </div>
      </div>
      {pans && (
        <p className="mt-3 flex items-center gap-2 font-mono text-[0.72rem] text-ink-500">
          <span aria-hidden className="text-accent-600">⇆</span>
          {t.work.pan}
        </p>
      )}
    </div>
  );
}
