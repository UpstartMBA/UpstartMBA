export function SetupNotice({ feature }: { feature: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <h2 className="font-semibold text-amber-900">
        Connect Supabase to enable {feature}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-amber-800">
        This deployment doesn&apos;t have Supabase credentials yet. Add{" "}
        <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-xs">
          NEXT_PUBLIC_SUPABASE_URL
        </code>{" "}
        and{" "}
        <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-xs">
          NEXT_PUBLIC_SUPABASE_ANON_KEY
        </code>{" "}
        to your environment, run the SQL in{" "}
        <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-xs">
          supabase/migrations
        </code>
        , and restart. Full steps are in the README.
      </p>
    </div>
  );
}
