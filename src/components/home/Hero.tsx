"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "../ui/Button";
import { easeOutExpo } from "../animations/Reveal";
import { SignalCanvas } from "./SignalCanvas";

const HeroScene = dynamic(() => import("../three/HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center px-[8%]" aria-hidden>
      <div className="rule-accent w-full opacity-60" />
    </div>
  );
}

const stages = [
  { n: "01", label: "Business idea", sub: "A problem worth solving" },
  { n: "02", label: "GAB marketplace", sub: "Organised & matched" },
  { n: "03", label: "Software builders", sub: "Developers, studios, teams" },
  { n: "04", label: "Digital product", sub: "Working software" },
];


export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const cardScale = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0.96]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setCompact(mq.matches);
    set();
    mq.addEventListener("change", set);
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <section ref={ref} className="relative isolate pt-24 sm:pt-28">
      {/* "The GAB signal" — split hero */}
      <div className="container-gab flex min-h-[calc(100svh-6rem)] flex-col font-mono sm:min-h-[calc(100svh-7rem)]">
        <h1 className="sr-only">GAB — Your Idea. The Right Builders. One Place.</h1>
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: easeOutExpo }}
          className="h-px origin-left bg-ink-900/25"
        />

        <div className="grid flex-1 grid-rows-[auto_minmax(300px,1fr)_auto] gap-6 py-7 sm:grid-cols-2 sm:grid-rows-1 sm:gap-0 sm:py-8">
          <div className="flex flex-col sm:pr-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-ink-900 sm:text-[0.85rem]"
            >
              Digital products / built with purpose
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.9 }}
              className="mt-auto hidden max-w-md sm:block"
            >
              <p className="text-[0.85rem] uppercase leading-relaxed tracking-[0.04em] text-ink-600">
                Your idea. The right builders. One place. GAB connects businesses with the developers, studios and teams
                who can turn ideas into working software.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 font-sans">
                <ButtonLink href="/how-it-works" arrow>
                  Find Your Builder
                </ButtonLink>
                <ButtonLink href="#how-gab-works" variant="secondary">
                  How it works
                </ButtonLink>
              </div>
            </motion.div>
          </div>

          <div className="relative flex min-h-0 flex-col sm:pl-10">
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.15 }}
              className="absolute inset-y-0 left-0 hidden w-px origin-top bg-ink-900/20 sm:block"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-accent-500 sm:text-[0.9rem]"
            >
              The GAB signal / 001
            </motion.p>
            <SignalCanvas className="mt-4 block min-h-[260px] w-full flex-1" />
          </div>

          {/* phone: text + buttons under the signal */}
          <div className="sm:hidden">
            <p className="text-[0.8rem] uppercase leading-relaxed tracking-[0.04em] text-ink-600">
              Your idea. The right builders. One place. GAB connects businesses with the people who can build their
              software.
            </p>
            <div className="mt-6 grid gap-3 font-sans">
              <ButtonLink href="/how-it-works" size="lg" arrow>
                Find Your Builder
              </ButtonLink>
              <ButtonLink href="#how-gab-works" size="lg" variant="secondary">
                How it works
              </ButtonLink>
            </div>
          </div>
        </div>

        <div aria-hidden className="h-px bg-ink-900/25" />
        <div className="flex items-center justify-between gap-4 py-4 text-[0.68rem] uppercase tracking-[0.08em] text-ink-500 sm:text-[0.72rem]">
          <p className="min-w-0 truncate">GAB studio / building the next thing</p>
          <p aria-hidden className="shrink-0">Scroll ↓</p>
        </div>
      </div>

      {/* Showcase card: the business model, visualised */}
      <div className="container-gab mt-10 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: easeOutExpo, delay: 0.5 }}
          style={{ scale: cardScale }}
          className="relative overflow-hidden rounded-[var(--radius-panel)] border border-white/10 bg-[radial-gradient(ellipse_at_70%_40%,#1f1f22,#0c0c0d_65%)]"
        >
          <motion.div style={{ y: sceneY }} className="relative h-[260px] sm:h-[380px] lg:h-[460px]">
            {webgl ? <HeroScene compact={compact} /> : <SceneFallback />}
          </motion.div>

          <div className="pointer-events-none absolute left-6 top-6 max-w-md sm:left-12 sm:top-12">
            <p className="text-[2rem] font-medium leading-[1] tracking-[-0.045em] text-ink-900 sm:text-5xl lg:text-6xl">
              Idea in.
              <br />
              <span className="text-accent-metal-light">Software out.</span>
            </p>
          </div>

          <ol className="relative grid grid-cols-2 gap-x-4 gap-y-6 px-6 pb-8 sm:grid-cols-4 sm:gap-6 sm:px-12 sm:pb-12">
            {stages.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 1 + i * 0.12 }}
                className="border-t border-ink-900/20 pt-4"
              >
                <span className="block text-[0.72rem] font-medium tracking-[0.14em] text-accent-600">{s.n}</span>
                <span className="mt-1.5 block text-[0.95rem] font-medium leading-tight tracking-tight text-ink-900 sm:text-base">
                  {s.label}
                </span>
                <span className="mt-1 hidden text-sm text-ink-500 sm:block">{s.sub}</span>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
