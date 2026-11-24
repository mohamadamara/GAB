import { ButtonLink } from "@/components/ui/Button";
import { getLang } from "@/i18n/server";

const copy = {
  en: {
    eyebrow: "Error 404",
    title: "This page hasn't been built.",
    text: "The link may be outdated, or the page may not exist yet.",
    home: "Back to home",
    contact: "Contact",
  },
  he: {
    eyebrow: "שגיאה 404",
    title: "את העמוד הזה עוד לא בנינו.",
    text: "ייתכן שהקישור ישן, או שהעמוד עדיין לא קיים.",
    home: "חזרה לדף הבית",
    contact: "צרו קשר",
  },
};

export default async function NotFound() {
  const c = copy[await getLang()];
  return (
    <section className="grain relative flex min-h-[80vh] items-center overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-gab relative text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-600">{c.eyebrow}</p>
        <h1 className="font-display mt-6 text-balance text-[2.2rem] leading-[1.05] text-ink-900 sm:text-6xl">{c.title}</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-ink-600">{c.text}</p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/" arrow>
            {c.home}
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            {c.contact}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
