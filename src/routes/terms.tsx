import { SITE_URL } from "@/lib/site";
import { createFileRoute } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — AYMOXI" },
      { name: "description", content: "The terms and conditions that govern the use of the AYMOXI website, content and professional services." },
      { property: "og:title", content: "Terms & Conditions — AYMOXI" },
      { property: "og:description", content: "The terms and conditions that govern the use of the AYMOXI website, content and professional services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/terms" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  useApplyPageSeo("/terms");
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" description="Last updated: July 2026." />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <article className="space-y-6 text-foreground/80">
              {[
                { h: "Acceptance", p: "By accessing this website, you agree to these terms. If you do not agree, please discontinue use of the site." },
                { h: "Use of services", p: "Our services are provided under the master services agreement signed with each client. This site is informational." },
                { h: "Intellectual property", p: "All content on this site is owned by AYMOXI unless otherwise stated. Reproduction requires written permission." },
                { h: "Liability", p: "AYMOXI is not liable for indirect or consequential damages arising from use of this website." },
                { h: "Governing law", p: "These terms are governed by the laws of England and Wales." },
                { h: "Contact", p: "Questions about these terms can be sent to legal@aymoxi.com." },
              ].map((s) => (
                <div key={s.h}>
                  <h2 className="font-display text-2xl font-bold text-espresso">{s.h}</h2>
                  <p className="mt-3 leading-relaxed">{s.p}</p>
                </div>
              ))}
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
