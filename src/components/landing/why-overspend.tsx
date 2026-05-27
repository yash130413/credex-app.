import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/motion";

const reasons = [
  {
    stat: "43%",
    label: "of AI seats go unused",
    description:
      "Teams provision licenses during onboarding and never audit them. Inactive seats accumulate silently across ChatGPT, Copilot, and Cursor.",
  },
  {
    stat: "2.4×",
    label: "average vendor overlap",
    description:
      "Most engineering teams run ChatGPT and Claude simultaneously for the same workflows. Consolidating saves 20–35% without changing output quality.",
  },
  {
    stat: "68%",
    label: "of teams lack spend visibility",
    description:
      "AI software spend is fragmented across individual credit cards, team budgets, and corporate accounts. No one has the full picture.",
  },
  {
    stat: "$8,400",
    label: "average annual waste per team",
    description:
      "Across inactive seats, duplicate tools, and unused premium plans, the median 20-person engineering team wastes $700/month on AI tooling.",
  },
];

export function WhyOverspend() {
  return (
    <section className="py-32 px-5 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16">
          <p className="text-xs text-indigo-400 uppercase tracking-widest font-medium mb-4">
            The problem
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance max-w-xl">
            Why teams overspend on AI tooling
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-lg leading-relaxed">
            AI software costs are growing faster than visibility into how those tools are
            actually being used.
          </p>
        </FadeIn>

        <StaggerChildren className="grid sm:grid-cols-2 gap-5">
          {reasons.map((r) => (
            <StaggerItem key={r.stat}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-semibold tracking-tight text-white tabular-nums">
                    {r.stat}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{r.label}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
