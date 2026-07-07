# UpStartMBA

A web app that helps MBA students land jobs in the tech industry.

- **Curated job board** — tech roles where MBAs actually get hired (product, strategy & bizops, product marketing, ops, data, corp dev), filterable by function and searchable.
- **Application tracker** — a personal pipeline from *Saved* → *Applied* → *Interviewing* → *Offer*, covering both board jobs and roles found elsewhere.
- **Recruiting playbooks** — six in-depth guides: the MBA tech recruiting timeline, breaking into PM, strategy/BizOps roles, networking & cold outreach, resume translation, and offer negotiation.
- **Accounts & profiles** — email/password auth, per-user data isolation, and a welcome email on signup.

The app runs in a read-only **demo mode** (sample jobs, no accounts) until Supabase credentials are configured, so you can preview it immediately.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router, React Server Components, Server Actions) |
| Styling | Tailwind CSS v4 |
| Auth + database | Supabase (Postgres with Row Level Security) |
| Transactional email | Resend |
| Hosting | Vercel |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
```

Without env vars the app boots in demo mode — the job board shows sample listings and auth-gated pages show setup instructions.

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run, in order:
   - `supabase/migrations/0001_init.sql` — tables (`profiles`, `jobs`, `applications`), RLS policies, and the signup trigger.
   - `supabase/seed.sql` — 12 curated job listings.
3. From **Project Settings → API**, copy into `.env.local`:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. In **Authentication → URL Configuration**, set the Site URL to your deployed domain (and `http://localhost:3000` for local dev) so email-confirmation links redirect correctly.

Managing the board: job listings are admin-curated. Add or edit rows in the `jobs` table via the Supabase dashboard (Table Editor); RLS keeps the table read-only for app users.

## 2. Set up Resend (optional)

Welcome emails are skipped silently when Resend isn't configured, so this can wait.

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys) → `RESEND_API_KEY`.
2. Out of the box, emails send from Resend's shared `onboarding@resend.dev` (only delivers to your own account's email until you verify a domain). Once you verify a domain in Resend, set `EMAIL_FROM="UpStartMBA <hello@yourdomain.com>"`.

## 3. Deploy to Vercel

1. Push this repo to GitHub and import it at [vercel.com/new](https://vercel.com/new) — the Next.js defaults are correct.
2. Add the environment variables from `.env.example` in **Project Settings → Environment Variables**, with `NEXT_PUBLIC_SITE_URL` set to your production URL (e.g. `https://upstartmba.vercel.app`).
3. Deploy. Then update the Supabase Site URL (step 1.4) to match the production domain.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | For accounts/board | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For accounts/board | Supabase anon (public) API key |
| `RESEND_API_KEY` | Optional | Enables the signup welcome email |
| `EMAIL_FROM` | Optional | Verified sender, defaults to `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL used in emails and auth redirects |

## Project structure

```
app/
  page.tsx                  Landing page
  (auth)/                   Login & signup pages + server actions
  auth/callback/            Email-confirmation code exchange
  auth/signout/             Sign-out endpoint
  dashboard/                Signed-in home: pipeline stats, fresh roles
  jobs/                     Job board, job detail, save-to-tracker action
  tracker/                  Application pipeline (add, restage, remove)
  profile/                  School / grad year / target function
  resources/                Playbook library and articles
components/                 Shared UI (nav, footer, forms, cards)
lib/
  supabase/                 Browser + server Supabase clients
  data/                     Playbook content and demo job listings
  email.ts                  Resend welcome email
middleware.ts               Session refresh + auth-gated routes
supabase/
  migrations/0001_init.sql  Schema, RLS policies, triggers
  seed.sql                  Job board seed data
```

## Data model

- **profiles** — one row per user (name, school, grad year, target function), auto-created by a trigger on signup. RLS: owner-only.
- **jobs** — the curated board. RLS: publicly readable, writable only via the Supabase dashboard/service role.
- **applications** — a user's pipeline; may reference a board job or be free-form. RLS: owner-only, with a unique index preventing duplicate tracking of the same board job.
