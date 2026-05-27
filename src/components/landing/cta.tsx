import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/motion";

export function CTA() {
  return (
    <section className="py-32 px-5 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden px-8 py-16 sm:px-16 flex flex-col items-start gap-8">
            {/* Subtle top-left radial */}
            <div
              className="absolute top-0 left-0 w-96 h-64 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top left, rgba(99,102,241,0.07) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-4 max-w-xl">
              <p className="text-xs text-indigo-400 uppercase tracking-widest font-medium">
                Get started
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
                Run your first AI spend audit in under 10 minutes
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Connect your providers, get a prioritized list of savings opportunities,
                and share a finance-ready report — all for free.
              </p>
            </div>

            <div className="relative flex flex-wrap items-center gap-3">
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
            </div>

            <p className="relative text-xs text-muted-foreground/60">
              No credit card required · Free to run your first audit · Cancel anytime
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
