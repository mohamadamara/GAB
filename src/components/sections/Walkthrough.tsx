"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { demoBuilders, demoProject, demoProposals } from "@/data/demo";
import { cn } from "@/lib/cn";
import { DemoBadge } from "../ui/DemoBadge";
import { easeOutExpo } from "../animations/Reveal";

/**
 * Interactive product walkthrough: a simulated booking-system project
 * moving through the five GAB steps. All data is fictional.
 */

const steps = [
  { n: "01", title: "Explain the problem", short: "Describe", caption: "The business owner describes the situation in everyday language." },
  { n: "02", title: "Structure the requirements", short: "Define", caption: "The description is organised into goals, users and prioritised features." },
  { n: "03", title: "Discover relevant builders", short: "Discover", caption: "Builders whose skills fit the scope are surfaced for exploration." },
  { n: "04", title: "Compare profiles & proposals", short: "Compare", caption: "Proposals are laid side by side on the same criteria." },
  { n: "05", title: "Choose a builder", short: "Choose", caption: "The owner selects the best fit with a shared, documented starting point." },
];

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.06 * i, duration: 0.55, ease: easeOutExpo },
});

function Typewriter({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p className="text-[15px] leading-relaxed text-ink-800">
      {words.map((w, i) => (
        <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.02 * i, duration: 0.2 }}>
          {w}{" "}
        </motion.span>
      ))}
    </p>
  );
}

function StepDescribe() {
  return (
    <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
      <motion.div {...fade()} className="rounded-[6px] border border-stone-200 bg-white p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-500">What problem are you trying to solve?</p>
        <div className="mt-3">
          <Typewriter text={demoProject.description} />
        </div>
      </motion.div>
      <div className="space-y-3">
        <motion.div {...fade(2)} className="rounded-[6px] border border-stone-200 bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-500">Key signals detected</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Phone-only booking", "Missed after-hours calls", "No-shows", "Manual rescheduling", "3 practitioners"].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.12 }}
                className="rounded-[3px] bg-accent-500/12 px-2 py-1 text-[12px] font-medium text-accent-700"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
        <motion.div {...fade(3)} className="rounded-[6px] bg-white p-4 text-ink-900">
          <p className="text-[11px] uppercase tracking-[0.1em] text-ink-500">No technical knowledge required</p>
          <p className="mt-2 text-[13px] text-ink-600">The owner never had to mention frameworks, databases or hosting.</p>
        </motion.div>
      </div>
    </div>
  );
}

function StepDefine() {
  const groups = [
    { k: "Must have", items: demoProject.must, cls: "bg-white text-ink-900" },
    { k: "Should have", items: demoProject.should, cls: "bg-accent-500/12 text-accent-700" },
    { k: "Could have", items: demoProject.could, cls: "bg-stone-100 text-ink-600" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1.5fr]">
      <motion.div {...fade()} className="space-y-4 rounded-[6px] border border-stone-200 bg-white p-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-500">Goals</p>
          <ul className="mt-2 space-y-1.5 text-[13.5px] text-ink-800">
            {demoProject.goals.map((g) => (
              <li key={g}>— {g}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-500">Users</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {demoProject.users.map((u) => (
              <span key={u} className="rounded-[3px] bg-stone-100 px-2 py-1 text-[12px] text-ink-700">
                {u}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-500">Category</p>
          <p className="mt-1 text-[13.5px] font-medium text-ink-900">{demoProject.category}</p>
        </div>
      </motion.div>
      <div className="grid gap-3 sm:grid-cols-3">
        {groups.map((g, gi) => (
          <motion.div key={g.k} {...fade(gi + 1)} className="rounded-[6px] border border-stone-200 bg-white p-4">
            <span className={cn("inline-block rounded-[3px] px-2 py-0.5 text-[11px] font-semibold", g.cls)}>{g.k}</span>
            <ul className="mt-3 space-y-2">
              {g.items.map((it, ii) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + gi * 0.15 + ii * 0.06 }}
                  className="rounded-[4px] border border-stone-100 bg-[#141416] px-3 py-2 text-[12.5px] text-ink-800"
                >
                  {it}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StepDiscover() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {demoBuilders.map((b, i) => (
        <motion.div key={b.id} {...fade(i)} className="rounded-[6px] border border-stone-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-[13px] font-semibold text-accent-600">{b.initials}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-ink-900">{b.name}</p>
              <p className="text-[12px] text-ink-500">
                {b.kind} · {b.teamSize}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-semibold text-accent-600">{b.relevance}%</p>
              <p className="text-[10px] uppercase tracking-[0.08em] text-ink-500">relevance</p>
            </div>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-stone-100">
            <motion.div
              className="h-full rounded-full bg-accent-500"
              initial={{ width: 0 }}
              animate={{ width: `${b.relevance}%` }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: easeOutExpo }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {b.skills.slice(0, 3).map((s) => (
              <span key={s} className="rounded-[3px] bg-stone-100 px-2 py-0.5 text-[11.5px] text-ink-600">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StepCompare() {
  const props = demoProposals.map((p) => ({ ...p, b: demoBuilders.find((b) => b.id === p.builder)! }));
  return (
    <motion.div {...fade()} className="overflow-x-auto rounded-[6px] border border-stone-200 bg-white">
      <table className="w-full min-w-[620px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-stone-100">
            <th className="w-[130px] bg-[#141416] p-3 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">Criteria</th>
            {props.map((p, i) => (
              <th key={p.builder} className={cn("p-3", i === 0 && "bg-accent-500/[0.07]")}>
                <span className="block font-semibold text-ink-900">{p.b.name}</span>
                <span className="block text-[11.5px] font-normal text-ink-500">{p.b.kind}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(
            [
              ["Approach", (p: (typeof props)[number]) => p.approach],
              ["Timeline", (p: (typeof props)[number]) => p.timeline],
              ["Phases", (p: (typeof props)[number]) => String(p.phases)],
              ["Pricing model", (p: (typeof props)[number]) => p.estimate],
              ["Relevant portfolio", (p: (typeof props)[number]) => `${p.b.portfolio.length} case studies`],
            ] as const
          ).map(([label, get], r) => (
            <motion.tr key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + r * 0.07 }} className="border-b border-stone-100 last:border-0">
              <td className="bg-[#141416] p-3 text-[12px] font-medium text-ink-600">{label}</td>
              {props.map((p, i) => (
                <td key={p.builder} className={cn("p-3 align-top leading-relaxed text-ink-800", i === 0 && "bg-accent-500/[0.07]")}>
                  {get(p)}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function StepChoose() {
  const b = demoBuilders[0];
  return (
    <div className="mx-auto max-w-xl">
      <motion.div {...fade()} className="rounded-[6px] border border-accent-500/40 bg-white p-6">
        <div className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-full bg-accent-500 text-[15px] font-semibold text-[#080808]">{b.initials}</span>
          <div>
            <p className="text-[15px] font-semibold text-ink-900">{b.name}</p>
            <p className="text-[12.5px] text-ink-500">Selected for “{demoProject.name}”</p>
          </div>
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 16 }}
            className="ml-auto grid size-9 place-items-center rounded-full bg-white text-accent-600"
          >
            ✓
          </motion.span>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-stone-100 pt-5">
          {[
            ["Timeline", "10 weeks"],
            ["Phases", "3"],
            ["First milestone", "Discovery"],
          ].map(([k, v], i) => (
            <motion.div key={k} {...fade(i + 2)}>
              <p className="text-[10.5px] uppercase tracking-[0.1em] text-ink-500">{k}</p>
              <p className="mt-1 text-[14px] font-medium text-ink-900">{v}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.p {...fade(5)} className="mt-5 text-center text-[13px] text-ink-600">
        From a phone-booking problem to a chosen builder — with a clear, shared scope.
      </motion.p>
    </div>
  );
}

const panels = [StepDescribe, StepDefine, StepDiscover, StepCompare, StepChoose];

export function Walkthrough() {
  const [step, setStep] = useState(0);
  const Panel = panels[step];

  return (
    <div className="overflow-hidden rounded-[8px] border border-ink-900/10 bg-white shadow-[0_60px_120px_-50px_rgb(0_0_0/0.6)]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-ink-900/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-500">Simulated project</p>
          <p className="mt-1 text-lg font-medium tracking-tight text-ink-900">{demoProject.name}</p>
        </div>
        <DemoBadge>Demonstration · fictional data</DemoBadge>
      </div>

      {/* Steps */}
      <div role="tablist" aria-label="Walkthrough steps" className="scrollbar-none grid grid-cols-5 border-b border-ink-900/10">
        {steps.map((s, i) => (
          <button
            key={s.n}
            role="tab"
            aria-selected={step === i}
            aria-controls="walkthrough-panel"
            onClick={() => setStep(i)}
            className={cn(
              "relative px-2 py-4 text-center transition-colors sm:px-4 sm:text-left",
              step === i ? "bg-mist text-ink-900" : "text-ink-500 hover:text-ink-900",
            )}
          >
            <span className={cn("block font-mono text-[0.65rem]", step >= i ? "text-accent-600" : "text-ink-500")}>{s.n}</span>
            <span className="mt-1 block text-[0.75rem] font-medium sm:hidden">{s.short}</span>
            <span className="mt-1 hidden text-sm font-medium lg:block">{s.title}</span>
            <span className="mt-1 hidden text-sm font-medium sm:block lg:hidden">{s.short}</span>
            {step === i && <motion.span layoutId="wt-bar" className="absolute inset-x-0 bottom-0 h-[2px] bg-accent-400" />}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div id="walkthrough-panel" role="tabpanel" className="bg-[#0e0e10] p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
            <p className="mb-5 text-[13px] text-ink-600">
              <span className="font-semibold text-ink-900">{steps[step].title}.</span> {steps[step].caption}
            </p>
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between gap-4 border-t border-ink-900/10 p-4 sm:p-5">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="h-10 rounded border border-ink-900/15 px-4 text-sm text-ink-900 transition-colors hover:border-accent-400 disabled:opacity-30"
        >
          ← Back
        </button>
        <div className="flex gap-1.5" aria-hidden>
          {steps.map((s, i) => (
            <span key={s.n} className={cn("h-1 rounded-full transition-all duration-500", i === step ? "w-6 bg-accent-400" : "w-1.5 bg-white/20")} />
          ))}
        </div>
        {step < steps.length - 1 ? (
          <button onClick={() => setStep((s) => s + 1)} className="h-10 rounded bg-accent-500 px-4 text-sm font-medium text-[#080808] transition-colors hover:bg-accent-400">
            Next step →
          </button>
        ) : (
          <button onClick={() => setStep(0)} className="h-10 rounded border border-accent-400 px-4 text-sm text-accent-600 transition-colors hover:bg-accent-500/10">
            Restart ↺
          </button>
        )}
      </div>
    </div>
  );
}
