"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "../animations/Reveal";

/** Header block shared by the Services, Work and Contact sections. */
export function SectionIntro({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: React.ReactNode }) {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: easeOutExpo },
  });
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(240px,0.55fr)_1.45fr] lg:gap-12">
      <motion.p
        {...rise(0)}
        className="tracking-label pt-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent-600 sm:text-[0.8rem]"
      >
        {eyebrow}
      </motion.p>
      <div>
        <motion.h1 {...rise(0.06)} className="font-display text-[clamp(2.1rem,7.5vw,4.6rem)] leading-[1] text-ink-950">
          {title.replace(/\.$/, "")}
          <span className="text-accent-500">.</span>
        </motion.h1>
        <motion.p {...rise(0.14)} className="mt-6 max-w-2xl text-pretty text-[0.98rem] leading-[1.75] text-ink-700 sm:text-[1.05rem]">
          {lead}
        </motion.p>
        {children && <motion.div {...rise(0.2)}>{children}</motion.div>}
      </div>
    </div>
  );
}
