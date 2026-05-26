import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { setAuditPublic } from "@/lib/db/audits";

const bodySchema = z.object({
  isPublic: z.boolean(),
});

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  // RLS on the audits table ensures only the owner can update
  await setAuditPublic(id, parsed.data.isPublic);

  const shareUrl = parsed.data.isPublic
    ? `${req.nextUrl.origin}/audit/${id}`
    : null;

  return NextResponse.json({ isPublic: parsed.data.isPublic, shareUrl });
}
