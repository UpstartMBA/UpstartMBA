import { SAMPLE_JOBS } from "@/lib/data/sample-jobs";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/lib/types";

export async function fetchJobs(
  category?: string,
  q?: string,
): Promise<Job[]> {
  if (!isSupabaseConfigured) {
    let jobs = SAMPLE_JOBS;
    if (category) jobs = jobs.filter((j) => j.category === category);
    if (q) {
      const needle = q.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(needle) ||
          j.company.toLowerCase().includes(needle),
      );
    }
    return [...jobs].sort((a, b) => b.posted_at.localeCompare(a.posted_at));
  }

  const supabase = await createClient();
  let query = supabase
    .from("jobs")
    .select("*")
    .order("posted_at", { ascending: false });

  if (category) query = query.eq("category", category);
  if (q) {
    // Strip characters that would break PostgREST's or() filter syntax.
    const safe = q.replace(/[,()%]/g, " ").trim();
    if (safe) {
      query = query.or(`title.ilike.%${safe}%,company.ilike.%${safe}%`);
    }
  }

  const { data, error } = await query;
  if (error) {
    console.error("Failed to fetch jobs:", error.message);
    return [];
  }
  return data as Job[];
}

export async function fetchJob(id: string): Promise<Job | null> {
  if (!isSupabaseConfigured || id.startsWith("demo-")) {
    return SAMPLE_JOBS.find((j) => j.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch job:", error.message);
    return null;
  }
  return data as Job | null;
}
