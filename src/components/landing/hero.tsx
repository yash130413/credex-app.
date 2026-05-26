"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16">
      {/* Background grid */}
      <div className="absolute inset-0 hero-grid opacity-100 pointer-events-none" />

      {/* Radial gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.72 0.19 277.1 / 12%) 0%, transparent 70%)" }}
      />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.65 0.22 200 / 8%) 0%, transparent 70%)" }}
      />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.72 0.19 310 / 7%) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-6">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Link href="/signup">
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1 text-xs border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              Introducing AI Spend Audits
              <ArrowRight className="w-3 h-3" />
            </Badge>
          </Link>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-balance"
        >
          Stop burning money
          <br />
          <span className="gradient-text">on AI APIs</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-xl leading-relaxed text-balance"
        >
          Credex connects to every AI provider, audits your usage in minutes, and surfaces
          exactly where you&apos;re overspending — with one-click fixes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/signup">
            <Button
              size="lg"
              className="gap-2 font-medium px-6 h-11 text-sm"
              style={{ boxShadow: "0 0 24px -4px oklch(0.72 0.19 277.1 / 50%)" }}
            >
              Start free audit
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 font-medium px-6 h-11 text-sm border-white/10 bg-white/5 hover:bg-white/10 text-foreground"
            >
              View live demo
            </Button>
          </Link>
        </motion.div>

        {/* Social proof line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-muted-foreground"
        >
          No credit card required · Free for up to $5k/mo AI spend · Setup in 2 minutes
        </motion.p>
      </div>

      {/* Dashboard preview card */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.45 }}
        className="relative z-10 mt-16 w-full max-w-5xl mx-auto"
      >
        <div className="gradient-border rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm noise">
          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="w-3 h-3 rounded-full bg-white/10" />
            <span className="w-3 h-3 rounded-full bg-white/10" />
            <span className="w-3 h-3 rounded-full bg-white/10" />
            <span className="ml-3 flex-1 h-6 rounded-md bg-white/5 max-w-xs text-xs text-muted-foreground flex items-center px-3">
              app.credex.ai/dashboard
            </span>
          </div>

          {/* Mock dashboard content */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Spend", value: "$4,821", change: "+12.4%", up: true },
              { label: "Est. Savings", value: "$1,240", change: "Found", up: false },
              { label: "Tokens Used", value: "182M", change: "+8.1%", up: true },
              { label: "Providers", value: "3", change: "Active", up: false },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4 flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                <span className={`text-xs font-medium ${stat.up ? "text-red-400" : "text-emerald-400"}`}>
                  {stat.change}
                </span>
              </div>
            ))}
          </div>

          {/* Mock chart bar */}
          <div className="px-6 pb-6">
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
              <div className="flex items-end gap-2 h-24">
                {[40, 65, 52, 78, 60, 88, 72, 95, 68, 82, 74, 100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{
                    height: `${h}%`,
                    background: i === 11
                      ? "oklch(0.72 0.19 277.1)"
                      : `oklch(0.72 0.19 277.1 / ${20 + i * 5}%)`,
                  }} />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                  <span key={m} className="text-[10px] text-muted-foreground">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glow under card */}
        <div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-24 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, oklch(0.72 0.19 277.1 / 20%) 0%, transparent 70%)" }}
        />
      </motion.div>
    </section>
  );
}
