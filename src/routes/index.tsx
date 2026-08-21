import { SITE_URL } from "@/lib/site";
import { createFileRoute } from "@tanstack/react-router";
import { useApplyPageSeo } from "@/lib/page-seo";
import { HeroSlider } from "@/components/site/HeroSlider";
import { BentoHome } from "@/components/site/BentoHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AYMOXI — Premium Software, AI & Digital Marketing" },
      { name: "description", content: "AYMOXI builds premium websites, mobile apps, AI automation and growth marketing for ambitious businesses worldwide." },
      { property: "og:title", content: "AYMOXI — Premium Software, AI & Digital Marketing" },
      { property: "og:description", content: "AYMOXI builds premium websites, mobile apps, AI automation and growth marketing for ambitious businesses worldwide." },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  useApplyPageSeo("/");
  return (
    <div className="bg-white text-espresso">
      <HeroSlider />
      <BentoHome />
    </div>
  );
}