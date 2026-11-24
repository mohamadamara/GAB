"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Logo } from "../ui/Logo";
import { easeOutExpo } from "../animations/Reveal";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const primary = [
    { label: t.nav.services, href: "/services" },
    { label: t.nav.work, href: "/work" },
  ];
  const secondary = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.howItWorks, href: "/how-it-works" },
    { label: t.nav.builders, href: "/builders" },
    { label: t.nav.faq, href: "/faq" },
  ];
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    // The blur lives on the inner bar: backdrop-filter would otherwise become the containing
    // block for the fixed mobile panel below and clip it to the bar's height.
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:bg-accent-500 focus:px-3 focus:py-2 focus:font-mono focus:text-[#080807]"
      >
        {t.skip}
      </a>
      <div className="border-b border-accent-500/15 bg-paper/85 backdrop-blur-md">
      <div className="container-wide flex h-[72px] items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label={t.homeLabel} className="flex min-w-0 items-center gap-4">
          <Logo className="h-7 sm:h-8" />
          <span aria-hidden className="hidden h-8 w-px bg-ink-900/20 sm:block" />
          <span
            aria-hidden
            dir="auto"
            className="tracking-label hidden font-mono text-[0.6rem] font-medium uppercase leading-[1.55] tracking-[0.26em] text-ink-700 sm:block"
          >
            {t.slogan[0]}
            <br />
            {t.slogan[1]}
          </span>
        </Link>

        <nav aria-label={t.nav.main} className="hidden md:block">
          <ul className="flex items-center gap-10">
            {primary.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "tracking-label relative py-2 font-mono text-[0.8rem] font-medium uppercase tracking-[0.2em] transition-colors",
                      active ? "text-accent-600" : "text-ink-800 hover:text-accent-600",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-accent-500"
                        transition={{ duration: 0.45, ease: easeOutExpo }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <LanguageSwitch />
          <Link
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            className={cn(
              "tracking-label hidden h-11 items-center border px-5 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.2em] transition-colors md:inline-flex",
              isActive("/contact")
                ? "border-accent-500 bg-accent-500 text-[#080807]"
                : "border-accent-500/60 text-accent-600 hover:bg-accent-500 hover:text-[#080807]",
            )}
          >
            {t.nav.contact}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            className="grid size-11 place-items-center border border-ink-900/15 md:hidden"
          >
            <span className="relative block h-2.5 w-5">
              <span
                className={cn(
                  "absolute start-0 top-0 h-px w-5 bg-ink-900 transition-transform duration-300",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 start-0 h-px w-5 bg-ink-900 transition-transform duration-300",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[73px] overflow-y-auto bg-paper md:hidden"
          >
            <nav aria-label={t.nav.main} className="container-wide flex min-h-full flex-col pb-10 pt-6">
              <ul className="border-t border-ink-900/10">
                {[...primary, { label: t.nav.contact, href: "/contact" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.45, ease: easeOutExpo }}
                    className="border-b border-ink-900/10"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline gap-4 py-5"
                    >
                      <span className="font-mono text-xs text-accent-600">0{i + 1}</span>
                      <span className={cn("font-display text-3xl", isActive(item.href) ? "text-accent-600" : "text-ink-900")}>
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="tracking-label mt-10 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink-500">{t.nav.more}</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
                {secondary.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="font-mono text-sm text-ink-700 hover:text-accent-600">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "he" : "en")}
      aria-label={t.lang.switchTo}
      title={t.lang.switchTo}
      className="flex h-11 items-center gap-2 px-2 font-mono text-[0.8rem] font-medium uppercase tracking-[0.14em] text-ink-700 transition-colors hover:text-ink-900"
    >
      <span dir="ltr" className="flex items-center gap-2">
        <span lang="he" className={cn(lang === "he" && "text-accent-600")}>
          עב
        </span>
        <span aria-hidden className="text-ink-500">/</span>
        <span lang="en" className={cn(lang === "en" && "text-accent-600")}>
          EN
        </span>
      </span>
    </button>
  );
}
