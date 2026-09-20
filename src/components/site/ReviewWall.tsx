import { Star, PlayCircle } from "lucide-react";
import { useLiveList } from "@/lib/use-live-list";
import { Reveal } from "@/components/site/Reveal";

type ReviewRow = {
  id: string;
  name: string;
  role_title: string | null;
  company: string | null;
  quote: string;
  media_type: string;
  photo_url: string | null;
  video_url: string | null;
  rating: number;
};

export function ReviewWall() {
  const { rows } = useLiveList<ReviewRow>("review_wall", { orderBy: { column: "sort_order" } });
  if (rows.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Review wall</span>
            <h2 className="mt-2 font-display text-3xl font-black text-espresso sm:text-4xl">
              Words from the people we build for.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {rows.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 60}>
              <figure className="break-inside-avoid rounded-3xl border border-espresso/10 bg-sand/35 p-6 transition hover:border-cocoa/35 hover:bg-white">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: Math.max(0, Math.min(5, r.rating)) }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-copper text-copper" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-espresso/85">“{r.quote}”</blockquote>

                {r.media_type === "video" && r.video_url && (
                  <a
                    href={r.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-cocoa hover:text-espresso"
                  >
                    <PlayCircle className="h-4 w-4" /> Watch the video review
                  </a>
                )}

                <figcaption className="mt-5 flex items-center gap-3 border-t border-espresso/8 pt-4">
                  {r.photo_url ? (
                    <img src={r.photo_url} alt={r.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-espresso text-xs font-black text-copper">
                      {r.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-espresso">{r.name}</p>
                    <p className="text-xs text-foreground/55">
                      {[r.role_title, r.company].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
