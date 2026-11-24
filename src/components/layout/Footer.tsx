"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Logo } from "../ui/Logo";

export function Footer() {
  const { t } = useLanguage();
  const cols = [
    {
      title: t.footer.explore,
      items: [
        { label: t.nav.home, href: "/" },
        { label: t.nav.services, href: "/services" },
        { label: t.nav.projects, href: "/projects" },
        { label: t.nav.process, href: "/how-it-works" },
      ],
    },
    {
      title: t.footer.company,
      items: [
        { label: t.nav.about, href: "/about" },
        { label: t.nav.faq, href: "/faq" },
        { label: t.nav.contact, href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t border-accent-500/15 bg-paper">
      <div className="container-wide grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 md:py-14">
        <div className="col-span-2 max-w-sm md:col-span-1">
          <Link href="/" aria-label={t.homeLabel} className="inline-block" dir="ltr">
            <Logo tagline className="h-16" />
          </Link>
          <p className="mt-6 text-sm leading-relaxed text-ink-600">{t.footer.tagline}</p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h2 className="tracking-label font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent-600">{col.title}</h2>
            <ul className="mt-4 space-y-1">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-2 font-mono text-sm text-ink-800 transition-colors hover:text-accent-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-wide">
        <div className="flex flex-col gap-4 border-t border-ink-900/10 py-6 font-mono text-[0.72rem] leading-relaxed text-ink-500 md:flex-row md:items-center md:justify-between">
          <p className="shrink-0">
            © {new Date().getFullYear()} GAB. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
