"use client";

import { useActionState } from "react";
import type { AuthFormState } from "@/app/(auth)/actions";

interface AuthFormProps {
  action: (
    prevState: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
  submitLabel: string;
  showName?: boolean;
  next?: string;
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100";

export function AuthForm({
  action,
  submitLabel,
  showName = false,
  next,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

      {showName && (
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
            autoComplete="name"
            required
            placeholder="Alex Rivera"
            className={inputClass}
          />
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@school.edu"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={showName ? "new-password" : "current-password"}
          required
          minLength={showName ? 8 : undefined}
          placeholder={showName ? "At least 8 characters" : "Your password"}
          className={inputClass}
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-lg bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-700">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-indigo-900 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60"
      >
        {pending ? "Please wait…" : submitLabel}
      </button>
    </form>
  );
}
