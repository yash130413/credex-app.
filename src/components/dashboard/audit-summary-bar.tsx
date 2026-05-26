import { AlertTriangle, TrendingDown, Layers, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { AuditEngineResult } from "@/types/audit-engine";

const PROVIDER_COLORS: Record<string, string> = {
  ChatGPT: "bg-emerald-500",
  Claude: "bg-amber-500",
  Cursor: "bg-violet-500",
  Copilot: "bg-sky-500",
  Gemini: "bg-blue-500",
};

export function AuditSummaryBar({ result }: { result: AuditEngineResult }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-xl border border-white/[0.06] bg-card p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Est. Annual Savings</span>
          <TrendingDown className="w-4 h-4 text-emerald-400" />
        </div>
        <span className="text-2xl font-bold text-emerald-400">
          {formatCurrency(result.totalAnnualSavings)}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatCurrency(result.totalMonthlySavings)}/mo
        </span>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-card p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Critical Findings</span>
          <AlertTriangle className="w-4 h-4 text-red-400" />
        </div>
        <span className="text-2xl font-bold">
          {result.criticalCount}
          <span className="text-sm font-normal text-muted-foreground ml-1">
            critical · {result.highCount} high
          </span>
        </span>
        <span className="text-xs text-muted-foreground">
          {result.recommendations.length} total recommendations
        </span>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-card p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Providers Scanned</span>
          <Layers className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {result.providersScanned.map((p) => (
            <span
              key={p}
              className={`w-2 h-2 rounded-full ${PROVIDER_COLORS[p] ?? "bg-muted"}`}
            />
          ))}
          <span className="text-2xl font-bold">{result.providersScanned.length}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {result.providersScanned.join(", ")}
        </span>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-card p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Last Audit Run</span>
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="text-2xl font-bold">Now</span>
        <span className="text-xs text-muted-foreground">
          {new Date(result.generatedAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
