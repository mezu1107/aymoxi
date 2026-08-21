import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { dbInsert } from "@/lib/rest";
import { Logo } from "./Logo";

function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState<string>("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) { setState("error"); setMsg("Enter a valid email."); return; }
    setState("sending");
    const error = await dbInsert("newsletter_subscribers", { email: parsed.data, source: "footer" });
    if (error && !/duplicate|unique/i.test(error)) { setState("error"); setMsg(error); return; }
    setState("done"); setMsg("You're subscribed!");
    (e.target as HTMLFormElement).reset();
  }
  return (
    <div>
      <form onSubmit={onSubmit} className="mt-5 flex overflow-hidden rounded-full border border-white/15 bg-white/5">
        <input name="email" type="email" required placeholder="you@company.com"
          className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none" />
        <button type="submit" disabled={state === "sending"} className="inline-flex items-center gap-1.5 bg-copper px-5 text-sm font-semibold text-espresso transition hover:brightness-95 disabled:opacity-60">
          {state === "sending" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : state === "done" ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
          {state === "done" ? "Joined" : "Join"}
        </button>
      </form>
      {msg && <p className={`mt-2 text-xs ${state === "error" ? "text-rose-300" : "text-white/70"}`}>{msg}</p>}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso text-white/80">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cocoa/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-copper/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Logo className="h-12 w-auto" variant="light" />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Empowering businesses through technology and digital innovation — scalable software, modern apps, SaaS and cloud built for growth.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-copper hover:bg-copper hover:text-espresso"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display font-bold text-white">Quick Links</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/about" className="transition hover:text-copper">About</Link></li>
              <li><Link to="/services" className="transition hover:text-copper">Services</Link></li>
              <li><Link to="/portfolio" className="transition hover:text-copper">Portfolio</Link></li>
              <li><Link to="/team" className="transition hover:text-copper">Team</Link></li>
              <li><Link to="/careers" className="transition hover:text-copper">Careers</Link></li>
              <li><Link to="/pricing" className="transition hover:text-copper">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-display font-bold text-white">Resources</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/blog" className="transition hover:text-copper">Blog</Link></li>
              <li><Link to="/faq" className="transition hover:text-copper">FAQ</Link></li>
              <li><Link to="/contact" className="transition hover:text-copper">Contact</Link></li>
              <li><Link to="/privacy" className="transition hover:text-copper">Privacy Policy</Link></li>
              <li><Link to="/terms" className="transition hover:text-copper">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-display font-bold text-white">Get in touch</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" /> 2nd Floor, Malik Plaza, In front of TCS Office, Hassan Road, Jaranwala, Faisalabad, Pakistan</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-copper" /> <a href="tel:+17207941888" className="hover:text-copper">+1 720 794 1888</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-copper" /> <a href="mailto:info@aymoxi.com" className="hover:text-copper">info@aymoxi.com</a></li>
            </ul>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} AYMOXI. All rights reserved.</p>
          <p className="text-center">
            Designed & Developed by{" "}
            <span className="font-display font-bold text-copper">AM Enterprises</span>
          </p>
          <p>Innovate · Build · Elevate</p>
        </div>
      </div>
    </footer>
  );
}
