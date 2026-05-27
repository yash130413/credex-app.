import { FadeIn } from "@/components/shared/motion";

const providers = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
  "AWS Bedrock",
  "Mistral",
  "Cohere",
];

export function LogoBar() {
  return (
    <section className="py-14 border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn>
          <p className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest mb-8">
            Audits across every major AI provider
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {providers.map((p) => (
              <span
                key={p}
                className="text-sm font-medium text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors tracking-tight select-none"
              >
                {p}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
