import type { Metadata } from "next";
import { AuditResultsDashboard } from "@/components/dashboard/audit-results-dashboard";
import { mockWorkspaces } from "@/lib/mock-workspaces";
import { runAuditEngine } from "@/lib/audit-engine";

export const metadata: Metadata = { title: "Audit Results" };

export default function AuditsPage() {
  const result = runAuditEngine(mockWorkspaces);

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Results</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Deterministic rule-based analysis ·{" "}
            {new Date(result.generatedAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">Audit complete</span>
        </div>
      </div>

      <AuditResultsDashboard result={result} workspaces={mockWorkspaces} />
    </div>
  );
}
