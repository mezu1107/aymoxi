import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";

type Project = {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  featured: boolean;
};

export function PortfolioPreview() {
  const { rows } = useLiveList<Project>("portfolio", { orderBy: { column: "sort_order" } });
  if (rows.length === 0) return null;
  const featured = rows.filter((r) => r.featured);
  const shown = (featured.length >= 6 ? featured : rows).slice(0, 6);

  return (
    <section className="bg-sand/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-espresso">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" /> Recent Work
          </span>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-espresso sm:text-4xl">
            {rows.length}+ projects shipped and live
          </h2>
          <p className="mt-3 text-sm text-foreground/65 sm:text-base">
            Corporate sites, ERP platforms, e-commerce and AI tools — all built, launched and running in production.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 70}>
              <a
                href={p.link_url ?? "#"}
                target={p.link_url ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-luxury"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#2e6b16] to-[#0a2205] px-6 text-center">
                      <span className="font-display text-xl font-black text-copper">{p.title}</span>
                    </div>
                  )}
                  <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-espresso opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cocoa">{p.category}</p>
                  <h3 className="mt-1.5 font-display text-lg font-black text-espresso">{p.title}</h3>
                  {p.description && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/65">{p.description}</p>}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-bold text-white hover:bg-cocoa">
            View all {rows.length} projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
