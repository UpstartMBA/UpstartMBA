import Link from "next/link";
import type { Metadata } from "next";
import { RESOURCES } from "@/lib/data/resources";

export const metadata: Metadata = { title: "Playbooks" };

export default function ResourcesPage() {
  const categories = [...new Set(RESOURCES.map((r) => r.category))];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Recruiting playbooks
        </h1>
        <p className="mt-2 text-slate-600">
          Practical guides written for MBA candidates targeting tech — from
          picking a function to negotiating your offer.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-indigo-700">
              {category}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {RESOURCES.filter((r) => r.category === category).map(
                (resource) => (
                  <Link
                    key={resource.slug}
                    href={`/resources/${resource.slug}`}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow"
                  >
                    <h3 className="font-semibold text-slate-900">
                      {resource.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {resource.summary}
                    </p>
                    <span className="mt-4 text-xs text-slate-500">
                      {resource.minutes} min read
                    </span>
                  </Link>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
