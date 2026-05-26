import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/motion";

const steps = [
  {
    step: "01",
    title: "Connect your providers",
    description:
      "Paste your API keys or use OAuth. Credex connects to OpenAI, Anthropic, Gemini, Cohere, Mistral, and AWS Bedrock in under 2 minutes.",
  },
  {
    step: "02",
    title: "We audit your usage",
    description:
      "Credex pulls your full usage history, normalizes it across providers, and runs our waste-detection engine against every call.",
  },
  {
    step: "03",
    title: "Review your findings",
    description:
      "Get a prioritized list of savings opportunities — redundant calls, model mismatches, missing caches — each with an estimated dollar impact.",
  },
  {
    step: "04",
    title: "Implement & monitor",
    description:
      "Apply fixes with our code snippets or SDK wrappers. Set guardrails and watch your spend drop in the live dashboard.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-5 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">How it works</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            From connected to savings
            <br />
            <span className="gradient-text">in under 10 minutes</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {steps.map((s) => (
            <StaggerItem key={s.step}>
              <div className="flex flex-col gap-4 relative">
                {/* Step number bubble */}
                <div className="w-14 h-14 rounded-2xl gradient-border bg-card flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary font-mono">{s.step}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-[15px] tracking-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
