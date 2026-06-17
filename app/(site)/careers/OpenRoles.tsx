"use client";

import { useState, useRef } from "react";

type State = "idle" | "submitting" | "success" | "error";

const ALLOWED_TYPES = ["application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_MB = 5;

/* ── Data types ──────────────────────────────────────────────────────── */
interface MetaRow { label: string; value: string; highlight?: boolean; note?: string }
interface SubSection { heading: string; items: string[] }
interface Section {
  heading: string;
  text?: string;
  items?: string[];
  subsections?: SubSection[];
}
interface GainItem { title: string; desc: string }
interface OpenRole {
  slug: string;
  title: string;
  subtitle?: string;
  dept: string;
  type: string;
  description: string;
  tags: string[];
  meta: MetaRow[];
  sections: Section[];
  notes?: string[];
  gains?: GainItem[];
}

/* ── Role data ───────────────────────────────────────────────────────── */
const openRoles: OpenRole[] = [
  /* 1 ── Performance Marketing Executive ─────────────────────────── */
  {
    slug: "performance-marketing-executive",
    title: "Performance Marketing Executive",
    subtitle: "Google Ads & Meta Ads",
    dept: "Digital Marketing · Paid Media",
    type: "Full-time · Pune (On-site)",
    description: "Manage paid campaigns on Google and Meta across multiple client accounts, driving measurable ROI through data-led decisions in a fast-paced agency environment.",
    tags: ["Google Ads", "Meta Ads", "Looker Studio", "Analytics"],
    meta: [
      { label: "Location",      value: "Pune (On-site)" },
      { label: "Experience",    value: "1 – 3 Years" },
      { label: "Salary Range",  value: "₹2.50 LPA – ₹3.60 LPA", highlight: true, note: "Salary not a bar for a deserving candidate" },
      { label: "Qualification", value: "Preferred: B.Comm, M.Comm, B.E. (any stream) · Also acceptable: B.Sc. / M.Sc." },
      { label: "Mandatory",     value: "Prior experience in a digital marketing agency" },
      { label: "Preferred Candidate", value: "Performance marketers with hands-on agency experience managing live Google and Meta campaigns across multiple client accounts. The ideal candidate has a proven track record of measurable campaign improvements (ROAS, CPL, CTR) backed by numbers and already uses AI tools to speed up analysis, copy generation, or audience research." },
    ],
    sections: [
      {
        heading: "Job Summary",
        text: "We are looking for a hands-on Performance Marketing Executive with proven agency experience managing paid campaigns on Google and Meta. You will own campaign strategy, execution, and optimisation across multiple client accounts, driving measurable ROI through data-led decisions. If you thrive in a fast-paced agency environment and love turning ad spend into business outcomes, this role is built for you.",
      },
      {
        heading: "Key Responsibilities",
        subsections: [
          { heading: "Google Ads Management", items: [
            "Plan, launch, and optimise Search, Display, Shopping, YouTube, and Performance Max campaigns",
            "Conduct keyword research, audience segmentation, and competitor analysis",
            "Manage bidding strategies, quality scores, and ad copy A/B testing",
            "Set up and monitor conversion tracking via Google Tag Manager and Google Analytics 4",
          ]},
          { heading: "Meta Ads Management", items: [
            "Build and manage campaigns across Facebook and Instagram (awareness, traffic, leads, conversions)",
            "Define target audiences using interest, lookalike, and retargeting segments",
            "Collaborate with the creative team to develop high-performing ad creatives and copy",
            "Monitor Meta Pixel events and troubleshoot tracking discrepancies",
          ]},
          { heading: "Client & Campaign Management", items: [
            "Manage paid media across multiple client accounts simultaneously",
            "Prepare clear, insight-driven performance reports (weekly and monthly)",
            "Proactively identify opportunities to scale budgets and improve ROAS",
            "Coordinate with clients and internal teams to align campaigns with business goals",
          ]},
          { heading: "Analytics & Reporting", items: [
            "Track and report key metrics: CTR, CPC, CPL, ROAS, conversion rate, and revenue",
            "Use Google Analytics 4, Google Ads, Meta Ads Manager, and Looker Studio for reporting",
            "Translate data into actionable recommendations for continuous improvement",
          ]},
        ],
      },
      {
        heading: "Required Skills",
        items: [
          "Mandatory: prior experience in a digital marketing agency",
          "Hands-on experience with Google Ads and Meta Business Suite",
          "Strong understanding of campaign structure, bidding, and audience targeting",
          "Proficiency with Google Analytics 4 and Google Tag Manager",
          "Ability to manage multiple client accounts with competing priorities",
          "Data-driven mindset with strong analytical and problem-solving skills",
          "Good written and verbal communication skills in English",
        ],
      },
      {
        heading: "Preferred Skills",
        items: [
          "Google Ads certification or Meta Blueprint certification",
          "Experience with Looker Studio or similar dashboarding tools",
          "Familiarity with AI-driven campaign features (Smart Bidding, Advantage+)",
          "Basic understanding of landing page optimisation and conversion rate improvement",
          "Experience with e-commerce or lead generation campaigns across diverse industries",
        ],
      },
    ],
    notes: [
      "Candidates with multi-client handling experience and a track record of measurable ROAS improvement will be preferred.",
      "Immediate joiners are a plus.",
    ],
  },

  /* 2 ── Digital Marketing Manager ───────────────────────────────── */
  {
    slug: "digital-marketing-manager",
    title: "Digital Marketing Manager",
    dept: "Digital Marketing · Leadership",
    type: "Full-time · Pune (On-site)",
    description: "Lead end-to-end digital marketing strategy for diverse client portfolios, managing cross-functional teams across SEO, paid media, social, content, and email.",
    tags: ["Team Leadership", "SEO", "Paid Ads", "GA4", "AI Tools"],
    meta: [
      { label: "Location",      value: "Pune (On-site)" },
      { label: "Experience",    value: "1 – 3 Years (specifically in a managerial role at a digital marketing agency)" },
      { label: "Salary Range",  value: "₹3.00 LPA – ₹6.00 LPA", highlight: true },
      { label: "Qualification", value: "Preferred: B.E. (any stream), MCA, M.Comm, MBA · Other relevant degrees considered based on experience" },
      { label: "Mandatory",     value: "Experience as a manager at a digital marketing agency" },
      { label: "Preferred Candidate", value: "Professionals who currently hold or have formally held a Manager title at a digital marketing agency, responsible for a team of at least 3 to 5 people and a diverse portfolio of client accounts. Ideally someone who has owned P&L or revenue accountability at the agency level, is comfortable presenting to client stakeholders, and has driven consistent results across SEO, paid, social, and content channels." },
    ],
    sections: [
      {
        heading: "Job Summary",
        text: "We are looking for an experienced Digital Marketing Manager who has led a team within a digital marketing agency. You will own the end-to-end digital marketing strategy for a diverse portfolio of clients, manage a cross-functional team, and ensure consistent delivery of results across SEO, paid media, social media, content, and email marketing. This is a leadership role: you set the direction, remove obstacles, and hold the standard.",
      },
      {
        heading: "Key Responsibilities",
        subsections: [
          { heading: "Strategy & Planning", items: [
            "Develop and own integrated digital marketing strategies across a diverse portfolio of client accounts",
            "Define KPIs, OKRs, and success metrics for each client engagement",
            "Identify growth opportunities through market research, competitor analysis, and performance data",
            "Align digital strategy with each client's business goals and revenue targets",
          ]},
          { heading: "Team Leadership", items: [
            "Lead, mentor, and manage a team of digital marketing executives and specialists",
            "Assign and review work, provide constructive feedback, and build team capability",
            "Conduct weekly team reviews and ensure accountability on deliverables",
            "Drive a culture of data, experimentation, and continuous improvement",
          ]},
          { heading: "Client Management", items: [
            "Serve as the primary point of contact for key client accounts",
            "Lead weekly, monthly, and quarterly client review meetings with performance presentations",
            "Proactively communicate campaign insights, risks, and strategic pivots",
            "Identify upsell and cross-sell opportunities within existing accounts",
          ]},
          { heading: "Execution Oversight", items: [
            "Oversee campaign execution across SEO, Google Ads, Meta Ads, social media, content, and email marketing",
            "Review and approve all deliverables before client submission",
            "Ensure all campaigns are tracked, reported, and optimised on schedule",
            "Maintain quality standards and brand consistency across all client deliverables",
          ]},
          { heading: "Analytics & Reporting", items: [
            "Monitor and analyse aggregate performance across the portfolio",
            "Use tools including GA4, Google Search Console, SEMrush, Meta Ads Manager, and HubSpot",
            "Present monthly performance reports with clear takeaways and next steps",
          ]},
        ],
      },
      {
        heading: "Required Skills",
        items: [
          "Mandatory: prior managerial experience at a digital marketing agency",
          "Proven ability to manage a team and a diverse portfolio of client accounts simultaneously",
          "Strong command of core digital marketing channels: SEO, paid media, social, content, and email",
          "Excellent analytical skills with the ability to translate data into strategy",
          "Strong client communication and presentation skills",
          "Ability to manage competing priorities and deliver under tight timelines",
          "Proficiency with marketing analytics tools (GA4, SEMrush, Ahrefs, Meta Ads Manager)",
        ],
      },
      {
        heading: "Preferred Skills",
        items: [
          "Experience with AI-driven marketing tools and automation platforms",
          "Familiarity with CRM systems (HubSpot, Zoho) and marketing automation workflows",
          "Understanding of web development basics to collaborate effectively with tech teams",
          "Experience with project management tools (Asana, Trello, Notion, or similar)",
          "Exposure to GEO (Generative Engine Optimisation) and AEO (Answer Engine Optimisation)",
        ],
      },
    ],
    notes: [
      "This role is specifically for candidates who have worked as managers, not individual contributors aspiring to management. Agency background is non-negotiable.",
      "Immediate joiners preferred.",
    ],
  },

  /* 3 ── SEO Executive ─────────────────────────────────────────────── */
  {
    slug: "seo-executive",
    title: "SEO Executive",
    dept: "Digital Marketing · SEO",
    type: "Full-time · Pune (On-site)",
    description: "Manage SEO, GEO (Generative Engine Optimisation), and AEO (Answer Engine Optimisation) for multiple clients from an agency background.",
    tags: ["SEO", "GEO", "AEO", "SEMrush", "Google Search Console"],
    meta: [
      { label: "Location",      value: "Pune (On-site)" },
      { label: "Experience",    value: "1 – 3 Years" },
      { label: "Salary Range",  value: "₹1.80 LPA – ₹3.00 LPA", highlight: true },
      { label: "Qualification", value: "Preferred: B.E. (any stream) · Also acceptable: B.Sc. (CS/IT), M.Sc., MCA, BCA or relevant IT degree" },
      { label: "Mandatory",     value: "Experience in a digital marketing agency" },
      { label: "Preferred Candidate", value: "Candidates who have worked on SEO, GEO, and AEO across multiple client accounts, ideally within a digital marketing agency. The ideal candidate has hands-on experience with AI tools such as Claude, has worked on websites developed using AI-assisted workflows, and understands how search visibility is shifting across both traditional and generative AI platforms." },
    ],
    sections: [
      {
        heading: "Job Summary",
        text: "We are looking for an SEO Executive with 1 to 3 years of experience, preferably from a digital marketing agency background. The candidate should have hands-on experience managing multiple clients and strong expertise in SEO, GEO (Generative Engine Optimisation), and AEO (Answer Engine Optimisation), along with content marketing capabilities.",
      },
      {
        heading: "Key Responsibilities",
        subsections: [
          { heading: "SEO & Client Management", items: [
            "Execute on-page and off-page SEO strategies across multiple client accounts",
            "Perform keyword research, competitor analysis, and technical site audits",
            "Optimise websites and content for search engines and AI-driven platforms",
            "Implement GEO strategies for visibility on generative AI platforms (ChatGPT, Perplexity, Gemini)",
            "Apply AEO techniques for featured snippets, People Also Ask, and voice search",
          ]},
          { heading: "Content Strategy & Optimisation", items: [
            "Develop SEO-driven content briefs, blog posts, landing pages, and website copy",
            "Identify content gaps and topical authority opportunities through competitor analysis and search trends",
            "Optimise existing content to improve keyword rankings, engagement, and conversions",
          ]},
          { heading: "Analytics & Performance Reporting", items: [
            "Monitor and analyse SEO performance metrics: organic traffic, keyword rankings, CTR, bounce rate, and conversions",
            "Use tools like Google Analytics 4, Google Search Console, SEMrush, Ahrefs, or Moz",
            "Prepare weekly and monthly performance reports with actionable insights",
            "Conduct A/B testing and implement data-driven improvements",
          ]},
        ],
      },
      {
        heading: "Required Skills",
        items: [
          "Mandatory: experience in a digital marketing agency",
          "Experience managing multiple client accounts",
          "Strong understanding of SEO, GEO, and AEO",
          "Hands-on experience with SEO tools (Google Analytics, SEMrush, Ahrefs, etc.)",
          "Strong content understanding and optimisation skills",
          "Good analytical and problem-solving skills",
        ],
      },
      {
        heading: "Preferred Skills",
        items: [
          "Experience with AI tools like Claude, Claude Code, and websites created using AI-assisted workflows",
          "Basic knowledge of HTML/CSS",
          "Understanding of integrated digital marketing channels",
          "Basic understanding of AI search and voice search optimisation",
        ],
      },
    ],
    notes: [
      "Candidates with multi-client handling experience will be preferred.",
      "Immediate joiners are a plus.",
    ],
  },

  /* 4 ── Sales Executive – AI Product ────────────────────────────── */
  {
    slug: "sales-executive-ai-product",
    title: "Sales Executive — AI Product",
    dept: "Sales · AI Product",
    type: "Full-time · Pune (On-site) · 3 openings",
    description: "Own the full sales cycle for MagicFlow AI — our AI-powered lead qualification chatbot — from prospecting to close, targeting SMEs and growth-focused businesses.",
    tags: ["B2B SaaS Sales", "CRM", "Outbound", "Product Demos"],
    meta: [
      { label: "Location",      value: "Pune (On-site)" },
      { label: "Experience",    value: "2 – 5 Years (in B2B SaaS or technology product sales)" },
      { label: "Openings",      value: "3 positions", highlight: true },
      { label: "Salary Range",  value: "₹3.00 LPA – ₹6.00 LPA + performance incentives", highlight: true },
      { label: "Qualification", value: "Any graduate / postgraduate; business or technology background preferred" },
      { label: "Mandatory",     value: "B2B SaaS or technology product sales experience with a quota-carrying track record" },
      { label: "Preferred Candidate", value: "Sales professionals who have sold SaaS or AI-powered tools to SMB and mid-market businesses, carrying an independent revenue target and closing deals end-to-end. Prior experience selling lead generation, chatbot, CRM, or marketing automation products is a strong advantage given the nature of MagicFlow AI." },
    ],
    sections: [
      {
        heading: "Job Summary",
        text: "We are looking for Sales Executives who can confidently take MagicFlow AI to market. You will own the full sales cycle from prospecting and product demonstration through to contract close and handoff. The role targets SMEs, growth-focused businesses, and digital marketing agencies who need a smarter way to qualify website enquiries. Three positions are available; we want candidates who are ready to carry a revenue target and hit it.",
      },
      {
        heading: "Key Responsibilities",
        subsections: [
          { heading: "Prospecting & Pipeline Building", items: [
            "Identify and qualify SME and mid-market prospects across industries: retail, services, education, real estate, and hospitality",
            "Run outbound prospecting via cold outreach, LinkedIn, and referral networks",
            "Convert inbound enquiries and demo requests into qualified pipeline",
            "Maintain a healthy, well-documented pipeline in the CRM (HubSpot or equivalent)",
          ]},
          { heading: "Product Demonstration & Consultative Selling", items: [
            "Conduct live demos of MagicFlow AI, tailoring the conversation to each prospect's lead generation challenges",
            "Translate product features (AI qualification, UTM tracking, lead scoring, CRM handoff) into clear business value",
            "Ask discovery questions that surface the prospect's real pain: lost website enquiries, slow follow-up, poor lead quality",
            "Handle objections confidently with a combination of product knowledge and real customer outcomes",
          ]},
          { heading: "Proposals, Pricing & Closure", items: [
            "Develop and present proposals aligned to each prospect's traffic volume, team size, and revenue goals",
            "Negotiate leasing plans and close contracts in line with monthly revenue targets",
            "Coordinate with the onboarding team to ensure a smooth handoff post-close",
          ]},
          { heading: "Customer Success & Expansion", items: [
            "Stay connected with active accounts to track usage, gather feedback, and identify expansion opportunities",
            "Identify agency partners (digital marketing agencies, web agencies) for reseller or referral arrangements",
            "Relay customer feedback and competitive signals to the product and marketing teams",
          ]},
          { heading: "Reporting", items: [
            "Maintain accurate CRM records for all pipeline activities, demos, and deal stages",
            "Provide weekly sales forecasts and activity reports to sales leadership",
          ]},
        ],
      },
      {
        heading: "Required Skills",
        items: [
          "Mandatory: proven B2B SaaS or technology product sales experience with a quota-carrying track record",
          "Strong understanding of the SaaS sales cycle: outbound, discovery, demo, proposal, close",
          "Ability to demo a product and explain technical features in plain business language",
          "Proficiency with CRM tools (HubSpot, Salesforce, Zoho, or equivalent)",
          "Confident, consultative communication and negotiation skills",
          "Self-driven with a clear record of meeting or exceeding revenue targets",
        ],
      },
      {
        heading: "Preferred Skills",
        items: [
          "Experience selling lead generation, chatbot, CRM, or marketing automation solutions",
          "Familiarity with lead generation concepts: UTM tracking, conversion rate, lead scoring, CRM workflows",
          "Network or experience selling into SME segments: retail, services, education, real estate, hospitality",
          "Experience working with or selling through digital marketing agency channels",
        ],
      },
    ],
    notes: [
      "Three positions open. Candidates with a consistent SaaS quota-carrying track record and experience selling AI or automation tools will be preferred.",
      "Immediate joiners are a plus.",
    ],
  },

  /* 5 ── Digital Marketing Sales Executive ───────────────────────── */
  {
    slug: "digital-marketing-sales-executive",
    title: "Digital Marketing Sales Executive",
    dept: "Sales · Digital Marketing Agency",
    type: "Full-time · Pune (On-site)",
    description: "Sell integrated digital marketing services — SEO retainers, paid media, social, and content — to ambitious businesses. Prior agency sales experience required.",
    tags: ["Agency Sales", "Business Development", "Proposal Writing"],
    meta: [
      { label: "Location",      value: "Pune (On-site)" },
      { label: "Experience",    value: "2 – 5 Years (selling digital marketing services or agency solutions)" },
      { label: "Salary Range",  value: "₹3.00 LPA – ₹6.00 LPA + performance incentives", highlight: true },
      { label: "Qualification", value: "Any graduate / postgraduate; marketing, business, or technology background preferred" },
      { label: "Mandatory",     value: "Prior sales experience at or for a digital marketing agency" },
      { label: "Preferred Candidate", value: "Sales professionals with a proven record of selling digital marketing services: SEO retainers, paid media packages, social media management, or integrated digital mandates. The ideal candidate has worked in a sales or business development role at a digital marketing agency and understands the services well enough to hold a credible conversation with a CMO or marketing head." },
    ],
    sections: [
      {
        heading: "Job Summary",
        text: "We are looking for a Digital Marketing Sales Executive with direct sales experience at or for a digital marketing agency. You have a pipeline history, closed retainers, and the ability to walk a prospect through the value of integrated digital services with confidence. This is not an entry-level role: we want someone who has carried a revenue number and delivered against it in the digital marketing space.",
      },
      {
        heading: "Key Responsibilities",
        subsections: [
          { heading: "Business Development", items: [
            "Identify and pursue new business opportunities across SMB and mid-market segments",
            "Generate leads through referrals, LinkedIn, networking events, and inbound inquiries",
            "Qualify prospects and understand their digital marketing challenges before proposing solutions",
            "Build relationships with decision-makers: marketing heads, CEOs, and founders",
          ]},
          { heading: "Consultative Selling", items: [
            "Present MagicWorks' services (SEO, Paid Ads, Social Media, Content, AI Automation, Web Development) with authority and specificity",
            "Tailor proposals based on each client's goals, industry, and budget",
            "Conduct discovery and pitch meetings, online and in-person",
            "Handle objections using knowledge of real campaign outcomes and case studies",
          ]},
          { heading: "Proposal & Closure", items: [
            "Develop detailed proposals covering scope, deliverables, timelines, and pricing",
            "Negotiate contracts and close accounts against monthly and quarterly revenue targets",
            "Coordinate with the delivery team to ensure a smooth, well-briefed project kickoff",
          ]},
          { heading: "Account Growth & Reporting", items: [
            "Maintain post-sales relationships and identify opportunities to expand service scope",
            "Log all pipeline activities, updates, and client communications in the CRM",
            "Report on pipeline value, conversion rates, revenue closed, and activity volume",
          ]},
        ],
      },
      {
        heading: "Required Skills",
        items: [
          "Mandatory: proven sales experience at or for a digital marketing agency",
          "Solid understanding of digital marketing services: SEO, PPC, social media, content, and email",
          "Track record of closing agency retainers or project contracts",
          "Strong pipeline management and CRM discipline",
          "Excellent communication, presentation, and negotiation skills",
          "Outcome-oriented selling approach backed by understanding of campaign mechanics",
        ],
      },
      {
        heading: "Preferred Skills",
        items: [
          "Familiarity with AI-driven marketing and automation solutions, a growing part of our portfolio",
          "Network within target industries: education, manufacturing, real estate, hospitality, or finance",
          "Experience with proposal tools and CRM automation",
        ],
      },
    ],
    notes: [
      "We are looking for candidates with an established sales track record in the digital marketing space, not candidates exploring a move into sales.",
      "Immediate joiners are a plus.",
    ],
  },

  /* 6 ── Web Developer ─────────────────────────────────────────────── */
  {
    slug: "web-developer",
    title: "Web Developer",
    subtitle: "Full Stack: React, Node.js & AI-Assisted",
    dept: "Web Engineering · Technology",
    type: "Full-time · Pune (On-site)",
    description: "Build and ship client websites, internal tools, and AI-integrated products. Strong React.js skills and regular use of AI coding tools (Claude / Claude Code) required.",
    tags: ["React.js", "Node.js", "Next.js", "Claude / Claude Code", "TypeScript"],
    meta: [
      { label: "Location",      value: "Pune (On-site)" },
      { label: "Experience",    value: "2 – 3 Years (full-stack web development)" },
      { label: "Salary Range",  value: "Competitive, based on skills and portfolio", highlight: true },
      { label: "Qualification", value: "Preferred: B.E. / B.Tech (CS, IT, or related) · Also acceptable: MCA, B.Sc. (CS/IT) with a strong deployed portfolio" },
      { label: "Mandatory",     value: "React.js proficiency + Active use of AI coding tools (Claude / Claude Code)" },
      { label: "Preferred Candidate", value: "Engineers with 2 to 3 years of hands-on experience building and deploying full-stack web applications, comfortable with React on the frontend and Node.js (or equivalent) on the backend. The ideal candidate writes clean, working code and actively uses Claude or Claude Code in their day-to-day workflow. A portfolio of live, deployed projects is more meaningful than certifications alone." },
    ],
    sections: [
      {
        heading: "Job Summary",
        text: "We are looking for a full-stack Web Developer with 2 to 3 years of practical experience building and shipping web applications. You will work on client websites, internal tools, and AI-integrated products, collaborating with designers and digital marketers to deliver clean, production-ready builds. A strong requirement for this role is regular, demonstrable use of AI coding tools, particularly Claude and Claude Code.",
      },
      {
        heading: "Key Responsibilities",
        subsections: [
          { heading: "Frontend Development", items: [
            "Build responsive, accessible UI components using React.js and Tailwind CSS",
            "Implement designs from Figma accurately, with good attention to spacing, typography, and visual detail",
            "Manage application state using React hooks, Context API, or lightweight state libraries",
            "Ensure pages load quickly and pass Core Web Vitals checks (LCP, INP, CLS)",
            "Write reusable, well-structured components that are easy to maintain and extend",
          ]},
          { heading: "Backend Development", items: [
            "Build REST APIs using Node.js and Express.js to support frontend features",
            "Work with relational databases (MySQL or PostgreSQL) and basic NoSQL setups (MongoDB)",
            "Implement standard authentication flows (JWT, session-based)",
            "Integrate third-party APIs including payment gateways, CRM connectors, and external data sources",
            "Write backend code that is readable, tested, and follows agreed conventions",
          ]},
          { heading: "AI-Assisted Development", items: [
            "Use Claude and Claude Code regularly to write, review, debug, and refactor code",
            "Integrate AI service APIs (Anthropic Claude, OpenAI) into web applications as required by project scope",
            "Build AI-assisted features such as chatbots, content generation widgets, and smart search where needed",
            "Stay aware of new AI development tools and adopt those that genuinely improve output",
          ]},
          { heading: "Deployment & Version Control", items: [
            "Deploy web applications to platforms such as Vercel, Netlify, or shared hosting environments",
            "Use Git for version control with clean commit history, proper branching, and pull requests",
            "Follow the team deployment checklist and escalate blockers to senior engineers when needed",
            "Monitor basic site health: broken links, uptime alerts, and console errors post-launch",
          ]},
          { heading: "Collaboration & Quality", items: [
            "Work closely with designers, digital marketers, and other engineers on project deliverables",
            "Participate in code reviews, taking and giving feedback constructively",
            "Communicate progress and flag blockers clearly in standups and project channels",
            "Maintain basic documentation for the components and APIs you build",
          ]},
        ],
      },
      {
        heading: "Tech Stack",
        text: "You should be comfortable across most of these: React.js · JavaScript (ES6+) · Node.js · Express.js · Tailwind CSS · MySQL / PostgreSQL · MongoDB · REST APIs · Git / GitHub · Vercel / Netlify · Claude / Claude Code · AI API Integration · HTML5 / CSS3",
      },
      {
        heading: "Required Skills",
        items: [
          "Solid React.js skills: hooks, props, state management, component structure",
          "Good JavaScript fundamentals: ES6+ syntax, async/await, Promises, array methods",
          "Backend experience with Node.js and Express.js; PHP or Python considered for strong frontend candidates",
          "Comfortable with SQL queries, basic schema design, and at least one NoSQL database",
          "Ability to consume and build RESTful APIs",
          "Git version control: committing, branching, and raising pull requests",
          "Active use of AI coding tools (Claude, Claude Code, or GitHub Copilot) in real projects",
          "Ability to implement responsive designs from Figma files",
        ],
      },
      {
        heading: "Preferred Skills",
        items: [
          "Next.js basics: pages router or App Router, simple SSR or SSG setups",
          "TypeScript: basic type annotations and interface usage",
          "Experience calling AI APIs (Anthropic Claude, OpenAI) from a web application",
          "Familiarity with WordPress or a headless CMS (Strapi, Contentful) for content-driven sites",
          "Basic cloud deployment experience (Vercel, Netlify, or AWS S3/EC2)",
          "Understanding of SEO technical basics: meta tags, canonical URLs, sitemap, and page speed",
        ],
      },
    ],
    notes: [
      "A portfolio with live, deployed projects will carry more weight than academic credentials. Please include links to your work in the application.",
      "Candidates who actively use AI coding tools and can show it will be preferred over those who only mention it.",
      "Immediate joiners are a plus.",
    ],
  },

  /* 7 ── SEO / AEO / GEO Intern ───────────────────────────────────── */
  {
    slug: "seo-aeo-geo-intern",
    title: "SEO / AEO / GEO Intern",
    dept: "Digital Marketing · SEO",
    type: "Internship · 3–6 months · Pune (On-site)",
    description: "Join the search team and gain hands-on experience in SEO, AEO, and Generative Engine Optimisation (GEO) — one of the most in-demand emerging skills. Work on live client projects from day one.",
    tags: ["SEO", "GEO", "AEO", "AI Search", "Content Strategy"],
    meta: [
      { label: "Location",      value: "Pune (On-site)" },
      { label: "Duration",      value: "3 to 6 Months" },
      { label: "Stipend",       value: "Performance-based", highlight: true },
      { label: "Qualification", value: "Completed a certified Digital Marketing course, OR degree in Digital Marketing or related field. B.E. (any stream) preferred; B.Sc. (CS/IT), M.Sc., MCA, BCA also acceptable." },
      { label: "Preferred Candidate", value: "Freshers or recent graduates with a strong interest in search visibility who have completed a Digital Marketing course or hold a related degree. Candidates who are already exploring SEO tools, reading about AI search (GEO), and following how platforms like ChatGPT and Perplexity surface content will adapt quickly to this role." },
    ],
    sections: [
      {
        heading: "Understanding the Role: SEO, AEO & GEO",
        text: "This internship covers three interconnected disciplines that define modern search visibility: SEO (Search Engine Optimisation) — ranking on Google & Bing through keyword strategy, on-page optimisation, technical fixes, and link building. AEO (Answer Engine Optimisation) — optimising content for featured snippets, People Also Ask, voice search, and Google's AI Overviews. GEO (Generative Engine Optimisation) — making brands visible inside AI-generated answers on ChatGPT, Perplexity, Gemini, and similar platforms.",
      },
      {
        heading: "Role Overview",
        text: "We are looking for a curious and driven SEO / AEO / GEO Intern to join our search team in Pune. This is a full-time, on-site internship for candidates who have completed a Digital Marketing course or hold a degree in Digital Marketing, with a strong interest in search visibility, content strategy, and the future of AI-powered search. You will work directly on client projects from day one.",
      },
      {
        heading: "Key Responsibilities",
        subsections: [
          { heading: "Search Engine Optimisation (SEO)", items: [
            "Assist with on-page optimisation: meta tags, headings, internal linking, and page structure",
            "Support keyword research and competitive gap analysis",
            "Help monitor technical SEO health using Google Search Console and basic audit tools",
          ]},
          { heading: "Answer Engine Optimisation (AEO)", items: [
            "Research and identify opportunities for featured snippets and AI Overview inclusion",
            "Assist in formatting content to answer specific search queries clearly and concisely",
            "Monitor changes in how Google presents answers and document findings for the team",
          ]},
          { heading: "Generative Engine Optimisation (GEO)", items: [
            "Track how client brands and competitors appear in AI-generated answers (ChatGPT, Perplexity, Gemini)",
            "Assist with content and structured data updates that improve AI-platform visibility",
            "Document GEO experiments and share learnings across the team",
          ]},
          { heading: "Reporting & Analysis", items: [
            "Pull weekly performance data from Google Analytics 4 and Google Search Console",
            "Compile reports and flag trends or anomalies to the senior SEO team",
            "Assist in maintaining content calendars and task trackers",
          ]},
        ],
      },
      {
        heading: "Required Skills & Knowledge",
        items: [
          "Basic understanding of SEO fundamentals: on-page, off-page, and technical",
          "Awareness of how featured snippets, AI Overviews, and voice search work (AEO concepts)",
          "Curiosity about AI search tools: ChatGPT, Perplexity, Google Gemini, Bing Copilot",
          "Familiarity with Google Analytics and Google Search Console",
          "Good content writing and editing skills in English",
          "Proficiency in MS Office / Google Workspace (Docs, Sheets, Slides)",
          "Analytical mindset and attention to detail",
        ],
      },
    ],
    gains: [
      { title: "SEO + AEO + GEO", desc: "Rare end-to-end training across all three search disciplines" },
      { title: "AI Search Skills", desc: "Hands-on experience with GEO, a highly in-demand and emerging skill" },
      { title: "Mentorship", desc: "Direct guidance from experienced SEO and digital marketing professionals" },
      { title: "Internship Certificate", desc: "Official certificate upon successful completion" },
      { title: "Letter of Recommendation", desc: "Based on performance and contribution" },
      { title: "PPO Opportunity", desc: "Pre-Placement Offer for outstanding performers" },
    ],
  },

  /* 8 ── Digital Marketing Intern ─────────────────────────────────── */
  {
    slug: "digital-marketing-intern",
    title: "Digital Marketing Intern",
    dept: "Digital Marketing",
    type: "Internship · 3–6 months · Pune (On-site)",
    description: "Execute real campaigns across paid marketing, SEO, and social media with mentorship from experienced digital marketers. Work on live client projects from day one.",
    tags: ["Paid Media", "SEO", "Social Media", "GA4", "Campaign Execution"],
    meta: [
      { label: "Location",      value: "Pune (On-site)" },
      { label: "Duration",      value: "3 to 6 Months" },
      { label: "Stipend",       value: "Performance-based", highlight: true },
      { label: "Qualification", value: "Completed a certified Digital Marketing course, OR holds a degree in Digital Marketing or a related field. Freshers and recent graduates are welcome to apply." },
      { label: "Preferred Candidate", value: "Freshers or recent graduates who have completed a certified Digital Marketing course and are eager to get their hands on live campaigns. Candidates who have done personal projects, run small ad campaigns for practice, or created content for their own platforms will stand out." },
    ],
    sections: [
      {
        heading: "Role Overview",
        text: "We are seeking a motivated Digital Marketing Intern to join our marketing team in Pune. This is a full-time, on-site internship for candidates who have completed a certified Digital Marketing course or hold a degree in Digital Marketing. The intern will gain hands-on experience executing real campaigns across paid marketing, SEO, social media, and more.",
      },
      {
        heading: "Key Responsibilities",
        subsections: [
          { heading: "Paid Marketing (PPC & Paid Ads)", items: [
            "Assist in setting up and monitoring Google Ads and Meta Ads campaigns under supervision",
            "Help with keyword research, ad copy drafting, and audience setup",
            "Pull performance reports and flag anomalies or optimisation opportunities",
          ]},
          { heading: "Search Engine Optimisation (SEO)", items: [
            "Support on-page SEO tasks: meta tag updates, heading structure, and internal links",
            "Assist with basic keyword research and content gap identification",
            "Help monitor Google Search Console for errors and performance insights",
          ]},
          { heading: "General Digital Marketing", items: [
            "Assist with content creation and scheduling for social media platforms",
            "Support email marketing campaigns: drafting, scheduling, and performance tracking",
            "Help maintain and update website content and landing pages",
            "Stay updated on the latest digital marketing trends and algorithm updates",
            "Collaborate with the design and content team on campaign materials",
          ]},
        ],
      },
      {
        heading: "Required Skills & Knowledge",
        items: [
          "Basic understanding of Google Ads and Meta Ads platforms",
          "Fundamental knowledge of SEO principles: on-page, off-page, and technical SEO",
          "Familiarity with Google Analytics and Google Search Console",
          "Understanding of social media marketing (Facebook, Instagram, LinkedIn)",
          "Good written and verbal communication skills in English",
          "Proficiency in MS Office / Google Workspace (Docs, Sheets, Slides)",
          "Analytical mindset with attention to detail",
        ],
      },
    ],
    gains: [
      { title: "Real Campaign Experience", desc: "Work on live paid marketing and SEO projects from day one" },
      { title: "Mentorship", desc: "Guidance from experienced digital marketers" },
      { title: "Internship Certificate", desc: "Official certificate upon successful completion" },
      { title: "Letter of Recommendation", desc: "Based on performance and contribution" },
      { title: "PPO Opportunity", desc: "Pre-Placement Offer for outstanding performers" },
      { title: "Tool Proficiency", desc: "Hands-on training on industry-standard tools" },
    ],
  },
];

/* ── Apply Form ──────────────────────────────────────────────────────── */
function ApplyForm({ jobSlug, jobTitle, onClose }: { jobSlug: string; jobTitle: string; onClose: () => void }) {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", linkedin_url: "", portfolio_url: "", cover_letter: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setResumeError("");
    if (!file) { setResume(null); return; }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setResumeError("Only PDF or Word documents are accepted.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setResumeError(`File must be under ${MAX_MB} MB.`);
      e.target.value = "";
      return;
    }
    setResume(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("job_slug", jobSlug);
      fd.append("job_title", jobTitle);
      if (resume) fd.append("resume", resume, resume.name);

      const res = await fetch("/api/careers", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="mt-4 bg-[#F7F3EA] border border-[#D4A537]/40 rounded-[10px] p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#D4A537]/15 flex items-center justify-center mx-auto mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A537" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h4 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-1">Application received.</h4>
        <p className="text-[13px] text-[#3F3F4A]">We review every application and will be in touch if there&apos;s a fit.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-[#F7F3EA] border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-7 space-y-4"
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C]">
          Apply — {jobTitle}
        </h4>
        <button type="button" onClick={onClose} className="text-[#9A9AA8] hover:text-[#2A1B5C] transition-colors" aria-label="Close form">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { name: "name",         label: "Full name *",   type: "text",  required: true,  placeholder: "Your name" },
          { name: "email",        label: "Email *",       type: "email", required: true,  placeholder: "you@email.com" },
          { name: "phone",        label: "Phone",         type: "tel",   required: false, placeholder: "+91 98xxx xxxxx" },
          { name: "linkedin_url", label: "LinkedIn URL",  type: "url",   required: false, placeholder: "linkedin.com/in/you" },
        ].map((f) => (
          <div key={f.name}>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">{f.label}</label>
            <input
              name={f.name} type={f.type} required={f.required} placeholder={f.placeholder}
              value={form[f.name as keyof typeof form]} onChange={handleChange}
              className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] bg-white focus:outline-none focus:border-[#5B3FBE] transition-colors"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">Portfolio / Work URL</label>
        <input
          name="portfolio_url" type="url" placeholder="yoursite.com or Behance, GitHub…"
          value={form.portfolio_url} onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] bg-white focus:outline-none focus:border-[#5B3FBE] transition-colors"
        />
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
          Resume / CV <span className="normal-case text-[#9A9AA8]">(PDF or Word · max 5 MB)</span>
        </label>
        <div
          className="w-full border border-dashed border-[#D8D8DE] rounded-[6px] px-4 py-4 bg-white flex items-center gap-4 cursor-pointer hover:border-[#5B3FBE] transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B3FBE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span className="text-[14px] text-[#3F3F4A]">{resume ? resume.name : "Click to upload your resume"}</span>
          {resume && (
            <button type="button" onClick={(ev) => { ev.stopPropagation(); setResume(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
              className="ml-auto text-[#9A9AA8] hover:text-red-500 transition-colors" aria-label="Remove file">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
        {resumeError && <p className="text-red-500 text-[12px] mt-1">{resumeError}</p>}
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">Cover letter / note</label>
        <textarea
          name="cover_letter" rows={4} placeholder="Why this role? What would you bring?"
          value={form.cover_letter} onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] bg-white resize-none focus:outline-none focus:border-[#5B3FBE] transition-colors"
        />
      </div>

      {state === "error" && (
        <p className="text-red-600 text-[13px]">
          Something went wrong. Email us at{" "}
          <a href="mailto:careers@magicworksitsolutions.com" className="underline">careers@magicworksitsolutions.com</a>
        </p>
      )}

      <div className="flex gap-3 pt-1">
        <button type="submit" disabled={state === "submitting"}
          className="flex-1 bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-[13px] rounded-full border-none cursor-pointer hover:scale-[1.01] transition-transform disabled:opacity-60">
          {state === "submitting" ? "Sending…" : "Submit application"}
        </button>
        <button type="button" onClick={onClose}
          className="px-6 py-[13px] rounded-full border border-[#D8D8DE] text-[13px] text-[#3F3F4A] font-semibold hover:border-[#2A1B5C] transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ── Job Details renderer ────────────────────────────────────────────── */
function JobDetails({ role }: { role: OpenRole }) {
  return (
    <div className="mt-6 border-t border-[#D8D8DE] pt-6 space-y-6">

      {/* Meta table */}
      <div className="overflow-x-auto rounded-[10px] border border-[#D8D8DE]">
        <table className="w-full text-[13px]">
          <tbody>
            {role.meta.map((row) => (
              <tr key={row.label} className="border-b border-[#D8D8DE] last:border-0">
                <td className="px-4 py-3 font-bold text-[#2A1B5C] bg-[#F7F3EA] whitespace-nowrap align-top w-[160px]">{row.label}</td>
                <td className="px-4 py-3 text-[#3F3F4A] align-top leading-[1.65]">
                  {row.highlight
                    ? <><span className="font-bold text-[#2A1B5C]">{row.value}</span>{row.note && <em className="text-[#9A9AA8] ml-2 font-normal">({row.note})</em>}</>
                    : row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Content sections */}
      {role.sections.map((sec) => (
        <div key={sec.heading}>
          <h4 className="font-[family-name:var(--font-head)] font-bold text-[15px] text-[#2A1B5C] mb-2 pb-1 border-b-2 border-[#D4A537] inline-block">
            {sec.heading}
          </h4>
          {sec.text && <p className="text-[14px] text-[#3F3F4A] leading-[1.7] mt-2">{sec.text}</p>}
          {sec.items && (
            <ul className="mt-2 space-y-2">
              {sec.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-[14px] text-[#3F3F4A] leading-[1.65]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#D4A537] shrink-0 mt-[7px]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {sec.subsections && (
            <div className="mt-2 space-y-4">
              {sec.subsections.map((sub) => (
                <div key={sub.heading}>
                  <h5 className="text-[13px] font-bold text-[#5B3FBE] mb-2">{sub.heading}</h5>
                  <ul className="space-y-2">
                    {sub.items.map((item, i) => (
                      <li key={i} className="flex gap-2 text-[14px] text-[#3F3F4A] leading-[1.65]">
                        <span className="w-[6px] h-[6px] rounded-full bg-[#D4A537] shrink-0 mt-[7px]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* What you gain */}
      {role.gains && role.gains.length > 0 && (
        <div>
          <h4 className="font-[family-name:var(--font-head)] font-bold text-[15px] text-[#2A1B5C] mb-3 pb-1 border-b-2 border-[#D4A537] inline-block">
            What You Will Gain
          </h4>
          <div className="mt-2 grid sm:grid-cols-2 gap-3">
            {role.gains.map((g) => (
              <div key={g.title} className="bg-[#F0ECFF] border border-[#DDD8FF] rounded-[8px] p-4">
                <strong className="block text-[#5B3FBE] text-[13px] mb-1">{g.title}</strong>
                <span className="text-[#3F3F4A] text-[13px]">{g.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {role.notes && role.notes.length > 0 && (
        <div className="bg-[#F0ECFF] border-l-4 border-[#5B3FBE] rounded-r-[8px] p-4 space-y-1">
          {role.notes.map((note, i) => (
            <p key={i} className="text-[13.5px] text-[#2A1B5C]">{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */
export default function OpenRoles() {
  const [openSlug, setOpenSlug]   = useState<string | null>(null);
  const [applySlug, setApplySlug] = useState<string | null>(null);

  function toggleDetails(slug: string) {
    setOpenSlug((prev) => (prev === slug ? null : slug));
    if (applySlug === slug) setApplySlug(null);
  }

  function openApply(slug: string) {
    setOpenSlug(slug);
    setApplySlug(slug);
  }

  function closeApply() {
    setApplySlug(null);
  }

  return (
    <div className="space-y-4">
      {openRoles.map((role) => {
        const isOpen  = openSlug  === role.slug;
        const isApply = applySlug === role.slug;
        return (
          <div
            key={role.slug}
            className={`border border-[#D8D8DE] border-t-[3px] rounded-[12px] p-7 transition-shadow ${
              isOpen
                ? "border-t-[#D4A537] shadow-[0_8px_32px_rgba(42,27,92,0.10)]"
                : "border-t-[#5B3FBE] hover:shadow-[0_8px_32px_rgba(42,27,92,0.10)]"
            }`}
          >
            {/* ── Card header ── */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-1">{role.dept}</p>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-[2px]">
                  {role.title}
                  {role.subtitle && <span className="ml-2 text-[14px] font-normal italic text-[#5B3FBE]">({role.subtitle})</span>}
                </h3>
                <p className="text-[13px] text-[#5B3FBE] font-semibold mb-3">{role.type}</p>
                <p className="text-[15px] text-[#3F3F4A] leading-[1.65] mb-4 max-w-[600px]">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span key={tag} className="text-[12px] font-medium text-[#5B3FBE] bg-[#EDE9F7] px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0 self-start">
                <button
                  onClick={() => toggleDetails(role.slug)}
                  className={`font-semibold text-[12px] uppercase tracking-[0.08em] px-5 py-[10px] rounded-full transition-colors whitespace-nowrap border ${
                    isOpen
                      ? "bg-[#EDE9F7] text-[#5B3FBE] border-[#5B3FBE]/30"
                      : "bg-white text-[#2A1B5C] border-[#D8D8DE] hover:border-[#5B3FBE]"
                  }`}
                >
                  {isOpen ? "Hide details" : "View details"}
                </button>
                <button
                  onClick={() => openApply(role.slug)}
                  className="bg-[#2A1B5C] text-[#F7F3EA] font-bold text-[12px] uppercase tracking-[0.08em] px-5 py-[10px] rounded-full transition-colors whitespace-nowrap hover:bg-[#D4A537] hover:text-[#2A1B5C]"
                >
                  Apply now
                </button>
              </div>
            </div>

            {/* ── Full job description ── */}
            {isOpen && <JobDetails role={role} />}

            {/* ── Apply form ── */}
            {isApply && (
              <ApplyForm
                jobSlug={role.slug}
                jobTitle={role.title}
                onClose={closeApply}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
