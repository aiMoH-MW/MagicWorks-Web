/**
 * seed-jobs.mjs
 * Run from the project root: node scripts/seed-jobs.mjs
 * Replaces all jobOpening documents in Sanity with the 7 jobs from MagicWorks_Job_Descriptions_v6.html
 *
 * Key conventions:
 *  - Responsibility section headers are prefixed with "## " so page.tsx renders them as purple h4 headings
 *  - Qualification uses "\n" to separate "Preferred:" and "Also acceptable:" lines
 *  - gainItems: "Title: Description" strings for "What You Will Gain" grid (internships only)
 */

import https from 'https';

const PROJECT_ID = 'wa86etuq';
const DATASET    = 'production';
const TOKEN      = 'skAG8ZeLB19LZuv7OY9JfdduzrsXvyhUIB6uqvPRshppWRf8v40TT8BqkMkFdNJTdpFUUcauwUEYU71X9sHfLjs4P4AlZhmP6xXkq0gumW8KBAj0yxuSGKL5NCaAshlV8Pj6LUfB6AKpWHsx4JM9fTUR3PSiDMIuBmZwYmwyKD2L6ElPUbJQ';

function sanityRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : undefined;
    const options = {
      hostname: PROJECT_ID + '.api.sanity.io',
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN,
        ...(bodyStr ? { 'Content-Length': Buffer.byteLength(bodyStr) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error('HTTP ' + res.statusCode + ': ' + data));
        }
      });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

function mutate(mutations) {
  return sanityRequest('POST', '/v2021-06-07/data/mutate/' + DATASET, { mutations });
}

function query(q) {
  return sanityRequest('GET', '/v2021-06-07/data/query/' + DATASET + '?query=' + encodeURIComponent(q));
}

// ── Job data ──────────────────────────────────────────────────────────────────

const POSTED = '2026-06-27T00:00:00.000Z';

const jobs = [

  // ── 1. SEO / AEO / GEO Intern ────────────────────────────────────────────
  {
    _id:        'job-seo-aeo-geo-intern',
    _type:      'jobOpening',
    title:      'SEO / AEO / GEO Intern',
    slug:       { _type: 'slug', current: 'seo-aeo-geo-intern' },
    subtitle:   'Pune (On-site) · 3 to 6 Months',
    department: 'digital-marketing',
    area:       'SEO',
    location:   'Pune, India',
    type:       'internship',
    experience: '3 to 6 Months',
    salary:     'Performance-based',
    qualification: 'Completed a certified Digital Marketing course, OR holds a degree in Digital Marketing or related field.\nB.E. (any stream) preferred; B.Sc. (CS/IT), M.Sc., MCA, BCA also acceptable.',
    mandatory:  'Basic understanding of SEO or digital marketing fundamentals',
    preferredCandidate:
      'Freshers or recent graduates with a strong interest in search visibility who have completed a Digital Marketing course or hold a related degree. Candidates who are already exploring SEO tools, reading about AI search (GEO), and following how platforms like ChatGPT and Perplexity surface content will adapt quickly to this role. Intellectual curiosity about how search is evolving matters more than prior work experience at this stage.',
    summary:
      'We are looking for a curious and driven SEO / AEO / GEO Intern to join our search team in Pune. This is a full-time, on-site internship for candidates who have completed a Digital Marketing course or hold a degree in Digital Marketing, with a strong interest in search visibility, content strategy, and the future of AI-powered search. You will work directly on client projects from day one. This internship covers three interconnected disciplines: SEO (Search Engine Optimisation) - ranking on Google and Bing through keyword strategy, on-page optimisation, technical fixes, and link building; AEO (Answer Engine Optimisation) - optimising content for featured snippets, People Also Ask, voice search, and AI Overviews; and GEO (Generative Engine Optimisation) - making brands visible inside AI-generated answers on ChatGPT, Perplexity, Gemini, and similar platforms.',
    responsibilities: [
      '## Search Engine Optimisation (SEO)',
      'Assist with on-page optimisation: meta tags, headings, internal linking, and page structure',
      'Support keyword research and competitive gap analysis',
      'Help monitor technical SEO health using Google Search Console and basic audit tools',
      '## Answer Engine Optimisation (AEO)',
      'Research and identify opportunities for featured snippets and AI Overview inclusion',
      'Assist in formatting content to answer specific search queries clearly and concisely',
      'Monitor changes in how Google presents answers and document findings for the team',
      '## Generative Engine Optimisation (GEO)',
      'Track how client brands and competitors appear in AI-generated answers (ChatGPT, Perplexity, Gemini)',
      'Assist with content and structured data updates that improve AI-platform visibility',
      'Document GEO experiments and share learnings across the team',
      '## Reporting and Analysis',
      'Pull weekly performance data from Google Analytics 4 and Google Search Console',
      'Compile reports and flag trends or anomalies to the senior SEO team',
      'Assist in maintaining content calendars and task trackers',
    ],
    requirements: [
      'Basic understanding of SEO fundamentals: on-page, off-page, and technical',
      'Awareness of how featured snippets, AI Overviews, and voice search work (AEO concepts)',
      'Curiosity about AI search tools: ChatGPT, Perplexity, Google Gemini, Bing Copilot',
      'Familiarity with Google Analytics and Google Search Console',
      'Good content writing and editing skills in English',
      'Proficiency in MS Office / Google Workspace (Docs, Sheets, Slides)',
      'Analytical mindset and attention to detail',
    ],
    niceToHave: [
      'Prior exposure to any SEO tool (Ubersuggest, Moz, SEMrush, or similar)',
      'Interest in tracking how AI answer engines surface brand content',
      'Experience publishing or editing content on a website or blog',
    ],
    gainItems: [
      'SEO + AEO + GEO Exposure: Rare end-to-end training across all three search disciplines',
      'Stipend: Performance-based stipend provided during internship',
      'AI Search Skills: Hands-on experience with GEO, a highly in-demand and emerging skill',
      'Mentorship: Direct guidance from experienced SEO and digital marketing professionals',
      'Internship Certificate: Official certificate upon successful completion',
      'Letter of Recommendation: Based on performance and contribution',
      'PPO Opportunity: Pre-Placement Offer for outstanding performers',
    ],
    closing:    null,
    status:     'active',
    postedAt:   POSTED,
  },

  // ── 2. Web App Development Intern ────────────────────────────────────────
  {
    _id:        'job-web-app-development-intern',
    _type:      'jobOpening',
    title:      'Web App Development Intern (Full Stack: Next.js & AI-Assisted)',
    slug:       { _type: 'slug', current: 'web-app-development-intern' },
    subtitle:   'Pune (On-site) · 3 to 6 Months',
    department: 'web-development',
    area:       'Full Stack',
    location:   'Pune, India',
    type:       'internship',
    experience: '3 to 6 Months',
    salary:     'Performance-based',
    qualification: 'Preferred: B.E. / B.Tech (CS, IT, or related)\nAlso acceptable: MCA, B.Sc. (CS/IT) with a strong deployed portfolio',
    mandatory:  'React.js proficiency + Active use of AI coding tools (Claude / Claude Code)',
    preferredCandidate:
      'Freshers or recent graduates with a strong interest in building and deploying full-stack web applications, comfortable with Next.js. The ideal candidate writes clean, working code, understands the basics of deployment and version control, and actively uses Claude or Claude Code in their day-to-day workflow to move faster and write better code. Strong JavaScript fundamentals, attention to UI detail, and a habit of shipping complete work are what we value most at this level. A portfolio of live, deployed projects is more meaningful than certifications alone.',
    summary:
      'We are looking for a Web App Development Intern with strong React fundamentals and an active habit of using AI coding tools such as Claude or Claude Code. This is a full-time, on-site internship in Pune for candidates who are comfortable with Next.js or eager to learn it on the job, and who write clean, working code. You will assist in building and maintaining client websites, convert Figma designs into responsive components, integrate APIs and CMS content, and participate in sprint reviews. A portfolio of live, deployed projects carries more weight than certifications alone.',
    responsibilities: [
      'Assist in building and maintaining client websites using Next.js and React',
      'Convert Figma designs into responsive HTML/CSS and React components, under guidance',
      'Write clean, readable JavaScript/TypeScript code following team conventions',
      'Help integrate third-party APIs, CMS content, and analytics into Next.js projects',
      'Support testing, debugging, and fixing bugs across live and in-progress client builds',
      'Learn to use AI coding assistants such as Claude Code, GitHub Copilot, or Cursor as part of your daily workflow',
      'Get hands-on exposure to headless CMS setups and AI-native features wired into a site',
      'Participate in sprint stand-ups, code reviews, and team discussions',
      'Take ownership of small, well-defined tasks from start to finish with senior developer support',
    ],
    requirements: [
      'Solid understanding of HTML5, CSS3, and JavaScript ES6+ fundamentals',
      'Some exposure to React through coursework, a bootcamp, personal projects, or self-study',
      'Basic familiarity with Git and version control workflows',
      'Comfortable reading and following existing code rather than writing only from a blank file',
      'Genuine willingness to learn Next.js, TypeScript, and modern frontend tooling on the job',
      'Curiosity about how AI coding tools fit into a real development workflow',
      'Basic understanding of responsive design and cross-browser behaviour',
      'Good written and verbal communication in English',
      'Eagerness to ask questions, take feedback well, and iterate quickly',
    ],
    niceToHave: [
      'Any prior hands-on exposure to Next.js, even at a tutorial or personal-project level',
      'Familiarity with Tailwind CSS or any utility-first styling approach',
      'Basic understanding of REST APIs and how front-end code consumes them',
      'Personal projects involving a CMS, database, or third-party API integration',
      'Active use of an AI coding assistant in college projects or personal work',
      'A GitHub profile, portfolio, or deployed personal project you can walk us through',
      'Awareness of basic SEO, accessibility, or web performance concepts',
    ],
    gainItems: [
      'Full-Stack Exposure: Hands-on work with Next.js, React, APIs, and headless CMS on live client projects',
      'Stipend: Performance-based stipend provided during internship',
      'AI-First Workflow: Learn to use Claude Code and other AI coding assistants as a professional daily habit',
      'Mentorship: Direct guidance from senior developers with code reviews and sprint participation',
      'Internship Certificate: Official certificate upon successful completion',
      'Letter of Recommendation: Based on performance and contribution to shipped projects',
      'PPO Opportunity: Outstanding interns are considered for a Pre-Placement Offer',
      'Portfolio Projects: Walk away with real, deployed work you can show in job applications',
    ],
    closing:
      'A GitHub profile, portfolio link, or any deployed project - even a small one - will carry more weight than academic credentials alone. Candidates who actively use AI coding tools and can demonstrate it will be preferred.',
    status:   'active',
    postedAt: POSTED,
  },

  // ── 3. Performance Marketing Executive ───────────────────────────────────
  {
    _id:        'job-performance-marketing-executive',
    _type:      'jobOpening',
    title:      'Performance Marketing Executive (Google Ads & Meta Ads)',
    slug:       { _type: 'slug', current: 'performance-marketing-executive' },
    subtitle:   'Pune · Full-time · Agency-side role',
    department: 'digital-marketing',
    area:       'Paid Media',
    location:   'Pune, India',
    type:       'full-time',
    experience: '1 – 3 Years',
    salary:     '₹2.50 LPA – ₹3.60 LPA',
    qualification: 'Preferred: B.Comm, M.Comm, B.E. (any stream)\nAlso acceptable: B.Sc. / M.Sc.',
    mandatory:  'Prior experience in a digital marketing agency',
    preferredCandidate:
      'Performance marketers with hands-on agency experience managing live Google and Meta campaigns across multiple client accounts. The ideal candidate has a proven track record of measurable campaign improvements (ROAS, CPL, CTR) backed by numbers and already uses AI tools to speed up analysis, copy generation, or audience research. Technical or commerce graduates with direct paid media experience are preferred.',
    summary:
      'We are looking for a hands-on Performance Marketing Executive with proven agency experience managing paid campaigns on Google and Meta. You will own campaign strategy, execution, and optimisation across multiple client accounts, driving measurable ROI through data-led decisions. If you thrive in a fast-paced agency environment and love turning ad spend into business outcomes, this role is built for you.',
    responsibilities: [
      '## Google Ads Management',
      'Plan, launch, and optimise Search, Display, Shopping, YouTube, and Performance Max campaigns',
      'Conduct keyword research, audience segmentation, and competitor analysis',
      'Manage bidding strategies, quality scores, and ad copy A/B testing',
      'Set up and monitor conversion tracking via Google Tag Manager and Google Analytics 4',
      '## Meta Ads Management',
      'Build and manage campaigns across Facebook and Instagram (awareness, traffic, leads, conversions)',
      'Define target audiences using interest, lookalike, and retargeting segments',
      'Collaborate with the creative team to develop high-performing ad creatives and copy',
      'Monitor Meta Pixel events and troubleshoot tracking discrepancies',
      '## Client and Campaign Management',
      'Manage paid media across multiple client accounts simultaneously',
      'Prepare clear, insight-driven performance reports (weekly and monthly)',
      'Proactively identify opportunities to scale budgets and improve ROAS',
      'Coordinate with clients and internal teams to align campaigns with business goals',
      '## Analytics and Reporting',
      'Track and report key metrics: CTR, CPC, CPL, ROAS, conversion rate, and revenue',
      'Use Google Analytics 4, Google Ads, Meta Ads Manager, and Looker Studio for reporting',
      'Translate data into actionable recommendations for continuous improvement',
    ],
    requirements: [
      'Mandatory: prior experience in a digital marketing agency',
      'Hands-on experience with Google Ads and Meta Business Suite',
      'Strong understanding of campaign structure, bidding, and audience targeting',
      'Proficiency with Google Analytics 4 and Google Tag Manager',
      'Ability to manage multiple client accounts with competing priorities',
      'Data-driven mindset with strong analytical and problem-solving skills',
      'Good written and verbal communication skills in English',
    ],
    niceToHave: [
      'Google Ads certification or Meta Blueprint certification',
      'Experience with Looker Studio or similar dashboarding tools',
      'Familiarity with AI-driven campaign features (Smart Bidding, Advantage+)',
      'Basic understanding of landing page optimisation and conversion rate improvement',
      'Experience with e-commerce or lead generation campaigns across diverse industries',
    ],
    gainItems: null,
    closing:
      'Candidates with multi-client handling experience and a track record of measurable ROAS improvement will be preferred. Immediate joiners are a plus.',
    status:   'active',
    postedAt: POSTED,
  },

  // ── 4. Digital Marketing Manager ─────────────────────────────────────────
  {
    _id:        'job-digital-marketing-manager',
    _type:      'jobOpening',
    title:      'Digital Marketing Manager',
    slug:       { _type: 'slug', current: 'digital-marketing-manager' },
    subtitle:   'Pune · Full-time · Agency-side management role',
    department: 'digital-marketing',
    area:       'Leadership',
    location:   'Pune, India',
    type:       'full-time',
    experience: '1 – 3 Years (specifically in a managerial role at a digital marketing agency)',
    salary:     '₹3.00 LPA – ₹6.00 LPA',
    qualification: 'Preferred: B.E. (any stream), MCA, M.Comm, MBA (any field)\nOther relevant degrees considered based on experience',
    mandatory:  'Experience as a manager at a digital marketing agency',
    preferredCandidate:
      'Professionals who currently hold or have formally held a Manager title at a digital marketing agency, responsible for a team of at least 3 to 5 people and a diverse portfolio of client accounts. Ideally someone who has owned P&L or revenue accountability at the agency level, is comfortable presenting to client stakeholders, and has driven consistent results across SEO, paid, social, and content channels. Graduates with leadership experience in agency settings are a strong fit.',
    summary:
      'We are looking for an experienced Digital Marketing Manager who has led a team within a digital marketing agency. You will own the end-to-end digital marketing strategy for a diverse portfolio of clients, manage a cross-functional team, and ensure consistent delivery of results across SEO, paid media, social media, content, and email marketing. This is a leadership role: you set the direction, remove obstacles, and hold the standard.',
    responsibilities: [
      '## Strategy and Planning',
      'Develop and own integrated digital marketing strategies across a diverse portfolio of client accounts',
      'Define KPIs, OKRs, and success metrics for each client engagement',
      'Identify growth opportunities through market research, competitor analysis, and performance data',
      "Align digital strategy with each client's business goals and revenue targets",
      '## Team Leadership',
      'Lead, mentor, and manage a team of digital marketing executives and specialists',
      'Assign and review work, provide constructive feedback, and build team capability',
      'Conduct weekly team reviews and ensure accountability on deliverables',
      'Drive a culture of data, experimentation, and continuous improvement',
      '## Client Management',
      'Serve as the primary point of contact for key client accounts',
      'Lead weekly, monthly, and quarterly client review meetings with performance presentations',
      'Proactively communicate campaign insights, risks, and strategic pivots',
      'Identify upsell and cross-sell opportunities within existing accounts',
      '## Execution Oversight',
      'Oversee campaign execution across SEO, Google Ads, Meta Ads, social media, content, and email marketing',
      'Review and approve all deliverables before client submission',
      'Ensure all campaigns are tracked, reported, and optimised on schedule',
      'Maintain quality standards and brand consistency across all client deliverables',
      '## Analytics and Reporting',
      'Monitor and analyse aggregate performance across the portfolio',
      'Use tools including GA4, Google Search Console, SEMrush, Meta Ads Manager, and HubSpot',
      'Present monthly performance reports with clear takeaways and next steps',
    ],
    requirements: [
      'Mandatory: prior managerial experience at a digital marketing agency',
      'Proven ability to manage a team and a diverse portfolio of client accounts simultaneously',
      'Strong command of core digital marketing channels: SEO, paid media, social, content, and email',
      'Excellent analytical skills with the ability to translate data into strategy',
      'Strong client communication and presentation skills',
      'Ability to manage competing priorities and deliver under tight timelines',
      'Proficiency with marketing analytics tools (GA4, SEMrush, Ahrefs, Meta Ads Manager)',
    ],
    niceToHave: [
      'Experience with AI-driven marketing tools and automation platforms',
      'Familiarity with CRM systems (HubSpot, Zoho) and marketing automation workflows',
      'Understanding of web development basics to collaborate effectively with tech teams',
      'Experience with project management tools (Asana, Trello, Notion, or similar)',
      'Exposure to GEO (Generative Engine Optimisation) and AEO (Answer Engine Optimisation)',
    ],
    gainItems: null,
    closing:
      'This role is specifically for candidates who have worked as managers, not individual contributors aspiring to management. Agency background is non-negotiable. Immediate joiners preferred.',
    status:   'active',
    postedAt: POSTED,
  },

  // ── 5. SEO Executive ─────────────────────────────────────────────────────
  {
    _id:        'job-seo-executive',
    _type:      'jobOpening',
    title:      'SEO Executive (SEO, GEO & AEO)',
    slug:       { _type: 'slug', current: 'seo-executive' },
    subtitle:   'Pune · Full-time · Agency-side role',
    department: 'digital-marketing',
    area:       'SEO',
    location:   'Pune, India',
    type:       'full-time',
    experience: '1 – 3 Years',
    salary:     '₹1.80 LPA – ₹3.00 LPA',
    qualification: 'Preferred: B.E. (any stream)\nAlso acceptable: B.Sc. (CS/IT), M.Sc., MCA, BCA or relevant IT degree',
    mandatory:  'Experience in a digital marketing agency',
    preferredCandidate:
      'Candidates who have worked on SEO, GEO, and AEO across multiple client accounts, ideally within a digital marketing agency. The ideal candidate has hands-on experience with AI tools such as Claude, has worked on websites developed using AI-assisted workflows, and understands how search visibility is shifting across both traditional and generative AI platforms. A strong content understanding and a habit of validating decisions with data are key indicators of a good fit.',
    summary:
      'We are looking for an SEO Executive with 1 to 3 years of experience, preferably from a digital marketing agency background. The candidate should have hands-on experience managing multiple clients and strong expertise in SEO, GEO (Generative Engine Optimisation), and AEO (Answer Engine Optimisation), along with content marketing capabilities. We are actively building expertise in GEO so our clients get discovered not just on Google, but across AI-powered answer engines like ChatGPT, Perplexity, and Gemini.',
    responsibilities: [
      '## SEO and Client Management',
      'Execute on-page and off-page SEO strategies across multiple client accounts',
      'Perform keyword research, competitor analysis, and technical site audits',
      'Optimise websites and content for search engines and AI-driven platforms',
      'Implement GEO strategies for visibility on generative AI platforms (ChatGPT, Perplexity, Gemini)',
      'Apply AEO techniques for featured snippets, People Also Ask, and voice search',
      '## Content Strategy and Optimisation',
      'Develop SEO-driven content briefs, blog posts, landing pages, and website copy',
      'Identify content gaps and topical authority opportunities through competitor analysis and search trends',
      'Optimise existing content to improve keyword rankings, engagement, and conversions',
      '## Analytics and Performance Reporting',
      'Monitor and analyse SEO performance metrics: organic traffic, keyword rankings, CTR, bounce rate, and conversions',
      'Use tools like Google Analytics 4, Google Search Console, SEMrush, Ahrefs, or Moz',
      'Prepare weekly and monthly performance reports with actionable insights',
      'Conduct A/B testing and implement data-driven improvements',
    ],
    requirements: [
      'Mandatory: experience in a digital marketing agency',
      'Experience managing multiple client accounts',
      'Strong understanding of SEO, GEO, and AEO',
      'Hands-on experience with SEO tools (Google Analytics, SEMrush, Ahrefs, etc.)',
      'Strong content understanding and optimisation skills',
      'Good analytical and problem-solving skills',
    ],
    niceToHave: [
      'Experience with AI tools like Claude, Claude Code, and websites created using AI-assisted workflows',
      'Basic knowledge of HTML/CSS',
      'Understanding of integrated digital marketing channels',
      'Basic understanding of AI search and voice search optimisation',
    ],
    gainItems: null,
    closing:
      'Candidates with multi-client handling experience will be preferred. Immediate joiners are a plus.',
    status:   'active',
    postedAt: POSTED,
  },

  // ── 6. Sales Executive (MagicFlow AI) ────────────────────────────────────
  {
    _id:        'job-sales-executive-magicflow-ai',
    _type:      'jobOpening',
    title:      'Sales Executive (MagicFlow AI)',
    slug:       { _type: 'slug', current: 'sales-executive-magicflow-ai' },
    subtitle:   'Pune · Full-time · MagicFlow AI Product Sales · 3 Openings',
    department: 'sales',
    area:       'AI Product (MagicFlow AI)',
    location:   'Pune, India',
    type:       'full-time',
    experience: '2 – 5 Years (in B2B SaaS or technology product sales)',
    salary:     '₹3.00 LPA – ₹6.00 LPA + performance incentives',
    qualification: 'Any graduate / postgraduate; business or technology background preferred',
    mandatory:  'B2B SaaS or technology product sales experience with a quota-carrying track record',
    preferredCandidate:
      'Sales professionals who have sold SaaS or AI-powered tools to SMB and mid-market businesses, carrying an independent revenue target and closing deals end-to-end. The ideal candidate is comfortable demoing a product, translating technical features into business outcomes, and managing a pipeline from outbound prospecting through to a signed contract. Prior experience selling lead generation, chatbot, CRM, or marketing automation products is a strong advantage given the nature of MagicFlow AI.',
    summary:
      'MagicFlow AI is an AI-powered sales chatbot and lead qualification platform built for SMEs. It turns website visitors into qualified leads 24/7 by greeting prospects, asking the right discovery questions, scoring intent, and logging every conversation with UTM source and campaign context. Leads are routed to the sales team with clean follow-up notes rather than anonymous form submissions. We are looking for Sales Executives who can confidently take MagicFlow AI to market. You will own the full sales cycle from prospecting and product demonstration through to contract close and handoff. Three positions are available; we want candidates who are ready to carry a revenue target and hit it.',
    responsibilities: [
      '## Prospecting and Pipeline Building',
      'Identify and qualify SME and mid-market prospects across industries: retail, services, education, real estate, and hospitality',
      'Run outbound prospecting via cold outreach, LinkedIn, and referral networks',
      'Convert inbound enquiries and demo requests into qualified pipeline',
      'Maintain a healthy, well-documented pipeline in the CRM (HubSpot or equivalent)',
      '## Product Demonstration and Consultative Selling',
      "Conduct live demos of MagicFlow AI, tailoring the conversation to each prospect's lead generation challenges",
      'Translate product features (AI qualification, UTM tracking, lead scoring, CRM handoff) into clear business value',
      "Ask discovery questions that surface the prospect's real pain: lost website enquiries, slow follow-up, poor lead quality",
      'Handle objections confidently with a combination of product knowledge and real customer outcomes',
      '## Proposals, Pricing and Closure',
      "Develop and present proposals aligned to each prospect's traffic volume, team size, and revenue goals",
      'Negotiate leasing plans and close contracts in line with monthly revenue targets',
      'Coordinate with the onboarding team to ensure a smooth handoff post-close',
      '## Customer Success and Expansion',
      'Stay connected with active accounts to track usage, gather feedback, and identify expansion opportunities',
      'Identify agency partners (digital marketing agencies, web agencies) for reseller or referral arrangements',
      'Relay customer feedback and competitive signals to the product and marketing teams',
      '## Reporting',
      'Maintain accurate CRM records for all pipeline activities, demos, and deal stages',
      'Provide weekly sales forecasts and activity reports to sales leadership',
    ],
    requirements: [
      'Mandatory: proven B2B SaaS or technology product sales experience with a quota-carrying track record',
      'Strong understanding of the SaaS sales cycle: outbound, discovery, demo, proposal, close',
      'Ability to demo a product and explain technical features in plain business language',
      'Proficiency with CRM tools (HubSpot, Salesforce, Zoho, or equivalent)',
      'Confident, consultative communication and negotiation skills',
      'Self-driven with a clear record of meeting or exceeding revenue targets',
    ],
    niceToHave: [
      'Experience selling lead generation, chatbot, CRM, or marketing automation solutions',
      'Familiarity with lead generation concepts: UTM tracking, conversion rate, lead scoring, CRM workflows',
      'Network or experience selling into SME segments: retail, services, education, real estate, hospitality',
      'Experience working with or selling through digital marketing agency channels',
    ],
    gainItems: null,
    closing:
      'Three positions open. Candidates with a consistent SaaS quota-carrying track record and experience selling AI or automation tools will be preferred. Immediate joiners are a plus.',
    status:   'active',
    postedAt: POSTED,
  },

  // ── 7. Digital Marketing Sales Executive ─────────────────────────────────
  {
    _id:        'job-digital-marketing-sales-executive',
    _type:      'jobOpening',
    title:      'Digital Marketing Sales Executive',
    slug:       { _type: 'slug', current: 'digital-marketing-sales-executive' },
    subtitle:   'Pune · Full-time · Agency Services Sales',
    department: 'sales',
    area:       'Agency Services Sales',
    location:   'Pune, India',
    type:       'full-time',
    experience: '2 – 5 Years (selling digital marketing services or agency solutions)',
    salary:     '₹3.00 LPA – ₹6.00 LPA + performance incentives',
    qualification: 'Any graduate / postgraduate; marketing, business, or technology background preferred',
    mandatory:  'Prior sales experience at or for a digital marketing agency',
    preferredCandidate:
      'Sales professionals with a proven record of selling digital marketing services: SEO retainers, paid media packages, social media management, or integrated digital mandates. The ideal candidate has worked in a sales or business development role at a digital marketing agency and understands the services well enough to hold a credible conversation with a CMO or marketing head. A pipeline track record, a history of closing agency contracts, and the ability to pitch based on outcomes rather than deliverables are the qualities that set strong candidates apart.',
    summary:
      'We are looking for a Digital Marketing Sales Executive with direct sales experience at or for a digital marketing agency. You have a pipeline history, closed retainers, and the ability to walk a prospect through the value of integrated digital services with confidence. This is not an entry-level role: we want someone who has carried a revenue number and delivered against it in the digital marketing space.',
    responsibilities: [
      '## Business Development',
      'Identify and pursue new business opportunities across SMB and mid-market segments',
      'Generate leads through referrals, LinkedIn, networking events, and inbound inquiries',
      'Qualify prospects and understand their digital marketing challenges before proposing solutions',
      'Build relationships with decision-makers: marketing heads, CEOs, and founders',
      '## Consultative Selling',
      "Present MagicWorks' services (SEO, Paid Ads, Social Media, Content, AI Automation, Web Development) with authority and specificity",
      "Tailor proposals based on each client's goals, industry, and budget",
      'Conduct discovery and pitch meetings, online and in-person',
      'Handle objections using knowledge of real campaign outcomes and case studies',
      '## Proposal and Closure',
      'Develop detailed proposals covering scope, deliverables, timelines, and pricing',
      'Negotiate contracts and close accounts against monthly and quarterly revenue targets',
      'Coordinate with the delivery team to ensure a smooth, well-briefed project kickoff',
      '## Account Growth and Reporting',
      'Maintain post-sales relationships and identify opportunities to expand service scope',
      'Log all pipeline activities, updates, and client communications in the CRM',
      'Report on pipeline value, conversion rates, revenue closed, and activity volume',
    ],
    requirements: [
      'Mandatory: proven sales experience at or for a digital marketing agency',
      'Solid understanding of digital marketing services: SEO, PPC, social media, content, and email',
      'Track record of closing agency retainers or project contracts',
      'Strong pipeline management and CRM discipline',
      'Excellent communication, presentation, and negotiation skills',
      'Outcome-oriented selling approach backed by understanding of campaign mechanics',
    ],
    niceToHave: [
      'Familiarity with AI-driven marketing and automation solutions, a growing part of our portfolio',
      'Network within target industries: education, manufacturing, real estate, hospitality, or finance',
      'Experience with proposal tools and CRM automation',
    ],
    gainItems: null,
    closing:
      'We are looking for candidates with an established sales track record in the digital marketing space, not candidates exploring a move into sales. Immediate joiners are a plus.',
    status:   'active',
    postedAt: POSTED,
  },

];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Step 1: Fetching existing jobOpening documents...');
  const existing = await query('*[_type == "jobOpening"]{_id, title}');
  const rows = existing.result ?? [];
  console.log('  Found ' + rows.length + ' existing document(s):');
  rows.forEach(r => console.log('    - ' + r._id + ': ' + r.title));

  // Build mutations: delete all existing, then createOrReplace 7 new ones
  const mutations = [];

  // Delete all including drafts
  mutations.push({ delete: { query: '*[_type == "jobOpening"]' } });

  // Create or replace each job (no "drafts." prefix = published directly)
  for (const job of jobs) {
    mutations.push({ createOrReplace: job });
  }

  console.log('\nStep 2: Applying ' + mutations.length + ' mutations (1 delete + ' + jobs.length + ' createOrReplace)...');
  const result = await mutate(mutations);
  console.log('\nResult:', JSON.stringify(result, null, 2));
  console.log('\nDone. ' + jobs.length + ' jobs created/replaced successfully.');
  console.log('\nSlugs created:');
  jobs.forEach(j => console.log('  /careers/' + j.slug.current));
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
