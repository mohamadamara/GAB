"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeading, Accent } from "../ui/SectionHeading";
import { DemoBadge } from "../ui/DemoBadge";
import { easeOutExpo } from "../animations/Reveal";
import { cn } from "@/lib/cn";

const phases = [
  { k: "say", label: "What you say", caption: "Start in plain language — no technical knowledge needed." },
  { k: "organise", label: "What gets organised", caption: "Your words become goals, features and a clearer scope." },
  { k: "find", label: "Who you can find", caption: "The scope points to the kinds of builders who fit." },
] as const;

export function Solution() {
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % phases.length), 4200);
    return () => clearInterval(id);
  }, [inView, paused]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-gab grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            index="02"
            eyebrow="The GAB solution"
            title={
              <>
                Start with a business problem. <Accent>Leave with a direction.</Accent>
              </>
            }
            lead="GAB is designed to organise the messy first steps. Describe what isn't working, and the platform helps shape it into a project that builders can understand — and that you can compare fairly."
          />
          <div role="tablist" aria-label="Solution phases" className="mt-10 grid gap-2">
            {phases.map((p, i) => (
              <button
                key={p.k}
                role="tab"
                aria-selected={phase === i}
                onClick={() => {
                  setPhase(i);
                  setPaused(true);
                }}
                className={cn(
                  "group flex items-start gap-5 border-l py-3.5 pl-5 text-left transition-colors",
                  phase === i ? "border-accent-400" : "border-ink-900/10 hover:border-ink-900/30",
                )}
              >
                <span className={cn("font-mono text-xs tracking-[0.18em]", phase === i ? "text-accent-600" : "text-ink-500")}>
                  0{i + 1}
                </span>
                <span>
                  <span className={cn("block font-medium tracking-tight", phase === i ? "text-ink-900" : "text-ink-600")}>{p.label}</span>
                  <span className="mt-1 block text-sm text-ink-500">{p.caption}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} className="metal-plate relative min-h-[420px] rounded-[var(--radius-panel)] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-500">Project intake · concept</span>
            <DemoBadge>Illustrative example</DemoBadge>
          </div>
          <div className="relative mt-8">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.div key="say" {...panel}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-600">Business owner</p>
                  <blockquote className="mt-4 font-serif text-[1.65rem] leading-snug text-ink-900 sm:text-3xl">
                    “Our clinic takes bookings by phone. We miss calls after six, patients forget appointments, and the
                    front desk spends hours on reschedules.”
                  </blockquote>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["missed calls", "no-shows", "manual rescheduling", "after-hours demand"].map((t) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="rounded-[3px] border border-accent-500/40 px-2.5 py-1 font-mono text-xs text-accent-600"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
              {phase === 1 && (
                <motion.div key="organise" {...panel} className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Goal", "Let patients book and reschedule online, 24/7"],
                    ["Users", "Patients · Front desk · Practitioners"],
                    ["Key features", "Booking page · Staff calendars · SMS reminders"],
                    ["Integrations", "Existing calendar · Payment for deposits"],
                    ["Platforms", "Web (mobile-friendly) + admin panel"],
                    ["Category", "Booking & appointment system"],
                  ].map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * i, duration: 0.6, ease: easeOutExpo }}
                      className="border-t border-ink-900/10 pt-3"
                    >
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-500">{k}</p>
                      <p className="mt-1.5 text-[0.95rem] text-ink-900">{v}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {phase === 2 && (
                <motion.div key="find" {...panel} className="grid gap-3">
                  {[
                    ["Independent developer", "Web apps · Booking flows · Calendar APIs"],
                    ["Small studio", "Design + development · Healthcare UX"],
                    ["Technical team", "Larger scope · Ongoing maintenance"],
                  ].map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.6, ease: easeOutExpo }}
                      className="flex items-center gap-4 rounded-[4px] border border-ink-900/10 bg-white/60 p-4"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-[4px] bg-accent-500/15 font-mono text-xs text-accent-600">
                        0{i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-medium text-ink-900">{k}</span>
                        <span className="block truncate text-sm text-ink-500">{v}</span>
                      </span>
                      <span className="ml-auto hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-600 sm:block">
                        Builder type
                      </span>
                    </motion.div>
                  ))}
                  <p className="mt-3 text-sm text-ink-500">
                    Builder types shown for illustration. No real profiles are represented.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute inset-x-6 bottom-6 flex gap-1.5 sm:inset-x-8">
            {phases.map((p, i) => (
              <span key={p.k} className="h-[2px] flex-1 overflow-hidden bg-white/10">
                {phase === i && (
                  <motion.span
                    key={`${phase}-${paused}`}
                    className="block h-full bg-accent-400"
                    initial={{ width: paused ? "100%" : 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: paused ? 0 : 4.2, ease: "linear" }}
                  />
                )}
                {phase > i && <span className="block h-full w-full bg-accent-500/50" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const panel = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};
