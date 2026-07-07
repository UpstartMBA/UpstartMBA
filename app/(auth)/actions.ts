"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, siteUrl } from "@/lib/env";
import { sendWelcomeEmail } from "@/lib/email";

export interface AuthFormState {
  error?: string;
  success?: string;
}

const NOT_CONFIGURED =
  "Supabase isn't connected yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment (see README).";

async function requestOrigin(): Promise<string> {
  const headerList = await headers();
  return headerList.get("origin") ?? siteUrl();
}

export async function signup(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };

  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName) return { error: "Please enter your name." };
  if (!email.includes("@")) return { error: "Please enter a valid email." };
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${await requestOrigin()}/auth/callback`,
    },
  });

  if (error) return { error: error.message };

  await sendWelcomeEmail(email, fullName);

  // If email confirmation is disabled in Supabase, a session exists already.
  if (data.session) redirect("/dashboard");

  return {
    success:
      "Account created! Check your email for a confirmation link to finish signing up.",
  };
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };

  redirect(next.startsWith("/") ? next : "/dashboard");
}
