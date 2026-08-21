import { SITE_URL } from "@/lib/site";
import { createFileRoute } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — AYMOXI" },
      { name: "description", content: "Selected work: websites, mobile apps, AI and enterprise platforms." },
      { property: "og:title", content: "Portfolio — AYMOXI" },
      { property: "og:url", content: SITE_URL + "/portfolio" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/portfolio" }],
  }),
  component: PortfolioPage,
});

type Project = { id: string; title: string; category: string; description: string | null; image_url: string | null; link_url: string | null };

function PortfolioPage() {
  useApplyPageSeo("/portfolio");
  const { rows, loading } = useLiveList<Project>("portfolio", { orderBy: { column: "sort_order" } });
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(() => ["All", ...Array.from(new Set(rows.map((r) => r.category).filter(Boolean)))], [rows]);
  const visible = filter === "All" ? rows : rows.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Selected work, obsessed over." description="A glimpse of the products, platforms and brands we've had the privilege to craft." />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  filter === c ? "bg-cocoa text-cream shadow-soft" : "border border-border bg-card text-espresso hover:border-copper"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid place-items-center py-24 text-sm text-foreground/50">Loading portfolio…</div>
          ) : visible.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-espresso/20 p-12 text-center text-sm text-foreground/50">No projects yet.</div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <a href={p.link_url ?? "#"} target={p.link_url ? "_blank" : undefined} rel="noreferrer" className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-espresso/40">No image</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent opacity-0 transition group-hover:opacity-100" />
                      <div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-espresso opacity-0 transition group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-widest text-cocoa">{p.category}</p>
                      <h3 className="mt-2 font-display text-xl font-bold text-espresso">{p.title}</h3>
                      {p.description && <p className="mt-1 text-sm text-foreground/60">{p.description}</p>}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
