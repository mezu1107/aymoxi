import * as Icons from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { useLiveList } from "@/lib/use-live-list";

type BadgeRow = {
  id: string;
  label: string;
  sublabel: string | null;
  icon: string;
};

function iconFor(name: string) {
  const key = name
    .split(/[-_\s]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  const found = (Icons as unknown as Record<string, unknown>)[key] ?? (Icons as unknown as Record<string, unknown>)[name];
  return (found as typeof ShieldCheck) ?? ShieldCheck;
}

export function TrustBar() {
  const { rows } = useLiveList<BadgeRow>("badges", { orderBy: { column: "sort_order" } });
  if (rows.length === 0) return null;
  const loop = [...rows, ...rows];

  return (
    <section className="border-y border-espresso/8 bg-white py-8">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-espresso/50">
        Trusted, Secure &amp; Compliant
      </p>
      <div className="marquee-mask marquee-pause mt-5 overflow-hidden">
        <div className="marquee-track flex w-max gap-3">
          {loop.map((b, i) => {
            const Icon = iconFor(b.icon);
            return (
              <div
                key={`${b.id}-${i}`}
                className="flex shrink-0 items-center gap-2 rounded-2xl border border-espresso/10 bg-sand/40 px-4 py-3 transition hover:border-cocoa/30 hover:bg-white"
              >
                <Icon className="h-4 w-4 shrink-0 text-cocoa" />
                <div>
                  <p className="whitespace-nowrap text-xs font-bold text-espresso">{b.label}</p>
                  {b.sublabel && <p className="whitespace-nowrap text-[11px] text-foreground/55">{b.sublabel}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
