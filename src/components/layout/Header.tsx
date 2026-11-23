"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mainNav } from "@/data/nav";
import { cn } from "@/lib/cn";
import { Logo } from "../ui/Logo";
import { ButtonLink } from "../ui/Button";
import { easeOutExpo } from "../animations/Reveal";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-accent-500 focus:px-3 focus:py-2 focus:text-[#080808]"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-7",
          scrolled || open
            ? "border-white/15 bg-[#080808]/55 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.6)] backdrop-blur-xl backdrop-saturate-150"
            : "border-white/10 bg-[#080808]/30 backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <Link href="/" aria-label="GAB — home" className="relative z-10">
          <Logo className="h-9 sm:h-10" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex items-center gap-2 px-3 py-2 text-[0.92rem] font-medium tracking-tight transition-colors",
                      active ? "text-ink-900" : "text-ink-700 hover:text-ink-900",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="size-1.5 rounded-full bg-accent-500"
                        transition={{ duration: 0.5, ease: easeOutExpo }}
                      />
                    )}
                    <span className="roll">
                      <span>{item.label}</span>
                      <span aria-hidden>{item.label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" size="md" variant="dark" className="hidden md:inline-flex lg:hidden xl:inline-flex">
            Contact
          </ButtonLink>
          <ButtonLink href="/how-it-works" size="md" className="hidden md:inline-flex">
            Find Your Builder
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 grid size-12 place-items-center rounded-full lg:hidden"
          >
            <span className="relative block h-2.5 w-7">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[2px] w-7 rounded bg-ink-900 transition-transform duration-300",
                  open && "translate-y-[4px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[2px] w-7 rounded bg-ink-900 transition-transform duration-300",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 -z-10 h-[100dvh] overflow-y-auto bg-[#080808] pt-24 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-gab flex min-h-full flex-col pb-10 pt-6">
              <ul>
                {[...mainNav, { label: "Contact", href: "/contact", description: "Get in touch" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.5, ease: easeOutExpo }}
                  >
                    <Link href={item.href} className="flex items-baseline justify-between py-2.5">
                      <span className="text-[2.4rem] font-medium leading-tight tracking-[-0.045em] text-ink-900 sm:text-5xl">{item.label}</span>
                      <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-500 sm:inline">
                        {item.description}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-10">
                <ButtonLink href="/how-it-works" size="lg" arrow>
                  Find Your Builder
                </ButtonLink>
                <ButtonLink href="/builders" size="lg" variant="secondary">
                  Become a Builder
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
