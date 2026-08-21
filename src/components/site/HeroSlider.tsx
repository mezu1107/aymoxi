import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Cpu, Cloud } from "lucide-react";
import { useEffect, useState } from "react";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";

const slides = [
  {
    bg: slide1,
    tag: "Innovate · Build · Elevate",
    icon: Sparkles,
    title: "Empowering Businesses Through",
    typewriter: ["Digital Innovation", "Smart Software", "Modern Design"],
    subtitle:
      "We craft scalable websites, powerful apps and AI systems that turn ambitious ideas into market-ready products.",
    cta: { label: "Get Started", to: "/contact" as const },
    alt: { label: "Our Services", to: "/services" as const },
  },
  {
    bg: slide2,
    tag: "Next-Gen AI Solutions",
    icon: Cpu,
    title: "Automate Everything With",
    typewriter: ["AI Agents", "Machine Learning", "Predictive Analytics"],
    subtitle:
      "From intelligent chatbots to bespoke AI copilots — automate workflows, reduce costs and unlock new revenue streams.",
    cta: { label: "Explore AI", to: "/services" as const },
    alt: { label: "Book a Demo", to: "/contact" as const },
  },
  {
    bg: slide3,
    tag: "Cloud · Security · Scale",
    icon: Cloud,
    title: "Enterprise-Grade",
    typewriter: ["Cloud Hosting", "Cyber Security", "SaaS Platforms"],
    subtitle:
      "99.99% uptime, zero-trust architecture and elastic scale — infrastructure your business can grow on with confidence.",
    cta: { label: "View Solutions", to: "/portfolio" as const },
    alt: { label: "Talk to Us", to: "/contact" as const },
  },
];

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const speed = del ? 45 : 90;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, txt.length + 1);
        setTxt(next);
        if (next === word) setTimeout(() => setDel(true), 1400);
      } else {
        const next = word.slice(0, Math.max(0, txt.length - 1));
        setTxt(next);
        if (next === "") {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);

  return (
    <span className="inline-block bg-copper/95 px-3 py-1 rounded-2xl text-espresso">
      {txt}
      <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[3px] animate-pulse bg-espresso align-middle" />
    </span>
  );
}

export function HeroSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== idx}
        >
          <img
            src={s.bg}
            alt=""
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding={i === 0 ? "sync" : "async"}
            className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${
              i === idx ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-espresso/85 via-cocoa/70 to-espresso/60" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(185,229,46,0.18),transparent_55%)]" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pt-28 pb-16 lg:px-10 lg:pt-32">
        {slides.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className={`transition-all duration-700 ${
                i === idx ? "opacity-100 translate-y-0" : "pointer-events-none absolute opacity-0 translate-y-6"
              }`}
              style={{ position: i === idx ? "relative" : "absolute" }}
            >
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-copper backdrop-blur-md sm:text-xs">
                  <Icon className="h-3.5 w-3.5" /> {s.tag}
                </span>
                {i === idx ? (
                  <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    {s.title}
                    <br />
                    <Typewriter words={s.typewriter} />
                  </h1>
                ) : (
                  <p aria-hidden="true" className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    {s.title}
                    <br />
                    <span>{s.typewriter[0]}</span>
                  </p>
                )}
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
                  {s.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    to={s.cta.to}
                    className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3.5 text-sm font-bold text-espresso shadow-luxury transition hover:scale-[1.03] sm:px-8 sm:py-4"
                  >
                    {s.cta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={s.alt.to}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 sm:px-8 sm:py-4"
                  >
                    {s.alt.label}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-10 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-10 bg-copper" : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
