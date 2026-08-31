import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import bhiveLogo from "@/assets/bhive-logo.png";

const primaryNav = [
  { to: "/bnext-ai", label: "Program" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/ai-in-action", label: "AI in action" },
] as const;

const resources = [
  { to: "/field-guides", label: "Field guides" },
  { to: "/insights", label: "Insights" },
  { to: "/events", label: "Events" },
  { to: "/search", label: "Search resources" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="group flex items-center" aria-label="The BHive — home">
          <img
            src={bhiveLogo}
            alt="The BHive"
            className="h-8 w-auto md:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-ink"
              activeProps={{ className: "text-ink font-medium" }}
            >
              {n.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setResOpen(true)}
            onMouseLeave={() => setResOpen(false)}
          >
            <Link
              to="/resources"
              onMouseEnter={() => setResOpen(true)}
              onFocus={() => setResOpen(true)}
              aria-haspopup="menu"
              aria-expanded={resOpen}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-ink"
              activeProps={{ className: "text-ink font-medium" }}
            >
              Resources
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            {resOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full min-w-52 rounded-md border border-border bg-paper p-2 shadow-[var(--shadow-frame)]"
              >
                {resources.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    role="menuitem"
                    onClick={() => setResOpen(false)}
                    className="block rounded-sm px-3 py-2 text-sm text-ink hover:bg-muted"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-ink"
            activeProps={{ className: "text-ink font-medium" }}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/start"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-honey-deep hover:text-ink md:inline-flex"
          >
            Find your starting point
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-paper lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {primaryNav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base text-ink"
              >
                {n.label}
              </Link>
            ))}
            <p className="mt-3 eyebrow text-muted-foreground">Resources</p>
            {resources.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base text-ink"
              >
                {r.label}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="mt-3 py-2 text-base text-ink"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="py-2 text-base text-muted-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
