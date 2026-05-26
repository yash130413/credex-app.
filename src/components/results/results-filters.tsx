"use client";

import { useState } from "react";
import { ResultsRecommendationCard } from "@/components/results/results-recommendation-card";
import { formatCurrency, cn } from "@/lib/utils";
import type { PublicAuditSafe } from "@/types/database";

type Rec = PublicAuditSafe["recommendations"][number];
type Priority = Rec["priority"] | "All";

const PRIORITY_ORDER: Rec["priority"][] = ["Critical", "High", "Medium", "Low"];

const PRIORITY_ACTIVE: Record<Rec["priority"], string> = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  High:     "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Medium:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low:      "bg-white/[0.06] text-muted-foreground border-white/[0.08]",
};

interface Props {
  recommendations: Rec[];
}

export function ResultsFilters({ recommendations }: Props) {
  const [priority, setPriority] = useState<Priority>("All");
  const [provider, setProvider] = useState<string>("All");

  const providers = [...new Set(recommendations.map((r) => r.provider))];

  const filtered = recommendations.filter((r) => {
    if (priority !== "All" && r.priority !== priority) return false;
    if (provider !== "All" && r.provider !== provider) return false;
    return true;
  });

  const filteredSavings = filtered.reduce((s, r) => s + r.monthly_savings, 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Priority pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(["All", ...PRIORITY_ORDER] as Priority[]).map((p) => {
            const count = p === "All"
              ? recommendations.length
              : recommendations.filter((r) => r.priority === p).length;
            if (count === 0 && p !== "All") return null;
            const isActive = priority === p;
            return (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                  isActive && p !== "All"
                    ? PRIORITY_ACTIVE[p as Rec["priority"]]
                    : isActive
                    ? "bg-white/[0.08] text-foreground border-white/[0.12]"
                    : "border-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                )}
              >
                {p}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Provider pills — only show if multiple providers */}
        {providers.length > 1 && (
          <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
            {(["All", ...providers]).map((p) => {
              const count = p === "All"
                ? recommendations.length
                : recommendations.filter((r) => r.provider === p).length;
              return (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                    provider === p
                      ? "bg-white/[0.08] text-foreground border-white/[0.12]"
                      : "border-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                  )}
                >
                  {p}
                  <span className="ml-1.5 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Filtered savings summary */}
      {(priority !== "All" || provider !== "All") && filtered.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} of {recommendations.length} recommendations ·{" "}
          <span className="text-emerald-400 font-medium">
            {formatCurrency(filteredSavings)}/mo in view
          </span>
        </p>
      )}

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-card p-12 text-center text-sm text-muted-foreground">
          No recommendations match the selected filters.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((rec, i) => (
            <ResultsRecommendationCard key={rec.id} rec={rec} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
