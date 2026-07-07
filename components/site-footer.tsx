import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-slate-500">
            Helping MBA students land jobs in tech.
          </p>
        </div>
        <div className="flex gap-6 text-sm text-slate-600">
          <Link href="/jobs" className="hover:text-indigo-700">
            Job board
          </Link>
          <Link href="/resources" className="hover:text-indigo-700">
            Playbooks
          </Link>
          <Link href="/signup" className="hover:text-indigo-700">
            Sign up
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} UpStartMBA
      </div>
    </footer>
  );
}
