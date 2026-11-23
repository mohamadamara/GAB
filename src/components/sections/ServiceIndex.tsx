"use client";

import { useEffect, useState } from "react";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

/** Sticky category index that tracks the section in view. */
export function ServiceIndex() {
  const [active, setActive] = useState(services[0].slug);

  useEffect(() => {
    const els = services.map((s) => document.getElementById(s.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Keep the active chip visible by scrolling the strip horizontally only.
    const el = document.getElementById(`idx-${active}`);
    const strip = el?.closest("ul");
    if (!el || !strip) return;
    const target = el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Service categories" className="sticky top-[72px] z-30 border-y border-ink-900/[0.07] bg-white/90 backdrop-blur-xl">
      <ul className="container-gab scrollbar-none relative flex gap-1 overflow-x-auto py-3">
        {services.map((s) => (
          <li key={s.slug}>
            <a
              id={`idx-${s.slug}`}
              href={`#${s.slug}`}
              aria-current={active === s.slug ? "true" : undefined}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-[3px] px-3 py-1.5 text-sm transition-colors",
                active === s.slug ? "bg-accent-500/15 text-accent-600" : "text-ink-500 hover:text-ink-900",
              )}
            >
              <span className="font-mono text-[0.62rem] tracking-[0.14em]">{s.code}</span>
              {s.name.replace(" Systems", "").replace(" Applications", "").replace(" & Web", "")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
