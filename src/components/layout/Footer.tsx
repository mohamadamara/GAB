import Link from "next/link";
import { footerNav } from "@/data/nav";
import { site } from "@/lib/site";
import { Logo } from "../ui/Logo";
import { ButtonLink } from "../ui/Button";
import { SWOOSH_PATH, WORDMARK_PATH } from "../ui/logoPaths";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-900/10 bg-paper">
      <div className="container-gab grid gap-14 pb-16 pt-20 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo tagline cutout="#080808" className="h-24" />
          <p className="mt-6 text-[0.95rem] leading-relaxed text-ink-600">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="secondary">
              Contact GAB
            </ButtonLink>
            <ButtonLink href="/contact?topic=developer" variant="secondary">
              Register interest
            </ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-500">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group text-[1rem] font-medium text-ink-900">
                      <span className="roll">
                        <span>{item.label}</span>
                        <span aria-hidden className="text-accent-600">{item.label}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container-gab">
        <p className="max-w-2xl border-t border-ink-900/10 pt-7 text-sm leading-relaxed text-ink-500">
          GAB is currently being built. Interfaces shown on this website are conceptual previews of planned
          functionality, not a launched service.
        </p>
      </div>
      {/* Oversized ghost of the logo */}
      <svg aria-hidden viewBox="0 -48 268 124" className="pointer-events-none mx-auto -mb-[4vw] block w-[94vw] max-w-[1320px] select-none">
        <path d={WORDMARK_PATH} fill="rgb(243 236 224 / 0.04)" stroke="rgb(243 236 224 / 0.08)" strokeWidth="0.3" />
        <path d={SWOOSH_PATH} fill="rgb(240 138 108 / 0.10)" stroke="rgb(240 138 108 / 0.18)" strokeWidth="0.3" />
      </svg>
      {/* Cream strip along the bottom */}
      <div className="theme-inverse relative">
        <div className="container-gab flex flex-col gap-2 py-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-900 sm:flex-row sm:items-center sm:justify-between">
          <p>Grow. Automate. Build.</p>
          <p className="text-ink-600">© {new Date().getFullYear()} GAB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
