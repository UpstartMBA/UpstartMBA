import Link from "next/link";
import { Logo } from "@/components/logo";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

async function getUser() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function SiteNav() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
            <Link href="/jobs" className="hover:text-indigo-700">
              Jobs
            </Link>
            <Link href="/resources" className="hover:text-indigo-700">
              Playbooks
            </Link>
            {user && (
              <>
                <Link href="/dashboard" className="hover:text-indigo-700">
                  Dashboard
                </Link>
                <Link href="/tracker" className="hover:text-indigo-700">
                  Tracker
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium">
          {user ? (
            <>
              <Link
                href="/profile"
                className="hidden text-slate-600 hover:text-indigo-700 sm:block"
              >
                Profile
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="rounded-lg border border-slate-300 px-3.5 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-slate-600 hover:text-indigo-700"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-indigo-900 px-3.5 py-2 text-white hover:bg-indigo-800"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
