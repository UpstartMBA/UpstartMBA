"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { APPLICATION_STATUSES } from "@/lib/types";

const VALID_STATUSES = new Set(APPLICATION_STATUSES.map((s) => s.value));

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/tracker");
  return { supabase, user };
}

export async function addApplication(formData: FormData) {
  const company = String(formData.get("company") ?? "").trim();
  const roleTitle = String(formData.get("role_title") ?? "").trim();
  const status = String(formData.get("status") ?? "saved");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!company || !roleTitle) return;

  const { supabase, user } = await requireUser();
  const { error } = await supabase.from("applications").insert({
    user_id: user.id,
    company,
    role_title: roleTitle,
    status: VALID_STATUSES.has(status as never) ? status : "saved",
    notes: notes || null,
  });

  if (error) console.error("Failed to add application:", error.message);
  revalidatePath("/tracker");
  revalidatePath("/dashboard");
}

export async function updateApplicationStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !VALID_STATUSES.has(status as never)) return;

  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) console.error("Failed to update status:", error.message);
  revalidatePath("/tracker");
  revalidatePath("/dashboard");
}

export async function deleteApplication(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase, user } = await requireUser();
  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) console.error("Failed to delete application:", error.message);
  revalidatePath("/tracker");
  revalidatePath("/dashboard");
}
