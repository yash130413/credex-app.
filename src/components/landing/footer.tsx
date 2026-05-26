import Link from "next/link";
import { GitFork } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const cols = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Project",
    links: [
      { label: "GitHub", href: "https://github.com/yash130413/credex-app" },
      { label: "Live demo", href: "https://credex-app-b68b.vercel.app/" },
      { label: "Report a bug", href: "https://github.com/yash130413/credex-app/issues" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-5 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              AI spend auditing for engineering teams. Open source, built with Next.js.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/yash130413/credex-app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-colors"
              >
                <GitFork className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="https://x.com/yash130413"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) profile"
                className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-colors"
              >
                <XIcon />
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
            © {new Date().getFullYear()} Credex. Built by{" "}
            <Link
              href="https://github.com/yash130413"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              Yash Rohilla
            </Link>
            .
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
