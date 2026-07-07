"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

/** Saves a board job into the signed-in user's tracker, then shows it there. */
export async function trackJob(formData: FormData) {
  const jobId = String(formData.get("job_id") ?? "");
  const company = String(formData.get("company") ?? "");
  const roleTitle = String(formData.get("role_title") ?? "");

  if (!isSupabaseConfigured || !jobId || jobId.startsWith("demo-")) {
    redirect("/signup");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/jobs/${jobId}`);
  }

  const { error } = await supabase.from("applications").insert({
    user_id: user.id,
    job_id: jobId,
    company,
    role_title: roleTitle,
    status: "saved",
  });

  // 23505 = already tracked; treat as success and just go to the tracker.
  if (error && error.code !== "23505") {
    console.error("Failed to track job:", error.message);
  }

  revalidatePath("/tracker");
  redirect("/tracker");
}
