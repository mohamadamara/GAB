"use client";

import { motion } from "framer-motion";
import type { JourneyKey } from "@/data/journey";
import { easeOutExpo } from "../animations/Reveal";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.08 * i, duration: 0.6, ease: easeOutExpo },
});

/** Compact, generic visuals for each of the five marketplace steps. */
export function JourneyVisual({ step }: { step: JourneyKey }) {
  switch (step) {
    case "describe":
      return (
        <div className="space-y-3">
          <motion.div {...fade(0)} className="rounded-[4px] border border-ink-900/10 bg-white p-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-500">Describe your idea</p>
            <p className="mt-3 text-ink-900">
              We need a simple way for customers to order our products online and for us to track deliveries
              <motion.span
                aria-hidden
                className="ml-0.5 inline-block h-5 w-px translate-y-1 bg-accent-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </p>
          </motion.div>
          <motion.div {...fade(1)} className="flex flex-wrap gap-2">
            {["+ Attach a sketch", "+ Link an example site", "+ Add a deadline"].map((t) => (
              <span key={t} className="rounded-[3px] border border-dashed border-ink-900/20 px-3 py-1.5 text-sm text-ink-600">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      );
    case "define":
      return (
        <div className="grid gap-2">
          {[
            ["Must have", "Product catalogue · Checkout · Order tracking", 100],
            ["Should have", "Delivery notifications · Customer accounts", 66],
            ["Could have", "Loyalty points · Reviews", 33],
          ].map(([k, v, w], i) => (
            <motion.div key={k as string} {...fade(i)} className="rounded-[4px] border border-ink-900/10 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent-600">{k as string}</span>
                <span className="h-1 w-20 overflow-hidden rounded bg-white/10">
                  <motion.span
                    className="block h-full bg-accent-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${w}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: easeOutExpo }}
                  />
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-900">{v as string}</p>
            </motion.div>
          ))}
        </div>
      );
    case "discover":
      return (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => {
            const match = [1, 4, 6].includes(i);
            return (
              <motion.div
                key={i}
                {...fade(i * 0.5)}
                className={
                  "aspect-square rounded-[4px] border p-3 transition-colors " +
                  (match ? "border-accent-500/60 bg-accent-500/10" : "border-ink-900/10 bg-white opacity-50")
                }
              >
                <span className={"block size-6 rounded-full " + (match ? "bg-accent-400" : "bg-stone-200")} />
                <span className="mt-3 block h-1.5 w-3/4 rounded bg-white/20" />
                <span className="mt-1.5 block h-1.5 w-1/2 rounded bg-white/10" />
                {match && <span className="mt-2 block font-mono text-[0.55rem] uppercase tracking-[0.14em] text-accent-600">Relevant</span>}
              </motion.div>
            );
          })}
        </div>
      );
    case "compare":
      return (
        <div className="overflow-hidden rounded-[4px] border border-ink-900/10">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-white text-sm">
            {["", "Builder A", "Builder B"].map((h, i) => (
              <div key={i} className="border-b border-ink-900/10 px-3 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-500">
                {h}
              </div>
            ))}
            {[
              ["Relevant work", "3 projects", "1 project"],
              ["Stack", "React · Node", "Flutter"],
              ["Approach", "Phased", "Single release"],
              ["Est. timeline", "10 weeks", "8 weeks"],
            ].map((row, r) =>
              row.map((c, i) => (
                <motion.div
                  key={`${r}-${i}`}
                  {...fade(r)}
                  className={
                    "border-b border-ink-900/[0.06] px-3 py-2.5 " +
                    (i === 0 ? "text-ink-500" : i === 1 ? "text-ink-900" : "text-ink-600")
                  }
                >
                  {c}
                </motion.div>
              )),
            )}
          </div>
          <p className="bg-white px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent-600/80">Example values only</p>
        </div>
      );
    case "choose":
      return (
        <motion.div {...fade(0)} className="rounded-[4px] border border-accent-500/50 bg-white p-5">
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-full bg-accent-500 font-medium text-[#080808]">A</span>
            <div>
              <p className="font-medium text-ink-900">Builder A selected</p>
              <p className="text-sm text-ink-500">Example studio · Web & mobile</p>
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 18 }}
              className="ml-auto grid size-8 place-items-center rounded-full bg-accent-400 text-white"
            >
              ✓
            </motion.span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink-900/10 pt-4 text-center">
            {[
              ["Scope", "Agreed"],
              ["Milestones", "Defined"],
              ["Next step", "Kick-off"],
            ].map(([k, v], i) => (
              <motion.div key={k} {...fade(i + 2)}>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-500">{k}</p>
                <p className="mt-1 text-sm text-ink-900">{v}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
  }
}
