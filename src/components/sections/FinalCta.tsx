import { ButtonLink } from "../ui/Button";
import { Reveal, MaskReveal } from "../animations/Reveal";

export function FinalCta({
  title = "Every Great Digital Product Starts With an Idea.",
  text = "Whether you have a business problem to solve or the skills to build something great, GAB is being built to bring the right people together.",
  cta = { label: "Discover GAB", href: "/about" },
  secondary,
}: {
  title?: string;
  text?: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden border-t border-ink-900/10 py-28 sm:py-44">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgb(240_138_108/0.22),transparent_60%)]" />
      <div className="container-gab relative text-center">
        <h2 className="mx-auto max-w-5xl text-balance text-[2.6rem] font-medium leading-[1] tracking-[-0.05em] text-ink-900 sm:text-6xl lg:text-[5.5rem]">
          <MaskReveal>{title}</MaskReveal>
        </h2>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">{text}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={cta.href} size="lg" arrow>
              {cta.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} size="lg" variant="secondary">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
