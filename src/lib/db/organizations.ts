import { createClient } from "@/lib/supabase/server";
import type { OrganizationRow } from "@/types/database";

export async function createOrganization(name: string): Promise<OrganizationRow> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthenticated");

  const { data, error } = await supabase
    .from("organizations")
    .insert({ name, created_by: user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getMyOrganization(): Promise<OrganizationRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}
