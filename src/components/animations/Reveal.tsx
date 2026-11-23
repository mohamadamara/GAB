"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/** Heading reveal: content slides up from behind a clipping mask */
export function MaskReveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  // Observe the (unclipped) wrapper — the inner text starts fully clipped, so it never "intersects" itself
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const show = immediate || inView;
  const from = reduce ? { opacity: 0 } : { y: "105%", rotate: 2 };
  const to = reduce ? { opacity: 1 } : { y: "0%", rotate: 0 };
  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.08em] ${className ?? ""}`}>
      <motion.span
        className="block origin-top-left"
        initial={from}
        animate={show ? to : from}
        transition={{ duration: 1.1, ease: easeOutExpo, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
