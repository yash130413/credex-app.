import {
  BarChart3,
  Zap,
  Users,
  Bell,
  GitMerge,
  Shield,
} from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/motion";

const features = [
  {
    icon: BarChart3,
    title: "Multi-provider spend dashboard",
    description:
      "One view across ChatGPT, Claude, Cursor, GitHub Copilot, and Gemini. Track monthly spend, seat counts, and utilization rates in a single dashboard.",
    color: "oklch(0.72 0.19 277.1)",
    soon: false,
  },
  {
    icon: Users,
    title: "Seat utilization analysis",
    description:
      "Identify inactive seats, casual users, and over-provisioned licenses. See exactly which team members haven't used a tool in 30 days.",
    color: "oklch(0.65 0.22 200)",
    soon: false,
  },
  {
    icon: Zap,
    title: "Deterministic audit engine",
    description:
      "13 rule-based checks across 5 providers produce explainable, finance-friendly recommendations — no LLM hallucinations, no black-box outputs.",
    color: "oklch(0.75 0.18 60)",
    soon: false,
  },
  {
    icon: GitMerge,
    title: "Vendor overlap detection",
    description:
      "Automatically flags redundant subscriptions — Cursor + Copilot on the same team, ChatGPT + Claude for identical workflows, and more.",
    color: "oklch(0.72 0.19 140)",
    soon: false,
  },
  {
    icon: Bell,
    title: "Recurring spend monitoring",
    description:
      "Schedule monthly re-audits to catch new waste as your team grows, adds seats, or onboards new AI tools.",
    color: "oklch(0.72 0.19 310)",
    soon: true,
  },
  {
    icon: Shield,
    title: "Shareable audit reports",
    description:
      "Generate a public, sanitized audit report URL to share with your CFO, board, or finance team — no login required to view.",
    color: "oklch(0.65 0.22 30)",
    soon: false,
  },
];

export function Features() {
  return (
    <section id="features" className="py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Features</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Everything you need to
            <br />
            <span className="gradient-text">control AI costs</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto text-balance">
            Built for engineering teams who want visibility and control without slowing down.
          </p>
        </FadeIn>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="gradient-border rounded-2xl h-full bg-card/50 backdrop-blur-sm p-6 flex flex-col gap-4 hover:bg-card/80 transition-colors group">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${f.color}18` }}
                  >
                    <f.icon className="w-5 h-5" style={{ color: f.color }} aria-hidden="true" />
                  </div>
                  {f.soon && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-muted-foreground shrink-0">
                      Coming soon
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-[15px] tracking-tight">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
