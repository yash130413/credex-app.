"use client";

import { motion } from "framer-motion";
import { TrendingDown, Lightbulb, BarChart3 } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ResultsScoreRing } from "@/components/results/results-score-ring";
import { formatCurrency, cn } from "@/lib/utils";
import type { PublicAuditSafe } from "@/types/database";
import styles from "@/components/components.module.css";

const PRIORITY_COUNTS = (recs: PublicAuditSafe["recommendations"]) => ({
  Critical: recs.filter((r) => r.priority === "Critical").length,
  High:     recs.filter((r) => r.priority === "High").length,
  Medium:   recs.filter((r) => r.priority === "Medium").length,
  Low:      recs.filter((r) => r.priority === "Low").length,
});

const PRIORITY_COLORS: Record<string, string> = {
  Critical: "text-red-400 bg-red-500/10 border-red-500/20",
  High:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Medium:   "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Low:      "text-muted-foreground bg-white/[0.04] border-white/[0.06]",
};

interface Props {
  audit: PublicAuditSafe;
}

export function ResultsHero({ audit }: Props) {
  const counts = PRIORITY_COUNTS(audit.recommendations);
  const providers = [...new Set(audit.recommendations.map((r) => r.provider))];

  const stats = [
    {
      label: "Monthly Savings",
      sublabel: "Recoverable spend",
      icon: TrendingDown,
      iconColor: "#34d399",
      value: (
        <AnimatedCounter
          value={audit.estimated_monthly_savings}
          formatter={formatCurrency}
          className="text-3xl font-bold tabular-nums text-emerald-400"
        />
      ),
    },
    {
      label: "Annual Savings",
      sublabel: "Projected over 12 months",
      icon: TrendingDown,
      iconColor: "#818cf8",
      value: (
        <AnimatedCounter
          value={audit.estimated_annual_savings}
          formatter={formatCurrency}
          className="text-3xl font-bold tabular-nums"
        />
      ),
    },
    {
      label: "Recommendations",
      sublabel: `Across ${providers.length} provider${providers.length !== 1 ? "s" : ""}`,
      icon: Lightbulb,
      iconColor: "#f87171",
      value: (
        <div className="flex items-baseline gap-2 flex-wrap">
          <AnimatedCounter
            value={audit.recommendations.length}
            className="text-3xl font-bold tabular-nums"
          />
          <div className="flex items-center gap-1.5 flex-wrap">
            {(["Critical", "High", "Medium", "Low"] as const)
              .filter((p) => counts[p] > 0)
              .map((p) => (
                <span
                  key={p}
                  className={cn(
                    "text-[10px] font-semibold px-1.5 py-0.5 rounded-full border",
                    PRIORITY_COLORS[p]
                  )}
                >
                  {counts[p]} {p}
                </span>
              ))}
          </div>
        </div>
      ),
    },
    {
      label: "Optimization Score",
      sublabel: "Higher = less waste",
      icon: BarChart3,
      iconColor: "#a78bfa",
      value: <ResultsScoreRing score={audit.optimization_score} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, sublabel, icon: Icon, iconColor, value }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.08 }}
          className="relative rounded-2xl border border-white/[0.07] bg-card p-6 flex flex-col gap-4 overflow-hidden"
        >
          <div
            className={`absolute -top-8 -left-8 w-32 h-32 rounded-full pointer-events-none ${styles.iconGlow}`}
            style={{ "--icon-color": iconColor } as React.CSSProperties}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {label}
            </span>
            <span
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${styles.iconBg}`}
              style={{ "--icon-color": iconColor } as React.CSSProperties}
            >
              <Icon className={`w-4 h-4 ${styles.iconColor}`} style={{ "--icon-color": iconColor } as React.CSSProperties} />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {value}
            <span className="text-xs text-muted-foreground">{sublabel}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
