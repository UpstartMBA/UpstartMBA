import Link from "next/link";
import { categoryLabel, type Job } from "@/lib/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">{job.title}</h3>
          <p className="mt-0.5 text-sm text-slate-600">
            {job.company} · {job.location}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          {categoryLabel(job.category)}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {job.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
        <span>{job.employment_type}</span>
        {job.salary_range && <span>{job.salary_range}</span>}
        <span className="ml-auto">
          Posted{" "}
          {new Date(job.posted_at + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
}
