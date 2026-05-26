"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import type { PublicAuditSafe } from "@/types/database";
import styles from "@/components/components.module.css";

type Rec = PublicAuditSafe["recommendations"][number];

const PRIORITY_CONFIG: Record<Rec["priority"], {
  glow: string; badge: string; dot: string; bar: string;
}> = {
  Critical: { glow: "rgba(248,113,113,0.10)", badge: "bg-red-500/10 text-red-400 border-red-500/20",         dot: "bg-red-400",           bar: "bg-red-400" },
  High:     { glow: "rgba(251,146,60,0.08)",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20", dot: "bg-orange-400",        bar: "bg-orange-400" },
  Medium:   { glow: "rgba(251,191,36,0.07)",  badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", dot: "bg-yellow-400",        bar: "bg-yellow-400" },
  Low:      { glow: "rgba(255,255,255,0.03)", badge: "bg-white/5 text-muted-foreground border-white/10",       dot: "bg-muted-foreground",  bar: "bg-muted-foreground" },
};

const PROVIDER_BADGE: Record<string, string> = {
  ChatGPT: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Claude:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Cursor:  "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Copilot: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Gemini:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

interface Props {
  rec: Rec;
  index: number;
}

export function ResultsRecommendationCard({ rec, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const cfg = PRIORITY_CONFIG[rec.priority];
  const providerBadge = PROVIDER_BADGE[rec.provider] ?? "bg-white/5 text-muted-foreground border-white/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.05 }}
      className={`rounded-2xl border border-white/[0.07] overflow-hidden ${styles.cardGlow}`}
      style={{ "--glow-color": cfg.glow } as React.CSSProperties}
    >
      {/* Collapsed row — always visible */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-start gap-4"
        aria-expanded={expanded}
      >
        {/* Left */}
        <div className="flex-1 min-w-0 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Priority badge */}
            <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border", cfg.badge)}>
              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
              {rec.priority}
            </span>
            {/* Provider badge */}
            <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full border", providerBadge)}>
              {rec.provider}
            </span>
          </div>
          <p className="text-sm font-semibold leading-snug">{rec.title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {rec.recommendation}
          </p>
        </div>

        {/* Right: savings + chevron */}
        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 shrink-0">
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-400 tabular-nums leading-tight">
              {formatCurrency(rec.monthly_savings)}
              <span className="text-xs font-normal text-muted-foreground ml-1">/mo</span>
            </p>
            <p className="text-xs text-muted-foreground tabular-nums">
              {formatCurrency(rec.annual_savings)}/yr
            </p>
          </div>
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
            transition={{ duration: 0.26, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-4 border-t border-white/[0.05] flex flex-col gap-4">
              {/* Savings delta */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 flex flex-col gap-0.5">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Monthly</span>
                  <span className="text-sm font-semibold text-emerald-400 tabular-nums">
                    {formatCurrency(rec.monthly_savings)}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20 px-4 py-3 flex flex-col gap-0.5">
                  <span className="text-[10px] text-emerald-400/70 uppercase tracking-wider">Annual</span>
                  <span className="text-sm font-semibold text-emerald-400 tabular-nums">
                    {formatCurrency(rec.annual_savings)}
                  </span>
                </div>
                {rec.affected_users > 0 && (
                  <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 flex flex-col gap-0.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Affected</span>
                    <span className="text-sm font-semibold">{rec.affected_users} users</span>
                  </div>
                )}
              </div>

              {/* Reasoning */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  Why this matters
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{rec.reason}</p>
              </div>

              {/* Action */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  Recommended action
                </span>
                <p className="text-sm leading-relaxed">{rec.recommendation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
