import { ArrowRight, TrendingUp } from "lucide-react";
import { useLiveList } from "@/lib/use-live-list";
import { Reveal } from "@/components/site/Reveal";

type BeforeAfterRow = {
  id: string;
  title: string;
  client: string | null;
  category: string | null;
  before_url: string | null;
  after_url: string | null;
  metric_label: string | null;
  metric_value: string | null;
  summary: string | null;
  link_url: string | null;
};

export function BeforeAfterSection() {
  const { rows } = useLiveList<BeforeAfterRow>("before_after", { orderBy: { column: "sort_order" } });
  if (rows.length === 0) return null;

  return (
    <section className="bg-sand/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Before &amp; after</span>
            <h2 className="mt-2 font-display text-3xl font-black text-espresso sm:text-4xl">
              The change our work made.
            </h2>
            <p className="mt-3 text-sm text-foreground/65 sm:text-base">
              Real projects, with the numbers our clients measured afterwards.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {rows.map((r, i) => (
            <Reveal key={r.id} delay={i * 70}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-white transition hover:-translate-y-1 hover:border-cocoa/35 hover:shadow-lg">
                {(r.before_url || r.after_url) && (
                  <div className="grid grid-cols-2 gap-px bg-espresso/10">
                    <div className="relative bg-sand">
                      {r.before_url && (
                        <img src={r.before_url} alt="Before" className="h-36 w-full object-cover" loading="lazy" />
                      )}
                      <span className="absolute left-2 top-2 rounded-full bg-espresso/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Before
                      </span>
                    </div>
                    <div className="relative bg-sand">
                      {r.after_url && (
                        <img src={r.after_url} alt="After" className="h-36 w-full object-cover" loading="lazy" />
                      )}
                      <span className="absolute left-2 top-2 rounded-full bg-copper px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-espresso">
                        After
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  {r.category && (
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cocoa">{r.category}</span>
                  )}
                  <h3 className="mt-2 font-display text-xl font-black text-espresso">{r.title}</h3>
                  {r.client && <p className="mt-1 text-xs text-foreground/55">{r.client}</p>}
                  {r.summary && <p className="mt-3 text-sm text-foreground/70">{r.summary}</p>}

                  {r.metric_value && (
                    <div className="mt-5 flex items-center gap-3 rounded-2xl bg-sand/70 px-4 py-3">
                      <TrendingUp className="h-4 w-4 shrink-0 text-cocoa" />
                      <div>
                        <p className="font-display text-xl font-black text-espresso">{r.metric_value}</p>
                        {r.metric_label && <p className="text-[11px] text-foreground/60">{r.metric_label}</p>}
                      </div>
                    </div>
                  )}

                  {r.link_url && (
                    <a
                      href={r.link_url}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-cocoa hover:text-espresso"
                    >
                      View case study <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
