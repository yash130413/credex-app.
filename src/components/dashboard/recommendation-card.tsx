"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import type { AuditRecommendation, AuditPriority, AuditProvider } from "@/types/audit-engine";

// ── Config ────────────────────────────────────────────────────────────────────
const PRIORITY_CONFIG: Record<AuditPriority, { label: string; glow: string; badge: string; dot: string }> = {
  Critical: {
    label: "Critical",
    glow: "rgba(248,113,113,0.12)",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    dot: "bg-red-400",
  },
  High: {
    label: "High",
    glow: "rgba(251,146,60,0.10)",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    dot: "bg-orange-400",
  },
  Medium: {
    label: "Medium",
    glow: "rgba(251,191,36,0.08)",
    badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    dot: "bg-yellow-400",
  },
  Low: {
    label: "Low",
    glow: "rgba(255,255,255,0.04)",
    badge: "bg-white/5 text-muted-foreground border-white/10",
    dot: "bg-muted-foreground",
  },
};

const PROVIDER_CONFIG: Record<AuditProvider, { badge: string; accent: string }> = {
  ChatGPT: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", accent: "#34d399" },
  Claude:  { badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",       accent: "#fbbf24" },
  Cursor:  { badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",    accent: "#a78bfa" },
  Copilot: { badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",             accent: "#38bdf8" },
  Gemini:  { badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",          accent: "#60a5fa" },
};

const CONFIDENCE_CONFIG = (score: number) => {
  if (score >= 85) return { bar: "bg-emerald-500", label: "High confidence", text: "text-emerald-400" };
  if (score >= 70) return { bar: "bg-yellow-500",  label: "Medium confidence", text: "text-yellow-400" };
  return                  { bar: "bg-orange-500",  label: "Low confidence",    text: "text-orange-400" };
};

// ── Card ──────────────────────────────────────────────────────────────────────
export function RecommendationCard({
  rec,
  index,
}: {
  rec: AuditRecommendation;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const priority = PRIORITY_CONFIG[rec.priority];
  const provider = PROVIDER_CONFIG[rec.provider];
  const confidence = CONFIDENCE_CONFIG(rec.confidenceScore);
  const savingsPct =
    rec.currentCost && rec.currentCost > 0
      ? Math.round(((rec.currentCost - (rec.optimizedCost ?? 0)) / rec.currentCost) * 100)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.06 }}
      className="rounded-2xl border border-white/[0.07] overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${priority.glow} 0%, oklch(0.13 0.015 277) 40%)` }}
    >
      {/* Main row */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        {/* Left: badges + title */}
        <div className="flex-1 min-w-0 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={cn("text-[11px] font-semibold px-2 py-0.5 gap-1.5", priority.badge)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", priority.dot)} />
              {priority.label}
            </Badge>
            <Badge variant="outline" className={cn("text-[11px] font-medium px-2 py-0.5", provider.badge)}>
              {rec.provider}
            </Badge>
            <code className="text-[10px] font-mono text-muted-foreground/60 bg-white/[0.04] px-1.5 py-0.5 rounded hidden sm:inline">
              {rec.ruleId}
            </code>
          </div>
          <p className="text-sm font-semibold leading-snug">{rec.title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {rec.recommendation}
          </p>
        </div>

        {/* Right: savings + confidence */}
        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-3 shrink-0">
          {/* Savings */}
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-400 tabular-nums leading-tight">
              {formatCurrency(rec.monthlySavings)}
              <span className="text-xs font-normal text-muted-foreground ml-1">/mo</span>
            </p>
            <p className="text-xs text-muted-foreground tabular-nums">
              {formatCurrency(rec.annualSavings)}/yr
            </p>
          </div>

          {/* Confidence badge */}
          <div className="flex flex-col items-end gap-1 min-w-[80px]">
            <span className={cn("text-[11px] font-medium", confidence.text)}>
              {confidence.label}
            </span>
            <div className="w-20 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full", confidence.bar)}
                initial={{ width: 0 }}
                animate={{ width: `${rec.confidenceScore}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: index * 0.06 + 0.3 }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {rec.confidenceScore}/100
            </span>
          </div>

          {/* Expand chevron */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/[0.05] pt-4 flex flex-col gap-4">
              {/* Cost delta */}
              {rec.currentCost != null && rec.optimizedCost != null && (
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 flex flex-col gap-0.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Current</span>
                    <span className="text-sm font-semibold tabular-nums">{formatCurrency(rec.currentCost)}/mo</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 px-4 py-3 flex flex-col gap-0.5">
                    <span className="text-[10px] text-emerald-400/70 uppercase tracking-wider">Optimized</span>
                    <span className="text-sm font-semibold text-emerald-400 tabular-nums">
                      {formatCurrency(rec.optimizedCost)}/mo
                    </span>
                  </div>
                  {savingsPct !== null && (
                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Reduction</span>
                      <span className="text-sm font-semibold text-emerald-400">{savingsPct}%</span>
                    </div>
                  )}
                  {rec.affectedUsers != null && (
                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Affected</span>
                      <span className="text-sm font-semibold">{rec.affectedUsers} users</span>
                    </div>
                  )}
                </div>
              )}

              {/* Reasoning */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  Reasoning
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{rec.reason}</p>
              </div>

              {/* Rule ID (mobile) */}
              <code className="text-[10px] font-mono text-muted-foreground/50 sm:hidden">
                {rec.ruleId}
              </code>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
