import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Sparkles, ExternalLink } from "lucide-react";
import { getPublicAuditById } from "@/lib/db/audits";
import { ResultsHero } from "@/components/results/results-hero";
import { ResultsFilters } from "@/components/results/results-filters";
import { ResultsLeadCapture } from "@/components/results/results-lead-capture";
import { formatCurrency, cn } from "@/lib/utils";
import type { PublicAuditSafe } from "@/types/database";
import styles from "@/components/components.module.css";

// ── Metadata ──────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let audit: PublicAuditSafe | null = null;
  try {
    audit = await getPublicAuditById(id);
  } catch {
    return { title: "Audit Report | Credex" };
  }

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://credex-app-six.vercel.app";
  const title = `${audit.title} | Credex Audit Report`;
  const description = `This AI spend audit identified ${audit.recommendations.length} optimization opportunities worth ${formatCurrency(audit.estimated_annual_savings)}/yr in savings.`;
  const url = `${APP_URL}/results/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Credex",
      images: [{ url: `${APP_URL}/og-default.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@credexai",
      images: [`${APP_URL}/og-default.png`],
    },
    alternates: { canonical: url },
  };
}

// ── Provider accent colors ────────────────────────────────────────────────────

const PROVIDER_COLORS: Record<string, string> = {
  ChatGPT: "#34d399",
  Claude:  "#fbbf24",
  Cursor:  "#a78bfa",
  Copilot: "#38bdf8",
  Gemini:  "#60a5fa",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ResultsPage({ params }: Props) {
  const { id } = await params;

  let audit: PublicAuditSafe;
  try {
    audit = await getPublicAuditById(id);
  } catch {
    notFound();
  }

  const providers = [...new Set(audit.recommendations.map((r) => r.provider))];

  const providerSummary = providers.map((p) => {
    const recs = audit.recommendations.filter((r) => r.provider === p);
    return {
      provider: p,
      count: recs.length,
      annualSavings: recs.reduce((s, r) => s + r.annual_savings, 0),
      color: PROVIDER_COLORS[p] ?? "#94a3b8",
    };
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle grid background */}
      <div className="fixed inset-0 hero-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-10">

        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Credex</Link>
          <span>/</span>
          <span>Audit Report</span>
        </div>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                Public Report
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{audit.title}</h1>
            <p className="text-sm text-muted-foreground">
              Generated{" "}
              {new Date(audit.created_at).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric",
              })}
              {" · "}
              {audit.recommendations.length} findings across {providers.length} provider{providers.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Link
            href="/"
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] transition-colors text-muted-foreground hover:text-foreground"
          >
            Run your own audit
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>

        {/* ── Hero stats ───────────────────────────────────────────────────── */}
        <ResultsHero audit={audit} />

        {/* ── AI Summary ───────────────────────────────────────────────────── */}
        {audit.ai_summary && (
          <div className="rounded-2xl border border-white/[0.07] bg-card p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                AI Summary
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">{audit.ai_summary}</p>
          </div>
        )}

        {/* ── Provider breakdown ───────────────────────────────────────────── */}
        {providerSummary.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {providerSummary.map(({ provider, count, annualSavings, color }) => (
              <div
                key={provider}
                className="rounded-xl border border-white/[0.06] bg-card px-4 py-3 flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${styles.dotBg}`}
                    style={{ "--dot-color": color } as React.CSSProperties}
                  />
                  <span className="text-xs font-medium truncate">{provider}</span>
                </div>
                <span className="text-lg font-bold tabular-nums">{count}</span>
                <span
                  className={`text-xs font-medium tabular-nums ${styles.dotColor}`}
                  style={{ "--dot-color": color } as React.CSSProperties}
                >
                  {formatCurrency(annualSavings)}/yr
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ── Recommendations ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-base font-semibold">
              Recommendations
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {audit.recommendations.length} total
              </span>
            </h2>
          </div>

          {/* Client filter + list */}
          <ResultsFilters recommendations={audit.recommendations} />
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            This report was generated by{" "}
            <Link href="/" className="text-foreground hover:underline underline-offset-4">
              Credex
            </Link>
            {" "}and contains only sanitized, non-sensitive findings.
          </p>
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08]",
              "bg-white/[0.04] hover:bg-white/[0.07] transition-colors text-foreground"
            )}
          >
            Audit your AI spend
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

      </div>

      {/* Lead capture — fires after 60% scroll depth */}
      <ResultsLeadCapture
        annualSavings={formatCurrency(audit.estimated_annual_savings)}
        recommendationCount={audit.recommendations.length}
      />

    </div>
  );
}
