import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/motion";

export function CTA() {
  return (
    <section className="py-28 px-5 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden gradient-border noise">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-background" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.72 0.19 277.1 / 15%) 0%, transparent 70%)",
              }}
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 hero-grid opacity-50 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 gap-6">
              <p className="text-xs text-primary uppercase tracking-widest font-medium">
                Get started today
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance max-w-2xl">
                Your AI bill is higher
                <br />
                <span className="gradient-text">than it needs to be</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-md text-balance">
                Join 500+ engineering teams who cut their AI spend by an average of 34% in the
                first month.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="gap-2 font-medium px-8 h-12"
                    style={{ boxShadow: "0 0 32px -4px oklch(0.72 0.19 277.1 / 50%)" }}
                  >
                    Start your free audit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/10 bg-white/5 hover:bg-white/10 text-foreground h-12 px-8"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground">
                Free up to $5k/mo spend · No credit card · Cancel anytime
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
