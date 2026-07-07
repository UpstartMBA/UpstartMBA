-- Seed the job board with curated MBA-friendly tech roles.
-- Run after 0001_init.sql.

insert into public.jobs (company, title, location, category, employment_type, salary_range, description, apply_url, posted_at) values
('Google', 'Associate Product Manager', 'Mountain View, CA', 'product', 'Full-time', '$140k – $170k',
 'Own a product area end to end: define roadmaps, work with engineering and design, and ship features used by billions. The APM program is built for high-potential generalists and pairs you with senior PM mentors, rotations across two product areas, and a global immersion trip. MBA graduates with technical curiosity and strong analytical instincts thrive here.',
 'https://careers.google.com', '2026-06-28'),

('Stripe', 'Product Manager, Payments', 'San Francisco, CA (Hybrid)', 'product', 'Full-time', '$160k – $195k',
 'Drive the roadmap for core payments products serving millions of businesses. You''ll partner with engineering on API design, run pricing experiments, and talk to users weekly. Ideal for MBAs with prior fintech, consulting, or banking experience who want deep ownership at a company still operating like a startup.',
 'https://stripe.com/jobs', '2026-06-30'),

('Meta', 'Product Marketing Manager, Reality Labs', 'Menlo Park, CA', 'marketing', 'Full-time', '$150k – $180k',
 'Shape go-to-market strategy for next-generation hardware. You''ll size markets, define positioning, run launch campaigns, and feed customer insight back into the product roadmap. Strong fit for MBAs from brand management or strategy consulting backgrounds.',
 'https://www.metacareers.com', '2026-06-25'),

('Amazon', 'Senior Program Manager, Operations', 'Seattle, WA', 'operations', 'Full-time', '$130k – $160k',
 'Lead cross-functional initiatives that improve fulfillment speed and cost across North America. Amazon''s Pathways-style ops roles give MBAs P&L-adjacent ownership fast: you''ll run weekly business reviews, dive into data yourself, and present directly to directors.',
 'https://www.amazon.jobs', '2026-06-22'),

('Databricks', 'Strategy & Operations Manager', 'San Francisco, CA', 'strategy', 'Full-time', '$155k – $185k',
 'Work directly with GTM leadership on growth strategy: territory planning, pricing analysis, sales productivity, and board-level reporting. A classic post-consulting landing spot — expect heavy modeling, exec exposure, and a fast promotion path into line leadership.',
 'https://www.databricks.com/company/careers', '2026-07-01'),

('Airbnb', 'Business Operations Lead', 'Remote (US)', 'strategy', 'Full-time', '$150k – $175k',
 'Partner with product and finance leaders to set strategy for a core business line. You''ll own quarterly planning, build the metrics that leadership runs the business on, and incubate new initiatives before they get dedicated teams.',
 'https://careers.airbnb.com', '2026-06-18'),

('Microsoft', 'Product Manager, Azure AI', 'Redmond, WA', 'product', 'Full-time', '$145k – $175k',
 'Define and ship AI platform capabilities for enterprise customers. Microsoft hires MBA PMs at scale and invests heavily in structured onboarding. Great for candidates who want big-company resources with meaningful product scope from day one.',
 'https://careers.microsoft.com', '2026-06-27'),

('Netflix', 'Senior Analyst, Content Finance & Strategy', 'Los Angeles, CA', 'finance', 'Full-time', '$140k – $170k',
 'Model content investment decisions and advise leadership on where the next dollar goes. You''ll blend corporate finance rigor with entertainment-industry judgment. Suits MBAs from banking or corporate development who want a seat at the strategy table.',
 'https://jobs.netflix.com', '2026-06-20'),

('Salesforce', 'Corporate Development Associate', 'San Francisco, CA', 'finance', 'Full-time', '$150k – $180k',
 'Source, evaluate, and execute acquisitions and strategic investments. You''ll build valuation models, run diligence with product teams, and present to the corp dev leadership team. Prior M&A or venture experience strongly preferred.',
 'https://careers.salesforce.com', '2026-06-15'),

('Uber', 'Data Science Manager, Marketplace', 'New York, NY', 'data', 'Full-time', '$165k – $200k',
 'Lead a team of analysts optimizing pricing and matching in Uber''s marketplace. This role rewards MBAs with strong quantitative backgrounds (SQL and experimentation fluency expected) who can translate models into business decisions.',
 'https://www.uber.com/careers', '2026-06-24'),

('Anthropic', 'Product Manager, Enterprise', 'San Francisco, CA', 'product', 'Full-time', '$180k – $220k',
 'Build products that bring frontier AI safely to enterprise customers. You''ll work with research, sales, and design to define what ships next. High-agency environment: expect to write strategy docs, talk to customers, and make calls with imperfect information.',
 'https://www.anthropic.com/careers', '2026-07-02'),

('Shopify', 'Senior Product Marketing Manager', 'Remote (Americas)', 'marketing', 'Full-time', '$135k – $165k',
 'Own positioning and launches for merchant-facing products. Shopify''s remote-first culture and writing-heavy decision-making suit MBAs who communicate crisply. You''ll run betas, brief analysts, and arm the sales team with narrative and proof points.',
 'https://www.shopify.com/careers', '2026-06-19');
