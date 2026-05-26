"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import type { AuditRecommendation, AuditPriority, AuditProvider } from "@/types/audit-engine";

// ── Visual config ─────────────────────────────────────────────────────────────
const PRIORITY_STYLES: Record<AuditPriority, string> = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const PROVIDER_STYLES: Record<AuditProvider, string> = {
  ChatGPT: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Claude: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Cursor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Copilot: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Gemini: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const CONFIDENCE_COLOR = (score: number) => {
  if (score >= 85) return "bg-emerald-500";
  if (score >= 70) return "bg-yellow-500";
  return "bg-orange-500";
};

// ── Row component ─────────────────────────────────────────────────────────────
function RecommendationRow({ rec }: { rec: AuditRecommendation }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className={cn(
          "border-b border-white/[0.04] transition-colors cursor-pointer",
          expanded ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
        )}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Expand toggle */}
        <td className="pl-4 pr-2 py-3.5 w-8">
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </td>

        {/* Priority */}
        <td className="px-3 py-3.5 whitespace-nowrap">
          <Badge
            variant="outline"
            className={cn("text-[11px] font-semibold px-2 py-0.5", PRIORITY_STYLES[rec.priority])}
          >
            {rec.priority}
          </Badge>
        </td>

        {/* Provider */}
        <td className="px-3 py-3.5 whitespace-nowrap">
          <Badge
            variant="outline"
            className={cn("text-[11px] font-medium px-2 py-0.5", PROVIDER_STYLES[rec.provider])}
          >
            {rec.provider}
          </Badge>
        </td>

        {/* Title */}
        <td className="px-3 py-3.5 min-w-[220px]">
          <p className="text-sm font-medium leading-tight">{rec.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{rec.recommendation}</p>
        </td>

        {/* Confidence */}
        <td className="px-3 py-3.5 w-32 hidden md:table-cell">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", CONFIDENCE_COLOR(rec.confidenceScore))}
                style={{ width: `${rec.confidenceScore}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-7 text-right tabular-nums">
              {rec.confidenceScore}
            </span>
          </div>
        </td>

        {/* Monthly savings */}
        <td className="px-3 py-3.5 text-right whitespace-nowrap">
          <span className="text-sm font-semibold text-emerald-400">
            {formatCurrency(rec.monthlySavings)}
          </span>
          <span className="text-xs text-muted-foreground block">/ mo</span>
        </td>

        {/* Annual savings */}
        <td className="px-3 py-3.5 text-right whitespace-nowrap hidden lg:table-cell">
          <span className="text-sm font-semibold">{formatCurrency(rec.annualSavings)}</span>
          <span className="text-xs text-muted-foreground block">/ yr</span>
        </td>

        {/* Affected users */}
        <td className="px-3 py-3.5 text-right whitespace-nowrap hidden xl:table-cell">
          <span className="text-sm tabular-nums">
            {rec.affectedUsers != null ? rec.affectedUsers : "—"}
          </span>
          {rec.affectedUsers != null && (
            <span className="text-xs text-muted-foreground block">users</span>
          )}
        </td>
      </tr>

      {/* Expanded detail row */}
      {expanded && (
        <tr className="bg-white/[0.02] border-b border-white/[0.04]">
          <td colSpan={8} className="px-10 py-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {rec.currentCost != null && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Current cost</span>
                  <span className="text-sm font-semibold">{formatCurrency(rec.currentCost)}/mo</span>
                </div>
              )}
              {rec.optimizedCost != null && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Optimized cost</span>
                  <span className="text-sm font-semibold text-emerald-400">
                    {formatCurrency(rec.optimizedCost)}/mo
                  </span>
                </div>
              )}
              {rec.affectedUsers != null && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Affected users</span>
                  <span className="text-sm font-semibold">{rec.affectedUsers}</span>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Rule ID</span>
                <code className="text-xs font-mono text-muted-foreground bg-white/[0.04] px-2 py-1 rounded-md w-fit">
                  {rec.ruleId}
                </code>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Reasoning</span>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{rec.reason}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ── Table header ──────────────────────────────────────────────────────────────
function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "px-3 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
        className
      )}
    >
      {children}
    </th>
  );
}

// ── Main table ────────────────────────────────────────────────────────────────
export function RecommendationsTable({ recommendations }: { recommendations: AuditRecommendation[] }) {
  if (recommendations.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-card p-12 text-center text-sm text-muted-foreground">
        No recommendations generated. All utilization metrics are within benchmark thresholds.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.06] bg-white/[0.02]">
            <tr>
              <th className="w-8 pl-4" />
              <Th>Priority</Th>
              <Th>Provider</Th>
              <Th>Finding</Th>
              <Th className="hidden md:table-cell">Confidence</Th>
              <Th className="text-right">Monthly</Th>
              <Th className="text-right hidden lg:table-cell">Annual</Th>
              <Th className="text-right hidden xl:table-cell">Users</Th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <RecommendationRow key={rec.id} rec={rec} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
