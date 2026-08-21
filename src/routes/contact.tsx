import { SITE_URL } from "@/lib/site";
import { createFileRoute } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AYMOXI" },
      { name: "description", content: "Book a free consultation or send us a message." },
      { property: "og:title", content: "Contact — AYMOXI" },
      { property: "og:url", content: SITE_URL + "/contact" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  useApplyPageSeo("/contact");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "Web Development", message: "" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    setBusy(false);
    if (error) { setError(error.message); return; }
    setSent(true);
    setForm({ name: "", email: "", subject: "Web Development", message: "" });
    setTimeout(() => setSent(false), 8000);
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's build something remarkable." description="Book a free 30-minute consultation. We reply within one business day." />

      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <Reveal variant="left">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h3 className="font-display text-xl font-bold text-espresso">Reach out directly</h3>
              <ul className="mt-6 space-y-5 text-sm">
                {[
                  { icon: MapPin, label: "Office", value: "2nd Floor, Malik Plaza, In front of TCS Office, Hassan Road, Jaranwala, Faisalabad, Pakistan" },
                  { icon: Phone, label: "USA Phone", value: "+1 720 794 1888" },
                  { icon: Mail, label: "Email", value: "info@aymoxi.com" },
                  { icon: Clock, label: "Business hours", value: "Mon–Sat · 9:00 – 19:00 PKT" },
                ].map((i) => (
                  <li key={i.label} className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-copper/15 text-cocoa">
                      <i.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50">{i.label}</p>
                      <p className="mt-0.5 font-medium text-espresso">{i.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="AYMOXI office — Jaranwala, Faisalabad"
                  src="https://maps.google.com/maps?q=Jaranwala%2C%20Faisalabad%2C%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="h-56 w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <Reveal variant="right">
            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h3 className="font-display text-2xl font-bold text-espresso">Book a free consultation</h3>
              <p className="mt-2 text-sm text-foreground/70">Tell us about your project and pick a time that works.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Name</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none" placeholder="Jane Cooper" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Email</span>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none" placeholder="jane@company.com" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Service</span>
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none">
                    <option>Web Development</option>
                    <option>Mobile Apps</option>
                    <option>AI Solutions</option>
                    <option>Cloud & DevOps</option>
                    <option>UI/UX Design</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Preferred date</span>
                  <input type="date" className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso/70">Message</span>
                  <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5 w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-sm focus:border-copper focus:outline-none" placeholder="Tell us about your goals..." />
                </label>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-8 py-4 text-sm font-semibold text-cream shadow-luxury transition hover:bg-espresso disabled:opacity-60 sm:w-auto"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send message
              </button>

              {error ? (
                <div className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-3 text-xs text-red-700">{error}</div>
              ) : null}

              {sent && (
                <div className="slide-in mt-6 flex items-center gap-3 rounded-2xl border border-copper/40 bg-copper/10 p-4 text-sm text-espresso">
                  <CheckCircle2 className="h-5 w-5 text-cocoa" />
                  Thanks! We've received your message and will reply within one business day.
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
