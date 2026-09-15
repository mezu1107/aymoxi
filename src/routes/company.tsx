import { SITE_URL } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";
import { AboutBlocks, type Block } from "@/components/site/AboutBlocks";

const COMPANY_KEYS = ["story", "mission", "vision", "values", "philosophy", "capabilities"];

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Our Company — Story, Mission & Vision | AYMOXI" },
      { name: "description", content: "The AYMOXI story, our mission, vision and the philosophy behind how we build software, apps and growth systems for clients worldwide." },
      { property: "og:title", content: "Our Company — Story, Mission & Vision | AYMOXI" },
      { property: "og:description", content: "The AYMOXI story, our mission, vision and the philosophy behind how we build software, apps and growth systems." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/company" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/company" }],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  useApplyPageSeo("/company");
  const { rows, loading } = useLiveList<Block>("about_blocks", { orderBy: { column: "sort_order", ascending: true } });
  const blocks = rows.filter((b) => COMPANY_KEYS.includes(b.section_key));

  return (
    <>
      <PageHeader
        eyebrow="Our Company"
        title="Who we are, and what drives us."
        description="Our story, mission, vision and the working principles behind every AYMOXI project."
      />

      {loading ? (
        <div className="grid place-items-center py-24 text-sm text-foreground/50">Loading…</div>
      ) : blocks.length === 0 ? (
        <div className="mx-auto max-w-4xl px-6 py-24 text-center text-sm text-foreground/50">Company details coming soon.</div>
      ) : (
        <AboutBlocks rows={blocks} />
      )}

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] bg-espresso p-10 text-cream shadow-luxury sm:p-14">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Let's build something worth keeping</h2>
              <p className="mt-4 max-w-2xl text-cream/75">Share your goals and we'll map the right technology, budget and team for it.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-cream px-8 py-3.5 text-sm font-semibold text-espresso hover:bg-white">
                  Talk to us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/directors" className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-3.5 text-sm font-semibold text-cream hover:bg-cream/10">
                  Meet the directors
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
