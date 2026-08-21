import { SITE_URL } from "@/lib/site";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Phone, Loader2, ArrowLeft, Sparkles, Code2, Smartphone, Cloud, Shield, Search, Megaphone, Users, Palette, Database, ShoppingCart, ChevronDown, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/site/Reveal";

const PHONE = "+1 720 794 1888";

const iconMap: Record<string, LucideIcon> = {
  Code2, Smartphone, Sparkles, Cloud, Shield, Search, Megaphone, Users, Palette, Database, ShoppingCart,
};

type ProcessStep = { step?: string; title?: string; description?: string };
type PricingTier = { name?: string; price?: string; period?: string; description?: string; features?: string[]; featured?: boolean; cta_label?: string; cta_url?: string };
type FaqItem = { question?: string; answer?: string };

type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  icon: string | null;
  tags: string[] | null;
  hero_image: string | null;
  banner_image: string | null;
  features: string[] | null;
  process: ProcessStep[] | null;
  pricing_tiers: PricingTier[] | null;
  faq: FaqItem[] | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
};

const SELECT =
  "id,title,slug,description,long_description,icon,tags,hero_image,banner_image,features,process,pricing_tiers,faq,meta_title,meta_description,meta_keywords,og_title,og_description,og_image";

async function fetchService(slug: string) {
  const { data } = await supabase.from("services").select(SELECT).eq("slug", slug).eq("published", true).maybeSingle();
  return (data as Service | null) ?? null;
}

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const service = await fetchService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    const title = s?.meta_title || (s ? `${s.title} — AYMOXI` : "Service — AYMOXI");
    const description = s?.meta_description || s?.description || `Dedicated ${params.slug.replace(/-/g, " ")} service by AYMOXI.`;
    const url = `/services/${params.slug}`;
    const image = s?.og_image || s?.hero_image || s?.banner_image || undefined;
    const meta: { title?: string; name?: string; property?: string; content?: string }[] = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: s?.og_title || title },
      { property: "og:description", content: s?.og_description || description },
      { property: "og:url", content: SITE_URL + url },
      { property: "og:type", content: "website" },
    ];
    if (s?.meta_keywords) meta.push({ name: "keywords", content: s.meta_keywords });
    if (image) {
      meta.push({ property: "og:image", content: image });
      meta.push({ name: "twitter:image", content: image });
    }
    const faqItems = (s?.faq ?? []).filter((f) => f?.question && f?.answer);
    return {
      meta,
      links: [{ rel: "canonical", href: SITE_URL + url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s?.title ?? title,
            description,
            ...(image ? { image } : {}),
            serviceType: s?.title,
            provider: { "@type": "Organization", name: "AYMOXI", url: "https://www.aymoxi.com" },
            url: `https://www.aymoxi.com${url}`,
          }),
        },
        ...(faqItems.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqItems.map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: { "@type": "Answer", text: f.answer },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: ServiceDetail,
  pendingComponent: () => (
    <div className="grid min-h-[60vh] place-items-center pt-32"><Loader2 className="h-6 w-6 animate-spin text-cocoa" /></div>
  ),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center px-6 pt-32 text-center">
      <div>
        <h1 className="font-display text-3xl font-black text-espresso">Service not found</h1>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-bold text-white hover:bg-cocoa">
          <ArrowLeft className="h-4 w-4" /> All services
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="grid min-h-[60vh] place-items-center px-6 pt-32 text-center">
      <div>
        <h1 className="font-display text-3xl font-black text-espresso">Couldn't load this service</h1>
        <button onClick={reset} className="mt-6 rounded-full bg-espresso px-5 py-3 text-sm font-bold text-white">Retry</button>
      </div>
    </div>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: Service };
  const [related, setRelated] = useState<Service[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    let cancelled = false;
    supabase.from("services").select(SELECT).eq("published", true).neq("slug", service.slug)
      .order("sort_order", { ascending: true }).limit(6)
      .then(({ data }) => { if (!cancelled) setRelated(((data as Service[] | null) ?? [])); });
    return () => { cancelled = true; };
  }, [service.slug]);

  const Icon = iconMap[service.icon ?? ""] ?? Sparkles;
  const features = service.features ?? [];
  const processSteps = service.process ?? [];
  const pricing = service.pricing_tiers ?? [];
  const faq = service.faq ?? [];
  const impactLabel = service.slug === "digital-marketing" ? "Qualified reach" : service.slug === "ai-automation" ? "Tasks automated" : "Growth potential";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#123409] via-[#0f2d08] to-[#0a2205] pt-32 pb-20 text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-copper/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-copper">
              <ArrowLeft className="h-3.5 w-3.5" /> All Services
            </Link>
          </Reveal>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-copper text-espresso">
                  <Icon className="h-6 w-6" />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-black leading-tight sm:text-5xl">{service.title}</h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{service.description}</p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-bold text-espresso hover:bg-white">
                    Start a project <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                    <Phone className="h-4 w-4" /> {PHONE}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div className="scene-3d">
                <div className="card-3d relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#2e6b16] to-[#0a2205]">
                  {service.hero_image ? (
                    <img src={service.hero_image} alt={service.title} className="h-full w-full object-cover" />
                  ) : (
                    <div
                      className="relative grid h-full w-full place-items-center overflow-hidden [perspective:1200px]"
                      aria-label={`${service.title} performance visual`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(185,229,46,0.22),transparent_55%)]" />
                      <div className="service-orbit absolute h-52 w-52 rounded-full border border-copper/25 sm:h-60 sm:w-60" />
                      <div className="service-orbit-reverse absolute h-36 w-36 rounded-full border border-white/15 sm:h-44 sm:w-44" />

                      {/* base isometric plate */}
                      <div className="plate-3d absolute h-36 w-52 rounded-2xl border border-white/10 bg-white/5 shadow-[0_40px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:h-40 sm:w-60">
                        <div className="absolute inset-x-4 top-4 h-1.5 rounded-full bg-white/15" />
                        <div className="absolute inset-x-4 top-8 h-1.5 w-2/3 rounded-full bg-white/10" />
                        <div className="absolute bottom-4 left-4 flex items-end gap-1.5">
                          {[10, 18, 14, 26, 34].map((h, i) => (
                            <span key={i} className="w-2 rounded-t bg-copper/70" style={{ height: `${h}px` }} />
                          ))}
                        </div>
                      </div>

                      {/* floating icon plate */}
                      <div className="plate-3d-alt relative z-10 grid h-24 w-24 place-items-center rounded-3xl border border-white/15 bg-gradient-to-br from-white/20 to-white/5 shadow-[0_30px_45px_-20px_rgba(0,0,0,0.75)] backdrop-blur-md">
                        <Icon className="service-icon-float h-11 w-11 text-copper drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]" />
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2.5 sm:bottom-5 sm:left-5 sm:right-5 sm:gap-3">
                        <div className="rounded-xl border border-white/10 bg-white/10 p-2.5 shadow-[0_10px_20px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-3">
                          <span className="flex items-center gap-1 text-[11px] text-white/70 sm:text-xs">
                            <TrendingUp className="h-3.5 w-3.5 text-copper" /> {impactLabel}
                          </span>
                          <strong className="mt-1 block font-display text-lg text-white sm:text-xl">0 → 100×</strong>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/10 p-2.5 shadow-[0_10px_20px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-3">
                          <span className="flex items-center gap-1 text-[11px] text-white/70 sm:text-xs">
                            <Zap className="h-3.5 w-3.5 text-copper" /> Delivery
                          </span>
                          <strong className="mt-1 block font-display text-lg text-white sm:text-xl">Built to scale</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
          <Reveal>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Overview</span>
              <h2 className="mt-2 font-display text-3xl font-black text-espresso sm:text-4xl">What you get</h2>
              <div className="prose prose-espresso mt-5 max-w-none text-base leading-relaxed text-foreground/75">
                {(service.long_description ?? service.description).replace(/\\n/g, "\n").split(/\n{2,}/).map((p, i) => (
                  <p key={i} className="mb-4">{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl border border-espresso/10 bg-sand/40 p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Includes</p>
              <ul className="mt-4 space-y-3 text-sm">
                {(service.tags ?? []).map((t) => (
                  <li key={t} className="flex items-start gap-2 text-espresso/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cocoa" /> {t}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-bold text-white hover:bg-cocoa">
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-espresso/15 px-5 py-3 text-sm font-bold text-espresso hover:bg-white">
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Banner */}
      {service.banner_image && (
        <section
          className="relative min-h-[280px] bg-cover bg-center py-20 text-white sm:min-h-[360px]"
          style={{ backgroundImage: `linear-gradient(rgba(4,25,27,0.65), rgba(4,25,27,0.75)), url(${service.banner_image})` }}
        >
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
            <Reveal>
              <h2 className="font-display text-3xl font-black leading-tight sm:text-4xl">Ready to launch {service.title.toLowerCase()}?</h2>
              <p className="mt-3 text-white/80">Book a free 30-minute consultation with our team.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-bold text-espresso hover:bg-white">
                  Book a call <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20">
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="bg-sand/40 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Features</span>
              <h2 className="mt-2 font-display text-3xl font-black text-espresso sm:text-4xl">What's included</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={i} delay={(i % 3) * 60}>
                  <div className="scene-3d h-full"><div className="card-3d flex h-full items-start gap-3 rounded-2xl border border-espresso/10 bg-white p-5">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-copper/20 text-cocoa">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-espresso">{f}</p>
                  </div></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {processSteps.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Process</span>
              <h2 className="mt-2 font-display text-3xl font-black text-espresso sm:text-4xl">How we work</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((p, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="scene-3d h-full"><div className="card-3d h-full rounded-3xl border border-espresso/10 bg-white p-6">
                    <span className="font-display text-3xl font-black text-copper">{p.step ?? String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-2 font-display text-lg font-bold text-espresso">{p.title}</p>
                    {p.description && <p className="mt-2 text-sm text-foreground/70">{p.description}</p>}
                  </div></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      {pricing.length > 0 && (
        <section className="bg-sand/40 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Pricing</span>
              <h2 className="mt-2 font-display text-3xl font-black text-espresso sm:text-4xl">Simple, transparent pricing</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pricing.map((tier, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="scene-3d h-full"><div className={`card-3d flex h-full flex-col rounded-3xl border p-7 ${tier.featured ? "border-copper bg-espresso text-white" : "border-espresso/10 bg-white"}`}>
                    <p className={`font-display text-lg font-black ${tier.featured ? "text-copper" : "text-espresso"}`}>{tier.name}</p>
                    {tier.description && <p className={`mt-1 text-sm ${tier.featured ? "text-white/70" : "text-foreground/70"}`}>{tier.description}</p>}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className={`font-display text-4xl font-black ${tier.featured ? "text-white" : "text-espresso"}`}>{tier.price}</span>
                      {tier.period && <span className={`text-sm ${tier.featured ? "text-white/60" : "text-foreground/60"}`}>/ {tier.period}</span>}
                    </div>
                    <ul className="mt-5 flex-1 space-y-2 text-sm">
                      {(tier.features ?? []).map((f, fi) => (
                        <li key={fi} className={`flex items-start gap-2 ${tier.featured ? "text-white/85" : "text-espresso/85"}`}>
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tier.featured ? "text-copper" : "text-cocoa"}`} /> {f}
                        </li>
                      ))}
                    </ul>
                    <a href={tier.cta_url || "/contact"}
                      className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${tier.featured ? "bg-copper text-espresso hover:bg-white" : "bg-espresso text-white hover:bg-cocoa"}`}>
                      {tier.cta_label || "Get started"} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">FAQ</span>
              <h2 className="mt-2 font-display text-3xl font-black text-espresso sm:text-4xl">Frequently asked questions</h2>
            </div>
            <div className="space-y-3">
              {faq.map((item, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-espresso/10 bg-sand/30">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="font-semibold text-espresso">{item.question}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-cocoa transition ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && item.answer && (
                    <div className="border-t border-espresso/10 bg-white px-5 py-4 text-sm leading-relaxed text-foreground/75">
                      {item.answer.replace(/\\n/g, "\n").split(/\n{2,}/).map((p, pi) => <p key={pi} className="mb-2">{p}</p>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-sand/40 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <h3 className="font-display text-2xl font-black text-espresso sm:text-3xl">Related Services</h3>
              <Link to="/services" className="text-sm font-bold text-cocoa hover:text-espresso">View all →</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const RIcon = iconMap[r.icon ?? ""] ?? Sparkles;
                return (
                  <Link key={r.id} to="/services/$slug" params={{ slug: r.slug }}
                    className="scene-3d group block h-full"><span className="card-3d flex h-full flex-col rounded-3xl border border-espresso/10 bg-white p-6">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-espresso text-copper">
                      <RIcon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-display text-lg font-black text-espresso">{r.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-foreground/65">{r.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cocoa">
                      Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
