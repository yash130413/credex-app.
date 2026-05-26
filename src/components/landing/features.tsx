import {
  BarChart3,
  Zap,
  Shield,
  Bell,
  GitBranch,
  Search,
} from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/motion";

const features = [
  {
    icon: BarChart3,
    title: "Unified spend dashboard",
    description:
      "One view for every AI provider. Track costs, tokens, and requests across OpenAI, Anthropic, Gemini, and more — in real time.",
    color: "oklch(0.72 0.19 277.1)",
  },
  {
    icon: Search,
    title: "Automated waste detection",
    description:
      "Credex scans your usage patterns and flags redundant calls, over-provisioned models, and duplicate embeddings automatically.",
    color: "oklch(0.65 0.22 200)",
  },
  {
    icon: Zap,
    title: "Model right-sizing",
    description:
      "Identify every place you're using GPT-4 for a GPT-3.5 job. Get specific swap recommendations with projected savings.",
    color: "oklch(0.75 0.18 60)",
  },
  {
    icon: Bell,
    title: "Budget alerts & guardrails",
    description:
      "Set spend limits per provider, team, or project. Get Slack or email alerts before you blow past your budget.",
    color: "oklch(0.72 0.19 310)",
  },
  {
    icon: GitBranch,
    title: "Per-feature attribution",
    description:
      "Tag API calls by feature, team, or customer. Know exactly which product surface is driving your AI bill.",
    color: "oklch(0.72 0.19 140)",
  },
  {
    icon: Shield,
    title: "Anomaly detection",
    description:
      "ML-powered spike detection catches runaway loops, prompt injection attempts, and unusual usage before they cost you.",
    color: "oklch(0.65 0.22 30)",
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
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${f.color}18` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
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
