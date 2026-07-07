import Link from "next/link";
import type { Metadata } from "next";
import { JobCard } from "@/components/job-card";
import { fetchJobs } from "@/lib/jobs";
import { isSupabaseConfigured } from "@/lib/env";
import { JOB_CATEGORIES } from "@/lib/types";

export const metadata: Metadata = { title: "Job board" };

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const jobs = await fetchJobs(category, q);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Job board
        </h1>
        <p className="mt-2 text-slate-600">
          Curated tech roles where MBAs get hired. Save any role to your
          tracker to build your pipeline.
        </p>
        {!isSupabaseConfigured && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3.5 py-2 text-sm text-amber-800">
            Showing demo listings — connect Supabase to manage the live board.
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/jobs"
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
              !category
                ? "border-indigo-900 bg-indigo-900 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-indigo-400"
            }`}
          >
            All
          </Link>
          {JOB_CATEGORIES.map((c) => (
            <Link
              key={c.value}
              href={`/jobs?category=${c.value}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
                category === c.value
                  ? "border-indigo-900 bg-indigo-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-indigo-400"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        <form action="/jobs" method="get" className="flex gap-2">
          {category && <input type="hidden" name="category" value={category} />}
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search title or company…"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none lg:w-64"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-900 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Search
          </button>
        </form>
      </div>

      {/* Listings */}
      {jobs.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          No roles match those filters yet. Try a different category or search
          term.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
