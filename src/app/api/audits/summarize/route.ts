import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { generateAuditSummary } from "@/lib/ai/summarize";
import { checkRateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";
import type { AuditEngineResult } from "@/types/audit-engine";
import type { AuditRow } from "@/types/database";

// ── Validation ────────────────────────────────────────────────────────────────

const bodySchema = z.object({
  auditId: z.string().uuid(),
  auditTitle: z.string().min(1).max(100),
  result: z.object({
    recommendations: z.array(z.any()).min(1),
    totalMonthlySavings: z.number(),
    totalAnnualSavings: z.number(),
    totalCurrentSpend: z.number(),
    criticalCount: z.number(),
    highCount: z.number(),
    providersScanned: z.array(z.string()).min(1),
    optimizationScore: z.number(),
    generatedAt: z.string(),
  }),
});

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Rate limit — 10 summaries per user per hour (Anthropic calls are expensive)
  const identifier = getRateLimitIdentifier(req);
  const { success, remaining } = checkRateLimit(`summarize:${identifier}`);
  
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  }

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

  const { auditId, auditTitle, result } = parsed.data;

  // 3. Verify the audit belongs to this user (RLS covers reads, but be explicit)
  const { data: auditData, error: fetchError } = await supabase
    .from("audits")
    .select("*")
    .eq("id", auditId)
    .single();

  const audit = auditData as AuditRow | null;

  if (fetchError) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }
  if (!audit) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }
  if (audit.created_by !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 4. Generate summary (never throws — returns fallback on any failure)
  const { summary, source, fallbackReason } = await generateAuditSummary({
    auditTitle,
    result: result as AuditEngineResult,
  });

  // 5. Persist summary back to the audit row via admin client (avoids SSR generic issue)
  const { error: updateError } = await supabaseAdmin
    .from("audits")
    .update({ ai_summary: summary })
    .eq("id", auditId);

  if (updateError) {
    // Summary was generated but couldn't be saved — still return it so the
    // client can display it, but signal the persistence failure
    return NextResponse.json(
      { summary, source, fallbackReason, persisted: false },
      { status: 207 }
    );
  }

  return NextResponse.json({ summary, source, fallbackReason, persisted: true });
}
