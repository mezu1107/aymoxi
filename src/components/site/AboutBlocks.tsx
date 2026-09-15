import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export type Block = {
  id: string;
  section_key: string;
  layout: string;
  eyebrow: string | null;
  title: string;
  body: string | null;
  items: string[] | null;
  image_url: string | null;
};

function splitItem(item: string) {
  const parts = item.split(" — ");
  return parts.length > 1 ? { head: parts[0], rest: parts.slice(1).join(" — ") } : { head: item, rest: "" };
}

function Paragraphs({ body }: { body: string }) {
  return (
    <>
      {body.split(/\n{2,}/).map((p, i) => (
        <p key={i} className="mt-4 leading-relaxed text-foreground/70">{p}</p>
      ))}
    </>
  );
}

function TextBlock({ b }: { b: Block }) {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          {b.eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cocoa">{b.eyebrow}</p>}
          <h2 className="mt-3 font-display text-3xl font-bold text-espresso sm:text-4xl">{b.title}</h2>
          {b.body && <Paragraphs body={b.body} />}
          {b.items && b.items.length > 0 && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {b.items.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-foreground/75 shadow-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cocoa" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function CardsBlock({ b }: { b: Block }) {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="max-w-3xl">
            {b.eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cocoa">{b.eyebrow}</p>}
            <h2 className="mt-3 font-display text-3xl font-bold text-espresso sm:text-4xl">{b.title}</h2>
            {b.body && <Paragraphs body={b.body} />}
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(b.items ?? []).map((item, i) => {
            const { head, rest } = splitItem(item);
            return (
              <Reveal key={item} delay={i * 80}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-luxury">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-copper/15 text-cocoa">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-espresso">{head}</h3>
                  {rest && <p className="mt-2 text-sm leading-relaxed text-foreground/70">{rest}</p>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ListBlock({ b }: { b: Block }) {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          {b.eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cocoa">{b.eyebrow}</p>}
          <h2 className="mt-3 font-display text-3xl font-bold text-espresso sm:text-4xl">{b.title}</h2>
          {b.body && <Paragraphs body={b.body} />}
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {(b.items ?? []).map((item, i) => (
            <Reveal key={item} delay={Math.min(i * 30, 300)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-espresso shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitGroup({ blocks }: { blocks: Block[] }) {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:px-10">
        {blocks.map((b, i) => (
          <Reveal key={b.id} delay={i * 100}>
            <div className="h-full rounded-[2rem] border border-border bg-card p-8 shadow-soft lg:p-10">
              {b.eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cocoa">{b.eyebrow}</p>}
              <h2 className="mt-3 font-display text-2xl font-bold text-espresso sm:text-3xl">{b.title}</h2>
              {b.body && <Paragraphs body={b.body} />}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Renders about_blocks rows, grouping consecutive "split" blocks side by side. */
export function AboutBlocks({ rows }: { rows: Block[] }) {
  const groups: { kind: string; blocks: Block[] }[] = [];
  for (const b of rows) {
    const last = groups[groups.length - 1];
    if (b.layout === "split" && last?.kind === "split") last.blocks.push(b);
    else groups.push({ kind: b.layout, blocks: [b] });
  }

  return (
    <>
      {groups.map((g) => {
        if (g.kind === "split") return <SplitGroup key={g.blocks[0].id} blocks={g.blocks} />;
        const b = g.blocks[0];
        if (b.layout === "cards") return <CardsBlock key={b.id} b={b} />;
        if (b.layout === "list") return <ListBlock key={b.id} b={b} />;
        return <TextBlock key={b.id} b={b} />;
      })}
    </>
  );
}
