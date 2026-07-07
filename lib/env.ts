export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * The app renders in a read-only demo mode until Supabase credentials are
 * provided, so it can run locally before any accounts are connected.
 */
export const isSupabaseConfigured =
  supabaseUrl.startsWith("http") && supabaseAnonKey.length > 0;

export const isResendConfigured = Boolean(process.env.RESEND_API_KEY);

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
