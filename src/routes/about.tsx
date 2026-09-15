import { SITE_URL } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";
import { AboutBlocks, type Block } from "@/components/site/AboutBlocks";

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

function AboutPage() {
  useApplyPageSeo("/about");
  const { rows } = useLiveList<Block>("about_blocks", { orderBy: { column: "sort_order", ascending: true } });

  return (
    <>
      <PageHeader
        eyebrow="About AYMOXI"
        title="Code. Create. Elevate."
        description="A technology and digital solutions company helping businesses turn ideas into powerful digital products, modern business systems and meaningful digital experiences."
      />

      <AboutBlocks rows={rows} />

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
