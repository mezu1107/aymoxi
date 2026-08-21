import { SITE_URL } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { ArrowRight, Check, Sparkles, Code2, Smartphone, Cloud, Shield, Search, Megaphone, Users, Palette, Database, ShoppingCart, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — AYMOXI" },
      { name: "description", content: "Web, mobile, AI, cloud, security, marketing and SEO services from AYMOXI." },
      { property: "og:title", content: "Services — AYMOXI" },
      { property: "og:description", content: "Web, mobile, AI, cloud, security, marketing and SEO services from AYMOXI." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/services" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/services" }],
  }),
  component: ServicesPage,
});

const iconMap: Record<string, LucideIcon> = {
  Code2, Smartphone, Sparkles, Cloud, Shield, Search, Megaphone, Users, Palette, Database, ShoppingCart,
};

type ServiceRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  tags: string[] | null;
};

function ServicesPage() {
  useApplyPageSeo("/services");
  const { rows, loading } = useLiveList<ServiceRow>("services", { orderBy: { column: "sort_order" } });

  return (
    <>
      <PageHeader eyebrow="Services" title="Everything you need. Nothing you don't." description="A single premium partner for design, engineering, AI, cloud and growth." />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {loading ? (
            <div className="grid place-items-center py-24 text-sm text-foreground/50">Loading services…</div>
          ) : rows.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-espresso/20 p-12 text-center text-sm text-foreground/50">No services published yet.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((s, i) => {
                const Icon = iconMap[s.icon ?? ""] ?? Sparkles;
                return (
                  <Reveal key={s.id} delay={(i % 3) * 100}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:border-copper/40 hover:shadow-luxury"
                    >
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-espresso text-cream transition group-hover:bg-copper">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 font-display text-xl font-bold text-espresso">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70">{s.description}</p>
                      {s.tags && s.tags.length > 0 && (
                        <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                          {s.tags.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-cocoa" /> {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cocoa">
                        View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
