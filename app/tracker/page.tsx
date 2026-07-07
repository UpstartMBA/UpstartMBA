import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SetupNotice } from "@/components/setup-notice";
import { StatusSelect } from "@/components/status-select";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import {
  APPLICATION_STATUSES,
  type Application,
} from "@/lib/types";
import { addApplication, deleteApplication } from "./actions";

export const metadata: Metadata = { title: "Application tracker" };

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none";

export default async function TrackerPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
          Application tracker
        </h1>
        <SetupNotice feature="the application tracker" />
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/tracker");

  const { data } = await supabase
    .from("applications")
    .select("*")
    .order("updated_at", { ascending: false });

  const applications = (data ?? []) as Application[];
  const byStatus = new Map(
    APPLICATION_STATUSES.map((s) => [
      s.value,
      applications.filter((a) => a.status === s.value),
    ]),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Application tracker
          </h1>
          <p className="mt-2 text-slate-600">
            {applications.length === 0
              ? "Your pipeline is empty — save a role from the job board or add one below."
              : `${applications.length} ${applications.length === 1 ? "role" : "roles"} in your pipeline.`}
          </p>
        </div>
        <Link
          href="/jobs"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Browse the job board
        </Link>
      </div>

      {/* Pipeline summary */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {APPLICATION_STATUSES.map((s) => (
          <div
            key={s.value}
            className="rounded-xl border border-slate-200 bg-white p-4 text-center"
          >
            <div className="text-2xl font-bold text-slate-900">
              {byStatus.get(s.value)?.length ?? 0}
            </div>
            <div
              className={`mx-auto mt-1 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${s.badgeClass}`}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Add application */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="font-semibold text-slate-900">Add an application</h2>
        <p className="mt-1 text-sm text-slate-600">
          Found a role somewhere else? Track it here too.
        </p>
        <form
          action={addApplication}
          className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]"
        >
          <input
            name="company"
            required
            placeholder="Company"
            className={inputClass}
          />
          <input
            name="role_title"
            required
            placeholder="Role title"
            className={inputClass}
          />
          <select
            name="status"
            defaultValue="saved"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {APPLICATION_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-indigo-900 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Add
          </button>
          <input
            name="notes"
            placeholder="Notes (referral contact, deadline, next step…)"
            className={`${inputClass} sm:col-span-4`}
          />
        </form>
      </div>

      {/* Pipeline lists */}
      <div className="mt-10 space-y-8">
        {APPLICATION_STATUSES.map((s) => {
          const group = byStatus.get(s.value) ?? [];
          if (group.length === 0) return null;
          return (
            <section key={s.value}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium normal-case tracking-normal ${s.badgeClass}`}
                >
                  {s.label}
                </span>
                <span>
                  {group.length} {group.length === 1 ? "role" : "roles"}
                </span>
              </h2>
              <div className="space-y-3">
                {group.map((app) => (
                  <div
                    key={app.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900">
                        {app.role_title}
                      </div>
                      <div className="text-sm text-slate-600">
                        {app.company}
                        {app.job_id && (
                          <>
                            {" · "}
                            <Link
                              href={`/jobs/${app.job_id}`}
                              className="text-indigo-700 hover:underline"
                            >
                              View listing
                            </Link>
                          </>
                        )}
                      </div>
                      {app.notes && (
                        <p className="mt-1 text-sm text-slate-500">
                          {app.notes}
                        </p>
                      )}
                    </div>
                    <StatusSelect
                      applicationId={app.id}
                      status={app.status}
                    />
                    <form action={deleteApplication}>
                      <input type="hidden" name="id" value={app.id} />
                      <button
                        type="submit"
                        aria-label={`Remove ${app.role_title} at ${app.company}`}
                        className="rounded-lg px-2 py-1.5 text-sm text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
