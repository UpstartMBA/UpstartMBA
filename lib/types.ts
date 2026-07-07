export type JobCategory =
  | "product"
  | "strategy"
  | "marketing"
  | "operations"
  | "data"
  | "finance";

export interface Job {
  id: string;
  company: string;
  title: string;
  location: string;
  category: JobCategory;
  employment_type: string;
  salary_range: string | null;
  description: string;
  apply_url: string;
  posted_at: string;
}

export type ApplicationStatus =
  | "saved"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

export interface Application {
  id: string;
  user_id: string;
  job_id: string | null;
  company: string;
  role_title: string;
  status: ApplicationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  school: string | null;
  graduation_year: number | null;
  target_role: string | null;
}

export const JOB_CATEGORIES: { value: JobCategory; label: string }[] = [
  { value: "product", label: "Product Management" },
  { value: "strategy", label: "Strategy & BizOps" },
  { value: "marketing", label: "Product Marketing" },
  { value: "operations", label: "Operations" },
  { value: "data", label: "Data & Analytics" },
  { value: "finance", label: "Finance & Corp Dev" },
];

export const APPLICATION_STATUSES: {
  value: ApplicationStatus;
  label: string;
  badgeClass: string;
}[] = [
  {
    value: "saved",
    label: "Saved",
    badgeClass: "bg-slate-100 text-slate-700",
  },
  {
    value: "applied",
    label: "Applied",
    badgeClass: "bg-blue-100 text-blue-700",
  },
  {
    value: "interviewing",
    label: "Interviewing",
    badgeClass: "bg-amber-100 text-amber-700",
  },
  {
    value: "offer",
    label: "Offer",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  {
    value: "rejected",
    label: "Rejected",
    badgeClass: "bg-rose-100 text-rose-700",
  },
];

export function categoryLabel(value: string): string {
  return JOB_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
