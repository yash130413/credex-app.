import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { runAuditEngine } from "@/lib/audit-engine";
import { saveAuditReport } from "@/lib/db/audits";
import { generateAuditSummary } from "@/lib/ai/summarize";
import { sendAuditEmail } from "@/lib/mail/send-audit-email";
import { checkRateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";
import type { WorkspaceMetrics } from "@/types/audit-engine";

const bodySchema = z.object({
  title: z.string().min(1).max(100),
  organizationId: z.string().uuid().optional(),
  workspaces: z.array(z.any()).min(1),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  // Rate limiting
  const identifier = getRateLimitIdentifier(req);
  const { success, remaining } = checkRateLimit(identifier);
  
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    );
  }

  // 1. Auth (optional for public audits)
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Parse + validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    console.error("Validation error:", parsed.error.flatten());
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { title, organizationId, workspaces, email } = parsed.data;

  // Use a default org ID if not provided
  const orgId = organizationId || "00000000-0000-0000-0000-000000000000";

  try {
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
      organizationId: orgId,
      workspaces: workspaces as WorkspaceMetrics[],
      result,
      aiSummary: summary,
      userId: user?.id,
    });

    const shareUrl = `${req.nextUrl.origin}/results/${shareId}`;

    // Fire audit email non-blocking — never delays the response
    const recipientEmail = user?.email || email;
    if (recipientEmail) {
      void sendAuditEmail({
        to: recipientEmail,
        companyName: user?.user_metadata?.full_name ?? recipientEmail,
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
    }

    return NextResponse.json(
      { auditId, shareId, shareUrl, result, summary, summarySource },
      { status: 201 }
    );
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
