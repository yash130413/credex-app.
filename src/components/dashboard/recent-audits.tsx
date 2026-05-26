import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, PROVIDER_LABELS } from "@/lib/utils";
import type { Audit, AuditStatus } from "@/types";

const STATUS_VARIANT: Record<AuditStatus, "default" | "secondary" | "destructive" | "outline"> = {
  completed: "default",
  running: "secondary",
  pending: "outline",
  failed: "destructive",
};

export function RecentAudits({ audits }: { audits: Audit[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Recent Audits</CardTitle>
        <Link href="/audits">
          <Button variant="ghost" size="sm">View all</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {audits.map((audit) => (
            <div key={audit.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium truncate">{audit.name}</span>
                <span className="text-xs text-muted-foreground">
                  {PROVIDER_LABELS[audit.provider]} · {audit.startDate} → {audit.endDate}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-medium">{formatCurrency(audit.totalCost)}</span>
                <Badge variant={STATUS_VARIANT[audit.status]} className="capitalize">
                  {audit.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
