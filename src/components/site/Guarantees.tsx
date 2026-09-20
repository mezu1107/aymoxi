import * as Icons from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { useLiveList } from "@/lib/use-live-list";
import { Reveal } from "@/components/site/Reveal";

type GuaranteeRow = {
  id: string;
  title: string;
  description: string | null;
  icon: string;
  detail: string | null;
};

function iconFor(name: string) {
  const key = name
    .split(/[-_\s]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  const found =
    (Icons as unknown as Record<string, unknown>)[key] ??
    (Icons as unknown as Record<string, unknown>)[name];
  return (found as typeof ShieldCheck) ?? ShieldCheck;
}

export function Guarantees() {
  const { rows } = useLiveList<GuaranteeRow>("guarantees", { orderBy: { column: "sort_order" } });
  if (rows.length === 0) return null;

  return (
    <section className="bg-sand/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cocoa">Our promise</span>
            <h2 className="mt-2 font-display text-3xl font-black text-espresso sm:text-4xl">
              What we commit to, in writing.
            </h2>
            <p className="mt-3 text-sm text-foreground/65 sm:text-base">
              Straightforward terms we hold ourselves to on every project — no small print.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {rows.map((g, i) => {
            const Icon = iconFor(g.icon);
            return (
              <Reveal key={g.id} delay={i * 60}>
                <div className="h-full rounded-3xl border border-espresso/10 bg-white p-7 transition hover:-translate-y-1 hover:border-cocoa/35 hover:shadow-lg">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-espresso text-copper">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-black text-espresso">{g.title}</h3>
                  {g.description && <p className="mt-2 text-sm text-foreground/70">{g.description}</p>}
                  {g.detail && (
                    <p className="mt-4 border-t border-espresso/8 pt-4 text-xs text-foreground/55">{g.detail}</p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
