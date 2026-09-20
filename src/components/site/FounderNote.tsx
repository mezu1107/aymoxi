import { Quote } from "lucide-react";
import { useLiveList } from "@/lib/use-live-list";
import { Reveal } from "@/components/site/Reveal";

type NoteRow = {
  id: string;
  name: string;
  role_title: string | null;
  photo_url: string | null;
  signature_name: string | null;
  heading: string;
  body: string;
};

export function FounderNote() {
  const { rows } = useLiveList<NoteRow>("founder_notes", { orderBy: { column: "sort_order" } });
  const note = rows[0];
  if (!note) return null;

  return (
    <section className="bg-espresso py-20 text-white sm:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-12">
            <Quote className="h-8 w-8 text-copper" />
            <h2 className="mt-5 font-display text-3xl font-black sm:text-4xl">{note.heading}</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/75 sm:text-base">
              {note.body.split(/\n\s*\n/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
              {note.photo_url ? (
                <img src={note.photo_url} alt={note.name} className="h-14 w-14 rounded-2xl object-cover" />
              ) : (
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-copper/20 font-display text-lg font-black text-copper">
                  {note.name.charAt(0)}
                </div>
              )}
              <div>
                {note.signature_name && (
                  <p className="font-display text-xl font-black text-copper">{note.signature_name}</p>
                )}
                <p className="text-sm font-bold">{note.name}</p>
                {note.role_title && <p className="text-xs text-white/55">{note.role_title}</p>}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
