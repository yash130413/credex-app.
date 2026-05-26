import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { SpendChart } from "@/components/charts/spend-chart";
import { AuditHeroStats } from "@/components/dashboard/audit-hero-stats";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { mockStats, mockSpendChart } from "@/lib/mock-data";
import { mockWorkspaces } from "@/lib/mock-workspaces";
import { runAuditEngine } from "@/lib/audit-engine";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const auditResult = runAuditEngine(mockWorkspaces);
  const topRecs = auditResult.recommendations.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Your AI spend at a glance</p>
      </div>

      <StatsGrid
        stats={{ ...mockStats, estimatedSavings: auditResult.totalMonthlySavings }}
      />

      <SpendChart data={mockSpendChart} />

      {/* Audit snapshot */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Latest Audit Snapshot</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {auditResult.recommendations.length} findings across{" "}
              {auditResult.providersScanned.length} providers
            </p>
          </div>
          <Link href="/audits">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              Full results <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <AuditHeroStats result={auditResult} />

        <div className="flex flex-col gap-3 mt-2">
          {topRecs.map((rec, i) => (
            <RecommendationCard key={rec.id} rec={rec} index={i} />
          ))}
        </div>

        {auditResult.recommendations.length > 3 && (
          <Link href="/audits" className="self-start">
            <Button variant="outline" size="sm" className="gap-1.5 border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]">
              View all {auditResult.recommendations.length} recommendations
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
