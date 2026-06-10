import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";
const envPath = resolve(process.cwd(), ".env.local");
const envLines = readFileSync(envPath, "utf8").split("\n");
for (const line of envLines) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}
const client = createClient({ projectId: "wa86etuq", dataset: "production", apiVersion: "2024-01-01", useCdn: false, token: process.env.SANITY_API_TOKEN });

let _k = 0;
const k = () => `rw09_${++_k}`;

const h2 = (t) => ({ _type:"block",_key:k(),style:"h2",markDefs:[],children:[{_type:"span",_key:k(),text:t,marks:[]}] });
const h3 = (t) => ({ _type:"block",_key:k(),style:"h3",markDefs:[],children:[{_type:"span",_key:k(),text:t,marks:[]}] });
const p = (t) => ({ _type:"block",_key:k(),style:"normal",markDefs:[],children:[{_type:"span",_key:k(),text:t,marks:[]}] });
const p_b = (segs) => ({ _type:"block",_key:k(),style:"normal",markDefs:[],children:segs.map(s=>({_type:"span",_key:k(),text:s.t,marks:s.b?["strong"]:[]})) });
const stats = (...items) => ({ _type:"statRow",_key:k(),stats:items.map(([v,l])=>({_key:k(),value:v,label:l})) });
const callout = (variant, title, body) => ({ _type:"callout",_key:k(),variant,title,body });
const pq = (text) => ({ _type:"pullquote",_key:k(),text });
const p_link = (before, anchor, href, after) => {
  const lk = k();
  return { _type:"block",_key:k(),style:"normal",markDefs:[{_key:lk,_type:"link",href}],children:[...(before?[{_type:"span",_key:k(),text:before,marks:[]}]:[]),{_type:"span",_key:k(),text:anchor,marks:[lk]},{_type:"span",_key:k(),text:(after||""),marks:[]}] };
};

const body = [

  // ── Section 1: The Short Answer ──────────────────────────────────────────
  h2("The Short Answer: India Has 112,000+ Startups but Only 15% Survive Past 5 Years"),

  p("India is the third largest startup ecosystem on the planet. As of 2026, more than 1,12,000 startups are recognized by the Department for Promotion of Industry and Internal Trade (DPIIT). The country has produced 108 unicorns, raised over $140 billion in cumulative venture funding, and spawned entire new categories of consumer and enterprise software."),

  p("And yet, 85% of these startups will not exist five years from now."),

  p("The failure is rarely about the product. Most Indian startups that shut down had a viable product. What they lacked was a systematic, stage-appropriate approach to go-to-market execution. They burned their runway on the wrong channels, at the wrong time, chasing the wrong metrics."),

  stats(
    ["1,12,000+", "DPIIT-recognized startups in India"],
    ["108", "unicorns produced"],
    ["$140B+", "total funding raised"],
    ["15%", "survival rate past 5 years"]
  ),

  p("The startups that survive and scale share one common trait: they treat digital marketing as a growth engine, not a support function. They match their marketing investment to their stage, validate before they scale, and measure unit economics relentlessly."),

  p("This playbook is built from studying how India's fastest-growing startups actually deployed digital marketing at each stage of their journey. It is not theoretical. It is a practical, implementable framework you can apply from tomorrow."),

  callout("tip", "Who This Playbook Is For", "This guide is for founders, co-founders, and growth leads at Indian startups from pre-seed through Series B. It is equally relevant for digital marketing agency teams working with startup clients. The frameworks apply across B2B SaaS, D2C, fintech, edtech, healthtech, and marketplace models."),

  pq("The startups that survive do not have better products. They have better go-to-market discipline."),

  // ── Section 2: 3 Mistakes ────────────────────────────────────────────────
  h2("The 3 Digital Marketing Mistakes Indian Startups Consistently Make"),

  p("Before mapping the right path, it is worth understanding the three recurring mistakes that drain startup marketing budgets without generating returns. These mistakes are visible across sectors and stages, from bootstrapped SaaS tools in Pune to VC-backed D2C brands in Bengaluru."),

  h3("Mistake 1: Copying Enterprise Marketing Playbooks"),

  p("The most common and most expensive mistake is applying large-company marketing tactics to a seed-stage startup. Enterprise brands run brand awareness campaigns because they have existing brand equity to amplify. They form channel partnerships because they have the cash flow to wait 6 months for a partnership to close. They sponsor industry events because they have sales teams ready to convert the leads generated."),

  p("A seed-stage startup has none of these assets. Running a brand awareness campaign when no one knows who you are means spending money to reach people who have no reason to care. Forming distribution partnerships before you have a proven product-channel fit means waiting months for revenue that may never arrive."),

  p_b([{t:"The rule is simple: "},{t:"at seed stage, every rupee must be traceable to a customer or a validated learning.",b:true},{t:" If you cannot draw a direct line from a marketing spend to either a paying customer or a confirmed hypothesis, do not spend it."}]),

  p("Enterprise playbooks are built for defending and growing existing market share. Startup playbooks are built for finding and proving the existence of a market. The two are fundamentally different activities, and confusing them is the fastest way to waste your marketing budget."),

  callout("warning", "The Vanity Metrics Trap", "Follower counts, page views, and impressions are not startup metrics. They are outputs. Startups must track inputs and outcomes: cost per lead, lead-to-customer conversion rate, customer acquisition cost, and payback period. Any agency or consultant who leads with reach and impressions is not startup-oriented."),

  h3("Mistake 2: Spending on Awareness Before Product-Market Fit"),

  p("The valley of death for Indian startups is the period between first funding and product-market fit. During this window, founders feel pressure to show traction. Investors ask for growth. The natural response is to increase marketing spend. This is almost always a mistake."),

  p("The sequence matters enormously. Validation should cost Rs 25,000 to Rs 75,000. This means running small, targeted paid campaigns to test whether your ideal customer profile exists, whether your messaging resonates, and whether the product converts at the price point you have set. This is not brand building. This is hypothesis testing with marketing dollars."),

  p("Once you have validated that a product-channel fit exists, building the funnel should cost Rs 2 lakh to Rs 20 lakh per month depending on category. This is where you invest in content, SEO infrastructure, retargeting sequences, and performance marketing scale. Doing this before validation means you are building on an unproven foundation."),

  stats(
    ["Rs 25,000-75,000", "Cost to validate product-channel fit"],
    ["Rs 2-20 lakh/month", "Cost to build funnel post-validation"],
    ["6-18 months", "Average time to reach product-market fit in India"]
  ),

  p("Startups that spend Rs 5 lakh to Rs 20 lakh on awareness campaigns before validating product-market fit consistently report the same outcome: high reach, low conversion, confused team, and a board demanding answers. The product was never the problem. The sequence was."),

  callout("info", "How to Validate Before You Scale", "Run 3 to 5 parallel micro-campaigns targeting different ICPs with different messaging and different offers. Set a Rs 15,000 to Rs 25,000 budget per variant. Track click-through rate, landing page conversion rate, and lead quality. The variant with the lowest CPL and highest close rate tells you your channel, your ICP, and your message. Only then do you scale."),

  h3("Mistake 3: Treating Marketing as a Department Rather Than a Growth Function"),

  p("At a startup, growth is not the marketing team's job. Growth is everyone's job. The customer success lead who collects case studies is contributing to marketing. The engineer who builds the onboarding flow is contributing to conversion. The product manager who adds a referral mechanic is contributing to acquisition."),

  p("The best Indian startups do not have a marketing department at the early stage. They have a growth function that includes the founder, a few generalist operators, and one or two specialist contributors. The founder drives the messaging, the positioning, and the content until the business reaches Rs 10 crore ARR. After that, it makes sense to build a dedicated team."),

  p("Founder-led content is the single highest-ROI marketing activity available to an Indian B2B startup. A founder writing about their domain expertise on LinkedIn costs nothing except time, and consistently generates more qualified leads per post than paid campaigns generating thousands of impressions."),

  callout("tip", "The Founder Content ROI Calculation", "A typical LinkedIn post by a well-positioned B2B founder in India reaches 5,000 to 50,000 people in the target industry. The cost is 2 to 3 hours. A Rs 5,000 LinkedIn ad campaign reaching the same 5,000 people generates a fraction of the engagement because it lacks the credibility signal of a named founder perspective. The ROI difference is not 2x or 5x. It is often 20x to 50x when measured in qualified inbound inquiries."),

  pq("The founder who writes about their category builds authority that no ad budget can buy. At seed stage, your personal brand is your most valuable marketing asset."),

  // ── Section 3: Stage-Specific Playbooks ─────────────────────────────────
  h2("Stage-Specific Digital Marketing Playbooks"),

  p("Digital marketing strategy must change as your startup grows. What works at Rs 50,000 per month will break at Rs 5 lakh per month if you do not evolve your approach. The channel mix, the metrics you track, the team structure, and the technology stack all need to evolve with your stage."),

  p("The following playbooks are built from observed patterns across Indian startups that successfully navigated each funding stage. They are not prescriptive rules but directional frameworks that should be adapted to your specific category and customer profile."),

  h3("Pre-Seed and Seed Stage: Rs 50,000 to Rs 2,00,000 per Month"),

  p("At pre-seed and seed stage, the only objective is to find the one channel and one message that converts your ICP. You do not need a multichannel strategy. You need a single-channel obsession."),

  p_b([{t:"The cardinal rule of seed-stage marketing: "},{t:"do not diversify channels until one channel is profitable.",b:true},{t:" Every startup that tries to run Facebook Ads, Google Ads, LinkedIn, and SEO simultaneously at Rs 1 lakh per month ends up with Rs 20,000 per channel, which is not enough to generate any signal on any channel."}]),

  p("For B2B founders, LinkedIn is the starting channel. Optimize your profile for the problem you solve, not the company you have built. Post twice weekly about the specific pain point your product addresses. Connect with 10 to 20 people in your ICP every day. DM them with context and a clear ask. This outbound content-plus-connection approach costs zero in media spend and consistently generates the first 10 customers for Indian B2B SaaS companies."),

  p("For D2C and consumer businesses, Instagram organic plus WhatsApp is the seed-stage stack. Build a community of early adopters. Offer them exclusive pricing or access. Use their feedback to sharpen your product and their testimonials to fuel your first paid campaigns. Do not run paid social until you have at least 20 organic customers whose stories you can turn into ad creative."),

  p("Google Ads at seed stage should be limited to exact-match, high-intent keywords only. Do not run broad match. Do not run brand awareness. Do not run display. Run only exact-match keywords that signal a buyer who is ready to purchase today. The budget should be Rs 15,000 to Rs 40,000 per month, focused entirely on capturing existing demand."),

  stats(
    ["Rs 50,000-2,00,000", "Recommended monthly marketing budget"],
    ["1 channel", "Maximum channels to focus on simultaneously"],
    ["10 customers", "The seed-stage north star metric"],
    ["< 12 months", "Target payback period for seed-stage CAC"]
  ),

  p("Key metrics at seed stage: customer acquisition cost by channel, time-to-first-10-customers, lead-to-customer conversion rate, and payback period. If your payback period exceeds 12 months at seed stage, you either have a pricing problem or a targeting problem. Fix those before scaling spend."),

  callout("info", "WhatsApp as a Sales Channel", "WhatsApp Business is underutilized by Indian B2B startups and extremely powerful for D2C brands. At seed stage, a personal WhatsApp follow-up sequence after a trial sign-up or product inquiry converts at 3x to 5x the rate of automated email sequences. The reason is simple: it feels personal. A founder sending a WhatsApp message to a prospective customer in India creates trust that no automated drip sequence can replicate."),

  h3("Series A and Growth Stage: Rs 2 Lakh to Rs 8 Lakh per Month"),

  p("By the time you reach Series A, you have validated product-market fit and have evidence that at least one channel works. Now the job is to build a repeatable, scalable acquisition engine across two to three channels with full attribution and clear unit economics."),

  p("Performance marketing becomes the primary paid channel at this stage. But it only works if you have full conversion tracking in place. Every campaign must be connected to a CRM. Every lead source must be tagged. Every conversion event must be firing correctly in Google Ads, Meta Ads, and LinkedIn Campaign Manager. Without this infrastructure, you are flying blind at Rs 3 lakh to Rs 5 lakh per month of ad spend."),

  p_b([{t:"The Series A marketing stack: "},{t:"Google Ads for intent capture, Meta Ads for audience building and retargeting, LinkedIn for B2B targeting, and content plus SEO for compounding organic growth.",b:true},{t:" CRM integration is non-negotiable. HubSpot or Zoho CRM connected to all lead sources with automated lead scoring."}]),

  p("Content at scale becomes critical at Series A. You should be producing 8 to 12 pieces of long-form content per month targeting your highest-value keywords. This is not blog content for its own sake. Every piece of content should target a specific keyword cluster, answer a specific question your ICP is asking, and include a clear call to action. SEO returns compound over 6 to 18 months and eventually reduce your blended CAC significantly."),

  p("Retargeting becomes a major channel at this stage. You now have enough website traffic and trial users to build meaningful retargeting audiences. A well-structured retargeting sequence across Google Display, Meta, and LinkedIn can convert 3% to 8% of warm audiences at a CAC 40% to 60% lower than cold acquisition. Build these sequences before scaling cold audience spend."),

  stats(
    ["Rs 2-8 lakh/month", "Series A marketing budget range"],
    ["3:1 minimum", "Healthy LTV to CAC ratio"],
    ["40-60%", "Typical CAC reduction from retargeting vs cold audiences"],
    ["6-18 months", "Time for SEO to generate measurable ROI"]
  ),

  p("Key metrics at Series A: blended CAC across all channels, LTV to CAC ratio by cohort, channel-level ROAS, pipeline velocity (days from lead to close), and content-attributed pipeline. If your LTV to CAC ratio drops below 2:1, stop scaling spend until you identify and fix the leakage."),

  callout("tip", "Building Attribution at Series A", "Implement UTM parameters consistently across all campaigns. Connect your CRM to your ad platforms using native integrations or a tool like Segment. Build a simple attribution dashboard in Google Looker Studio that shows first-touch and last-touch attribution by channel. This setup costs Rs 0 in software at early stage and saves you from making channel allocation decisions based on gut feel rather than data."),

  h3("Series B and Scale Stage: Rs 10 Lakh to Rs 50 Lakh per Month"),

  p("At Series B, you are no longer just acquiring customers. You are building a brand that your category associates with the problem you solve. This requires a fundamentally different marketing posture: brand building running alongside performance marketing, not replacing it."),

  p("Performance marketing at this stage is highly optimized. You have 12 to 24 months of conversion data. Your targeting is precise. Your creative rotation is systematic. Your ROAS by campaign type is well understood. The performance marketing team should be running on a weekly optimization cadence with clear budget allocation rules based on platform ROAS thresholds."),

  p("Brand building becomes a parallel track. This includes PR in tier-1 business publications (Economic Times, Mint, Business Standard, YourStory, Inc42) to build domain authority and generate backlinks. It includes influencer partnerships in your category not just for reach but for social proof among your ICP. It includes CEO thought leadership on LinkedIn, podcast appearances, and speaking at industry events."),

  p("Enterprise SEO becomes a significant investment at Series B. You should be targeting a mix of top-of-funnel category keywords, middle-of-funnel comparison and alternative keywords, and bottom-of-funnel intent keywords. A properly executed enterprise SEO program can deliver 30% to 50% of your total lead volume at a CAC 60% to 80% below your paid channel CAC within 18 to 24 months."),

  p("For B2B startups at Series B with average contract values above Rs 10 lakh, account-based marketing becomes essential. This means identifying your top 100 to 500 target accounts, building custom content and campaigns for each account cluster, and coordinating sales outreach with marketing touchpoints. ABM at this scale requires dedicated tooling and a tightly coordinated sales-marketing relationship."),

  stats(
    ["Rs 10-50 lakh/month", "Series B marketing budget range"],
    ["30-50%", "Lead volume share that SEO can deliver at scale"],
    ["60-80%", "CAC reduction SEO delivers vs paid channels at 18-24 months"],
    ["100-500", "Target account list size for effective B2B ABM"]
  ),

  p("Key metrics at Series B: brand search volume growth (month-over-month), NPS correlation with acquisition channel, content-attributed pipeline percentage, ROAS by campaign type and audience segment, and share of voice in category keywords. At this stage, brand metrics start to matter alongside performance metrics."),

  callout("info", "The Brand Search Signal", "Brand search volume is one of the most reliable leading indicators of organic growth health. If your branded search volume is growing month-over-month, it means customers are actively seeking you out. This reduces your dependence on paid acquisition and lowers your blended CAC over time. Track branded search volume in Google Search Console every month and treat consistent growth as a primary health metric."),

  // ── Section 4: Channel Selection by Business Model ───────────────────────
  h2("Channel Selection Framework by Business Model"),

  p("Not all startup marketing channels work equally well for all business models. The optimal channel mix depends on your sales motion, average contract value, customer profile, and purchase decision complexity. Here is how the channel framework maps to India's four primary startup business models."),

  h3("B2B SaaS: LinkedIn + Google Search + Long-Form Content"),

  p("B2B SaaS in India has a relatively long sales cycle (30 to 120 days), a committee-driven purchase decision, and a customer base that actively searches for solutions online before engaging with any vendor. The ideal channel mix reflects this reality."),

  p("LinkedIn is the primary awareness and nurturing channel. Decision makers in Indian enterprises and mid-market companies are highly active on LinkedIn. A consistent content strategy that addresses their specific pain points generates inbound inquiries from exactly the right people. LinkedIn Ads are expensive (CPM of Rs 800 to Rs 2,000) but highly targeted for B2B roles and company sizes."),

  p("Google Search captures existing demand. When a VP Engineering at a Pune manufacturing company searches for 'cloud ERP for manufacturing SME India', they are signaling purchase intent. Google Search Ads and organic SEO targeting these high-intent queries deliver leads that close faster and at higher values than any other channel."),

  p_link("Long-form content builds category authority over time. Read our guide on ", "why strategic digital marketing firms are critical for business success", "/insights/why-strategic-digital-marketing-firms-are-critical-for-business-success", " for a deeper analysis of content-led B2B growth."),

  h3("D2C (Direct-to-Consumer): Instagram + Meta Ads + Influencer"),

  p("D2C brands in India sell to consumers who discover products through social feeds and peer recommendations. The visual nature of the product, the impulse purchase dynamic, and the mobile-first shopping behavior of Indian consumers make Instagram and Meta Ads the primary performance channels."),

  p("Meta Ads (Facebook and Instagram) offer the most sophisticated audience targeting available to Indian D2C brands. Interest-based targeting, lookalike audiences built from customer purchase data, and dynamic product ads retargeting website visitors are the three levers that drive D2C performance marketing efficiency in India."),

  p("Influencer marketing for D2C in India has evolved from celebrity endorsements to micro and nano influencer networks. A D2C brand in the Rs 2 crore to Rs 20 crore revenue range gets dramatically better ROI from 50 nano-influencers (10,000 to 50,000 followers each) in their specific niche than from one macro-influencer. The engagement rates are higher, the audience trust is stronger, and the cost per sale is lower."),

  stats(
    ["3-7x", "ROAS benchmark for healthy D2C Meta campaigns in India"],
    ["Rs 800-2,000", "CPM range for LinkedIn Ads targeting Indian B2B roles"],
    ["10x-15x", "Engagement rate difference: nano vs macro influencers"],
    ["40-60%", "Percentage of Indian D2C traffic from mobile devices"]
  ),

  h3("B2C App: Google UAC + Meta + YouTube Shorts"),

  p("Consumer apps in India compete in a market where the Google Play Store and App Store are the primary distribution channels, and user acquisition cost has risen sharply as competition has intensified. Google Universal App Campaigns (UAC) remain the most efficient paid user acquisition channel for Android-first apps because they leverage Google's full inventory including Search, Play Store, YouTube, and Display."),

  p("Meta Ads are effective for B2C apps targeting specific demographic segments. A fintech app targeting young professionals, a fitness app targeting urban women aged 25 to 40, or a regional language content app targeting Tier 2 users all benefit from Meta's demographic and interest targeting."),

  p("YouTube Shorts has emerged as a high-impact organic and paid channel for B2C apps in India. The format is native to how Indian consumers discover new apps. A 30-second demonstration of a key app feature on YouTube Shorts can generate thousands of installs at a fraction of the cost of traditional video ad campaigns."),

  h3("B2B Services: LinkedIn + Google + Warm Outreach"),

  p("B2B service businesses (agencies, consulting firms, managed service providers) have the most relationship-driven sales motion of any startup category. The customer is buying trust as much as they are buying a service. This makes founder-led marketing the single most important growth lever."),

  p("LinkedIn is the foundation. The founder's LinkedIn profile is the company's most important marketing asset. Consistent long-form posts about client outcomes, industry trends, and expert perspectives build the trust that converts to inbound inquiries. LinkedIn recommendations and endorsements from existing clients serve as social proof that no ad campaign can replicate."),

  p_link("Google Ads for B2B services should focus narrowly on high-intent service queries. Warm outreach through email and WhatsApp to referral networks and past clients remains the highest-conversion channel for service businesses at every stage. See our analysis of ", "performance marketing agencies and how they help brands move from spend to scale", "/insights/how-performance-marketing-agencies-help-brands-move-from-spend-to-scale", " for a detailed look at how service businesses build predictable pipelines."),

  callout("tip", "Channel Priority Matrix for Indian Startups", "B2B SaaS: LinkedIn organic (Priority 1), Google Search (Priority 2), Content and SEO (Priority 3). D2C: Meta Ads (Priority 1), Instagram organic (Priority 2), Influencer (Priority 3). B2C App: Google UAC (Priority 1), Meta (Priority 2), YouTube Shorts (Priority 3). B2B Services: LinkedIn organic (Priority 1), Warm outreach (Priority 2), Google Ads (Priority 3)."),

  // ── Section 5: Unit Economics ────────────────────────────────────────────
  h2("Unit Economics Every Indian Startup Must Track"),

  p("Unit economics are the financial foundation of startup marketing. Without them, every marketing decision is based on opinion. With them, every decision is based on evidence. Indian startups that scale successfully are obsessive about their unit economics from day one, not from Series A."),

  p("There are five unit economics metrics that every startup marketing team must track, regardless of stage or business model. Understanding and improving these five metrics is the entire job of startup marketing."),

  h3("Customer Acquisition Cost (CAC)"),

  p("CAC is the total cost of acquiring one new customer, including all marketing and sales expenses. It is calculated by dividing total marketing and sales spend in a period by the number of new customers acquired in that period."),

  p_b([{t:"Indian startup benchmarks by category: "},{t:"B2B SaaS: Rs 15,000 to Rs 1,50,000 per customer depending on ACV. D2C: Rs 300 to Rs 2,500 per customer. B2C App: Rs 30 to Rs 500 per install (Rs 200 to Rs 3,000 per active user). B2B Services: Rs 5,000 to Rs 50,000 per client.",b:true}]),

  p("CAC by channel is more actionable than blended CAC. Track the CAC for each channel separately: organic search, paid search, organic social, paid social, referral, events, and outbound. This tells you which channels to invest more in and which to reduce or eliminate."),

  h3("Customer Lifetime Value (LTV)"),

  p("LTV is the total revenue a customer generates over their entire relationship with your business. For SaaS businesses, it is calculated as average monthly revenue per customer divided by monthly churn rate. For D2C, it is average order value multiplied by average purchase frequency multiplied by average customer lifespan."),

  p("LTV improvement is as important as CAC reduction. The most efficient way to improve your marketing efficiency ratio is to increase LTV through better onboarding, stronger customer success, upsell programs, and referral incentives. A 20% increase in LTV has the same effect on your LTV:CAC ratio as a 20% reduction in CAC, but LTV improvement often costs less."),

  h3("LTV to CAC Ratio"),

  p("The LTV:CAC ratio is the single most important metric for assessing the health of a startup's growth model. It tells you how much value you create for every rupee you spend on acquiring a customer."),

  stats(
    ["< 1:1", "Burning money — stop scaling immediately"],
    ["1:1 to 3:1", "Marginal — improve before scaling"],
    ["3:1 to 5:1", "Healthy — scale with confidence"],
    ["> 5:1", "Exceptional — may be under-investing in growth"]
  ),

  p("A ratio below 3:1 means your business model has a fundamental problem that more marketing spend will only accelerate. A ratio above 5:1 often means you are not investing enough in growth and a competitor with a similar ratio but higher investment will outgrow you."),

  callout("warning", "The LTV Trap", "Many Indian startups calculate LTV based on theoretical projections rather than actual cohort data. A Rs 10,000 annual subscription customer with a 40% year-2 churn rate has a real LTV far lower than what a simple projection suggests. Always calculate LTV from actual cohort retention data, not projections. Your marketing decisions should be based on evidence, not optimism."),

  h3("Payback Period"),

  p("Payback period is the number of months it takes to recover your customer acquisition cost from the revenue that customer generates. It is a critical metric for capital efficiency."),

  p_b([{t:"Target payback periods by stage: "},{t:"Pre-seed and Seed: under 12 months. Series A: under 18 months. Series B: under 24 months.",b:true},{t:" Payback periods above these thresholds indicate either a pricing problem, a retention problem, or a targeting problem that is bringing in customers with lower purchase values or higher churn."}]),

  h3("Blended CAC"),

  p("Blended CAC is the average CAC across all channels, including organic and unpaid. It is useful for understanding your overall growth efficiency but should never replace channel-level CAC tracking."),

  p("The gap between your channel-level CAC and your blended CAC tells you how much of your growth is organic. A startup with a paid search CAC of Rs 5,000 but a blended CAC of Rs 2,000 has significant organic and referral growth supplementing its paid efforts. This gap is a sign of strong product-market fit and brand health."),

  p_link("If you are looking to build a professional digital marketing team or work with an agency, read our comprehensive guide on ", "how to start your online business in India", "/insights/9-essential-steps-to-start-your-online-business", " for context on building the right marketing foundation from the start."),

  callout("info", "Free Unit Economics Tools for Indian Startups", "Google Sheets with manual data entry from your CRM and ad platforms is sufficient for tracking these five metrics through Series A. At Series B, consider Mixpanel or Amplitude for user-level cohort analysis, and Tableau or Google Looker Studio for marketing attribution dashboards. Do not invest in expensive analytics tooling before you have the data hygiene practices to make it useful."),

  // ── Section 6: Budget Template ───────────────────────────────────────────
  h2("The Indian Startup Marketing Budget Template"),

  p("One of the most common questions startup founders ask is: how much should we spend on marketing, and how should we allocate it? The answer depends on your stage, your business model, and your current growth rate. Here is a practical framework for budget allocation that applies to Indian startups across categories."),

  h3("Budget Allocation by Stage"),

  p_b([{t:"Pre-seed and Seed (Rs 50,000 to Rs 2 lakh per month): "},{t:"60% to owned and organic channels (content, LinkedIn, community). 25% to one paid channel (Google Search or Meta Ads). 15% to tools and experimentation.",b:true}]),

  p_b([{t:"Series A (Rs 2 lakh to Rs 8 lakh per month): "},{t:"40% to paid performance marketing. 30% to content, SEO, and organic. 20% to retargeting and nurturing. 10% to tools, attribution infrastructure, and testing.",b:true}]),

  p_b([{t:"Series B (Rs 10 lakh to Rs 50 lakh per month): "},{t:"35% to paid performance marketing. 25% to brand building (PR, influencer, events). 25% to SEO and content at scale. 10% to ABM and enterprise programs. 5% to tools and experimentation.",b:true}]),

  h3("What Rs 1 Lakh per Month Actually Buys"),

  p("At Rs 1 lakh per month, a B2B SaaS startup can realistically allocate Rs 60,000 to Google Search Ads on 10 to 15 exact-match high-intent keywords, Rs 25,000 to LinkedIn content management and 2 to 3 sponsored posts per month, and Rs 15,000 to a basic landing page optimization and CRM setup. This budget, managed well, can generate 20 to 50 qualified leads per month in most B2B SaaS categories."),

  p("At Rs 1 lakh per month, a D2C brand can allocate Rs 70,000 to Meta Ads with a well-structured campaign architecture (3 to 5 ad sets, 6 to 10 creatives), Rs 20,000 to 5 to 8 nano-influencer collaborations, and Rs 10,000 to email marketing tools and WhatsApp Business API. This budget can generate 100 to 300 orders per month in established D2C categories."),

  h3("When to Hire vs When to Use an Agency"),

  p("The hire-vs-agency decision at early stage is primarily a question of specialization versus bandwidth. An in-house marketer at Rs 6 lakh to Rs 12 lakh per year at seed stage is a generalist who cannot be an expert in paid search, SEO, content, social, and analytics simultaneously. A specialized agency brings deep expertise in one or two channels and the tools and processes to execute at a level that a junior generalist cannot match."),

  p("The inflection point for most Indian startups is Rs 2 lakh to Rs 3 lakh in monthly marketing spend. Below this, an agency relationship typically delivers better outcomes per rupee because the agency overhead is justified by the expertise differential. Above Rs 10 lakh per month, in-house performance marketing talent typically delivers better outcomes because the volume justifies specialization and the institutional knowledge of your specific customer base becomes the primary competitive advantage."),

  pq("Hiring a full marketing team before reaching Rs 10 crore ARR is one of the most common ways Indian startups waste their Series A. A leaner, more focused approach almost always outperforms."),

  callout("tip", "The Agency Selection Checklist for Startups", "When selecting a digital marketing agency as a startup, ask these five questions: Does the agency have specific experience with startups at your stage (not just large brands)? Can they show you unit economics results (CAC, ROAS, LTV:CAC) not just reach and impressions? Do they have a dedicated account manager or will you be passed to a junior executive? What is their minimum contract length and can you exit if results are not meeting benchmarks within 90 days? Do they have experience in your specific category (B2B SaaS, D2C, etc.)?"),

  // ── Section 7: Case Studies ──────────────────────────────────────────────
  h2("5 Indian Startups That Got Digital Marketing Right"),

  p("Abstract frameworks are useful. Concrete examples are more useful. Here are five Indian startups whose digital marketing decisions had an outsized impact on their growth trajectory, with specific analysis of what they did and why it worked."),

  h3("Zepto: Speed as Marketing"),

  p("Zepto built a 10-minute grocery delivery brand in one of the most competitive consumer categories in India. Their digital marketing strategy was built around a single, audacious claim: 10 minutes. Every piece of content, every ad creative, every influencer collaboration, every customer communication reinforced this one message."),

  p("The lesson is the power of extreme specificity. Zepto did not say 'fast delivery'. They said '10 minutes'. This specific, verifiable claim became a marketing asset because it was differentiated enough to be memorable and bold enough to generate media coverage. Their performance marketing efficiency improved as brand awareness built, because branded search volume grew faster than their paid spend, reducing blended CAC over time."),

  p("Zepto also used hyperlocal Meta Ads targeting by pin code to run campaigns only in areas where their dark stores could actually fulfill the 10-minute promise. This precision targeting meant that every rupee of ad spend reached a convertible customer, not just a reachable one."),

  h3("Razorpay: The Content-Led B2B Flywheel"),

  p("Razorpay built one of the most effective B2B content marketing programs in Indian startup history. Their blog, documentation, developer resources, and educational content consistently ranked for high-intent keywords in the payments and fintech category. This content flywheel generated inbound leads at a fraction of the cost of outbound or paid acquisition."),

  p("The specific insight was that their ICP (developers and CTOs at technology companies) trusted peer-generated educational content far more than advertising. By becoming the most helpful educational resource in the Indian payments ecosystem, Razorpay earned the trust of their buyers before those buyers were even in a purchase process."),

  p("Razorpay's content investment compounded over 5 years into a domain authority that dominates first-page rankings for nearly every high-value fintech search query in India. The CAC from organic search is estimated to be 70% to 80% lower than their paid acquisition channels, providing a structural cost advantage that competitors cannot easily replicate."),

  h3("Mamaearth: The Influencer Network Approach"),

  p("Mamaearth scaled from a small toxin-free baby products brand to a Rs 500 crore revenue company in under 5 years, with influencer marketing as the primary growth engine. Their insight was that micro and nano influencers in the parenting, wellness, and natural beauty space had audiences that trusted their recommendations deeply."),

  p("Mamaearth built a network of thousands of influencers at different tiers, from nano (under 10,000 followers) to macro (above 1,00,000 followers). They provided consistent product education and messaging but gave influencers freedom to communicate in their authentic voice. This approach generated content that felt genuine rather than sponsored, driving conversion rates 3x to 5x higher than brand-produced ad content."),

  p("The digital marketing lesson from Mamaearth is that in categories where trust and ingredient transparency matter, influencer authenticity is more valuable than production quality. Their lowest-budget content, shot on phones by nano-influencers, consistently outperformed their highest-production brand videos in conversion metrics."),

  h3("Nykaa: Search Intent Dominance"),

  p("Nykaa built a beauty and personal care ecommerce business in India by becoming the destination for beauty search intent. Their SEO strategy targeted not just product keywords but informational queries: 'how to apply kajal', 'best moisturizer for oily skin India', 'lipstick shades for Indian skin tone'. These informational pieces drove massive organic traffic from consumers who were not yet in a purchase intent state but were in a consideration state."),

  p("By building trust at the top of the funnel through helpful content, Nykaa converted research traffic into purchase intent traffic and eventually into buyers. Their blog and editorial content became one of their most valuable customer acquisition assets, with organic search accounting for a significant share of their traffic at a near-zero marginal CAC."),

  p("The marketing lesson is that in categories with high consumer education needs, owning the informational search layer before your competitors creates a durable competitive advantage. Once you rank for 'best moisturizer for oily skin India', every skincare brand advertising on that query is competing with your organic listing for the same customer."),

  h3("Zomato B2B (Hyperpure): Account-Based Marketing in the Restaurant Industry"),

  p("Zomato's B2B restaurant supply business Hyperpure faced a challenging sales problem: restaurant owners in India are extremely time-poor and skeptical of new suppliers. Traditional digital marketing generated low-quality leads because most restaurant owners were not searching for ingredient suppliers online."),

  p("Hyperpure used a combination of LinkedIn outreach targeting restaurant owners and F&B managers, WhatsApp Business campaigns to warm up restaurant contacts from their existing restaurant partner database, and localized Google Ads targeting search queries from chefs and procurement managers. This account-based approach, using Zomato's existing restaurant relationship data as the targeting foundation, dramatically reduced their B2B CAC versus a cold outbound model."),

  p_link("The insight is that B2B startups with existing customer data can use that data as a targeting foundation to dramatically reduce CAC. Read more about the principles behind this approach in our analysis of ", "why digital transformation often fails for SMEs in India", "/insights/why-digital-transformation-fails-smes-india", " and how data-driven approaches consistently outperform intuition-based ones."),

  callout("info", "The Common Thread Across All 5 Case Studies", "Each of these startups identified one specific thing they could own in the mind of their target customer: Zepto owned speed, Razorpay owned developer trust, Mamaearth owned ingredient transparency, Nykaa owned beauty knowledge, and Hyperpure owned restaurant supply reliability. Every channel and every piece of content reinforced this one ownership claim. This focus is what separates startups that break through from those that generate impressions without conversions."),

  pq("The startups that win in India are not the ones that spend the most on marketing. They are the ones that spend the most precisely, with a clear claim, a specific customer, and a measurable outcome."),

  // ── Section 8: Sources ────────────────────────────────────────────────────
  h2("Sources and Data"),

  p("1. DPIIT Startup India Report 2025-26: 'India Startup Ecosystem: A Decade of Growth' — startup count, funding, and unicorn data. Available at startupindia.gov.in."),

  p("2. Inc42 'The State of Indian Startup Ecosystem 2025' — survival rates, funding distribution, and sector-level growth data. Published December 2025."),

  p("3. Tracxn India Startup Report 2025 — unicorn count, total funding, and sector breakdowns. Published Q1 2026."),

  p("4. Google India 'Year in Search 2025' and Google Consumer Barometer India — mobile traffic share, D2C search behavior, and regional search trends."),

  p("5. HubSpot 'State of Marketing India 2025' — B2B marketing channel effectiveness, CAC benchmarks, and content marketing ROI data for Indian markets."),

  p("6. LinkedIn India B2B Marketing Insights Report 2025 — LinkedIn Ad CPM data, B2B audience size in India, and engagement benchmarks for Indian B2B content.")

];

await client.patch("insight-wp-989313").set({
  title: "The Startup Digital Playbook: How Top Digital Marketing Companies Fuel Sustainable Growth for Indian Startups",
  seoTitle: "Digital Marketing for Indian Startups: The Complete 2026 Growth Playbook",
  excerpt: "India has 112,000+ recognized startups — the third largest startup ecosystem globally. The ones that grow from seed to scale without burning their marketing budget follow a repeatable playbook. Here is that playbook, built from how India's fastest-growing startups actually use digital marketing.",
  categories: ["digital-marketing","industry-insights"],
  tags: ["digital marketing for startups India","startup growth India","startup digital marketing strategy","Indian startup marketing","startup marketing budget India","startup digital playbook"],
  body,
}).commit();
console.log("Published! Blocks:", body.length);
