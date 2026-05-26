import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { runAuditEngine } from "@/lib/audit-engine";
import { saveAuditReport } from "@/lib/db/audits";
import { generateAuditSummary } from "@/lib/ai/summarize";
import { sendAuditEmail } from "@/lib/mail/send-audit-email";
import type { WorkspaceMetrics } from "@/types/audit-engine";

const bodySchema = z.object({
  title: z.string().min(1).max(100),
  organizationId: z.string().uuid(),
  workspaces: z.array(z.any()).min(1),
});

export async function POST(req: NextRequest) {
  // 1. Auth
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse + validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { title, organizationId, workspaces } = parsed.data;

  // 3. Run deterministic audit engine server-side
  const result = runAuditEngine(workspaces as WorkspaceMetrics[]);

  // 4. Generate AI summary (runs concurrently — never blocks on failure)
  const { summary, source: summarySource } = await generateAuditSummary({
    auditTitle: title,
    result,
  });

  // 5. Persist audit + recommendations + summary atomically
  const { auditId, shareId } = await saveAuditReport({
    title,
    organizationId,
    workspaces: workspaces as WorkspaceMetrics[],
    result,
    aiSummary: summary,
  });

  const shareUrl = `${req.nextUrl.origin}/results/${shareId}`;

  // Fire audit email non-blocking — never delays the response
  void sendAuditEmail({
    to: user.email!,
    companyName: user.user_metadata?.full_name ?? user.email!,
    auditTitle: title,
    monthlySavings: result.totalMonthlySavings,
    annualSavings: result.totalAnnualSavings,
    totalSpend: result.totalCurrentSpend,
    optimizationScore: result.optimizationScore,
    topRecommendations: result.recommendations.slice(0, 3).map((r) => ({
      title: r.title,
      provider: r.provider,
      priority: r.priority,
      monthlySavings: r.monthlySavings,
    })),
    auditUrl: shareUrl,
  });

  return NextResponse.json(
    { auditId, shareId, shareUrl, result, summary, summarySource },
    { status: 201 }
  );
}
