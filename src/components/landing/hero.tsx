"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, TrendingDown, Users, GitMerge, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Inline mock recommendation card ──────────────────────────────────────────
function MockRecCard({
  provider,
  title,
  savings,
  confidence,
  priority,
  delay,
}: {
  provider: string;
  title: string;
  savings: string;
  confidence: number;
  priority: "Critical" | "High" | "Medium";
  delay: number;
}) {
  const priorityStyle = {
    Critical: "text-red-400 bg-red-500/10 border-red-500/20",
    High:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
    Medium:   "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  }[priority];

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className="rounded-xl border border-white/[0.07] bg-[#111118] p-4 flex items-start gap-3"
    >
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${priorityStyle}`}>
            {priority}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">{provider}</span>
        </div>
        <p className="text-xs font-medium leading-snug">{title}</p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 font-semibold">{savings}/yr</span>
          <div className="flex items-center gap-1.5">
            <div className="w-12 h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{confidence}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Mock dashboard panel ──────────────────────────────────────────────────────
function MockDashboard() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.5 }}
      className="w-full max-w-2xl"
    >
      {/* Browser chrome */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0e0e14] overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
          <span className="ml-3 h-5 flex-1 max-w-[180px] rounded bg-white/[0.04] text-[10px] text-muted-foreground flex items-center px-2.5">
            app.credex.ai/audits
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Monthly Savings", value: "$1,840", color: "text-emerald-400" },
              { label: "Annual Savings",  value: "$22,080", color: "text-foreground" },
              { label: "Findings",        value: "7",       color: "text-orange-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground">{s.label}</span>
                <span className={`text-lg font-bold tabular-nums ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Utilization bar chart */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[10px] text-muted-foreground mb-3">Seat utilization by provider</p>
            <div className="flex items-end gap-2 h-16">
              {[
                { label: "ChatGPT", pct: 62, color: "#34d399" },
                { label: "Claude",  pct: 45, color: "#fbbf24" },
                { label: "Cursor",  pct: 38, color: "#818cf8" },
                { label: "Copilot", pct: 71, color: "#38bdf8" },
                { label: "Gemini",  pct: 29, color: "#60a5fa" },
              ].map((b) => (
                <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-sm" style={{ height: `${b.pct}%`, background: `${b.color}60` }} />
                  <span className="text-[8px] text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation cards */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Top findings</p>
            <MockRecCard provider="Cursor"  title="8 inactive Pro seats detected"              savings="$1,920" confidence={88} priority="High"     delay={0.65} />
            <MockRecCard provider="ChatGPT" title="Duplicate usage across Claude + ChatGPT"    savings="$4,200" confidence={81} priority="Critical" delay={0.72} />
            <MockRecCard provider="Copilot" title="12 licenses with <5 sessions in 30 days"    savings="$2,736" confidence={94} priority="High"     delay={0.79} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main hero ─────────────────────────────────────────────────────────────────
export function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.25, delay } }
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const, delay } };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-20">
      {/* Matte background — single subtle radial, no grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* Left — copy */}
        <div className="flex-1 flex flex-col gap-7 max-w-xl">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
              AI spend visibility for engineering teams
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.08)}
            className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.12] text-balance"
          >
            Understand where your{" "}
            <span className="text-white">AI tooling budget</span>{" "}
            is actually going
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.16)}
            className="text-base text-muted-foreground leading-relaxed max-w-md"
          >
            Credex audits seat utilization, detects duplicate vendors, and surfaces
            finance-ready optimization recommendations across ChatGPT, Claude, Cursor,
            Copilot, and Gemini.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            {...fadeUp(0.22)}
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {[
              { icon: ShieldCheck, label: "Deterministic audits" },
              { icon: TrendingDown, label: "Explainable savings" },
              { icon: Users,        label: "Seat-level visibility" },
              { icon: GitMerge,     label: "Vendor overlap detection" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" aria-hidden="true" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.28)} className="flex flex-wrap items-center gap-3">
            <Link href="/signup">
              <Button size="lg" className="h-10 px-5 text-sm font-medium gap-2">
                Start Free Audit
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="https://credex-app-six.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="h-10 px-5 text-sm font-medium border-white/[0.10] bg-transparent hover:bg-white/[0.04] text-muted-foreground hover:text-foreground"
              >
                View Live Demo
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.4 }}
            className="text-xs text-muted-foreground/60"
          >
            No credit card required · Free to run your first audit · 2-minute setup
          </motion.p>
        </div>

        {/* Right — product preview */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <MockDashboard />
        </div>
      </div>
    </section>
  );
}
