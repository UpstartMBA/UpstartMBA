"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/profile");

  const graduationYearRaw = String(formData.get("graduation_year") ?? "").trim();
  const graduationYear = graduationYearRaw
    ? Number.parseInt(graduationYearRaw, 10)
    : null;

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: String(formData.get("full_name") ?? "").trim() || null,
    school: String(formData.get("school") ?? "").trim() || null,
    graduation_year:
      graduationYear && Number.isFinite(graduationYear)
        ? graduationYear
        : null,
    target_role: String(formData.get("target_role") ?? "").trim() || null,
  });

  if (error) console.error("Failed to update profile:", error.message);
  revalidatePath("/profile");
  revalidatePath("/dashboard");
}
