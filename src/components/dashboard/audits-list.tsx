import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber, PROVIDER_LABELS } from "@/lib/utils";
import type { Audit, AuditStatus, AuditFinding } from "@/types";

const STATUS_VARIANT: Record<AuditStatus, "default" | "secondary" | "destructive" | "outline"> = {
  completed: "default",
  running: "secondary",
  pending: "outline",
  failed: "destructive",
};

const SEVERITY_COLORS: Record<AuditFinding["severity"], string> = {
  low: "text-blue-600",
  medium: "text-yellow-600",
  high: "text-orange-600",
  critical: "text-red-600",
};

export function AuditsList({ audits }: { audits: Audit[] }) {
  return (
    <div className="flex flex-col gap-4">
      {audits.map((audit) => (
        <Card key={audit.id}>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-base">{audit.name}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {PROVIDER_LABELS[audit.provider]} · {audit.startDate} → {audit.endDate}
              </p>
            </div>
            <Badge variant={STATUS_VARIANT[audit.status]} className="capitalize shrink-0">
              {audit.status}
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Total cost</span>
                <p className="font-semibold">{formatCurrency(audit.totalCost)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Tokens used</span>
                <p className="font-semibold">{formatNumber(audit.totalTokens)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Findings</span>
                <p className="font-semibold">{audit.findings.length}</p>
              </div>
            </div>

            {audit.findings.length > 0 && (
              <div className="flex flex-col gap-2">
                {audit.findings.map((finding) => (
                  <div key={finding.id} className="border rounded-lg p-3 flex items-start gap-3">
                    <span className={`text-xs font-semibold uppercase mt-0.5 ${SEVERITY_COLORS[finding.severity]}`}>
                      {finding.severity}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{finding.title}</p>
                      <p className="text-xs text-muted-foreground">{finding.description}</p>
                    </div>
                    {finding.estimatedSavings && (
                      <span className="text-xs font-medium text-emerald-600 shrink-0">
                        Save {formatCurrency(finding.estimatedSavings)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
