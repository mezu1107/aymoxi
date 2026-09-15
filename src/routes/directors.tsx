import { SITE_URL } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { ArrowRight, BriefcaseBusiness, Linkedin, MapPin, Twitter } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";

export const Route = createFileRoute("/directors")({
  head: () => ({
    meta: [
      { title: "Directors — Leadership at AYMOXI" },
      { name: "description", content: "Meet the directors leading AYMOXI — the people responsible for strategy, engineering and delivery." },
      { property: "og:title", content: "Directors — Leadership at AYMOXI" },
      { property: "og:description", content: "Meet the directors leading AYMOXI — strategy, engineering and delivery." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/directors" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/directors" }],
  }),
  component: DirectorsPage,
});

type Director = {
  id: string;
  name: string;
  slug: string | null;
  role_title: string | null;
  bio: string | null;
  photo_url: string | null;
  location: string | null;
  experience: string | null;
  expertise: string[] | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  member_type: string | null;
};

const COLUMNS =
  "id,name,slug,role_title,bio,photo_url,location,experience,expertise,linkedin_url,twitter_url,member_type,sort_order,published";

function DirectorsPage() {
  useApplyPageSeo("/directors");
  const { rows, loading } = useLiveList<Director>("team_members", {
    orderBy: { column: "sort_order" },
    select: COLUMNS,
  });
  const directors = rows.filter((m) => m.member_type === "director");

  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Our Directors."
        description="The leadership responsible for strategy, engineering standards and client delivery at AYMOXI."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid place-items-center py-24 text-sm text-foreground/50">Loading directors…</div>
          ) : directors.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-espresso/20 p-12 text-center text-sm text-foreground/50">
              No directors published yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {directors.map((d, i) => (
                <Reveal key={d.id} delay={i * 80}>
                  <div className="h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                    <div className="grid gap-0 sm:grid-cols-[180px_minmax(0,1fr)]">
                      <div className="aspect-square w-full overflow-hidden bg-sand">
                        {d.photo_url ? (
                          <img src={d.photo_url} alt={d.name} className="h-full w-full object-cover" loading="lazy" />
                        ) : (
                          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#2e6b16] to-[#0a2205]">
                            <span className="font-display text-4xl font-black text-copper">{d.name.slice(0, 1)}</span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 p-6">
                        {d.role_title && (
                          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cocoa">{d.role_title}</p>
                        )}
                        <h2 className="mt-2 font-display text-2xl font-black text-espresso">{d.name}</h2>
                        {d.bio && <p className="mt-2 text-sm leading-relaxed text-foreground/70">{d.bio}</p>}
                        <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-foreground/60">
                          {d.location && (
                            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-cocoa" />{d.location}</span>
                          )}
                          {d.experience && (
                            <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness className="h-3.5 w-3.5 text-cocoa" />{d.experience}</span>
                          )}
                        </div>
                        {(d.expertise ?? []).length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {(d.expertise ?? []).slice(0, 6).map((e) => (
                              <span key={e} className="rounded-full bg-sand px-3 py-1 text-[11px] font-semibold text-espresso/80">{e}</span>
                            ))}
                          </div>
                        )}
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          {d.slug && (
                            <Link
                              to="/team/$slug"
                              params={{ slug: d.slug }}
                              className="inline-flex items-center gap-1.5 rounded-full bg-espresso px-4 py-2 text-xs font-bold text-white hover:bg-cocoa"
                            >
                              Full profile <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          )}
                          {d.linkedin_url && (
                            <a href={d.linkedin_url} target="_blank" rel="noreferrer" aria-label={`${d.name} on LinkedIn`} className="grid h-8 w-8 place-items-center rounded-full border border-espresso/15 text-espresso hover:bg-sand">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {d.twitter_url && (
                            <a href={d.twitter_url} target="_blank" rel="noreferrer" aria-label={`${d.name} on Twitter`} className="grid h-8 w-8 place-items-center rounded-full border border-espresso/15 text-espresso hover:bg-sand">
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
