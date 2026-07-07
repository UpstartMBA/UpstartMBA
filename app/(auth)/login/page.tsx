import Link from "next/link";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { SetupNotice } from "@/components/setup-notice";
import { isSupabaseConfigured } from "@/lib/env";
import { login } from "../actions";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Log in to your pipeline, saved jobs, and playbooks.
      </p>

      <div className="mt-8">
        {isSupabaseConfigured ? (
          <>
            {error === "auth" && (
              <p className="mb-4 rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
                That sign-in link was invalid or expired. Please log in again.
              </p>
            )}
            <AuthForm action={login} submitLabel="Log in" next={next} />
            <p className="mt-6 text-center text-sm text-slate-600">
              New here?{" "}
              <Link
                href="/signup"
                className="font-semibold text-indigo-700 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </>
        ) : (
          <SetupNotice feature="accounts" />
        )}
      </div>
    </div>
  );
}
