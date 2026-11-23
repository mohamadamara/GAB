"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { SWOOSH_PATH, TAGLINE_PATH, WORDMARK_PATH } from "./logoPaths";

/**
 * GAB logo — brushed-copper wordmark with the orbit swoosh that replaces the A's crossbar.
 * Fully vector (no font dependency) so it renders identically everywhere.
 */


export function Logo({
  className,
  tagline = false,
  cutout = "#080808",
  title = "GAB",
}: {
  className?: string;
  /** Show “GROW. AUTOMATE. BUILD.” under the wordmark */
  tagline?: boolean;
  /** Colour of the thin gap carved around the swoosh — match the surface behind the logo */
  cutout?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, "");
  const face = `cu-face-${id}`;
  const edge = `cu-edge-${id}`;
  const swoosh = `cu-swoosh-${id}`;
  const shade = `cu-shade-${id}`;

  return (
    <svg
      viewBox={tagline ? "0 -48 268 152" : "0 -48 268 124"}
      className={cn("block h-8 w-auto overflow-visible", className)}
      role="img"
      aria-label={tagline ? `${title} — Grow. Automate. Build.` : title}
    >
      <defs>
        {/* Brushed copper: warm highlight band across the upper third, deep brown base */}
        <linearGradient id={face} x1="0" y1="-2" x2="0" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f2c39d" />
          <stop offset="0.22" stopColor="#d9935f" />
          <stop offset="0.5" stopColor="#a8622f" />
          <stop offset="0.78" stopColor="#8a4d26" />
          <stop offset="1" stopColor="#5e321a" />
        </linearGradient>
        <linearGradient id={edge} x1="0" y1="0" x2="0" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffe2c8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#3d2010" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={swoosh} x1="12" y1="74" x2="262" y2="-44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7a4120" />
          <stop offset="0.45" stopColor="#c47a45" />
          <stop offset="0.8" stopColor="#f0c29b" />
          <stop offset="1" stopColor="#a3592b" />
        </linearGradient>
        <filter id={shade} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>

      <g filter={`url(#${shade})`}>
        {/* wordmark with a fine bevelled edge */}
        <path d={WORDMARK_PATH} fill={`url(#${face})`} stroke={`url(#${edge})`} strokeWidth="0.7" />
        {/* gap carved around the swoosh, then the swoosh itself */}
        <path d={SWOOSH_PATH} fill="none" stroke={cutout} strokeWidth="4.5" strokeLinejoin="round" />
        <path d={SWOOSH_PATH} fill={`url(#${swoosh})`} stroke="#f6d2b2" strokeOpacity="0.35" strokeWidth="0.5" />
      </g>

      {tagline && <path d={TAGLINE_PATH} transform="translate(4 98)" fill="#c9875a" />}
    </svg>
  );
}
