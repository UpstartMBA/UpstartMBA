import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchJob } from "@/lib/jobs";
import { categoryLabel } from "@/lib/types";
import { trackJob } from "../actions";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await fetchJob(id);
  if (!job) notFound();

  const isDemo = job.id.startsWith("demo-");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/jobs"
        className="text-sm font-medium text-indigo-700 hover:underline"
      >
        ← Back to job board
      </Link>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {job.title}
            </h1>
            <p className="mt-1 text-slate-600">
              {job.company} · {job.location}
            </p>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            {categoryLabel(job.category)}
          </span>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">Type</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {job.employment_type}
            </dd>
          </div>
          {job.salary_range && (
            <div>
              <dt className="text-slate-500">Compensation</dt>
              <dd className="mt-0.5 font-medium text-slate-900">
                {job.salary_range}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-slate-500">Posted</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {new Date(job.posted_at + "T00:00:00").toLocaleDateString(
                "en-US",
                { month: "long", day: "numeric", year: "numeric" },
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            About the role
          </h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            {job.description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-indigo-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Apply on company site ↗
          </a>
          <form action={trackJob}>
            <input type="hidden" name="job_id" value={job.id} />
            <input type="hidden" name="company" value={job.company} />
            <input type="hidden" name="role_title" value={job.title} />
            <button
              type="submit"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              title={
                isDemo
                  ? "Create an account to track applications"
                  : "Save to your tracker"
              }
            >
              + Save to tracker
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
