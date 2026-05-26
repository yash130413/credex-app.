import Link from "next/link";
import { GitFork, X } from "lucide-react";

const cols = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "SDK", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "SOC 2", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-5 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h4M8 7h4M7 2v4M7 8v4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="text-background"
                  />
                </svg>
              </span>
              <span className="font-semibold text-[15px] tracking-tight">Credex</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              AI spend auditing for engineering teams.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-colors"
              >
                <GitFork className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-widest">
                {col.heading}
              </p>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Credex, Inc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
