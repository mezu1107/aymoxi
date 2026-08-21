import * as Icons from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";
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

  return (
    <section className="border-y border-espresso/8 bg-white py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-espresso/50">
            Trusted, Secure &amp; Compliant
          </p>
        </Reveal>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {rows.map((b, i) => {
            const Icon = iconFor(b.icon);
            return (
              <Reveal key={b.id} delay={i * 40}>
                <div className="flex h-full min-w-0 items-center gap-2 rounded-2xl border border-espresso/10 bg-sand/40 px-3 py-3 transition hover:border-cocoa/30 hover:bg-white">
                  <Icon className="h-4 w-4 shrink-0 text-cocoa" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-espresso">{b.label}</p>
                    {b.sublabel && <p className="truncate text-[11px] text-foreground/55">{b.sublabel}</p>}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
