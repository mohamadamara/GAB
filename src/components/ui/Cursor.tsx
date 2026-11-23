"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Follower cursor: a small dot that trails the pointer and grows into a
 * soft coral circle over links and buttons. Mouse/trackpad only — touch
 * devices and reduced-motion users keep the normal system cursor.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<"default" | "hover" | "text" | "hidden">("hidden");
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    let last: { x: number; y: number } | null = null;
    const evaluate = (t: Element | null) => {
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      const interactive = t?.closest("a, button, [role=tab], summary, label, select");
      const field = t?.closest("input, textarea");
      if (labelled) {
        setLabel(labelled.dataset.cursor || null);
        setState("hover");
      } else if (field) {
        setLabel(null);
        setState("text");
      } else if (interactive) {
        setLabel(null);
        setState("hover");
      } else {
        setLabel(null);
        setState("default");
      }
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      evaluate(e.target as Element | null);
    };
    // Content moves under a still pointer while scrolling — re-check what's beneath it
    const scroll = () => last && evaluate(document.elementFromPoint(last.x, last.y));
    const leave = () => setState("hidden");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const size = label ? 88 : state === "hover" ? 56 : state === "text" ? 4 : 12;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[300]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        animate={{
          width: size,
          height: state === "text" ? 28 : size,
          opacity: state === "hidden" ? 0 : 1,
          backgroundColor: state === "hover" ? "rgba(240, 138, 108, 0.45)" : "rgba(251, 246, 236, 1)",
          borderRadius: state === "text" ? 2 : 999,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        // "difference" keeps the dot dark on light sections and light on dark ones
        style={{ mixBlendMode: state === "hover" ? "normal" : "difference" }}
      >
        {label && (
          <span className="text-[0.72rem] font-medium tracking-tight text-ink-900">{label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
