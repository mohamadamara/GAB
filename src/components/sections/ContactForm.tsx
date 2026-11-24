"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "../ui/Button";
import { easeOutExpo } from "../animations/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Dict } from "@/i18n/dictionary";

export const topics = [{ id: "project" }, { id: "existing" }, { id: "partnership" }, { id: "general" }] as const;

type TopicId = (typeof topics)[number]["id"];
type Values = { name: string; email: string; company: string; topic: TopicId; message: string; consent: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values, m: Dict["form"]["errors"]): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = m.name;
  if (!v.email.trim()) e.email = m.emailEmpty;
  else if (!EMAIL.test(v.email.trim())) e.email = m.emailBad;
  if (v.message.trim().length < 20) e.message = m.messageShort;
  if (v.message.length > 2000) e.message = m.messageLong;
  if (!v.consent) e.consent = m.consent;
  return e;
}

export function ContactForm() {
  const { t } = useLanguage();
  const f = t.form;
  const id = useId();
  const [values, setValues] = useState<Values>({ name: "", email: "", company: "", topic: "project", message: "", consent: false });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "validating" | "ready">("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && topics.some((x) => x.id === t)) setValues((v) => ({ ...v, topic: t as TopicId }));
  }, []);

  const errors = validate(values, f.errors);
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

  const summary = `${f.summary.topic}: ${f.topics[values.topic]}\n${f.summary.name}: ${values.name}\n${f.summary.email}: ${values.email}${values.company ? `\n${f.summary.org}: ${values.company}` : ""}\n\n${values.message}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const field = "w-full rounded-none border bg-paper px-4 font-mono text-ink-900 placeholder:text-ink-500 transition-[border-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-accent-500/30";
  const border = (k: keyof Values) => (show(k) ? "border-[#ff5f5f]" : "border-ink-900/15 focus:border-accent-400");

  return (
    <form noValidate onSubmit={onSubmit} className="metal-plate p-5 sm:p-10" aria-describedby={`${id}-note`}>
      <fieldset>
        <legend className="tracking-label font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-accent-600">{f.legend}</legend>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {topics.map((tp) => (
            <label
              key={tp.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-500",
                values.topic === tp.id ? "border-accent-400 bg-accent-500/10 text-ink-900" : "border-ink-900/10 text-ink-600 hover:border-ink-900/30",
              )}
            >
              <input type="radio" name="topic" value={tp.id} checked={values.topic === tp.id} onChange={() => set("topic", tp.id)} className="sr-only" />
              <span aria-hidden className={cn("grid size-4 shrink-0 place-items-center border", values.topic === tp.id ? "border-accent-400" : "border-ink-900/30")}>
                {values.topic === tp.id && <span className="size-2 bg-accent-400" />}
              </span>
              {f.topics[tp.id]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-2 block text-sm text-ink-600">
            {f.name} <span className="text-accent-600">*</span>
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
            {f.email} <span className="text-accent-600">*</span>
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
            {f.company} <span className="text-ink-500">{f.optional}</span>
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
              {f.message} <span className="text-accent-600">*</span>
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
            placeholder={values.topic === "project" ? f.placeholderProject : f.placeholder}
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
            className="mt-0.5 size-4 shrink-0 accent-[#c6a052]"
          />
          {f.consent}
        </label>
        <FieldError id={`${id}-consent-err`} msg={show("consent") || undefined} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="text-sm text-ink-500">
          {f.required}
        </p>
        <Button type="submit" size="lg" arrow className="h-auto min-h-14 w-full whitespace-normal py-3 text-center sm:w-auto">
          {f.submit}
        </Button>
      </div>

      <div aria-live="polite" className="mt-6">
        <AnimatePresence>
          {status === "validating" && Object.keys(errors).length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border border-[#ff5f5f]/40 bg-[#ff5f5f]/10 px-4 py-3 text-sm text-[#ff8a8a]"
            >
              {Object.keys(errors).length === 1 ? f.fixOne : f.fixMany.replace("{n}", String(Object.keys(errors).length))}
            </motion.p>
          )}
          {status === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="border border-accent-500/40 bg-accent-500/10 p-5"
            >
              <p className="font-medium text-ink-900">{f.readyTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.readyText}</p>
              <pre dir="auto" className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap bg-paper p-4 font-mono text-xs leading-relaxed text-ink-600">{summary}</pre>
              <button
                type="button"
                onClick={copy}
                className="mt-4 h-10 border border-accent-400 px-4 font-mono text-sm text-accent-600 transition-colors hover:bg-accent-500/10"
              >
                {copied ? f.copied : f.copy}
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
