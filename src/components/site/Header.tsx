import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { useLiveList } from "@/lib/use-live-list";

type NavChild = { to: string; label: string; desc?: string };
type NavItem = { to: string; label: string; children?: NavChild[] };

const baseNav: NavItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About",
    children: [
      { to: "/about", label: "Our Company", desc: "Story, mission, vision & philosophy" },
      { to: "/team", label: "Director & Team", desc: "The people behind AYMOXI" },
      { to: "/careers", label: "Careers", desc: "Join the team" },
      { to: "/faq", label: "FAQ", desc: "Common questions answered" },
    ],
  },
  { to: "/services", label: "Services", children: [] },
  {
    to: "/portfolio",
    label: "Portfolio",
    children: [
      { to: "/portfolio", label: "All Projects", desc: "Websites, apps, ERP & AI work" },
      { to: "/pricing", label: "Pricing", desc: "Plans & packages" },
      { to: "/calculator", label: "Cost Calculator", desc: "Estimate your project" },
    ],
  },
  {
    to: "/blog",
    label: "Resources",
    children: [
      { to: "/blog", label: "Blog", desc: "Insights & engineering notes" },
      { to: "/audit", label: "Free Website Audit", desc: "Get a instant health report" },
      { to: "/faq", label: "FAQ", desc: "Common questions answered" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
  { to: "/contact", label: "Contact" },
];

type ServiceRow = { id: string; title: string; slug: string | null; description: string | null };

export function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { rows: services } = useLiveList<ServiceRow>("services", { orderBy: { column: "sort_order" } });

  const nav: NavItem[] = baseNav.map((item) =>
    item.label === "Services"
      ? {
          ...item,
          children: [
            { to: "/services", label: "All Services", desc: "Browse the full catalogue" },
            ...services
              .filter((s) => s.slug)
              .slice(0, 14)
              .map((s) => ({ to: `/services/${s.slug}`, label: s.title, desc: s.description ?? undefined })),
          ],
        }
      : item,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setMobileOpen(null);
  }, [pathname]);

  function enter(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }
  function leave() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/70 bg-white/80 backdrop-blur-xl shadow-soft"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3 lg:px-10">
        <Link to="/" className="flex items-center gap-2" aria-label="AYMOXI — Home">
          <Logo className="h-11 w-auto" />
        </Link>

        <ul className="hidden items-center gap-6 xl:flex">
          {nav.map((l) => {
            const active = pathname === l.to || (l.children ?? []).some((c) => c.to === pathname);
            const hasMenu = (l.children?.length ?? 0) > 0;
            return (
              <li
                key={l.label}
                className="relative"
                onMouseEnter={() => hasMenu && enter(l.label)}
                onMouseLeave={() => hasMenu && leave()}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpenMenu(null)}
                  className={`relative inline-flex items-center gap-1 text-sm font-medium transition ${
                    active ? "text-cocoa" : "text-espresso/70 hover:text-cocoa"
                  }`}
                  aria-haspopup={hasMenu || undefined}
                  aria-expanded={hasMenu ? openMenu === l.label : undefined}
                >
                  {l.label}
                  {hasMenu && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition ${openMenu === l.label ? "rotate-180" : ""}`}
                    />
                  )}
                  {active && <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded bg-copper" />}
                </Link>

                {hasMenu && openMenu === l.label && (
                  <div
                    className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-3xl border border-border bg-white/98 p-3 shadow-luxury backdrop-blur-xl ${
                      (l.children?.length ?? 0) > 6 ? "w-[640px]" : "w-[300px]"
                    }`}
                  >
                    <div className={`grid gap-1 ${(l.children?.length ?? 0) > 6 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {l.children?.map((c) => (
                        <Link
                          key={c.to + c.label}
                          to={c.to}
                          onClick={() => setOpenMenu(null)}
                          className="rounded-2xl px-4 py-2.5 transition hover:bg-sand"
                        >
                          <span className="block text-sm font-semibold text-espresso">{c.label}</span>
                          {c.desc && (
                            <span className="mt-0.5 line-clamp-1 block text-xs text-foreground/55">{c.desc}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/book"
            className="hidden rounded-full border border-espresso/15 px-4 py-2.5 text-sm font-semibold text-espresso transition hover:bg-sand md:inline-flex"
          >
            Book a call
          </Link>
          <Link
            to="/quote"
            className="hidden rounded-full bg-cocoa px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-espresso sm:inline-flex"
          >
            Get a quote
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border p-2 xl:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5 text-espresso" /> : <Menu className="h-5 w-5 text-espresso" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 max-h-[70vh] overflow-y-auto rounded-3xl border border-border bg-white/95 p-6 shadow-luxury backdrop-blur-xl">
          <ul className="space-y-1">
            {nav.map((l) => {
              const active = pathname === l.to;
              const hasMenu = (l.children?.length ?? 0) > 0;
              const expanded = mobileOpen === l.label;
              return (
                <li key={l.label}>
                  <div
                    className={`flex items-center justify-between rounded-2xl transition ${
                      active ? "bg-sand text-cocoa" : "text-espresso/80"
                    }`}
                  >
                    <Link to={l.to} className="flex-1 px-4 py-3 text-base font-medium">
                      {l.label}
                    </Link>
                    {hasMenu && (
                      <button
                        onClick={() => setMobileOpen(expanded ? null : l.label)}
                        aria-label={`Toggle ${l.label} menu`}
                        className="px-4 py-3"
                      >
                        <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {hasMenu && expanded && (
                    <ul className="ml-3 mt-1 space-y-0.5 border-l border-border pl-3">
                      {l.children?.map((c) => (
                        <li key={c.to + c.label}>
                          <Link
                            to={c.to}
                            className="block rounded-xl px-3 py-2 text-sm text-espresso/75 transition hover:bg-sand"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-4 grid gap-2">
            <Link to="/quote" className="inline-flex w-full items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft">Get a quote</Link>
            <Link to="/book" className="inline-flex w-full items-center justify-center rounded-full border border-espresso/15 px-6 py-3 text-sm font-semibold text-espresso">Book a call</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
