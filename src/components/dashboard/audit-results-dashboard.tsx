"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AuditHeroStats } from "@/components/dashboard/audit-hero-stats";
import { SavingsBreakdownChart } from "@/components/charts/savings-breakdown-chart";
import { UtilizationChart } from "@/components/charts/utilization-chart";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { formatCurrency, cn } from "@/lib/utils";
import { useAuditForm } from "@/hooks/use-audit-form";
import { useAuditResults } from "@/hooks/use-audit-results";
import type { AuditEngineResult, AuditPriority, AuditProvider, WorkspaceMetrics } from "@/types/audit-engine";
import styles from "@/components/components.module.css";

const PRIORITY_ORDER: AuditPriority[] = ["Critical", "High", "Medium", "Low"];

const PRIORITY_FILTER_STYLES: Record<AuditPriority | "All", string> = {
  All:      "bg-white/[0.06] text-foreground",
  Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  High:     "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Medium:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low:      "bg-white/[0.04] text-muted-foreground",
};

const PROVIDER_COLORS: Record<AuditProvider, string> = {
  ChatGPT: "#34d399",
  Claude:  "#fbbf24",
  Cursor:  "#a78bfa",
  Copilot: "#38bdf8",
  Gemini:  "#60a5fa",
};

interface Props {
  result: AuditEngineResult;
  workspaces: WorkspaceMetrics[];
}

export function AuditResultsDashboard({ result, workspaces }: Props) {
  const { priorityFilter, providerFilter, setPriorityFilter, setProviderFilter, isHydrated: formHydrated } = useAuditForm();
  const { setResults } = useAuditResults();

  useEffect(() => { setResults(result); }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!formHydrated) return null;

  const filtered = result.recommendations.filter((r) => {
    if (priorityFilter !== "All" && r.priority !== priorityFilter) return false;
    if (providerFilter !== "All" && r.provider !== providerFilter) return false;
    return true;
  });

  const filteredSavings = filtered.reduce((s, r) => s + r.monthlySavings, 0);

  // Per-provider summary for the provider filter pills
  const providerSummary = result.providersScanned.map((p) => {
    const recs = result.recommendations.filter((r) => r.provider === p);
    return { provider: p, count: recs.length, savings: recs.reduce((s, r) => s + r.monthlySavings, 0) };
  });

  return (
    <div className="flex flex-col gap-8">
      {/* ── Hero stats ─────────────────────────────────────────────────────── */}
      <AuditHeroStats result={result} />

      {/* ── Charts row ─────────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <SavingsBreakdownChart recommendations={result.recommendations} />
        <UtilizationChart workspaces={workspaces} />
      </div>

      {/* ── Provider summary strip ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
      >
        {providerSummary.map(({ provider, count, savings }) => (
          <button
            key={provider}
            onClick={() => setProviderFilter(providerFilter === provider ? "All" : provider)}
            className={cn(
              "rounded-xl border px-4 py-3 flex flex-col gap-1.5 text-left transition-all",
              providerFilter === provider
                ? "border-white/20 bg-white/[0.07]"
                : "border-white/[0.06] bg-card hover:bg-white/[0.04]"
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${styles.dotBg}`}
                style={{ "--dot-color": PROVIDER_COLORS[provider] } as React.CSSProperties}
              />
              <span className="text-xs font-medium">{provider}</span>
            </div>
            <span className="text-lg font-bold tabular-nums">{count}</span>
            <span
              className={`text-xs font-medium ${styles.dotColor}`}
              style={{ "--dot-color": PROVIDER_COLORS[provider] } as React.CSSProperties}
            >
              {formatCurrency(savings)}/mo
            </span>
          </button>
        ))}
      </motion.div>

      {/* ── Recommendations section ────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        {/* Header + filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold">
              Recommendations
              {filtered.length !== result.recommendations.length && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {filtered.length} of {result.recommendations.length}
                </span>
              )}
            </h2>
            {filteredSavings > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatCurrency(filteredSavings)}/mo in view
              </p>
            )}
          </div>

          {/* Priority filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {(["All", ...PRIORITY_ORDER] as const).map((p) => {
              const count =
                p === "All"
                  ? result.recommendations.length
                  : result.recommendations.filter((r) => r.priority === p).length;
              if (count === 0 && p !== "All") return null;
              return (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                    priorityFilter === p
                      ? PRIORITY_FILTER_STYLES[p]
                      : "border-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                  )}
                >
                  {p}
                  <span className="ml-1.5 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-card p-12 text-center text-sm text-muted-foreground">
            No recommendations match the selected filters.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((rec, i) => (
              <RecommendationCard key={rec.id} rec={rec} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
