import Link from "next/link";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { SetupNotice } from "@/components/setup-notice";
import { isSupabaseConfigured } from "@/lib/env";
import { signup } from "../actions";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Create your free account
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Track applications, save curated roles, and get the playbooks — free
        while we&apos;re in beta.
      </p>

      <div className="mt-8">
        {isSupabaseConfigured ? (
          <>
            <AuthForm action={signup} submitLabel="Create account" showName />
            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-700 hover:underline"
              >
                Log in
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
