"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { easeOutExpo } from "../animations/Reveal";

type NodeKey = "people" | "data" | "work" | "customers";

/**
 * Connector geometry in a 0–100 box (the SVG is stretched with preserveAspectRatio="none",
 * strokes stay crisp via vector-effect). `from` sits on the node, `to` on the system card.
 */
type Geometry = Record<NodeKey, { from: [number, number]; to: [number, number] }>;
// Line ends sit a little inside the card; the card (drawn above) hides the overlap, so the
// connectors meet its edge whatever its exact rendered height.
const wide: Geometry = {
  people: { from: [12, 11], to: [30, 38] },
  data: { from: [88, 13], to: [70, 38] },
  work: { from: [14, 89], to: [30, 62] },
  customers: { from: [86, 87], to: [70, 62] },
};
const narrow: Geometry = {
  people: { from: [16, 9], to: [22, 30] },
  data: { from: [84, 9], to: [78, 30] },
  work: { from: [16, 91], to: [22, 70] },
  customers: { from: [84, 91], to: [78, 70] },
};
// Node placement per breakpoint (Tailwind needs literal class names).
const nodeBox: Record<NodeKey, string> = {
  people: "left-0 top-0",
  data: "right-0 top-0 sm:top-[2%]",
  work: "left-0 bottom-0 sm:left-[3%]",
  customers: "right-0 bottom-0 sm:bottom-[2%]",
};
const order: NodeKey[] = ["people", "data", "work", "customers"];
const COMMAND = "gab connect --all";

/** Types `text` one character at a time once `start` ms have passed. */
function useTyped(text: string, start: number, animate: boolean, speed = 42) {
  const [n, setN] = useState(animate ? 0 : text.length);
  useEffect(() => {
    if (!animate) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < text.length) timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, start);
    return () => clearTimeout(timer);
  }, [text, start, animate, speed]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

export function Blueprint({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [run, setRun] = useState(0);

  return (
    <figure
      className={cn(
        "relative flex flex-col border border-accent-500/35 bg-[linear-gradient(180deg,rgb(198_160_82/0.035),transparent_40%)] p-4 sm:p-6 lg:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="tracking-label font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-600 sm:text-[0.78rem]">
          {t.blueprint.label}
        </p>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          aria-label={t.blueprint.replay}
          title={t.blueprint.replay}
          className="grid size-10 shrink-0 place-items-center border border-accent-500/40 text-accent-600 transition-colors hover:border-accent-500 hover:bg-accent-500/10"
        >
          <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
            <path d="M12.5 1.5v3h-3" />
          </svg>
        </button>
      </div>

      {/* Remounting on replay restarts every animation from the beginning */}
      <Diagram key={run} />

      <figcaption className="sr-only">{t.blueprint.description}</figcaption>
      <div className="flex items-center justify-between gap-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] sm:text-[0.75rem]">
        <span className="tracking-label text-ink-700">{t.blueprint.footLeft}</span>
        <span className="tracking-label text-accent-600">{t.blueprint.footRight}</span>
      </div>
    </figure>
  );
}

function Diagram() {
  const { t, dir } = useLanguage();
  const reduce = !!useReducedMotion();
  const animate = !reduce;
  const cmd = useTyped(COMMAND, 1100, animate);
  const result = useTyped(t.blueprint.result, 1100 + COMMAND.length * 42 + 350, animate);
  const ready = result.done;

  const fade = (delay: number) =>
    animate
      ? { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: easeOutExpo } }
      : {};

  return (
    <div aria-hidden className="relative my-5 flex-1 sm:my-6">
      {/* dir=ltr: the diagram's geometry is fixed; text inside follows the page language */}
      <div dir="ltr" className="relative mx-auto aspect-[10/11] w-full max-w-[640px] sm:aspect-[5/4]">
        <div className="blueprint-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />

        <Connectors geometry={narrow} className="sm:hidden" animate={animate} ready={ready} />
        <Connectors geometry={wide} className="hidden sm:block" animate={animate} ready={ready} />

        {/* Nodes */}
        {order.map((k, i) => (
          <motion.div
            key={k}
            {...fade(0.15 + i * 0.12)}
            className={cn(
              "absolute z-10 flex items-center gap-2 border border-accent-500/45 bg-paper px-2.5 py-2 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink-900 sm:gap-2.5 sm:px-3.5 sm:py-2.5 sm:text-[0.72rem]",
              nodeBox[k],
            )}
          >
            <span className="size-1.5 bg-accent-500/70 sm:size-2" />
            <span className="text-accent-600">$</span>
            <span dir="auto" className="tracking-label">
              {t.blueprint.nodes[k]}
            </span>
          </motion.div>
        ))}

        {/* The system: vertically centred, height follows its content */}
        <div className="absolute inset-x-[6%] inset-y-0 z-10 flex items-center sm:inset-x-[21%]">
        <motion.div
          {...(animate
            ? {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8, delay: 0.45, ease: easeOutExpo },
              }
            : {})}
          dir={dir}
          className="flex w-full flex-col border border-accent-500/50 bg-[#0d0c0a] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]"
        >
          <div className="flex items-center justify-between border-b border-accent-500/30 bg-accent-500/[0.06] px-3 py-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] sm:px-4 sm:py-2.5 sm:text-[0.66rem]">
            <span className="tracking-label text-ink-800">{t.blueprint.system}</span>
            <span className={cn("flex items-center gap-1.5 transition-colors duration-500", ready ? "text-accent-600" : "text-ink-500")}>
              <span
                className={cn("size-1.5 rounded-full", ready ? "bg-accent-500 [animation:pulse-dot_1.8s_ease-in-out_infinite]" : "bg-ink-500")}
              />
              <span className="tracking-label">{t.blueprint.live}</span>
            </span>
          </div>

          <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4">
            <div className="font-mono">
              <p dir="ltr" className="text-start text-[0.62rem] text-ink-500 sm:text-[0.7rem]">
                <span className="text-accent-600">$</span> {cmd.shown}
                {!cmd.done && animate && <span className="caret" />}
              </p>
              <p className="mt-1.5 text-[0.82rem] font-semibold leading-snug text-ink-950 sm:text-[0.95rem] lg:text-[1.05rem]">
                <span className="text-accent-600">{dir === "rtl" ? "←" : "→"}</span> {result.shown}
                {cmd.done && <span className="caret" />}
              </p>
              <motion.p {...fade(animate ? 2.6 : 0)} className="mt-1 text-[0.6rem] text-ink-600 sm:text-[0.68rem]">
                {t.blueprint.sub}
              </motion.p>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {t.blueprint.tiles.map((label, i) => (
                <motion.div key={label} {...fade(1.4 + i * 0.12)} className="min-w-0 border border-ink-900/15 px-1.5 py-1.5 sm:px-2 sm:py-2">
                  <p className="tracking-label truncate font-mono text-[0.5rem] uppercase tracking-[0.06em] text-ink-600 sm:text-[0.56rem]">{label}</p>
                  <p className="mt-0.5 font-mono text-[0.85rem] font-semibold text-accent-600 sm:mt-1 sm:text-base">0{i + 1}</p>
                </motion.div>
              ))}
            </div>

            <div className="hidden space-y-1.5 sm:block">
              {[72, 90, 58].map((w, i) => (
                <div key={i} className="h-[3px] bg-ink-900/10">
                  <motion.div
                    className="h-full origin-left bg-accent-400/80 rtl:origin-right"
                    style={{ width: `${w}%` }}
                    {...(animate
                      ? {
                          initial: { scaleX: 0 },
                          animate: { scaleX: 1 },
                          transition: { duration: 1.4, delay: 1.7 + i * 0.15, ease: easeOutExpo },
                        }
                      : {})}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}

function Connectors({
  geometry,
  className,
  animate,
  ready,
}: {
  geometry: Geometry;
  className?: string;
  animate: boolean;
  ready: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={cn("absolute inset-0 size-full", className)}>
      {order.map((k, i) => {
        const { from, to } = geometry[k];
        const d = `M${from[0]} ${from[1]} L${to[0]} ${to[1]}`;
        return (
          <g key={k}>
            <motion.path
              d={d}
              fill="none"
              stroke="#c6a052"
              strokeOpacity="0.7"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              {...(animate
                ? { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.9, delay: 0.5 + i * 0.12, ease: easeOutExpo } }
                : {})}
            />
            {/* Data pulse: a short bright dash travelling into the system once it is live */}
            {animate && ready && (
              <motion.path
                d={d}
                fill="none"
                stroke="#f3e2b8"
                strokeWidth="2.2"
                strokeLinecap="square"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0.18, pathOffset: 0, opacity: 0 }}
                animate={{ pathOffset: [0, 0.82], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: i * 0.45, repeat: Infinity, repeatDelay: 1.3, ease: "easeInOut" }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
