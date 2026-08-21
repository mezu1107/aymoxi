import { SITE_URL } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AYMOXI — Code. Create. Elevate." },
      { name: "description", content: "Aymoxi is a technology and digital solutions company building software, web, mobile, AI, ERP, CRM and ecommerce products for businesses worldwide." },
      { property: "og:title", content: "About AYMOXI — Code. Create. Elevate." },
      { property: "og:description", content: "Aymoxi is a technology and digital solutions company building software, web, mobile, AI, ERP, CRM and ecommerce products for businesses worldwide." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/about" }],
  }),
  component: AboutPage,
});

type Block = {
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

function AboutPage() {
  useApplyPageSeo("/about");
  const { rows } = useLiveList<Block>("about_blocks", { orderBy: { column: "sort_order", ascending: true } });

  // Group consecutive "split" blocks into one two-column section.
  const groups: { kind: string; blocks: Block[] }[] = [];
  for (const b of rows) {
    const last = groups[groups.length - 1];
    if (b.layout === "split" && last?.kind === "split") last.blocks.push(b);
    else groups.push({ kind: b.layout, blocks: [b] });
  }

  return (
    <>
      <PageHeader
        eyebrow="About AYMOXI"
        title="Code. Create. Elevate."
        description="A technology and digital solutions company helping businesses turn ideas into powerful digital products, modern business systems and meaningful digital experiences."
      />

      {groups.map((g) => {
        if (g.kind === "split") return <SplitGroup key={g.blocks[0].id} blocks={g.blocks} />;
        const b = g.blocks[0];
        if (b.layout === "cards") return <CardsBlock key={b.id} b={b} />;
        if (b.layout === "list") return <ListBlock key={b.id} b={b} />;
        return <TextBlock key={b.id} b={b} />;
      })}

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] bg-espresso p-10 text-cream shadow-luxury sm:p-14">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">A technology partner for the digital future</h2>
              <p className="mt-4 max-w-2xl text-cream/75">
                Build better. Think smarter. Grow faster. Tell us about your project and we'll map the right technology, strategy and team for it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-cream px-8 py-3.5 text-sm font-semibold text-espresso hover:bg-white">
                  Work with us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/team" className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-3.5 text-sm font-semibold text-cream hover:bg-cream/10">
                  Meet the team
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
