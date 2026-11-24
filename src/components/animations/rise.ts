import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * CSS entrance animation (see `.rise` in globals.css). Unlike Framer's `initial={{ opacity: 0 }}`,
 * the element is server-rendered visible-by-default content, so above-the-fold text never waits
 * for JavaScript on a slow phone. Reduced-motion users get it instantly via the global rule.
 */
export function rise(delaySeconds: number, className?: string) {
  return {
    className: cn("rise", className),
    style: { "--rise-delay": `${Math.round(delaySeconds * 1000)}ms` } as CSSProperties,
  };
}
