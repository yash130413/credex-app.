import { FadeIn } from "@/components/shared/motion";

const providers = [
  { name: "OpenAI", logo: "OpenAI" },
  { name: "Anthropic", logo: "Anthropic" },
  { name: "Google Gemini", logo: "Gemini" },
  { name: "Cohere", logo: "Cohere" },
  { name: "Mistral AI", logo: "Mistral" },
  { name: "AWS Bedrock", logo: "Bedrock" },
];

export function LogoBar() {
  return (
    <section className="py-16 border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn>
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-10">
            Connects to every major AI provider
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {providers.map((p) => (
              <span
                key={p.name}
                className="text-sm font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors tracking-tight"
              >
                {p.logo}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
