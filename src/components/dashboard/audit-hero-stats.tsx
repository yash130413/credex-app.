"use client";

import { motion } from "framer-motion";
import { TrendingDown, AlertTriangle, Layers } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { formatCurrency } from "@/lib/utils";
import type { AuditEngineResult } from "@/types/audit-engine";

// ── Radial gauge ──────────────────────────────────────────────────────────────
function OptimizationGauge({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const filled = circ * (score / 100);
  const color =
    score >= 75 ? "#34d399" : score >= 50 ? "#fbbf24" : "#f87171";

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        {/* Track */}
        <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
        {/* Fill */}
        <motion.circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - filled }}
          transition={{ duration: 1.6, ease: [0.34, 1.2, 0.64, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedCounter
          value={score}
          formatter={(v) => `${Math.round(v)}`}
          className="text-xl font-bold tabular-nums leading-none"
        />
        <span className="text-[10px] text-muted-foreground mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function HeroStat({
  label,
  sublabel,
  icon: Icon,
  iconColor,
  children,
  delay,
}: {
  label: string;
  sublabel: string;
  icon: React.ElementType;
  iconColor: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className="relative flex-1 min-w-0 rounded-2xl border border-white/[0.07] bg-card overflow-hidden p-6 flex flex-col gap-4"
    >
      {/* Subtle top-left glow */}
      <div
        className="absolute -top-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${iconColor}18 0%, transparent 70%)` }}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${iconColor}15` }}
        >
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {children}
        <span className="text-xs text-muted-foreground">{sublabel}</span>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function AuditHeroStats({ result }: { result: AuditEngineResult }) {
  const wastePercent =
    result.totalCurrentSpend > 0
      ? (result.totalMonthlySavings / result.totalCurrentSpend) * 100
      : 0;

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Monthly savings */}
      <HeroStat
        label="Monthly Savings"
        sublabel={`${wastePercent.toFixed(1)}% of total spend recoverable`}
        icon={TrendingDown}
        iconColor="#34d399"
        delay={0}
      >
        <AnimatedCounter
          value={result.totalMonthlySavings}
          formatter={(v) => formatCurrency(v)}
          className="text-3xl font-bold tracking-tight text-emerald-400 tabular-nums"
        />
      </HeroStat>

      {/* Annual savings */}
      <HeroStat
        label="Annual Savings"
        sublabel="Projected over 12 months"
        icon={TrendingDown}
        iconColor="#818cf8"
        delay={0.08}
      >
        <AnimatedCounter
          value={result.totalAnnualSavings}
          formatter={(v) => formatCurrency(v)}
          className="text-3xl font-bold tracking-tight tabular-nums"
        />
      </HeroStat>

      {/* Findings */}
      <HeroStat
        label="Findings"
        sublabel={`${result.recommendations.length} total · ${result.providersScanned.length} providers`}
        icon={AlertTriangle}
        iconColor="#f87171"
        delay={0.16}
      >
        <div className="flex items-baseline gap-2">
          <AnimatedCounter
            value={result.criticalCount}
            className="text-3xl font-bold tracking-tight text-red-400 tabular-nums"
          />
          <span className="text-sm text-muted-foreground">critical</span>
          <AnimatedCounter
            value={result.highCount}
            className="text-xl font-semibold tracking-tight text-orange-400 tabular-nums"
          />
          <span className="text-sm text-muted-foreground">high</span>
        </div>
      </HeroStat>

      {/* Optimization score */}
      <HeroStat
        label="Optimization Score"
        sublabel="Higher = less waste detected"
        icon={Layers}
        iconColor="#a78bfa"
        delay={0.24}
      >
        <OptimizationGauge score={result.optimizationScore} />
      </HeroStat>
    </div>
  );
}
