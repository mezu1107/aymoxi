import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Search,
  Sparkles,
  Bot,
  Trophy,
  Users,
  Globe2,
  Zap,
  Rocket,
  Star,
  Phone,
  ArrowUpRight,
  Cloud,
  Shield,
  Palette,
  HeadphonesIcon,
} from "lucide-react";
import { type ComponentType } from "react";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";
import { TrustBar } from "@/components/site/TrustBar";

const PHONE = "+1 720 794 1888";

/* ---------- shared card wrappers ---------- */

function BentoCard({
  className = "",
  children,
  gradient = "light",
}: {
  className?: string;
  children: React.ReactNode;
  gradient?: "light" | "teal" | "dark" | "lime" | "mesh";
}) {
  const bg =
    gradient === "teal"
      ? "bg-gradient-to-br from-[#2e6b16] via-[#3a7f1c] to-[#123409] text-white border-white/10"
      : gradient === "dark"
      ? "bg-gradient-to-br from-[#123409] via-[#0f2d08] to-[#0a2205] text-white border-white/10"
      : gradient === "lime"
      ? "bg-gradient-to-br from-[#a8dd55] via-[#8cc63f] to-[#6faa26] text-espresso border-espresso/10"
      : gradient === "mesh"
      ? "bg-[radial-gradient(circle_at_20%_0%,#8cc63f33_0%,transparent_45%),radial-gradient(circle_at_80%_100%,#2e6b1622_0%,transparent_50%),linear-gradient(135deg,#ffffff,#f0f7f5)] text-espresso border-espresso/10"
      : "bg-white text-espresso border-espresso/8";
  return (
    <div className="scene-3d h-full">
      <div className={`card-3d group relative flex flex-col overflow-hidden rounded-3xl border ${bg} ${className}`}>
        {children}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, desc, tone = "light" }: { eyebrow: string; title: string; desc?: string; tone?: "light" | "sand" }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-espresso">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className={`mt-4 font-display text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl ${tone === "sand" ? "text-espresso" : "text-espresso"}`}>{title}</h2>
      </Reveal>
      {desc ? (
        <Reveal delay={160}>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/65 sm:text-base">{desc}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

function Section({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "sand" }) {
  return (
    <section className={`relative overflow-hidden py-20 sm:py-24 lg:py-28 ${tone === "sand" ? "bg-sand/60" : "bg-white"}`}>
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-copper/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function IconTile({ icon: Icon, tone = "teal" }: { icon: ComponentType<{ className?: string }>; tone?: "teal" | "lime" | "white" | "dark" }) {
  const cls =
    tone === "lime" ? "bg-copper text-espresso" :
    tone === "white" ? "bg-white/15 text-white ring-1 ring-white/20" :
    tone === "dark" ? "bg-espresso text-copper" : "bg-espresso text-copper";
  return (
    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-inner ${cls}`}>
      <Icon className="h-6 w-6" />
    </div>
  );
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Code2, Smartphone, Search, Sparkles, Bot, Rocket, Zap, Star, Globe2, Trophy, Users, Cloud, Shield, Palette, HeadphonesIcon,
};

/* ---------- types ---------- */

type ServiceRow = {
  id: string; title: string; slug: string; description: string; icon: string;
  tags: string[] | null; gradient: string; featured: boolean; sort_order: number;
};
type ClientRow = { id: string; name: string; logo_url: string | null; website_url: string | null };
type TestimonialRow = { id: string; name: string; role_title: string | null; quote: string; stars: number | null; avatar_url: string | null };
type StepRow = { id: string; step_number: string; title: string; description: string };
type StatRow = { id: string; label: string; value: string };

/* ---------- 1. Services bento ---------- */

function ServicesBento({ services }: { services: ServiceRow[] }) {
  if (services.length === 0) return null;
  const [featured, ...rest] = services.slice(0, 6);
  const gradFor = (g: string) => (["light", "teal", "dark", "lime", "mesh"].includes(g) ? (g as "light" | "teal" | "dark" | "lime" | "mesh") : "light");

  return (
    <Section>
      <SectionHeading eyebrow="What We Do" title="Everything modern, nothing legacy" desc="Six core capabilities that cover the full lifecycle of building, scaling and growing world-class digital products." />
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        <Reveal className="lg:col-span-2">
          <BentoCard gradient={gradFor(featured.gradient) === "light" ? "teal" : gradFor(featured.gradient)} className="p-7 sm:p-9 h-full min-h-[280px]">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-copper/25 blur-3xl" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-3">
                <IconTile icon={iconMap[featured.icon] ?? Sparkles} tone="lime" />
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Featured</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-black leading-tight sm:text-3xl">{featured.title}</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">{featured.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(featured.tags ?? []).map((t) => (
                  <span key={t} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium">{t}</span>
                ))}
              </div>
              <Link to="/services/$slug" params={{ slug: (featured as ServiceRow & { slug: string }).slug }} className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-white/90 hover:text-white">
                Explore {featured.title} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </BentoCard>
        </Reveal>

        {rest.map((s, i) => {
          const g = gradFor(s.gradient);
          const dark = g === "teal" || g === "dark";
          const Icon = iconMap[s.icon] ?? Sparkles;
          return (
            <Reveal key={s.id} delay={80 + i * 40}>
              <BentoCard gradient={g} className="p-7 h-full min-h-[240px]">
                <IconTile icon={Icon} tone={g === "lime" ? "dark" : dark ? "lime" : "teal"} />
                <h3 className={`mt-5 font-display text-xl font-black leading-tight ${dark ? "" : "text-espresso"}`}>{s.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : g === "lime" ? "text-espresso/75" : "text-foreground/70"}`}>{s.description}</p>
                <Link to="/services/$slug" params={{ slug: (s as ServiceRow & { slug: string }).slug }} className={`mt-6 inline-flex items-center gap-1.5 text-sm font-bold ${dark ? "text-white/90" : "text-cocoa"}`}>
                  Explore {s.title} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </BentoCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- 2. Clients strip ---------- */

function ClientsStrip({ clients }: { clients: ClientRow[] }) {
  if (clients.length === 0) return null;
  const loop = [...clients, ...clients];
  return (
    <section className="border-y border-espresso/8 bg-white py-10">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-espresso/50">Trusted by teams worldwide</p>
        <div className="mt-6 overflow-hidden">
          <div className="flex animate-[scroll_30s_linear_infinite] gap-10 whitespace-nowrap">
            {loop.map((c, i) => (
              <div key={`${c.id}-${i}`} className="inline-flex shrink-0 items-center gap-3">
                {c.logo_url ? (
                  <img src={c.logo_url} alt={c.name} className="h-8 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
                ) : (
                  <span className="font-display text-lg font-black tracking-[0.2em] text-espresso/40 transition hover:text-espresso">{c.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}

/* ---------- 3. Simple services cards ("Crafted for modern businesses") ---------- */

function SimpleServicesCards({ services }: { services: ServiceRow[] }) {
  if (services.length === 0) return null;
  const four = services.slice(0, 4);
  return (
    <Section tone="sand">
      <SectionHeading eyebrow="Our Services" title="Crafted for modern businesses" desc="Four core practices, one obsession: shipping software that feels effortless." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {four.map((s, i) => {
          const Icon = iconMap[s.icon] ?? Sparkles;
          return (
            <Reveal key={s.id} delay={i * 60}>
              <div className="group h-full rounded-3xl border border-espresso/10 bg-white p-6 transition hover:-translate-y-1 hover:border-cocoa/30 hover:shadow-[0_20px_60px_-25px_rgba(10,75,79,0.35)]">
                <IconTile icon={Icon} />
                <h3 className="mt-5 font-display text-lg font-black text-espresso">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{s.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- 4. Why Choose Us bento ---------- */

const FALLBACK_STATS = [
  { id: "f1", value: "250+", label: "Projects" },
  { id: "f2", value: "98%", label: "Retention" },
  { id: "f3", value: "10+", label: "Years" },
  { id: "f4", value: "24/7", label: "Support" },
];

function WhyBento({ stats }: { stats: StatRow[] }) {
  const s = stats.length > 0 ? stats.slice(0, 4) : (FALLBACK_STATS as unknown as StatRow[]);
  return (
    <Section tone="sand">
      <SectionHeading eyebrow="Why Choose Us" title="Why Choose AYMOXI" desc="A boutique team of engineers, designers and strategists delivering enterprise-grade results with a hand-crafted touch." tone="sand" />
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-4 lg:grid-rows-3 lg:gap-6">
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <BentoCard gradient="dark" className="p-8 sm:p-10 h-full min-h-[320px]">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-copper/25 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <IconTile icon={Trophy} tone="lime" />
                <p className="mt-6 font-display text-3xl font-black leading-tight sm:text-4xl">By the numbers</p>
                <p className="mt-2 text-sm text-white/70">A decade of shipping premium software for teams across four continents.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {s.map((st) => (
                  <div key={st.id}>
                    <p className="font-display text-3xl font-black text-copper">{st.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-white/50">{st.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-2">
          <BentoCard gradient="lime" className="p-7 h-full min-h-[160px]">
            <div className="flex items-start gap-4">
              <IconTile icon={Rocket} tone="dark" />
              <div>
                <p className="font-display text-2xl font-black text-espresso">Modern, future-proof solutions</p>
                <p className="mt-1 text-sm text-espresso/75">React, Next.js, TanStack, AI — the stacks the world's best teams use.</p>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        <Reveal delay={120}>
          <BentoCard className="p-6 h-full min-h-[160px]">
            <IconTile icon={Users} />
            <p className="mt-4 font-display text-lg font-black text-espresso">Senior experienced developers</p>
            <p className="mt-1 text-sm text-foreground/65">A dedicated pod, never juniors on autopilot.</p>
          </BentoCard>
        </Reveal>

        <Reveal delay={160}>
          <BentoCard gradient="mesh" className="p-6 h-full min-h-[160px]">
            <IconTile icon={Zap} />
            <p className="mt-4 font-display text-lg font-black text-espresso">Rapid, on-time delivery</p>
            <p className="mt-1 text-sm text-foreground/65">Weekly demos, fixed-price MVPs, zero surprises.</p>
          </BentoCard>
        </Reveal>

        <Reveal delay={200} className="lg:col-span-2">
          <BentoCard gradient="teal" className="p-7 h-full min-h-[160px]">
            <div className="flex items-start gap-4">
              <IconTile icon={HeadphonesIcon} tone="lime" />
              <div>
                <p className="font-display text-xl font-black text-white">24/7 dedicated support</p>
                <p className="mt-1 text-sm text-white/70">SLA-backed engineering support across time zones — always a human, never a ticket queue.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to="/about" className="inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 text-xs font-bold text-espresso hover:bg-white">Read our full story</Link>
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/10">
                    <Phone className="h-3.5 w-3.5" /> {PHONE}
                  </a>
                </div>
              </div>
            </div>
          </BentoCard>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- 5. Process (simple cards) ---------- */

function ProcessCards({ steps }: { steps: StepRow[] }) {
  if (steps.length === 0) return null;
  return (
    <Section>
      <SectionHeading eyebrow="Our Process" title="How we ship excellence" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.id} delay={i * 60}>
            <div className="h-full rounded-3xl border border-espresso/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <p className="font-display text-3xl font-black text-copper">{s.step_number}</p>
              <p className="mt-2 font-display text-lg font-black text-espresso">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/65">{s.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 6. Offer banner ---------- */

function OfferBanner() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2e6b16] via-[#083033] to-[#0a2205] p-8 text-white shadow-luxury sm:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-copper/20 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-copper">
                <Sparkles className="h-3 w-3" /> Limited Time
              </span>
              <h3 className="mt-3 font-display text-2xl font-black leading-tight sm:text-3xl">Free Consultation or 20% Off Website Development</h3>
              <p className="mt-2 max-w-2xl text-sm text-white/70">Book a discovery call this month and receive a complimentary product audit alongside our launch discount.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-bold text-espresso hover:bg-white">
                Claim Offer <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Vision block ---------- */

function VisionBlock() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#2e6b16] via-[#3a7f1c] to-[#083033]">
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <Sparkles className="mx-auto h-16 w-16 text-copper" />
                  <p className="mt-4 font-display text-2xl font-black text-white/90">Premium technology workspace</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-espresso">
              <span className="h-1.5 w-1.5 rounded-full bg-copper" />
              Our Vision
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-espresso sm:text-5xl">Innovating Today,<br />Building Tomorrow.</h2>
            <p className="mt-4 text-base text-foreground/65">Partner with a team that treats every product as a long-term craft — engineered for scale, designed for people.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-bold text-white hover:bg-cocoa">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-espresso/15 px-6 py-3 text-sm font-bold text-espresso hover:bg-sand">
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- 9. Testimonials (two opposite-scrolling rows) ---------- */

function TestimonialCard({ t }: { t: TestimonialRow }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col rounded-3xl border border-espresso/10 bg-white p-6 shadow-sm sm:w-[360px]">
      <div className="flex text-copper">
        {Array.from({ length: t.stars ?? 5 }).map((_, k) => (<Star key={k} className="h-4 w-4 fill-copper" />))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-espresso/85">"{t.quote}"</p>
      <div className="mt-6 flex items-center gap-3 border-t border-espresso/8 pt-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-espresso text-copper">
          {t.avatar_url ? <img src={t.avatar_url} alt={t.name} className="h-full w-full object-cover" /> : <span className="text-sm font-bold">{t.name.slice(0, 1)}</span>}
        </div>
        <div className="min-w-0">
          <p className="truncate font-display font-black text-espresso">{t.name}</p>
          <p className="truncate text-xs text-foreground/60">{t.role_title}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsCards({ items }: { items: TestimonialRow[] }) {
  if (items.length === 0) return null;
  const mid = Math.ceil(items.length / 2);
  const rowA = items.slice(0, mid);
  const rowB = items.slice(mid).length > 0 ? items.slice(mid) : rowA;

  return (
    <section className="overflow-hidden bg-sand/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="Loved by teams that ship" desc="Real feedback from the businesses we build for." />
      </div>
      <div className="marquee-mask marquee-pause space-y-5">
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max gap-5">
            {[...rowA, ...rowA].map((t, i) => <TestimonialCard key={`a-${t.id}-${i}`} t={t} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse flex w-max gap-5">
            {[...rowB, ...rowB].map((t, i) => <TestimonialCard key={`b-${t.id}-${i}`} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. Final CTA ---------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#123409] via-[#0f2d08] to-[#0a2205] py-20 text-white">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-copper/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">Ready to build something remarkable?</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/70">Let's turn your idea into a beautifully crafted product.</p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-copper px-7 py-3.5 text-sm font-bold text-espresso hover:bg-white">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white/90 hover:bg-white/10">
              View pricing
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Main export ---------- */

export function BentoHome() {
  const { rows: services } = useLiveList<ServiceRow>("services", { orderBy: { column: "sort_order" } });
  const { rows: clients } = useLiveList<ClientRow>("clients", { orderBy: { column: "sort_order" } });
  const { rows: testimonials } = useLiveList<TestimonialRow>("testimonials", { orderBy: { column: "sort_order" } });
  const { rows: steps } = useLiveList<StepRow>("process_steps", { orderBy: { column: "sort_order" } });
  const { rows: stats } = useLiveList<StatRow>("stats", { orderBy: { column: "sort_order" } });

  return (
    <>
      <TrustBar />
      <ServicesBento services={services} />
      <ClientsStrip clients={clients} />
      <WhyBento stats={stats} />
      <ProcessCards steps={steps} />
      <OfferBanner />
      <VisionBlock />
      <TestimonialsCards items={testimonials} />
      <FinalCTA />
    </>
  );
}
