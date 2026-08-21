import { SITE_URL } from "@/lib/site";
import { createFileRoute } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AYMOXI" },
      { name: "description", content: "How AYMOXI collects, uses, stores and protects your personal data across our website and services." },
      { property: "og:title", content: "Privacy Policy — AYMOXI" },
      { property: "og:description", content: "How AYMOXI collects, uses, stores and protects your personal data across our website and services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/privacy" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  useApplyPageSeo("/privacy");
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: July 2026." />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <article className="prose-luxury space-y-6 text-foreground/80">
              {[
                { h: "Overview", p: "AYMOXI respects your privacy. This policy explains what we collect, why we collect it, and how we handle your data." },
                { h: "Information we collect", p: "Contact information you submit via forms, technical data such as IP address and browser type, and cookies to improve your experience." },
                { h: "How we use it", p: "To respond to enquiries, deliver services, and improve our website. We never sell your personal data." },
                { h: "Data retention", p: "We retain data only for as long as necessary to provide services or as required by law." },
                { h: "Your rights", p: "You may request access, correction or deletion of your personal data at any time by emailing privacy@aymoxi.com." },
                { h: "Contact", p: "Questions? Reach us at info@aymoxi.com or write to 2nd Floor, Malik Plaza, In front of TCS Office, Hassan Road, Jaranwala, Faisalabad, Pakistan." },
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
