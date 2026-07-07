import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SetupNotice } from "@/components/setup-notice";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { JOB_CATEGORIES, type Profile } from "@/lib/types";
import { updateProfile } from "./actions";

export const metadata: Metadata = { title: "Profile" };

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100";

export default async function ProfilePage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>
        <SetupNotice feature="profiles" />
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/profile");

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  const profile = data as Profile | null;

  const currentYear = new Date().getFullYear();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Your profile
      </h1>
      <p className="mt-2 text-slate-600">
        Signed in as <span className="font-medium">{user.email}</span>
      </p>

      <form
        action={updateProfile}
        className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="full_name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            defaultValue={profile?.full_name ?? ""}
            placeholder="Alex Rivera"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="school"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Business school
          </label>
          <input
            id="school"
            name="school"
            type="text"
            defaultValue={profile?.school ?? ""}
            placeholder="e.g. Wharton, Kellogg, Haas…"
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="graduation_year"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Graduation year
            </label>
            <input
              id="graduation_year"
              name="graduation_year"
              type="number"
              min={currentYear - 1}
              max={currentYear + 5}
              defaultValue={profile?.graduation_year ?? ""}
              placeholder={String(currentYear + 1)}
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="target_role"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Target function
            </label>
            <select
              id="target_role"
              name="target_role"
              defaultValue={profile?.target_role ?? ""}
              className={inputClass}
            >
              <option value="">Not sure yet</option>
              {JOB_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-indigo-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
        >
          Save profile
        </button>
      </form>
    </div>
  );
}
