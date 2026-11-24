"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { journey } from "@/data/journey";
import { SectionHeading, Accent } from "../ui/SectionHeading";
import { DemoBadge } from "../ui/DemoBadge";
import { ButtonLink } from "../ui/Button";
import { JourneyVisual } from "../sections/JourneyVisual";
import { easeOutExpo } from "../animations/Reveal";
import { cn } from "@/lib/cn";

const DURATION = 5200;

export function Journey() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const step = journey[active];

  useEffect(() => {
    if (!auto || !inView) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % journey.length), DURATION);
    return () => clearTimeout(id);
  }, [active, auto, inView]);

  const select = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  return (
    <section id="how-gab-works" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-accent-600/10 blur-[140px]" />
      <div className="container-gab relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            eyebrow="How GAB works"
            title={
              <>
                Five steps from idea <Accent>to the right builder.</Accent>
              </>
            }
          />
          <ButtonLink href="/how-it-works" variant="secondary" arrow className="self-start lg:self-auto">
            See the full walkthrough
          </ButtonLink>
        </div>

        <div ref={ref} className="mt-16">
          {/* Progress track */}
          <div role="tablist" aria-label="Marketplace journey steps" className="relative grid grid-cols-5">
            <div aria-hidden className="absolute left-[10%] right-[10%] top-[19px] h-px bg-white/10" />
            <motion.div
              aria-hidden
              className="absolute left-[10%] top-[19px] h-px bg-accent-400"
              animate={{ width: `${(active / (journey.length - 1)) * 80}%` }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            />
            {journey.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                id={`journey-tab-${s.key}`}
                aria-selected={active === i}
                aria-controls="journey-panel"
                onClick={() => select(i)}
                className="group relative flex flex-col items-center gap-3 text-center"
              >
                <span
                  className={cn(
                    "relative grid size-10 place-items-center rounded-full border font-mono text-xs transition-all duration-500",
                    i < active && "border-accent-500 bg-accent-500/20 text-accent-600",
                    i === active && "border-accent-400 bg-accent-500 text-[#080808] shadow-[0_0_0_6px_rgb(198_160_82/0.18)]",
                    i > active && "border-ink-900/15 bg-white text-ink-500 group-hover:border-ink-900/40",
                  )}
                >
                  {s.n}
                  {i === active && auto && inView && (
                    <svg className="absolute -inset-[5px] size-[50px] -rotate-90" viewBox="0 0 50 50" aria-hidden>
                      <motion.circle
                        key={active}
                        cx="25"
                        cy="25"
                        r="23"
                        fill="none"
                        stroke="#c6a052"
                        strokeWidth="1.2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: DURATION / 1000, ease: "linear" }}
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={cn(
                    "text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors sm:text-sm sm:normal-case sm:tracking-tight",
                    i === active ? "text-ink-900" : "text-ink-500",
                  )}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Panel */}
          <div
            id="journey-panel"
            role="tabpanel"
            aria-labelledby={`journey-tab-${step.key}`}
            className="metal-plate mt-12 grid gap-10 rounded-[var(--radius-panel)] p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              >
                <p className="font-mono text-xs tracking-[0.2em] text-accent-600">STEP {step.n}</p>
                <h3 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-ink-900 sm:text-5xl">{step.title}</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-600">{step.text}</p>
                <ul className="mt-8 space-y-3">
                  {step.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-ink-900">
                      <span aria-hidden className="h-px w-5 bg-accent-400" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex items-center gap-3">
                  <button
                    onClick={() => select((active - 1 + journey.length) % journey.length)}
                    className="grid size-11 place-items-center rounded border border-ink-900/15 text-ink-900 transition-colors hover:border-accent-400"
                    aria-label="Previous step"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => select((active + 1) % journey.length)}
                    className="grid size-11 place-items-center rounded border border-ink-900/15 text-ink-900 transition-colors hover:border-accent-400"
                    aria-label="Next step"
                  >
                    →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="relative">
              <div className="mb-4 flex justify-end">
                <DemoBadge>Concept illustration</DemoBadge>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={step.key} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                  <JourneyVisual step={step.key} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
