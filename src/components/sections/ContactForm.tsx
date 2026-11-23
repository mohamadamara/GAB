"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "../ui/Button";
import { easeOutExpo } from "../animations/Reveal";

export const topics = [
  { id: "general", label: "General inquiry" },
  { id: "partnership", label: "Business partnership" },
  { id: "developer", label: "Developer interest" },
  { id: "collaboration", label: "Collaboration opportunity" },
] as const;

type TopicId = (typeof topics)[number]["id"];
type Values = { name: string; email: string; company: string; topic: TopicId; message: string; consent: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL.test(v.email.trim())) e.email = "That email address doesn't look right.";
  if (v.message.trim().length < 20) e.message = "Please write at least 20 characters so we understand your request.";
  if (v.message.length > 2000) e.message = "Please keep your message under 2,000 characters.";
  if (!v.consent) e.consent = "Please confirm so we may use these details to reply.";
  return e;
}

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Values>({ name: "", email: "", company: "", topic: "general", message: "", consent: false });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "validating" | "ready">("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && topics.some((x) => x.id === t)) setValues((v) => ({ ...v, topic: t as TopicId }));
  }, []);

  const errors = validate(values);
  const show = (k: keyof Values) => (touched[k] || status !== "idle") && errors[k];

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [k]: val }));
    if (status === "ready") setStatus("idle");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true, consent: true });
    if (Object.keys(errors).length) {
      setStatus("validating");
      const first = Object.keys(errors)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setStatus("ready");
  };

  const summary = `Topic: ${topics.find((t) => t.id === values.topic)?.label}\nName: ${values.name}\nEmail: ${values.email}${values.company ? `\nOrganisation: ${values.company}` : ""}\n\n${values.message}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const field = "w-full rounded-[4px] border bg-white/70 px-4 text-ink-900 placeholder:text-ink-500 transition-[border-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-accent-500/30";
  const border = (k: keyof Values) => (show(k) ? "border-[#ff5f5f]" : "border-ink-900/15 focus:border-accent-400");

  return (
    <form noValidate onSubmit={onSubmit} className="metal-plate rounded-[var(--radius-panel)] p-6 sm:p-10" aria-describedby={`${id}-note`}>
      <fieldset>
        <legend className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent-600">What is this about?</legend>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {topics.map((t) => (
            <label
              key={t.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-[4px] border px-4 py-3 text-sm transition-colors",
                values.topic === t.id ? "border-accent-400 bg-accent-500/10 text-ink-900" : "border-ink-900/10 text-ink-600 hover:border-ink-900/30",
              )}
            >
              <input type="radio" name="topic" value={t.id} checked={values.topic === t.id} onChange={() => set("topic", t.id)} className="sr-only" />
              <span aria-hidden className={cn("grid size-4 shrink-0 place-items-center rounded-full border", values.topic === t.id ? "border-accent-400" : "border-ink-900/30")}>
                {values.topic === t.id && <span className="size-2 rounded-full bg-accent-400" />}
              </span>
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-2 block text-sm text-ink-600">
            Full name <span className="text-accent-600">*</span>
          </label>
          <input
            id={`${id}-name`}
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={!!show("name")}
            aria-describedby={show("name") ? `${id}-name-err` : undefined}
            className={cn(field, "h-12", border("name"))}
          />
          <FieldError id={`${id}-name-err`} msg={show("name") || undefined} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-2 block text-sm text-ink-600">
            Email address <span className="text-accent-600">*</span>
          </label>
          <input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={!!show("email")}
            aria-describedby={show("email") ? `${id}-email-err` : undefined}
            className={cn(field, "h-12", border("email"))}
          />
          <FieldError id={`${id}-email-err`} msg={show("email") || undefined} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-company`} className="mb-2 block text-sm text-ink-600">
            Company or studio <span className="text-ink-500">(optional)</span>
          </label>
          <input
            id={`${id}-company`}
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            className={cn(field, "h-12 border-ink-900/15 focus:border-accent-400")}
          />
        </div>
        <div className="sm:col-span-2">
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor={`${id}-message`} className="block text-sm text-ink-600">
              Message <span className="text-accent-600">*</span>
            </label>
            <span className={cn("font-mono text-[0.68rem]", values.message.length > 2000 ? "text-[#ff5f5f]" : "text-ink-500")}>
              {values.message.length}/2000
            </span>
          </div>
          <textarea
            id={`${id}-message`}
            rows={6}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            aria-invalid={!!show("message")}
            aria-describedby={show("message") ? `${id}-message-err` : undefined}
            placeholder={
              values.topic === "developer"
                ? "Tell us about your skills, technologies and the kind of projects you'd like to find."
                : "Tell us what you have in mind."
            }
            className={cn(field, "resize-y py-3 leading-relaxed", border("message"))}
          />
          <FieldError id={`${id}-message-err`} msg={show("message") || undefined} />
        </div>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-600">
          <input
            id={`${id}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!show("consent")}
            aria-describedby={show("consent") ? `${id}-consent-err` : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[#f08a6c]"
          />
          I agree that GAB may use these details to respond to my message.
        </label>
        <FieldError id={`${id}-consent-err`} msg={show("consent") || undefined} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="text-sm text-ink-500">
          Fields marked <span className="text-accent-600">*</span> are required.
        </p>
        <Button type="submit" size="lg" arrow>
          Check & prepare message
        </Button>
      </div>

      <div aria-live="polite" className="mt-6">
        <AnimatePresence>
          {status === "validating" && Object.keys(errors).length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-[4px] border border-[#ff5f5f]/40 bg-[#ff5f5f]/10 px-4 py-3 text-sm text-[#ff8a8a]"
            >
              Please correct {Object.keys(errors).length === 1 ? "the highlighted field" : `the ${Object.keys(errors).length} highlighted fields`} and try again.
            </motion.p>
          )}
          {status === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="rounded-[4px] border border-accent-500/40 bg-accent-500/10 p-5"
            >
              <p className="font-medium text-ink-900">Your message is complete — but it has not been sent.</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                GAB is in development and this form is not yet connected to a messaging service, so nothing has been
                transmitted or stored. You can copy your message below to keep it ready.
              </p>
              <pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap rounded-[4px] bg-white/80 p-4 font-mono text-xs leading-relaxed text-ink-600">{summary}</pre>
              <button
                type="button"
                onClick={copy}
                className="mt-4 h-10 rounded border border-accent-400 px-4 text-sm text-accent-600 transition-colors hover:bg-accent-500/10"
              >
                {copied ? "Copied ✓" : "Copy message"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string | false }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p id={id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 text-sm text-[#ff8a8a]">
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
