import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-semibold tracking-tight ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-900 text-sm font-bold text-white">
        Up
      </span>
      <span className="text-lg text-slate-900">
        UpStart<span className="text-indigo-700">MBA</span>
      </span>
    </Link>
  );
}
