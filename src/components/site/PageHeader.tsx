import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-sand/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[320px] w-[320px] rounded-full bg-copper/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/50">
            <Link to="/" className="hover:text-cocoa">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-espresso">{breadcrumb ?? title}</span>
          </nav>
        </Reveal>
        <Reveal delay={80}>
          {eyebrow && (
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-cocoa">
              {eyebrow}
            </p>
          )}
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-espresso sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={200}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
