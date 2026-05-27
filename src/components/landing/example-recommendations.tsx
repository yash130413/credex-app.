"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/shared/motion";
import { Users, GitMerge, TrendingDown, ShieldCheck } from "lucide-react";

const recs = [
  {
    provider: "Cursor",
    providerColor: "#818cf8",
    icon: Users,
    priority: "High" as const,
    title: "8 inactive Cursor Pro seats detected",
    description:
      "8 licensed users showed no coding activity in the last 30 days. Downgrading these seats would have no impact on active developers.",
    monthlySavings: 160,
    annualSavings: 1920,
    confidence: 88,
    affectedUsers: 8,
  },
  {
    provider: "ChatGPT",
    providerColor: "#34d399",
    icon: GitMerge,
    priority: "Critical" as const,
    title: "Duplicate usage across Claude and ChatGPT",
    description:
      "Both ChatGPT Team ($30/seat) and Claude Pro ($20/seat) are active for the same 14 users on general-purpose workflows. Consolidating to one vendor eliminates redundant licensing.",
    monthlySavings: 350,
    annualSavings: 4200,
    confidence: 81,
    affectedUsers: 14,
  },
  {
    provider: "Copilot",
    providerColor: "#38bdf8",
    icon: TrendingDown,
    priority: "High" as const,
    title: "12 Copilot licenses with fewer than 5 sessions in 30 days",
    description:
      "Only 6 of 18 licensed engineers qualify as power users. Restricting Copilot Business to high-frequency contributors reduces cost without impacting productivity.",
    monthlySavings: 228,
    annualSavings: 2736,
    confidence: 94,
    affectedUsers: 12,
  },
];

const PRIORITY_STYLE = {
  Critical: "text-red-400 bg-red-500/10 border-red-500/20",
  High:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Medium:   "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

function RecCard({
  rec,
  index,
}: {
  rec: (typeof recs)[number];
  index: number;
}) {
  const Icon = rec.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.08 }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col gap-5 hover:bg-white/[0.03] transition-colors"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${rec.providerColor}15`, border: `1px solid ${rec.providerColor}25` }}
        >
          <Icon className="w-4 h-4" style={{ color: rec.providerColor }} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${PRIORITY_STYLE[rec.priority]}`}>
              {rec.priority}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">{rec.provider}</span>
            <span className="text-[10px] text-muted-foreground">· {rec.affectedUsers} users affected</span>
          </div>
          <p className="text-sm font-medium leading-snug">{rec.title}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>

      {/* Metrics row */}
      <div className="flex items-center gap-4 pt-1 border-t border-white/[0.05]">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Annual savings</span>
          <span className="text-base font-semibold text-emerald-400 tabular-nums">
            ${rec.annualSavings.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Monthly</span>
          <span className="text-sm font-medium tabular-nums">${rec.monthlySavings}/mo</span>
        </div>
        <div className="flex flex-col gap-1.5 ml-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-indigo-400" aria-hidden="true" />
            <span className="text-[10px] text-muted-foreground">Confidence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${rec.confidence}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground tabular-nums">{rec.confidence}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExampleRecommendations() {
  return (
    <section className="py-32 px-5 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16">
          <p className="text-xs text-indigo-400 uppercase tracking-widest font-medium mb-4">
            Example findings
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance max-w-xl">
            The kind of recommendations Credex surfaces
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-lg leading-relaxed">
            Every recommendation includes a confidence score, affected user count, and
            the exact reasoning — so your finance team can act on it without a follow-up call.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
          {recs.map((rec, i) => (
            <RecCard key={rec.title} rec={rec} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
