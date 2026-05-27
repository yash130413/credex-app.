import { FadeIn, StaggerChildren, StaggerItem } from "@/components/shared/motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Credex found $3,200/month in wasted OpenAI spend in the first audit. We had no idea we were embedding the same documents on every request.",
    name: "Sarah Chen",
    title: "CTO, Loopline AI",
    initials: "SC",
  },
  {
    quote: "We were using GPT-4 for literally everything. Credex showed us that 70% of our calls could be handled by GPT-3.5 with identical output quality.",
    name: "Marcus Webb",
    title: "Head of Engineering, Draftly",
    initials: "MW",
  },
  {
    quote: "The vendor overlap detection is a game changer. Now every team owns their AI spend and we've cut our monthly bill by 40% in 6 weeks.",
    name: "Priya Nair",
    title: "VP Engineering, Stackform",
    initials: "PN",
  },
  {
    quote: "Setup took 4 minutes. The inactive seat detection caught licenses we'd forgotten about in staging that would have kept billing indefinitely.",
    name: "James Okafor",
    title: "Staff Engineer, Vanta",
    initials: "JO",
  },
  {
    quote: "Finally a tool that speaks the language of engineers, not just finance. The explainable recommendations are exactly what we needed.",
    name: "Lena Müller",
    title: "Platform Lead, Raycast",
    initials: "LM",
  },
  {
    quote: "We run 5 different AI tools across the team. Credex is the only way we can tell which ones are actually worth the cost.",
    name: "Tom Briggs",
    title: "Founder, Briefcase AI",
    initials: "TB",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-5 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16">
          <p className="text-xs text-indigo-400 uppercase tracking-widest font-medium mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance max-w-xl">
            Trusted by engineering teams managing AI spend
          </h2>
          <p className="mt-3 text-xs text-muted-foreground/60">
            Illustrative testimonials representing common customer outcomes.
          </p>
        </FadeIn>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col gap-5 h-full hover:bg-white/[0.03] transition-colors">
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-semibold leading-tight">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.title}</p>
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
