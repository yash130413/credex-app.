import { createClient } from "@/lib/supabase/server";
import type { LeadRow } from "@/types/database";

export async function createLead(
  data: Pick<LeadRow, "email"> & Partial<Pick<LeadRow, "name" | "company" | "company_size" | "estimated_ai_spend" | "source">>
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert(data);
  if (error) throw error;
}
