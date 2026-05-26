import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "Credex found $3,200/month in wasted OpenAI spend in the first audit. We had no idea we were embedding the same documents on every request.",
    name: "Sarah Chen",
    title: "CTO, Loopline AI",
    initials: "SC",
    color: "oklch(0.72 0.19 277.1)",
  },
  {
    quote:
      "We were using GPT-4 for literally everything. Credex showed us that 70% of our calls could be handled by GPT-3.5 with identical output quality.",
    name: "Marcus Webb",
    title: "Head of Engineering, Draftly",
    initials: "MW",
    color: "oklch(0.65 0.22 200)",
  },
  {
    quote:
      "The per-feature attribution is a game changer. Now every team owns their AI spend and we've cut our monthly bill by 40% in 6 weeks.",
    name: "Priya Nair",
    title: "VP Engineering, Stackform",
    initials: "PN",
    color: "oklch(0.72 0.19 140)",
  },
  {
    quote:
      "Setup took 4 minutes. The anomaly detection caught a runaway loop in staging that would have cost us $800 before we noticed.",
    name: "James Okafor",
    title: "Staff Engineer, Vanta",
    initials: "JO",
    color: "oklch(0.75 0.18 60)",
  },
  {
    quote:
      "Finally a tool that speaks the language of engineers, not just finance. The code snippets for fixes are exactly what we needed.",
    name: "Lena Müller",
    title: "Platform Lead, Raycast",
    initials: "LM",
    color: "oklch(0.72 0.19 310)",
  },
  {
    quote:
      "We run 12 different AI features. Credex is the only way we can tell which ones are actually worth the cost. Indispensable.",
    name: "Tom Briggs",
    title: "Founder, Briefcase AI",
    initials: "TB",
    color: "oklch(0.65 0.22 30)",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 px-5 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Testimonials</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Loved by engineering teams
            <br />
            <span className="gradient-text">shipping AI products</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="gradient-border rounded-2xl bg-card/50 backdrop-blur-sm p-6 flex flex-col gap-5 h-full hover:bg-card/80 transition-colors">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback
                      className="text-xs font-semibold text-background"
                      style={{ background: t.color }}
                    >
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
