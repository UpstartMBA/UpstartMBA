import Link from "next/link";
import { JOB_CATEGORIES } from "@/lib/types";

const FEATURES = [
  {
    title: "Curated job board",
    description:
      "Tech roles where MBAs actually get hired — product, strategy, marketing, and more. No sifting through thousands of engineering postings.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
      </svg>
    ),
  },
  {
    title: "Application tracker",
    description:
      "Your whole pipeline in one place: saved, applied, interviewing, offer. Never lose track of a follow-up during recruiting season again.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M9 11l3 3 8-8M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "Recruiting playbooks",
    description:
      "Timelines, interview prep, outreach templates, and offer negotiation — written specifically for MBA candidates targeting tech.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    number: "1",
    title: "Pick your target function",
    description:
      "Product, strategy & bizops, product marketing, data, ops, or corp dev — our playbooks explain what each role really is and who gets hired.",
  },
  {
    number: "2",
    title: "Build your pipeline",
    description:
      "Save curated roles from the board, add ones you find elsewhere, and track every application through each stage.",
  },
  {
    number: "3",
    title: "Prep, interview, negotiate",
    description:
      "Use the guides to nail product-sense and case-style interviews, then negotiate your offer with confidence.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 inline-block rounded-full border border-indigo-400/40 bg-indigo-400/10 px-3 py-1 text-xs font-medium tracking-wide text-indigo-200">
              Built for MBA candidates breaking into tech
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Land your tech role{" "}
              <span className="text-amber-400">before graduation.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-indigo-100">
              Tech doesn&apos;t recruit like consulting or banking. UpStartMBA
              gives you the curated jobs, pipeline tracker, and insider
              playbooks to run a winning search on tech&apos;s timeline.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-lg bg-amber-400 px-5 py-3 font-semibold text-indigo-950 hover:bg-amber-300"
              >
                Start free
              </Link>
              <Link
                href="/jobs"
                className="rounded-lg border border-indigo-300/40 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Browse jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Everything your career center doesn&apos;t cover
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Purpose-built for the just-in-time, network-driven way tech companies
          actually hire MBAs.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
            Explore roles by function
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {JOB_CATEGORIES.map((category) => (
              <Link
                key={category.value}
                href={`/jobs?category=${category.value}`}
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-indigo-400 hover:text-indigo-700"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          How it works
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-900 text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-indigo-900 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Your classmates are already recruiting.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-indigo-200">
            Set up your pipeline in two minutes — free while we&apos;re in
            beta.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-lg bg-amber-400 px-6 py-3 font-semibold text-indigo-950 hover:bg-amber-300"
          >
            Create your free account
          </Link>
        </div>
      </section>
    </div>
  );
}
