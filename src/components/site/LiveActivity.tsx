import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Activity, Eye, MessageSquare, ShoppingBag, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const FEED = [
  "New project inquiry from Dubai, UAE",
  "Website audit requested from London, UK",
  "Quote generated for an ERP platform",
  "Discovery call booked from Toronto, CA",
  "New order confirmed — Mobile App",
  "Support ticket resolved in 6 minutes",
  "New project inquiry from Karachi, PK",
  "Proposal accepted — SEO retainer",
];

function useDrift(base: number, spread: number, ms: number) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const next = v + Math.round((Math.random() - 0.45) * spread);
        return Math.min(base + spread * 3, Math.max(base - spread * 2, next));
      });
    }, ms);
    return () => clearInterval(id);
  }, [base, spread, ms]);
  return value;
}

export function LiveActivity() {
  const visitors = useDrift(48, 6, 2600);
  const orders = useDrift(12, 2, 5200);
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFeedIndex((i) => (i + 1) % FEED.length), 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#123409] via-[#0f2d08] to-[#0a2205] py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-copper/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-copper">
              <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-copper" /> Live right now
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl">
              Real people, real projects — happening as you read this.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
              Our team is online and responding to new requests today. Join the businesses already building with us.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <div className="flex items-center gap-2 text-copper">
                  <Eye className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Live visitors</span>
                </div>
                <p className="mt-2 font-display text-3xl font-black tabular-nums">{visitors}</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <div className="flex items-center gap-2 text-copper">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Orders this week</span>
                </div>
                <p className="mt-2 font-display text-3xl font-black tabular-nums">{orders}</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/12 bg-white/8 p-4 sm:col-span-1">
                <div className="flex items-center gap-2 text-copper">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Avg. reply time</span>
                </div>
                <p className="mt-2 font-display text-3xl font-black">12 min</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/quote" className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-bold text-espresso hover:bg-white">
                Get a free quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/book" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                Book a call
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-copper">
              <Activity className="h-4 w-4" /> Activity feed
            </div>
            <ul className="mt-4 space-y-3">
              {[0, 1, 2].map((offset) => {
                const item = FEED[(feedIndex + offset) % FEED.length];
                return (
                  <li
                    key={`${item}-${offset}`}
                    className={`slide-in flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm ${offset === 0 ? "text-white" : "text-white/60"}`}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                    <span className="min-w-0">{item}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-[11px] text-white/45">Updated continuously from our sales desk.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustGrabber() {
  const points = [
    { title: "No upfront risk", desc: "Start with a free consultation and a fixed, written scope before you pay anything." },
    { title: "Fixed timelines", desc: "Every milestone has a date. You get weekly builds, not silence." },
    { title: "You own everything", desc: "Full code, design files and accounts handed over. NDA signed on request." },
    { title: "Support after launch", desc: "30 days of free post-launch support on every project, then optional retainers." },
  ];
  return (
    <section className="bg-sand/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <Reveal>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-espresso">
                Why clients trust us
              </span>
              <h2 className="mt-4 font-display text-3xl font-black leading-tight text-espresso sm:text-4xl">
                We remove every reason to say no.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70 sm:text-base">
                Hiring an agency is a leap of faith. We make it a safe one with clear scopes, guaranteed timelines and
                complete ownership of everything we build for you.
              </p>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-bold text-white hover:bg-cocoa">
                Talk to us today <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="h-full rounded-3xl border border-espresso/10 bg-white p-6 transition hover:-translate-y-1 hover:border-cocoa/30">
                  <p className="font-display text-lg font-black text-espresso">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
