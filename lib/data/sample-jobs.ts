import type { Job } from "@/lib/types";

/**
 * Demo jobs shown when Supabase isn't configured yet, so the app is fully
 * browsable out of the box. The same roles ship in `supabase/seed.sql`.
 */
export const SAMPLE_JOBS: Job[] = [
  {
    id: "demo-1",
    company: "Google",
    title: "Associate Product Manager",
    location: "Mountain View, CA",
    category: "product",
    employment_type: "Full-time",
    salary_range: "$140k – $170k",
    description:
      "Own a product area end to end: define roadmaps, work with engineering and design, and ship features used by billions. The APM program is built for high-potential generalists and pairs you with senior PM mentors, rotations across two product areas, and a global immersion trip. MBA graduates with technical curiosity and strong analytical instincts thrive here.",
    apply_url: "https://careers.google.com",
    posted_at: "2026-06-28",
  },
  {
    id: "demo-2",
    company: "Stripe",
    title: "Product Manager, Payments",
    location: "San Francisco, CA (Hybrid)",
    category: "product",
    employment_type: "Full-time",
    salary_range: "$160k – $195k",
    description:
      "Drive the roadmap for core payments products serving millions of businesses. You'll partner with engineering on API design, run pricing experiments, and talk to users weekly. Ideal for MBAs with prior fintech, consulting, or banking experience who want deep ownership at a company still operating like a startup.",
    apply_url: "https://stripe.com/jobs",
    posted_at: "2026-06-30",
  },
  {
    id: "demo-3",
    company: "Meta",
    title: "Product Marketing Manager, Reality Labs",
    location: "Menlo Park, CA",
    category: "marketing",
    employment_type: "Full-time",
    salary_range: "$150k – $180k",
    description:
      "Shape go-to-market strategy for next-generation hardware. You'll size markets, define positioning, run launch campaigns, and feed customer insight back into the product roadmap. Strong fit for MBAs from brand management or strategy consulting backgrounds.",
    apply_url: "https://www.metacareers.com",
    posted_at: "2026-06-25",
  },
  {
    id: "demo-4",
    company: "Amazon",
    title: "Senior Program Manager, Operations",
    location: "Seattle, WA",
    category: "operations",
    employment_type: "Full-time",
    salary_range: "$130k – $160k",
    description:
      "Lead cross-functional initiatives that improve fulfillment speed and cost across North America. Amazon's Pathways-style ops roles give MBAs P&L-adjacent ownership fast: you'll run weekly business reviews, dive into data yourself, and present directly to directors.",
    apply_url: "https://www.amazon.jobs",
    posted_at: "2026-06-22",
  },
  {
    id: "demo-5",
    company: "Databricks",
    title: "Strategy & Operations Manager",
    location: "San Francisco, CA",
    category: "strategy",
    employment_type: "Full-time",
    salary_range: "$155k – $185k",
    description:
      "Work directly with GTM leadership on growth strategy: territory planning, pricing analysis, sales productivity, and board-level reporting. A classic post-consulting landing spot — expect heavy modeling, exec exposure, and a fast promotion path into line leadership.",
    apply_url: "https://www.databricks.com/company/careers",
    posted_at: "2026-07-01",
  },
  {
    id: "demo-6",
    company: "Airbnb",
    title: "Business Operations Lead",
    location: "Remote (US)",
    category: "strategy",
    employment_type: "Full-time",
    salary_range: "$150k – $175k",
    description:
      "Partner with product and finance leaders to set strategy for a core business line. You'll own quarterly planning, build the metrics that leadership runs the business on, and incubate new initiatives before they get dedicated teams.",
    apply_url: "https://careers.airbnb.com",
    posted_at: "2026-06-18",
  },
  {
    id: "demo-7",
    company: "Microsoft",
    title: "Product Manager, Azure AI",
    location: "Redmond, WA",
    category: "product",
    employment_type: "Full-time",
    salary_range: "$145k – $175k",
    description:
      "Define and ship AI platform capabilities for enterprise customers. Microsoft hires MBA PMs at scale and invests heavily in structured onboarding. Great for candidates who want big-company resources with meaningful product scope from day one.",
    apply_url: "https://careers.microsoft.com",
    posted_at: "2026-06-27",
  },
  {
    id: "demo-8",
    company: "Netflix",
    title: "Senior Analyst, Content Finance & Strategy",
    location: "Los Angeles, CA",
    category: "finance",
    employment_type: "Full-time",
    salary_range: "$140k – $170k",
    description:
      "Model content investment decisions and advise leadership on where the next dollar goes. You'll blend corporate finance rigor with entertainment-industry judgment. Suits MBAs from banking or corporate development who want a seat at the strategy table.",
    apply_url: "https://jobs.netflix.com",
    posted_at: "2026-06-20",
  },
  {
    id: "demo-9",
    company: "Salesforce",
    title: "Corporate Development Associate",
    location: "San Francisco, CA",
    category: "finance",
    employment_type: "Full-time",
    salary_range: "$150k – $180k",
    description:
      "Source, evaluate, and execute acquisitions and strategic investments. You'll build valuation models, run diligence with product teams, and present to the corp dev leadership team. Prior M&A or venture experience strongly preferred.",
    apply_url: "https://careers.salesforce.com",
    posted_at: "2026-06-15",
  },
  {
    id: "demo-10",
    company: "Uber",
    title: "Data Science Manager, Marketplace",
    location: "New York, NY",
    category: "data",
    employment_type: "Full-time",
    salary_range: "$165k – $200k",
    description:
      "Lead a team of analysts optimizing pricing and matching in Uber's marketplace. This role rewards MBAs with strong quantitative backgrounds (SQL and experimentation fluency expected) who can translate models into business decisions.",
    apply_url: "https://www.uber.com/careers",
    posted_at: "2026-06-24",
  },
  {
    id: "demo-11",
    company: "Anthropic",
    title: "Product Manager, Enterprise",
    location: "San Francisco, CA",
    category: "product",
    employment_type: "Full-time",
    salary_range: "$180k – $220k",
    description:
      "Build products that bring frontier AI safely to enterprise customers. You'll work with research, sales, and design to define what ships next. High-agency environment: expect to write strategy docs, talk to customers, and make calls with imperfect information.",
    apply_url: "https://www.anthropic.com/careers",
    posted_at: "2026-07-02",
  },
  {
    id: "demo-12",
    company: "Shopify",
    title: "Senior Product Marketing Manager",
    location: "Remote (Americas)",
    category: "marketing",
    employment_type: "Full-time",
    salary_range: "$135k – $165k",
    description:
      "Own positioning and launches for merchant-facing products. Shopify's remote-first culture and writing-heavy decision-making suit MBAs who communicate crisply. You'll run betas, brief analysts, and arm the sales team with narrative and proof points.",
    apply_url: "https://www.shopify.com/careers",
    posted_at: "2026-06-19",
  },
];
