import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { runAuditEngine } from "@/lib/audit-engine";
import type { WorkspaceMetrics } from "@/types/audit-engine";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Public audit schema - no auth required
const publicAuditSchema = z.object({
  workspaces: z.array(z.any()).min(1),
  teamSize: z.number().optional(),
  useCase: z.string().optional(),
});

export async function POST(req: NextRequest) {
  // 1. Parse + validate (NO AUTH CHECK - this is public)
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = publicAuditSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { workspaces, teamSize, useCase } = parsed.data;

  // 2. Run deterministic audit engine
  const result = runAuditEngine(workspaces as WorkspaceMetrics[]);

  // 3. Generate a simple title
  const title = `AI Spend Audit - ${new Date().toLocaleDateString()}`;

  // 4. Save to database (public audits don't need org_id)
  const supabase = supabaseAdmin;
  
  try {
    // Generate unique share_id
    const shareId = crypto.randomUUID();

    // Insert audit
    const { data: audit, error: auditError } = await supabase
      .from("audits")
      .insert({
        title,
        share_id: shareId,
        status: "completed",
        optimization_score: result.optimizationScore,
        total_monthly_savings: result.totalMonthlySavings,
        total_annual_savings: result.totalAnnualSavings,
        estimated_monthly_savings: result.totalMonthlySavings,
        estimated_annual_savings: result.totalAnnualSavings,
        providers_scanned: result.providersScanned,
        // org_id is nullable for public audits
      })
      .select()
      .single();

    if (auditError) {
      console.error("Audit insert error:", auditError);
      return NextResponse.json({ error: "Failed to save audit" }, { status: 500 });
    }

    // Insert recommendations
    if (result.recommendations.length > 0) {
      const recommendations = result.recommendations.map((r) => ({
        audit_id: audit.id,
        provider: r.provider,
        rule_id: r.ruleId,
        title: r.title,
        recommendation: r.recommendation,
        reason: r.reason,
        priority: r.priority.toLowerCase(),
        confidence_score: r.confidenceScore,
        monthly_savings: r.monthlySavings,
        annual_savings: r.annualSavings,
        current_cost: r.currentCost,
        optimized_cost: r.optimizedCost,
        affected_users: r.affectedUsers,
      }));

      const { error: recsError } = await supabase
        .from("audit_recommendations")
        .insert(recommendations);

      if (recsError) {
        console.error("Recommendations insert error:", recsError);
        // Don't fail the whole request if recommendations fail
      }
    }

    // 5. Return audit ID for redirect
    return NextResponse.json(
      {
        auditId: audit.id,
        shareId: shareId,
        shareUrl: `${req.nextUrl.origin}/results/${shareId}`,
        result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Public audit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
