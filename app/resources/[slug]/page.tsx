import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource, RESOURCES } from "@/lib/data/resources";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  return { title: resource?.title ?? "Playbook" };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const related = RESOURCES.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/resources"
        className="text-sm font-medium text-indigo-700 hover:underline"
      >
        ← All playbooks
      </Link>

      <header className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
          {resource.category} · {resource.minutes} min read
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {resource.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          {resource.summary}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {resource.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-3 leading-relaxed text-slate-700"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                {section.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 40)} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <footer className="mt-14 border-t border-slate-200 pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Keep reading
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/resources/${r.slug}`}
              className="rounded-xl border border-slate-200 p-4 text-sm font-medium text-slate-900 transition hover:border-indigo-300 hover:text-indigo-700"
            >
              {r.title}
            </Link>
          ))}
        </div>
      </footer>
    </article>
  );
}
