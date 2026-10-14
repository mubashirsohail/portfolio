"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { serviceOptions } from "@/data/services";
import { personal } from "@/data/personal";
import { LIMITS, validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";

export const SELECT_SERVICE_EVENT = "select-service";

type Status = "idle" | "loading" | "success" | "error";
const empty: ContactInput = { name: "", email: "", subject: "", service: "", message: "" };

function mailtoFallback(v: ContactInput) {
  const body = `${v.message}\n\n— ${v.name} (${v.email})`;
  return `${personal.emailHref}?subject=${encodeURIComponent(v.subject || "Project enquiry")}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [showFallback, setShowFallback] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Preselect a service: from ?service= on load, and from "Discuss a Project" buttons.
  useEffect(() => {
    const valid = (id: string | null) => !!id && serviceOptions.some((o) => o.value === id);
    const fromUrl = new URLSearchParams(window.location.search).get("service");
    if (valid(fromUrl)) setValues((v) => ({ ...v, service: fromUrl! }));
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (valid(id)) setValues((v) => ({ ...v, service: id }));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, on);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, on);
  }, []);

  const set = (k: keyof ContactInput, val: string) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setErrors((e) => ({ ...e, [k]: validateContact(next).errors[k] }));
  };
  const blur = (k: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validateContact(values).errors[k] }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    const { data, errors: errs } = validateContact(values);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ name: true, email: true, subject: true, service: true, message: true });
      const first = (Object.keys(errs) as (keyof ContactInput)[])[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    setFeedback("");
    setShowFallback(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot.current?.value ?? "" }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        setFeedback("Thank you — your message has been sent. I'll get back to you by email.");
        setValues({ ...empty });
        setTouched({});
        setErrors({});
      } else if (res.status === 400 && json.errors) {
        setStatus("idle");
        setErrors(json.errors);
      } else {
        setStatus("error");
        setShowFallback(true);
        setFeedback(
          json.code === "not_configured"
            ? "The contact form can't send email yet because no email service is configured on this site. Your message was NOT sent."
            : json.error || "Something went wrong and your message was NOT sent.",
        );
      }
    } catch {
      setStatus("error");
      setShowFallback(true);
      setFeedback("Network error — your message was NOT sent. Please check your connection and try again.");
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  const field = (k: keyof ContactInput) => ({
    id: `cf-${k}`,
    name: k,
    value: values[k],
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? `cf-${k}-err` : undefined,
    onBlur: () => blur(k),
    disabled: status === "loading",
  });

  const Err = ({ k }: { k: keyof ContactInput }) => (
    <div className="min-h-5 pt-1">
      <AnimatePresence>
        {errors[k] && (
          <motion.p
            id={`cf-${k}-err`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-xs text-red-300"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors[k]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  const label = "mb-1.5 block text-sm font-medium text-fg";
  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === "loading"} className="space-y-1">
      <div className="grid gap-x-5 sm:grid-cols-2">
        <motion.div {...stagger(0)}>
          <label htmlFor="cf-name" className={label}>Full name</label>
          <input {...field("name")} type="text" autoComplete="name" maxLength={LIMITS.name} className="field" placeholder="Your name" onChange={(e) => set("name", e.target.value)} />
          <Err k="name" />
        </motion.div>
        <motion.div {...stagger(1)}>
          <label htmlFor="cf-email" className={label}>Email</label>
          <input {...field("email")} type="email" autoComplete="email" maxLength={LIMITS.email} className="field" placeholder="you@example.com" onChange={(e) => set("email", e.target.value)} />
          <Err k="email" />
        </motion.div>
      </div>
      <div className="grid gap-x-5 sm:grid-cols-2">
        <motion.div {...stagger(2)}>
          <label htmlFor="cf-subject" className={label}>Subject</label>
          <input {...field("subject")} type="text" maxLength={LIMITS.subject} className="field" placeholder="What is this about?" onChange={(e) => set("subject", e.target.value)} />
          <Err k="subject" />
        </motion.div>
        <motion.div {...stagger(3)}>
          <label htmlFor="cf-service" className={label}>Service</label>
          <select {...field("service")} className={cn("field appearance-none", !values.service && "text-neutral-500")} onChange={(e) => set("service", e.target.value)}>
            <option value="" disabled>Select a service…</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-card text-fg">{o.label}</option>
            ))}
          </select>
          <Err k="service" />
        </motion.div>
      </div>
      <motion.div {...stagger(4)}>
        <label htmlFor="cf-message" className={label}>Message</label>
        <textarea {...field("message")} rows={6} maxLength={LIMITS.message} className="field resize-y" placeholder="Tell me about your idea or challenge…" onChange={(e) => set("message", e.target.value)} />
        <div className="flex justify-between">
          <Err k="message" />
          <span className="pt-1 text-xs text-neutral-500" aria-hidden>{values.message.length}/{LIMITS.message}</span>
        </div>
      </motion.div>

      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <motion.div {...stagger(5)} className="flex flex-wrap items-center gap-4 pt-2">
        <AnimatedButton type="submit" disabled={status === "loading"}>
          {status === "loading" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : (<><Send className="h-4 w-4" /> Send Message</>)}
        </AnimatedButton>
      </motion.div>

      <div ref={resultRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        <AnimatePresence mode="wait">
          {(status === "success" || status === "error") && (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm",
                status === "success" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-brand/50 bg-brand/10 text-red-200",
              )}
            >
              {status === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />}
              <div>
                <p>{feedback}</p>
                {status === "error" && showFallback && (
                  <p className="mt-2">
                    You can{" "}
                    <a className="font-semibold text-gold-light underline underline-offset-4" href={mailtoFallback(values)}>
                      send this by email instead
                    </a>{" "}
                    (opens your mail app) or write to{" "}
                    <a className="font-semibold text-gold-light underline underline-offset-4" href={personal.emailHref}>{personal.email}</a>.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
