"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ComponentProps, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "md" | "lg";

const base =
  "tracking-label group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-none font-mono font-semibold uppercase tracking-[0.16em] transition-[color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50";

// Primary uses fixed colours so it stays gold-with-light-text inside any section.
const variants: Record<Variant, string> = {
  primary: "bg-[#8a6a2a] text-[#f6efe0] hover:text-[#080807]",
  secondary: "border border-accent-500/45 bg-transparent text-accent-600 hover:border-accent-500 hover:text-[#080807]",
  ghost: "text-ink-600 hover:text-ink-900",
  dark: "border border-accent-500/60 bg-transparent text-accent-600 hover:text-[#080807]",
};

// The fill that sweeps in on hover
const fills: Record<Variant, string | null> = {
  primary: "bg-accent-500",
  secondary: "bg-accent-500",
  ghost: null,
  dark: "bg-accent-500",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.75rem]",
  lg: "h-14 px-8 text-[0.82rem]",
};

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="relative size-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

/** Label that rolls up and is replaced by a copy of itself on hover */
function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="roll relative">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

function Inner({ variant, arrow, children }: { variant: Variant; arrow?: boolean; children: ReactNode }) {
  const fill = fills[variant];
  return (
    <>
      {fill && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100 group-focus-visible:scale-y-100",
            fill,
          )}
        />
      )}
      <Roll>{children}</Roll>
      {arrow && <Arrow />}
    </>
  );
}

function useMagnet(strength = 0.12) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  return {
    style: { x, y },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (reduce || e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    onPointerLeave: () => {
      x.set(0);
      y.set(0);
    },
  };
}

const MotionLink = motion.create(Link);

type Common = { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode; className?: string };

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow,
  className,
  children,
  ...rest
}: Common &
  Omit<
    ComponentProps<typeof Link>,
    "className" | "children" | "style" | "onPointerMove" | "onPointerLeave" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
  >) {
  const magnet = useMagnet();
  return (
    <MotionLink href={href} className={cn(base, variants[variant], sizes[size], className)} {...magnet} {...rest}>
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </MotionLink>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow,
  className,
  children,
  type = "button",
  ...rest
}: Common &
  Omit<
    ComponentProps<"button">,
    "className" | "children" | "style" | "onPointerMove" | "onPointerLeave" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
  >) {
  const magnet = useMagnet();
  return (
    <motion.button type={type} className={cn(base, variants[variant], sizes[size], className)} {...magnet} {...rest}>
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </motion.button>
  );
}
