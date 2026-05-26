import { NextRequest, NextResponse } from "next/server";
import { leadCaptureSchema } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { isHoneypotTripped } from "@/lib/honeypot";
import { sendLeadEmail } from "@/lib/mail/send-lead-email";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  // ── 1. Rate limit — 5 submissions per IP per 10 minutes ──────────────────
  const ip = getClientIp(req);
  const { allowed, resetAt } = rateLimit(`leads:${ip}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)) },
      }
    );
  }

  // ── 2. Parse body ─────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // ── 3. Honeypot check — must happen before Zod strips unknown fields ──────
  if (isHoneypotTripped(body as Record<string, unknown>)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // ── 4. Validate ───────────────────────────────────────────────────────────
  const parsed = leadCaptureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { email, company, role, teamSize } = parsed.data;

  // ── 5. Persist ────────────────────────────────────────────────────────────
  const { error } = await supabaseAdmin.from("leads").upsert(
    {
      email,
      company,
      name: role,
      company_size: teamSize,
      source: "results_page",
    },
    { onConflict: "email", ignoreDuplicates: false }
  );

  if (error) {
    console.error("[leads/route]", error.message);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  // ── 6. Welcome email (non-blocking) ───────────────────────────────────────
  void sendLeadEmail({ to: email, company, role });

  return NextResponse.json({ ok: true }, { status: 201 });
}
