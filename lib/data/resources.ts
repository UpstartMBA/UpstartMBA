export interface ResourceSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Resource {
  slug: string;
  title: string;
  category: string;
  minutes: number;
  summary: string;
  sections: ResourceSection[];
}

export const RESOURCES: Resource[] = [
  {
    slug: "mba-tech-recruiting-timeline",
    title: "The MBA Tech Recruiting Timeline",
    category: "Getting Started",
    minutes: 8,
    summary:
      "Tech recruiting runs on a different clock than banking or consulting. Here's what to do each quarter so you're never behind.",
    sections: [
      {
        heading: "Why tech recruiting feels chaotic",
        paragraphs: [
          "Consulting and banking recruit on rigid, school-driven schedules. Most tech companies don't. Outside of a handful of structured programs (Google APM, Amazon Pathways, LinkedIn's MBA programs, big-tech PM cohorts), tech hires 'just in time' — a team gets headcount, posts a role, and fills it in four to eight weeks.",
          "That means two things: structured programs have hard fall deadlines you cannot miss, and everything else rewards continuous readiness over a single recruiting sprint.",
        ],
      },
      {
        heading: "First year, fall: foundations",
        paragraphs: [
          "September through December of your first year is for positioning, not applying.",
        ],
        bullets: [
          "Rewrite your resume for tech: impact metrics, product exposure, and analytics — not deal sheets (see our resume playbook).",
          "Pick two target functions max (e.g., PM and strategy & ops). Spraying five functions produces weak stories in all of them.",
          "Note structured-program deadlines now: most big-tech MBA internship applications open in October–December and close fast.",
          "Start networking before you need anything — second-years who just finished internships are your best source of intel.",
        ],
      },
      {
        heading: "First year, winter and spring: the internship push",
        paragraphs: [
          "January through April is when most tech MBA internships are decided. Structured programs run interviews in January–February. Mid-size companies and late-posting teams keep hiring into April and May — many students land great internships 'late' by consulting-school standards.",
        ],
        bullets: [
          "Treat interview prep like a class: two product or case mocks per week with a partner.",
          "Track every application and follow-up in one place — pipeline discipline is a real edge when timelines are scattered.",
          "If a startup is your goal, expect them to hire interns in March–May, not October.",
        ],
      },
      {
        heading: "Second year: full-time conversion or a second search",
        paragraphs: [
          "If your internship converts, negotiate anyway (see the negotiation guide). If not, don't panic: the fall of your second year mirrors the first-year cycle for structured programs, and the just-in-time market means strong candidates land offers all the way through spring graduation — and after.",
          "The through line: tech rewards candidates who stay in market continuously, keep their materials sharp, and maintain a warm network rather than sprinting once a year.",
        ],
      },
    ],
  },
  {
    slug: "breaking-into-product-management",
    title: "Breaking into Product Management",
    category: "Roles",
    minutes: 10,
    summary:
      "What PMs actually do, why MBAs both fit and struggle, and how to build credible product experience before you interview.",
    sections: [
      {
        heading: "What the job actually is",
        paragraphs: [
          "A product manager owns outcomes for a product area: deciding what to build, why, and in what order — then aligning engineering, design, and go-to-market to ship it. You have responsibility without authority. Nobody reports to you; you lead through clarity of thinking, written communication, and trust.",
          "The MBA skill set maps well to half the job: prioritization, stakeholder management, market analysis, and business modeling. The half it doesn't cover — product intuition and technical fluency — is what interviews probe hardest.",
        ],
      },
      {
        heading: "Close the credibility gap before you interview",
        paragraphs: [
          "Interviewers see hundreds of MBAs who 'want to move into product.' The ones who get offers show evidence, not intent.",
        ],
        bullets: [
          "Build or ship something — a no-code app, a niche website with real users, an internal tool. Scope matters less than owning the full loop: problem, build, feedback, iteration.",
          "Do a school-year product internship or a project with a local startup; five hours a week for a semester is a real line on a resume.",
          "Learn enough technical vocabulary to hold a conversation: APIs, databases, front end vs. back end, what an ML model can and can't do. You don't need to code professionally; you need to not be scared of the whiteboard.",
          "Write two or three product teardowns of apps you love and publish them. Interviewers do read them.",
        ],
      },
      {
        heading: "The interview loop",
        paragraphs: [
          "Expect four interview types, and prepare for each explicitly:",
        ],
        bullets: [
          "Product sense: 'Design X for Y' or 'How would you improve Z?' — structure user segments, pain points, solutions, and tradeoffs.",
          "Execution/analytics: metric definitions, diagnosing a metric drop, prioritizing a roadmap. Your MBA analytics training is a genuine advantage here.",
          "Technical: high-level system reasoning, not coding. 'What happens when you type a URL and hit enter?' is the classic.",
          "Behavioral: conflict with engineers, influencing without authority, shipping through ambiguity. Prepare six stories in STAR format and map them to these themes.",
        ],
      },
      {
        heading: "Choosing where to start",
        paragraphs: [
          "Structured big-tech MBA programs (rotational PM cohorts) offer training, mentorship, and brand — the safest first PM job. Mid-size product-led companies offer more scope sooner. Early-stage startups will hand you enormous ownership but no training; they're a better second PM job than first, unless you have prior product-adjacent experience.",
        ],
      },
    ],
  },
  {
    slug: "strategy-bizops-and-beyond",
    title: "Strategy, BizOps, and the 'Athlete' Roles",
    category: "Roles",
    minutes: 7,
    summary:
      "The fastest-growing landing spot for MBAs in tech isn't PM — it's the strategy and operations family. Here's how these roles work and where they lead.",
    sections: [
      {
        heading: "The role family, decoded",
        paragraphs: [
          "Tech companies use a confusing spread of titles for roughly the same profile: Strategy & Operations, Business Operations (BizOps), Chief of Staff, GTM Strategy, Corporate Strategy. All of them hire 'athletes' — structured problem-solvers who can model a business, run a cross-functional project, and write a crisp recommendation.",
          "If you're coming from consulting or banking, this is the smallest career jump with the highest acceptance rate: the day-to-day work resembles casework, but you own outcomes over quarters instead of handing off a deck.",
        ],
      },
      {
        heading: "What you'll actually do",
        paragraphs: ["A representative quarter in a BizOps seat includes:"],
        bullets: [
          "Owning the operating cadence: quarterly planning, weekly business reviews, and the metrics leadership runs the company on.",
          "Deep dives: 'Why is churn up in mid-market?' — you pull the data, interview teams, and drive the fix.",
          "Incubation: running a new initiative (a pricing change, a new market) before it earns dedicated headcount.",
          "Deal support: partnerships, M&A integration, or expansion analysis, depending on the company.",
        ],
      },
      {
        heading: "Interviews and how to prep",
        paragraphs: [
          "Expect consulting-style case interviews adapted to the company's business, a modeling or metrics exercise (know your SaaS metrics: ARR, NRR, CAC payback, magic number), and heavy behavioral emphasis on ownership. Read the company's S-1 or latest earnings call before every interview — referencing their actual numbers separates you immediately.",
        ],
      },
      {
        heading: "Where it leads",
        paragraphs: [
          "BizOps is a proven launchpad: two to three years in, people rotate into general management, product, corp dev, or leave to be early ops hires at startups. Choose the seat by executive access — a BizOps role reporting into a COO or GM teaches you the whole business; one buried three layers down teaches you spreadsheets.",
        ],
      },
    ],
  },
  {
    slug: "networking-and-cold-outreach",
    title: "Networking & Cold Outreach That Actually Works",
    category: "Getting Hired",
    minutes: 9,
    summary:
      "Most tech roles are won through people, not portals. Templates and a weekly system for building a network that produces referrals.",
    sections: [
      {
        heading: "Why outreach beats applications",
        paragraphs: [
          "A cold application to a popular tech role competes with hundreds of resumes. A referral typically gets a recruiter's review within days. The referral isn't a favor — employees are often paid bonuses for successful referrals — so asking is not an imposition. Your job is to make saying yes easy.",
        ],
      },
      {
        heading: "The weekly system",
        paragraphs: [
          "Networking fails when it's a burst before deadlines. Run it as a habit instead:",
        ],
        bullets: [
          "Send five new outreach messages per week — alumni first (highest response rate), then second-degree connections, then true cold.",
          "Take two calls per week. More produces diminishing returns and eats prep time.",
          "Log every contact and follow-up. Ping dormant threads monthly with something genuinely useful or a brief update.",
          "After each call, send a thank-you that references something specific they said. When a relevant role opens, that thread is warm.",
        ],
      },
      {
        heading: "The cold message template",
        paragraphs: [
          "Keep it under 100 words, make the ask small, and show you did homework. A structure that reliably gets replies:",
          "\"Hi [Name] — I'm a [school] MBA focused on [function]. I saw you moved from [their old world] to [their team] and made the transition I'm working toward. I'm not asking about openings — I'd genuinely value 20 minutes on how you evaluated [company/space] and what surprised you. Happy to work around your schedule.\"",
          "Never open by asking for a referral. Referrals emerge at the end of good conversations, usually offered before you ask.",
        ],
      },
      {
        heading: "Converting conversations into offers",
        paragraphs: [
          "On the call, spend most of it asking sharp questions about their work — people remember how conversations felt, not your resume recital. Close with: \"Based on what I'm targeting, is there anyone else you'd suggest I talk to?\" Each call should yield one or two new names. When a role you fit opens on their team, reply in the existing thread with your resume and a two-line pitch. That's the moment the referral happens.",
        ],
      },
    ],
  },
  {
    slug: "mba-resume-for-tech",
    title: "Translating Your Resume for Tech",
    category: "Getting Hired",
    minutes: 6,
    summary:
      "Tech recruiters skim differently than consulting firms. How to rewrite your experience around impact, metrics, and product signal.",
    sections: [
      {
        heading: "What tech recruiters skim for",
        paragraphs: [
          "A recruiter spends well under a minute on your resume, pattern-matching for three things: quantified impact, evidence you can operate in ambiguity, and any product or technical signal. Deal lists, staffing pedigree, and client names — the currency of banking and consulting resumes — mean little here.",
        ],
      },
      {
        heading: "Rewrite every bullet around outcomes",
        paragraphs: [
          "The formula: action + method + quantified result. Compare:",
        ],
        bullets: [
          "Before: \"Advised Fortune 500 retail client on digital transformation strategy.\"",
          "After: \"Built the business case and rollout plan for a retailer's curbside-pickup launch; recommendation adopted and scaled to 400 stores, adding ~$30M annual revenue.\"",
          "Before: \"Executed $2B debt financing for healthcare company.\"",
          "After: \"Modeled financing scenarios under 12 rate environments and drove the structure leadership chose, cutting projected interest cost by $40M over five years.\"",
        ],
      },
      {
        heading: "Add product and technical signal",
        paragraphs: [
          "You need at least two lines a recruiter can point to as 'this person gets tech':",
        ],
        bullets: [
          "Side projects with real users, school-year internships, or product competitions (with outcomes, not participation).",
          "Tools: SQL, Figma, analytics platforms, no-code stacks — only if you can back them up in an interview.",
          "Coursework counts less than artifacts. 'Built and launched X' beats 'Completed product management elective.'",
        ],
      },
      {
        heading: "Format rules",
        paragraphs: [
          "One page, no exceptions. No photo, no objective statement, no skills-rating bars. Lead with experience, not education, unless your pre-MBA employer is unknown and your school is the stronger brand. Save it as a text-readable PDF — applicant tracking systems still parse resumes, and graphics-heavy templates fail silently.",
        ],
      },
    ],
  },
  {
    slug: "negotiating-your-tech-offer",
    title: "Negotiating Your Tech Offer",
    category: "Offers",
    minutes: 8,
    summary:
      "Tech compensation has more moving parts than an MBA signing bonus. Understand the package, know what moves, and negotiate without risking the offer.",
    sections: [
      {
        heading: "Understand the package first",
        paragraphs: [
          "A tech offer typically has four components: base salary, equity (RSUs at public companies, options at startups), target bonus, and one-time extras (signing bonus, relocation). Total compensation — not base — is the number that matters, and equity is where packages diverge most.",
          "For startup options, ask directly: number of shares, total shares outstanding, latest preferred price, and vesting schedule. A company that won't share ownership percentage is telling you something.",
        ],
      },
      {
        heading: "What actually moves",
        paragraphs: [
          "Levers differ by company maturity:",
        ],
        bullets: [
          "Big tech: base is banded tightly by level; equity and signing bonus are the flexible parts. A competing offer moves equity most.",
          "Startups: cash is constrained; equity and level/title are where negotiation happens.",
          "Structured MBA programs (APM cohorts, rotational programs) often have genuinely fixed packages — push once, then accept gracefully rather than burn goodwill.",
        ],
      },
      {
        heading: "How to run the negotiation",
        paragraphs: [
          "Never negotiate before you have the written offer. Once you do: thank them with genuine enthusiasm, ask for a few days, and come back with one consolidated request — not a sequence of asks.",
          "The script: \"I'm excited about this role and ready to sign. Based on [competing offer / market data for this level], I was hoping to get total compensation closer to [number]. If we can get there, I'll sign this week.\" Specific number, single ask, clear close condition.",
          "A competing offer is the strongest lever; market data (levels-based comp sites, career-center reports) is a workable substitute. Recruiters expect negotiation — done respectfully, it will not cost you an offer at any functioning company.",
        ],
      },
      {
        heading: "Beyond the numbers",
        paragraphs: [
          "Start date, remote flexibility, and early performance-review timing are all negotiable and often easier to get than cash. If the company truly can't move on comp, a six-month review with a pre-agreed adjustment path is a strong consolation prize — get it in writing.",
        ],
      },
    ],
  },
];

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
