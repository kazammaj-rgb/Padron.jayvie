"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { contactInfo } from "@/lib/data";
import { motion } from "framer-motion";
import {
  Bot,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";

const PremiumLocationMap = dynamic(
  () =>
    import("@/components/maps/PremiumLocationMap").then((m) => m.PremiumLocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(420px,55vh)] min-h-[280px] items-center justify-center rounded-2xl border border-cyan-400/20 bg-slate-950 md:h-[420px]">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          Loading mapâ€¦
        </span>
      </div>
    ),
  }
);

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSent(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Could not send your message. Please try again.");
        return;
      }

      setSent(true);
      setForm({ name: "", email: "", message: "", _gotcha: "" });
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
              06 Contact
            </span>
            <h2 className="section-title mt-4">
              Get In <span className="neon-text">Touch</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Send a message it goes straight to my Gmail so I can reply quickly.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <SectionReveal>
            <div className="glass-panel-strong p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20">
                  <Bot className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">AI Contact Panel</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Delivered to {contactInfo.email} â€” you&apos;ll get a reply soon
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="_gotcha"
                  value={form._gotcha}
                  onChange={(e) =>
                    setForm({ ...form, _gotcha: e.target.value })
                  }
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                {[
                  { id: "name", label: "Your Name", type: "text" },
                  { id: "email", label: "Email Address", type: "email" },
                ].map((field) => (
                  <div key={field.id} className="relative">
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) =>
                        setForm({ ...form, [field.id]: e.target.value })
                      }
                      className="input-glow peer pt-6"
                      placeholder=" "
                    />
                    <label
                      htmlFor={field.id}
                      className="pointer-events-none absolute left-4 top-4 text-sm text-[var(--text-muted)] transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}

                <div className="relative">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="input-glow peer resize-none pt-6"
                    placeholder=" "
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-4 top-4 text-sm text-[var(--text-muted)] transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Your Message
                  </label>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-3 text-sm text-pink-300"
                  >
                    {error}
                  </p>
                )}

                {sent && (
                  <p
                    role="status"
                    className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300"
                  >
                    Message sent! I&apos;ll get a Gmail notification and reply soon.
                  </p>
                )}

                <MagneticButton
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending to Gmail...
                    </>
                  ) : sent ? (
                    <>
                      <Send className="h-4 w-4" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </MagneticButton>
              </form>
            </div>
          </SectionReveal>

          <div className="flex flex-col gap-6">
            <SectionReveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  {
                    icon: MapPin,
                    label: "Home Address",
                    value: contactInfo.address,
                    href: contactInfo.mapUrl,
                  },
                  {
                    icon: Phone,
                    label: "Contact Number",
                    value: contactInfo.phone,
                    href: `tel:${contactInfo.phone}`,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: contactInfo.email,
                    href: `mailto:${contactInfo.email}`,
                  },
                ].map((item) => {
                  const Wrapper = item.href ? motion.a : motion.div;
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href
                        ? {
                          href: item.href,
                          target: item.href.startsWith("http") ? "_blank" : undefined,
                          rel: item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined,
                        }
                        : {})}
                      whileHover={{ x: 4, boxShadow: "0 0 30px rgba(0,245,255,0.1)" }}
                      className="glass-panel flex items-start gap-4 p-5 transition-all"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                        <item.icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-[var(--text-muted)]">
                          {item.label}
                        </p>
                        <p className="mt-1 font-medium">{item.value}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <PremiumLocationMap />
            </SectionReveal>


            <SectionReveal delay={0.3}>
              <div className="glass-panel p-6">
                <h4 className="mb-4 font-display font-bold">Social Links</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {contactInfo.social.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/5"
                    >
                      <span className="font-mono text-xs text-cyan-400">
                        {s.platform}
                      </span>
                      <span className="text-sm font-medium group-hover:text-cyan-400 transition-colors">
                        @{s.handle}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

