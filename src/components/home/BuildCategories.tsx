"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { services } from "@/data/services";
import { SectionHeading, Accent } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { ServiceVisual } from "../sections/ServiceVisual";
import { Stagger, StaggerItem } from "../animations/Reveal";

export function BuildCategories() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });

  return (
    <section className="relative py-24 sm:py-36">
      <div className="container-gab">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            eyebrow="What can you build?"
            title={
              <>
                Every kind of software. <Accent>One marketplace.</Accent>
              </>
            }
            lead="From a first website to an operational system that runs your business — GAB is being designed to cover the full range of digital products."
          />
          <ButtonLink href="/services" variant="secondary" arrow className="self-start lg:self-auto">
            Explore all services
          </ButtonLink>
        </div>

        <div
          ref={listRef}
          className="relative mt-16"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse" || !listRef.current) return;
            const r = listRef.current.getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setActive(null)}
        >
          <Stagger className="border-t border-ink-900/10">
            {services.map((s, i) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  data-cursor="View"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-ink-900/10 py-6 sm:grid-cols-[4rem_1fr_1fr_auto] sm:py-8"
                >
                  <span className="text-[0.8rem] font-medium tracking-[0.1em] text-ink-500">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[1.6rem] font-medium leading-[1.05] tracking-[-0.04em] text-ink-900 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 sm:text-4xl lg:text-5xl">
                    {s.name}
                  </h3>
                  <p className="hidden max-w-sm text-[0.95rem] leading-relaxed text-ink-600 sm:block">{s.short}</p>
                  <span
                    aria-hidden
                    className="grid size-11 place-items-center rounded-full border border-ink-900/15 text-ink-900 transition-[background-color,border-color,transform] duration-500 group-hover:-rotate-45 group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-[#080808] sm:size-14"
                  >
                    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M2 8h11M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Floating preview that follows the pointer (mouse only) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
            style={{ x: sx, y: sy }}
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="-translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-[320px] overflow-hidden rounded-[18px] border border-white/10 bg-stone-100 p-6 shadow-[0_30px_60px_-25px_rgb(0_0_0/0.7)]">
                    <ServiceVisual kind={services[active].visual} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
