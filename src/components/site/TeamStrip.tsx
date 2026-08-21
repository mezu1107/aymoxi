import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";

type Member = {
  id: string;
  name: string;
  slug: string | null;
  role_title: string | null;
  bio: string | null;
  photo_url: string | null;
};

export function TeamStrip() {
  const { rows } = useLiveList<Member>("team_members", { orderBy: { column: "sort_order" } });
  if (rows.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-espresso">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" /> Our Team
          </span>
          <h2 className="mt-4 font-display text-3xl font-black leading-tight text-espresso sm:text-4xl">
            The people who will actually build it
          </h2>
          <p className="mt-3 text-sm text-foreground/65 sm:text-base">
            Small, senior and accountable. You always know exactly who is working on your project.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.slice(0, 3).map((m, i) => {
            const inner = (
              <div className="group h-full overflow-hidden rounded-3xl border border-espresso/10 bg-card shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-luxury">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  {m.photo_url ? (
                    <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#2e6b16] to-[#0a2205]">
                      <span className="font-display text-5xl font-black text-copper">{m.name.slice(0, 1)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cocoa">{m.role_title}</p>
                  <h3 className="mt-1.5 font-display text-xl font-black text-espresso">{m.name}</h3>
                  {m.bio && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/65">{m.bio}</p>}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cocoa">
                    View profile <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            );
            return (
              <Reveal key={m.id} delay={i * 70}>
                {m.slug ? (
                  <Link to="/team/$slug" params={{ slug: m.slug }} className="block h-full">{inner}</Link>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link to="/team" className="inline-flex items-center gap-2 rounded-full border border-espresso/15 px-6 py-3 text-sm font-bold text-espresso hover:bg-sand">
            Meet the whole team <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
