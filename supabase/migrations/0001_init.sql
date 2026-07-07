-- UpStartMBA initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

-- ---------------------------------------------------------------------------
-- Profiles: one row per auth user, created automatically on signup.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  school text,
  graduation_year int,
  target_role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Jobs: the curated board. Publicly readable; written by admins via the
-- Supabase dashboard or service role only.
-- ---------------------------------------------------------------------------
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  title text not null,
  location text not null,
  category text not null check (
    category in ('product', 'strategy', 'marketing', 'operations', 'data', 'finance')
  ),
  employment_type text not null default 'Full-time',
  salary_range text,
  description text not null,
  apply_url text not null,
  posted_at date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.jobs enable row level security;

create policy "Jobs are publicly readable"
  on public.jobs for select
  using (true);

create index jobs_category_idx on public.jobs (category);
create index jobs_posted_at_idx on public.jobs (posted_at desc);

-- ---------------------------------------------------------------------------
-- Applications: each user's personal pipeline. Rows may reference a board
-- job or be free-form entries the user added manually.
-- ---------------------------------------------------------------------------
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  job_id uuid references public.jobs (id) on delete set null,
  company text not null,
  role_title text not null,
  status text not null default 'saved' check (
    status in ('saved', 'applied', 'interviewing', 'offer', 'rejected')
  ),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.applications enable row level security;

create policy "Users manage own applications"
  on public.applications for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- One tracked entry per board job per user (manual entries are unlimited).
create unique index applications_user_job_unique
  on public.applications (user_id, job_id)
  where job_id is not null;

create index applications_user_idx on public.applications (user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger applications_set_updated_at
  before update on public.applications
  for each row execute procedure public.set_updated_at();

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
