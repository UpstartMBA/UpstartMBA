import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { JobCard } from "@/components/job-card";
import { SetupNotice } from "@/components/setup-notice";
import { isSupabaseConfigured } from "@/lib/env";
import { fetchJobs } from "@/lib/jobs";
import { createClient } from "@/lib/supabase/server";
import { RESOURCES } from "@/lib/data/resources";
import {
  APPLICATION_STATUSES,
  type Application,
  type Profile,
} from "@/lib/types";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <SetupNotice feature="your dashboard" />
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const [{ data: profileData }, { data: applicationData }, latestJobs] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
      supabase
        .from("applications")
        .select("*")
        .order("updated_at", { ascending: false }),
      fetchJobs(),
    ]);

  const profile = profileData as Profile | null;
  const applications = (applicationData ?? []) as Application[];
  const firstName =
    profile?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "there";

  const active = applications.filter(
    (a) => a.status === "applied" || a.status === "interviewing",
  ).length;
  const interviewing = applications.filter(
    (a) => a.status === "interviewing",
  ).length;
  const offers = applications.filter((a) => a.status === "offer").length;

  const stats = [
    { label: "Roles tracked", value: applications.length },
    { label: "Active applications", value: active },
    { label: "Interviewing", value: interviewing },
    { label: "Offers", value: offers },
  ];

  const recentApplications = applications.slice(0, 5);
  const recentJobs = latestJobs.slice(0, 4);
  const featuredResources = RESOURCES.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Welcome back, {firstName} 👋
      </h1>
      <p className="mt-2 text-slate-600">
        {active > 0
          ? "Keep the momentum going — here's where your search stands."
          : "Let's get your pipeline moving. Save a role or two from the board to start."}
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="text-3xl font-bold text-indigo-900">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-10">
          {/* Recent applications */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Recent activity
              </h2>
              <Link
                href="/tracker"
                className="text-sm font-medium text-indigo-700 hover:underline"
              >
                Open tracker →
              </Link>
            </div>
            {recentApplications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                Nothing tracked yet.{" "}
                <Link
                  href="/jobs"
                  className="font-medium text-indigo-700 hover:underline"
                >
                  Browse the board
                </Link>{" "}
                and save your first role.
              </div>
            ) : (
              <div className="space-y-3">
                {recentApplications.map((app) => {
                  const statusMeta = APPLICATION_STATUSES.find(
                    (s) => s.value === app.status,
                  );
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-medium text-slate-900">
                          {app.role_title}
                        </div>
                        <div className="text-sm text-slate-600">
                          {app.company}
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusMeta?.badgeClass ?? ""}`}
                      >
                        {statusMeta?.label ?? app.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Fresh roles */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Fresh on the board
              </h2>
              <Link
                href="/jobs"
                className="text-sm font-medium text-indigo-700 hover:underline"
              >
                All jobs →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {recentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-900">Recommended reads</h2>
            <ul className="mt-4 space-y-4">
              {featuredResources.map((resource) => (
                <li key={resource.slug}>
                  <Link
                    href={`/resources/${resource.slug}`}
                    className="group block"
                  >
                    <div className="font-medium text-slate-900 group-hover:text-indigo-700">
                      {resource.title}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {resource.category} · {resource.minutes} min read
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/resources"
              className="mt-4 inline-block text-sm font-medium text-indigo-700 hover:underline"
            >
              All playbooks →
            </Link>
          </section>

          <section className="rounded-2xl bg-indigo-900 p-5 text-white">
            <h2 className="font-semibold">This week&apos;s move</h2>
            <p className="mt-2 text-sm leading-relaxed text-indigo-100">
              Send five outreach messages and take two coffee chats. Referrals
              — not applications — are how most MBA tech offers start.
            </p>
            <Link
              href="/resources/networking-and-cold-outreach"
              className="mt-3 inline-block text-sm font-semibold text-amber-300 hover:text-amber-200"
            >
              Get the outreach templates →
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
