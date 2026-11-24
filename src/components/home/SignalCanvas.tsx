"use client";

import { useEffect, useRef } from "react";

/**
 * "The GAB signal": pixel squares drift in, gather into the GAB wordmark and
 * stay there, flickering gently. Moving the mouse over it pushes pixels away;
 * they spring back into place. Pauses while off-screen.
 */

const PALETTE = [
  { c: "#c6a052", w: 0.34 }, // coral
  { c: "#a84a32", w: 0.18 }, // deep coral
  { c: "#f3ece0", w: 0.22 }, // cream
  { c: "#8a8680", w: 0.12 }, // warm grey
  { c: "#3c3c40", w: 0.14 }, // dark grey
];

function pickColour() {
  let r = Math.random();
  for (const p of PALETTE) if ((r -= p.w) <= 0) return p.c;
  return PALETTE[0].c;
}

type P = { x: number; y: number; vx: number; vy: number; hx: number; hy: number; tx: number; ty: number; c: string; ph: number };

export function SignalCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cell = 8;
    let ps: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const sample = (count: number) => {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(w));
      off.height = Math.max(1, Math.floor(h));
      const o = off.getContext("2d")!;
      const size = Math.min(w / 2.5, h * 0.6);
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.font = `800 ${size}px ${getComputedStyle(document.body).fontFamily}`;
      o.fillText("GAB", w / 2, h / 2);
      const d = o.getImageData(0, 0, off.width, off.height).data;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < off.height; y += cell)
        for (let x = 0; x < off.width; x += cell) if (d[(y * off.width + x) * 4 + 3] > 128) pts.push({ x, y });
      for (let i = pts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      return pts.slice(0, count);
    };

    const setup = () => {
      const r = canvas.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 420 ? 6 : 8;
      const count = Math.round(Math.min(520, Math.max(160, (w * h) / 560)));
      const targets = sample(count);
      // A few extra loose pixels keep drifting around the wordmark, like the reference
      const loose = Math.round(targets.length * 0.12);
      for (let i = 0; i < loose; i++) targets.push({ x: -1, y: -1 });
      ps = targets.map((t) => {
        const hx = Math.random() * w;
        const hy = Math.random() * h;
        const free = t.x < 0;
        return {
          x: reduce ? (free ? hx : t.x) : hx,
          y: reduce ? (free ? hy : t.y) : hy,
          vx: 0,
          vy: 0,
          hx,
          hy,
          tx: free ? hx : t.x,
          ty: free ? hy : t.y,
          c: pickColour(),
          ph: Math.random() * Math.PI * 2,
        };
      });
    };
    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const start = performance.now();
    let raf = 0;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      // 0–0.8s scattered · 0.8–2.6s gather · then stays as the GAB wordmark
      const gather = reduce ? 1 : ease(Math.min(1, Math.max(0, (t - 0.8) / 1.8)));
      const R = Math.max(60, w * 0.12);

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const loose = p.tx === p.hx && p.ty === p.hy;
        // where this pixel wants to be right now
        let gx = p.hx + (p.tx - p.hx) * gather;
        let gy = p.hy + (p.ty - p.hy) * gather;
        if (loose) {
          gx += Math.sin(t * 0.5 + p.ph) * 14;
          gy += Math.cos(t * 0.4 + p.ph) * 14;
        } else {
          gx += Math.sin(t * 1.3 + p.ph) * 6 * (1 - gather);
          gy += Math.cos(t * 1.1 + p.ph) * 6 * (1 - gather);
        }
        if (reduce) {
          p.x = gx;
          p.y = gy;
        } else {
          // spring toward the goal
          p.vx += (gx - p.x) * 0.08;
          p.vy += (gy - p.y) * 0.08;
          // mouse pushes pixels away
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < R * R) {
            const dist = Math.sqrt(dist2) || 1;
            const f = (1 - dist / R) * 6;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
          }
          p.vx *= 0.78;
          p.vy *= 0.78;
          p.x += p.vx;
          p.y += p.vy;
        }

        const appear = reduce ? 1 : Math.min(1, Math.max(0, (t * 1.6 - (i / ps.length) * 1.2) * 3));
        const flicker = 0.7 + 0.3 * Math.sin(t * 3 + p.ph * 3);
        ctx.globalAlpha = appear * (loose ? 0.55 * flicker : gather > 0.98 ? 0.82 + 0.18 * flicker : flicker);
        ctx.fillStyle = p.c;
        ctx.fillRect(Math.round(p.x / 2) * 2, Math.round(p.y / 2) * 2, cell - 2, cell - 2);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
