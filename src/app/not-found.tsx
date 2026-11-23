import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80vh] items-center overflow-hidden pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-gab relative text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-600">Error 404</p>
        <h1 className="mt-6 text-5xl font-medium tracking-[-0.045em] text-ink-900 sm:text-7xl">This page hasn&apos;t been built.</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-ink-600">The link may be outdated, or the page may not exist yet.</p>
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink href="/" arrow>Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Contact</ButtonLink>
        </div>
      </div>
    </section>
  );
}
