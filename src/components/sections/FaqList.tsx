"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import type { Faq } from "@/i18n/pages/faq";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "../animations/Reveal";

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="border-t border-ink-900/10">
      {items.map((f, i) => {
        const isOpen = open === i;
        const btn = `${base}-q-${i}`;
        const panel = `${base}-a-${i}`;
        return (
          <div key={f.q} className="border-b border-ink-900/10">
            <h3>
              <button
                id={btn}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-4 py-6 text-start sm:gap-5 sm:py-7"
              >
                <span className="mt-1.5 font-mono text-xs text-accent-600">{String(i + 1).padStart(2, "0")}</span>
                <span className={cn("flex-1 text-lg font-medium leading-snug tracking-[-0.025em] transition-colors sm:text-2xl", isOpen ? "text-ink-900" : "text-ink-600 group-hover:text-ink-900")}>
                  {f.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative mt-2 grid size-7 shrink-0 place-items-center rounded-full border transition-colors",
                    isOpen ? "border-accent-400 bg-accent-500/15" : "border-ink-900/20",
                  )}
                >
                  <span className="absolute h-px w-3 bg-ink-900" />
                  <span className={cn("absolute h-3 w-px bg-ink-900 transition-transform duration-300", isOpen && "scale-y-0")} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 ps-9 sm:pe-12 sm:ps-12">
                    <p className="max-w-3xl text-base leading-relaxed text-ink-600 sm:text-lg">{f.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
