"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ScaledFrame } from "../mockups/AppFrame";
import {
  AdminScreen,
  BuilderDashboardScreen,
  BuilderProfileScreen,
  CustomerDashboardScreen,
  DiscoveryScreen,
  PortfolioScreen,
  ProjectCreateScreen,
  ProposalComparisonScreen,
  RequirementsScreen,
  SelectionScreen,
} from "../mockups/screens";
import { easeOutExpo } from "../animations/Reveal";

const screens = [
  { id: "customer-dashboard", group: "Customer", title: "Customer dashboard", desc: "One overview of every project, its stage, and the next decision waiting for you.", C: CustomerDashboardScreen },
  { id: "project-creation", group: "Customer", title: "Project creation", desc: "A guided form that starts with the problem in your own words — not a technical specification.", C: ProjectCreateScreen },
  { id: "requirements", group: "Customer", title: "Project requirements", desc: "Goals, users, integrations and prioritised features organised into a brief builders can act on.", C: RequirementsScreen },
  { id: "discovery", group: "Customer", title: "Builder discovery", desc: "Explore developers, studios and teams filtered by what your project actually needs.", C: DiscoveryScreen },
  { id: "builder-profile", group: "Customer", title: "Builder profile", desc: "Skills, technologies, services and availability presented in one consistent format.", C: () => <BuilderProfileScreen /> },
  { id: "portfolio", group: "Customer", title: "Portfolio showcase", desc: "Case studies that explain the challenge, what was built, and the builder's role.", C: PortfolioScreen },
  { id: "comparison", group: "Customer", title: "Proposal comparison", desc: "Different proposals aligned row by row: approach, timeline, phases, pricing model and scope.", C: ProposalComparisonScreen },
  { id: "selection", group: "Customer", title: "Project selection", desc: "A deliberate confirmation step that restates the agreed starting point.", C: SelectionScreen },
  { id: "builder-dashboard", group: "Builder", title: "Builder dashboard", desc: "Opportunities matched to a builder's skills, with a clear view of proposals in progress.", C: BuilderDashboardScreen },
  { id: "admin", group: "Admin", title: "Administration", desc: "Review queues, category taxonomy and moderation principles that keep the marketplace trustworthy.", C: AdminScreen },
];

export function PlatformExplorer() {
  const [active, setActive] = useState(0);
  const s = screens[active];
  const Screen = s.C;

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
      {/* Screen list */}
      <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <div role="tablist" aria-label="Platform screens" aria-orientation="vertical" className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
          {screens.map((sc, i) => {
            const showGroup = i === 0 || screens[i - 1].group !== sc.group;
            return (
              <div key={sc.id} className="contents lg:block">
                {showGroup && (
                  <p className="hidden pb-2 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-500 first:pt-0 lg:block">{sc.group}</p>
                )}
                <button
                  role="tab"
                  id={`tab-${sc.id}`}
                  aria-selected={active === i}
                  aria-controls="platform-panel"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex shrink-0 items-center gap-3 rounded-[4px] border px-3.5 py-2.5 text-left text-sm transition-colors lg:w-full lg:rounded-none lg:border-0 lg:border-l lg:py-3",
                    active === i
                      ? "border-accent-400 bg-accent-500/10 text-ink-900 lg:bg-transparent"
                      : "border-ink-900/10 text-ink-500 hover:text-ink-900 lg:border-ink-900/10",
                  )}
                >
                  <span className={cn("font-mono text-[0.68rem]", active === i ? "text-accent-600" : "text-ink-500")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="whitespace-nowrap">{sc.title}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview */}
      <div id="platform-panel" role="tabpanel" aria-labelledby={`tab-${s.id}`} className="min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent-600">
                  {String(active + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")} · {s.group}
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-ink-900 sm:text-3xl">{s.title}</h3>
                <p className="mt-2 max-w-xl text-ink-600">{s.desc}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActive((active - 1 + screens.length) % screens.length)}
                  className="grid size-10 place-items-center rounded border border-ink-900/15 text-ink-900 transition-colors hover:border-accent-400"
                  aria-label="Previous screen"
                >
                  ←
                </button>
                <button
                  onClick={() => setActive((active + 1) % screens.length)}
                  className="grid size-10 place-items-center rounded border border-ink-900/15 text-ink-900 transition-colors hover:border-accent-400"
                  aria-label="Next screen"
                >
                  →
                </button>
              </div>
            </div>
            <ScaledFrame width={1120}>
              <Screen />
            </ScaledFrame>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
