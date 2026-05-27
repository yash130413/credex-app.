import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/motion";
import { Plug, ScanLine, FileBarChart } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Plug,
    title: "Connect your AI tools",
    description:
      "Add your providers in under 2 minutes. Credex connects to ChatGPT, Claude, Cursor, GitHub Copilot, and Gemini using read-only access — no changes to your workflows.",
  },
  {
    n: "02",
    icon: ScanLine,
    title: "Analyze spend and utilization",
    description:
      "Our deterministic audit engine runs 13 rule-based checks across seat utilization, vendor overlap, inactive licenses, and API vs subscription mismatches.",
  },
  {
    n: "03",
    icon: FileBarChart,
    title: "Receive optimization recommendations",
    description:
      "Get a prioritized list of savings opportunities — each with a confidence score, affected user count, and estimated annual savings. Share directly with your CFO.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-5 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16">
          <p className="text-xs text-indigo-400 uppercase tracking-widest font-medium mb-4">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance max-w-xl">
            From connected to savings in under 10 minutes
          </h2>
        </FadeIn>

        <StaggerChildren className="grid sm:grid-cols-3 gap-8 relative">
          {/* Connector line — desktop */}
          <div
            className="hidden sm:block absolute top-5 left-[16.5%] right-[16.5%] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
            aria-hidden="true"
          />

          {steps.map((s) => (
            <StaggerItem key={s.n}>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <s.icon className="w-4.5 h-4.5 text-indigo-400" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-muted-foreground/50 tracking-widest">
                    {s.n}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-sm tracking-tight">{s.title}</h3>
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
