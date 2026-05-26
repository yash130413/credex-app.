"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Users,
  MessageSquare,
  Code2,
  GitBranch,
  Sparkles,
  AlertTriangle,
  TrendingDown,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import type { AuditRecommendation, AuditPriority, AuditProvider } from "@/types/audit-engine";

// ── Config ────────────────────────────────────────────────────────────────────

const PRIORITY_CONFIG: Record<
  AuditPriority,
  { label: string; badge: string; dot: string; glow: string; bar: string; accent: string }
> = {
  Critical: {
    label: "Critical",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    dot: "bg-red-400",
    glow: "rgba(248,113,113,0.07)",
    bar: "bg-red-500",
    accent: "#f87171",
  },
  High: {
    label: "High",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    dot: "bg-orange-400",
    glow: "rgba(251,146,60,0.06)",
    bar: "bg-orange-500",
    accent: "#fb923c",
  },
  Medium: {
    label: "Medium",
    badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    dot: "bg-yellow-400",
    glow: "rgba(251,191,36,0.05)",
    bar: "bg-yellow-500",
    accent: "#fbbf24",
  },
  Low: {
    label: "Low",
    badge: "bg-white/5 text-muted-foreground border-white/10",
    dot: "bg-muted-foreground/50",
    glow: "rgba(255,255,255,0.02)",
    bar: "bg-white/20",
    accent: "rgba(255,255,255,0.3)",
  },
};

const PROVIDER_CONFIG: Record<
  AuditProvider,
  { badge: string; accent: string; icon: React.ElementType; iconColor: string }
> = {
  ChatGPT: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", accent: "#34d399", icon: MessageSquare, iconColor: "#34d399" },
  Claude:  { badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",       accent: "#fbbf24", icon: Sparkles,      iconColor: "#fbbf24" },
  Cursor:  { badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",    accent: "#a78bfa", icon: Code2,         iconColor: "#a78bfa" },
  Copilot: { badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",             accent: "#38bdf8", icon: GitBranch,     iconColor: "#38bdf8" },
  Gemini:  { badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",          accent: "#60a5fa", icon: Layers,        iconColor: "#60a5fa" },
};

const CONFIDENCE_CONFIG = (score: number) => {
  if (score >= 85) return { label: "High confidence",   text: "text-emerald-400", bar: "bg-emerald-500", icon: ShieldCheck };
  if (score >= 70) return { label: "Medium confidence", text: "text-yellow-400",  bar: "bg-yellow-500",  icon: ShieldCheck };
  return               { label: "Low confidence",    text: "text-orange-400",  bar: "bg-orange-500",  icon: AlertTriangle };
};

// ── Savings pill ──────────────────────────────────────────────────────────────
function SavingsPill({ monthly, annual, index }: { monthly: number; annual: number; index: number }) {
  return (
    <div className="flex flex-col items-end gap-0.5 shrink-0">
      <div className="flex items-baseline gap-1">
        <AnimatedCounter
          value={monthly}
          formatter={(v) => formatCurrency(v)}
          className="text-lg font-bold text-emerald-400 tabular-nums leading-tight"
        />
        <span className="text-xs text-muted-foreground">/mo</span>
      </div>
      <AnimatedCounter
        value={annual}
        formatter={(v) => formatCurrency(v)}
        className="text-xs text-muted-foreground tabular-nums"
      />
    </div>
  );
}

// ── Confidence bar ────────────────────────────────────────────────────────────
function ConfidenceBar({ score, index }: { score: number; index: number }) {
  const conf = CONFIDENCE_CONFIG(score);
  const Icon = conf.icon;
  return (
    <div className="flex items-center gap-2 shrink-0" aria-label={`${conf.label}: ${score}/100`}>
      <Icon className={cn("w-3 h-3 shrink-0", conf.text)} aria-hidden="true" />
      <div className="flex flex-col gap-1 min-w-[64px]">
        <div className="w-16 h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", conf.bar)}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.1, ease: "easeOut", delay: index * 0.05 + 0.35 }}
          />
        </div>
        <span className={cn("text-[10px] font-medium tabular-nums", conf.text)}>
          {score}%
        </span>
      </div>
    </div>
  );
}

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
  const ProviderIcon = provider.icon;

  const savingsPct =
    rec.currentCost && rec.currentCost > 0
      ? Math.round(((rec.currentCost - (rec.optimizedCost ?? 0)) / rec.currentCost) * 100)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.05 }}
      className="group rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-200 hover:border-white/[0.14]"
      style={{
        background: `linear-gradient(135deg, ${priority.glow} 0%, oklch(0.13 0.015 277) 50%)`,
      }}
    >
      {/* Priority accent line */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, ${priority.accent}80, ${provider.accent}40, transparent)`,
        }}
      />

      {/* Main row */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
        aria-expanded={expanded}
      >
        {/* Provider icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-105"
          style={{ background: `${provider.accent}15`, border: `1px solid ${provider.accent}25` }}
        >
          <ProviderIcon
            className="w-4 h-4"
            style={{ color: provider.iconColor }}
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={cn("text-[10px] font-semibold px-2 py-0.5 gap-1.5 h-5", priority.badge)}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", priority.dot)} aria-hidden="true" />
              {priority.label}
            </Badge>
            <Badge
              variant="outline"
              className={cn("text-[10px] font-medium px-2 py-0.5 h-5", provider.badge)}
            >
              {rec.provider}
            </Badge>
            {rec.affectedUsers != null && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Users className="w-3 h-3" aria-hidden="true" />
                {rec.affectedUsers} users
              </span>
            )}
          </div>

          {/* Title */}
          <p className="text-sm font-semibold leading-snug">{rec.title}</p>

          {/* Recommendation */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {rec.recommendation}
          </p>
        </div>

        {/* Right side: savings + confidence + chevron */}
        <div className="flex items-center gap-4 shrink-0 ml-2">
          {/* Savings */}
          <SavingsPill monthly={rec.monthlySavings} annual={rec.annualSavings} index={index} />

          {/* Confidence */}
          <div className="hidden sm:block">
            <ConfidenceBar score={rec.confidenceScore} index={index} />
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
          >
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
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
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-4 border-t border-white/[0.05] flex flex-col gap-5">

              {/* Mobile confidence */}
              <div className="sm:hidden">
                <ConfidenceBar score={rec.confidenceScore} index={index} />
              </div>

              {/* Cost delta */}
              {rec.currentCost != null && rec.optimizedCost != null && (
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 flex flex-col gap-0.5 min-w-[100px]">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Current</span>
                    <span className="text-sm font-semibold tabular-nums">{formatCurrency(rec.currentCost)}/mo</span>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" aria-hidden="true" />

                  <div className="rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20 px-4 py-3 flex flex-col gap-0.5 min-w-[100px]">
                    <span className="text-[10px] text-emerald-400/60 uppercase tracking-wider">Optimized</span>
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
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <TrendingDown className="w-3 h-3 text-muted-foreground/60" aria-hidden="true" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                    Reasoning
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-white/[0.06]">
                  {rec.reason}
                </p>
              </div>

              {/* Rule ID */}
              <code className="text-[10px] font-mono text-muted-foreground/40 self-start">
                {rec.ruleId}
              </code>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
