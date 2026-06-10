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
const k = () => `rw08_${++_k}`;

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

  // ── SECTION 1: THE SHORT ANSWER ──────────────────────────────────────────
  h2("The Short Answer"),

  p("India is now one of the fastest-growing digital advertising markets in the world. Total digital ad spend is projected to cross Rs 55,000 crore in 2026, growing at a compound annual rate of 28 percent. Yet despite this flood of investment, a striking majority of Indian brands cannot answer a simple question: what did my last campaign actually generate in revenue?"),

  p("That gap between spend and accountability is exactly what performance marketing is designed to close. The top 10 percent of Indian digital advertisers consistently achieve 5 to 8 times return on ad spend. The industry average sits at 2 to 3 times. The difference is not budget. It is methodology, infrastructure, and the discipline to treat every rupee as an investment that must produce a measurable return."),

  p("If your brand is spending on Google, Meta, or LinkedIn without being able to trace that investment to pipeline, revenue, or customer acquisition cost, you are not doing performance marketing. You are doing digital advertising with hope attached."),

  stats(
    ["Rs 55,000 Cr", "India digital ad market 2026"],
    ["28% CAGR", "digital ad growth rate India"],
    ["68%", "Indian CMOs who cannot connect spend to revenue"],
    ["5-8x ROAS", "top 10% of Indian digital advertisers"]
  ),

  p("The brands in that top 10 percent are not spending more than the average. Many are spending less. They are simply operating with better processes, better data, and better accountability structures. This guide breaks down what those structures look like, what it costs to build them, and how to evaluate whether an agency can deliver them for your business."),

  callout("warning", "The Accountability Gap", "68 percent of Indian CMOs report they cannot reliably connect advertising spend to revenue outcomes. This is not a technology problem. Data and attribution tools are widely available. It is a process problem, and a performance marketing agency exists specifically to solve it."),

  // ── SECTION 2: WHAT PERFORMANCE MARKETING ACTUALLY MEANS ─────────────────
  h2("What Performance Marketing Actually Means"),

  p("Performance marketing is not a channel. It is not the same as running Google Ads or boosting posts on Instagram. It is a management philosophy in which every rupee of advertising spend is tied, in advance, to a measurable business outcome. Cost per lead. Cost per acquisition. Revenue per campaign. Pipeline influenced. These are not reporting metrics. They are the conditions under which spend gets approved and continued."),

  p("The contrast with traditional brand advertising is sharp. Brand advertising measures awareness: recall scores, reach, impressions, sentiment. These are legitimate goals for mature, well-funded brands. But for the vast majority of Indian businesses, especially growth-stage companies and mid-market firms with real revenue targets, awareness that does not convert is a luxury they cannot afford."),

  p("Performance marketing starts from a different premise. It asks: what action do we want a prospect to take? What is that action worth to the business? What is the maximum we can pay for that action and still be profitable? Everything flows from those three questions. Channel selection, creative strategy, targeting, bidding, attribution, and reporting all serve those numbers."),

  p("This is why choosing the right performance marketing agency is a strategic decision, not a vendor decision. You are not buying media. You are hiring a team that will operate your customer acquisition engine."),

  p("Consider the contrast in practice. A traditional campaign celebrates reaching 50 lakh people with a brand message. A performance campaign asks: of the people who saw that message, how many clicked, how many converted, what was the cost, and what was the revenue? The second question is harder to answer, but it is the only question that connects marketing activity to business growth."),

  callout("info", "Impressions Are Not Business", "A campaign that generates 10 lakh impressions but zero qualified leads has a cost per acquisition of infinity. Performance marketing rejects vanity metrics by design. Every KPI must trace back to a business action that has an assigned monetary value."),

  pq("Performance marketing is not about spending less. It is about knowing exactly what every rupee produced, and using that knowledge to spend more on what works."),

  // ── SECTION 3: 5 CORE COMPETENCIES ───────────────────────────────────────
  h2("The 5 Core Competencies of Performance Marketing Agencies"),

  p("Not every agency that runs paid ads is a performance marketing agency. The distinction lies in five specific capabilities that separate accountable, ROI-driven operations from generic media buying. Each competency builds on the others. A weakness in any one creates a gap that undermines the entire system."),

  // h3 1
  h3("1. ROI-Centric Strategy"),

  p("A true performance marketing agency starts every engagement from the business outcome, not the channel. Before a single campaign is built, the agency should be asking: what is your current customer acquisition cost, and what do you need it to be? What is your average order value or contract value? What is your 12-month customer lifetime value? What conversion rate do you need from each stage of the funnel to hit your revenue target?"),

  p("This approach works backwards from the target. If a B2B software company in Pune needs to acquire 10 new enterprise clients per quarter at a maximum CAC of Rs 80,000, the agency can calculate exactly how much pipeline is required, how many qualified leads that implies, what conversion rates must hold at each stage, and what budget is needed at each channel. Every campaign decision is anchored to those numbers."),

  p("This is the fundamental difference between a performance agency and a media agency. A media agency optimises for delivery: impressions served, clicks generated, spend deployed. A performance agency optimises for outcome: leads qualified, demos booked, trials started, purchases completed."),

  callout("tip", "What a First Performance Agency Meeting Should Look Like", "If an agency walks into your first meeting and starts talking about platforms, creatives, or ad formats before asking about your CAC target, deal cycle length, and unit economics, you are talking to the wrong agency. The first meeting should feel like a business strategy session, not a media presentation."),

  p_link("The process of selecting a performance-oriented partner is covered in depth in our guide to ", "hiring the best digital marketing agency", "/insights/the-ultimate-guide-to-hiring-the-best-digital-marketing-agency", ", which walks through evaluation criteria specific to Indian market conditions."),

  // h3 2
  h3("2. Cross-Platform Mastery"),

  p("Indian buyers do not live on one platform. A B2B decision-maker in Mumbai might search for a vendor on Google, read a LinkedIn article during a commute, see a retargeting ad on YouTube that evening, and click through from a Meta feed post on the weekend. Each of these touchpoints plays a different role in the purchase journey, and a performance agency understands how to orchestrate them, not just manage them in isolation."),

  p("Google Search captures demand that already exists. When someone types 'ERP software for manufacturing companies India', they have identified themselves as an active buyer. This is bottom-of-funnel intent, and search campaigns should be optimised for conversion, not awareness. Google Display and YouTube serve a different function: they create awareness and nurture prospects who are not yet searching. Shopping campaigns are essential for e-commerce. Each format requires a different bidding strategy, creative approach, and success metric."),

  p("Meta platforms serve Indian consumers at enormous scale. With over 50 crore Facebook users and 25 crore Instagram users in India, Meta offers unmatched reach for B2C brands and increasingly strong results for B2B in sectors like professional services, SaaS, and education. LinkedIn is the highest-intent B2B channel in India, with CPCs that reflect that quality. Programmatic display extends reach across thousands of Indian news, content, and vertical sites through automated buying."),

  stats(
    ["Google Search", "Bottom-of-funnel, high intent"],
    ["Meta Ads", "Top/mid-funnel, B2C & awareness"],
    ["LinkedIn Ads", "B2B decision-maker targeting"],
    ["YouTube Ads", "Brand building and retargeting"]
  ),

  p("The key performance marketing insight is that these channels are not competitors for budget. They are stages in a funnel. A performance agency builds the architecture so that awareness channels feed mid-funnel nurture, which feeds bottom-of-funnel conversion, and attribution credit is distributed appropriately across all touchpoints."),

  p_b([{t:"B2B versus B2C channel mix differs significantly in India. ",b:true},{t:"B2B companies typically allocate 40 to 50 percent of digital budget to Google Search, 25 to 35 percent to LinkedIn, and the remainder split between YouTube and Meta retargeting. B2C brands often invert this, with Meta taking 40 to 60 percent of budget due to superior audience targeting for consumer demographics, supported by Google Shopping and Search for intent capture.",b:false}]),

  // h3 3
  h3("3. Real-Time Optimization"),

  p("One of the most common failure modes of in-house ad management is the monthly review cycle. Campaigns run for four weeks, a report is generated, the team discusses changes, and the cycle repeats. In a digital advertising environment where auction dynamics, competitor bids, creative fatigue, and audience signals shift daily, a monthly review cycle means spending weeks on underperforming campaigns before anyone intervenes."),

  p("Performance agencies operate on a different cadence. Bids are reviewed and adjusted daily, sometimes multiple times a day during high-spend periods. Automated rules in Google Ads Manager and Meta Ads Manager flag underperforming ad sets, pause low-quality traffic sources, and reallocate budget to winning creatives without waiting for human approval. Weekly creative rotation prevents audience fatigue, which is especially acute on Meta where the same audience sees the same ad repeatedly within days."),

  p("Real-time optimisation in practice means three things. First, every campaign has clear performance thresholds: if an ad set exceeds a target CPA by more than 30 percent over 72 hours, it is paused and investigated. Second, budget is fluid: spend shifts daily from underperforming campaigns to those beating targets. Third, creative testing is continuous: new ad variants are always in test, and winners are scaled while losers are retired within the same week."),

  p("The agencies that sustain strong ROAS over time are those that treat creative as a supply chain problem. New ad concepts must be entering test every week, because at scale, creative fatigue is the single most common cause of performance decline. A performance agency that cannot produce and test 4 to 6 new creative variants per month will lose effectiveness within 60 to 90 days of launching any successful campaign."),

  callout("tip", "Tools That Enable Real-Time Performance Management", "Google Ads Editor allows bulk offline changes and fast implementation. Meta Ads Manager automated rules can pause, scale, or alert on any metric. Google Looker Studio dashboards provide daily visibility across all channels. Performance agencies build these systems from day one. DIY advertisers rarely do."),

  // h3 4
  h3("4. Attribution Clarity"),

  p("Attribution is the science of assigning credit to the marketing touchpoints that contributed to a conversion. It sounds technical, but it is fundamentally a business question: which of my campaigns actually caused this customer to buy? Without a credible answer to that question, budget decisions are made on intuition rather than evidence."),

  p("Last-click attribution, which is still the default in many Indian businesses, assigns 100 percent of the credit to the final touchpoint before conversion. This consistently over-credits bottom-of-funnel channels like branded search and under-credits the awareness and consideration channels that created the demand in the first place. A brand might conclude that its Google branded search campaign is its best-performing channel, when in fact it is merely harvesting demand that was created by LinkedIn and YouTube campaigns."),

  p("Data-driven attribution uses machine learning to distribute credit across all touchpoints proportionally to their actual contribution. It requires sufficient conversion volume to train the model, typically a minimum of 50 conversions per month per channel, but when available it produces a dramatically more accurate picture of what is driving growth."),

  p("The Indian market presents specific attribution challenges that global frameworks do not account for. Many Indian B2B sales include a WhatsApp conversation between the ad click and the actual conversion. Offline follow-up calls are common. Trade show and event touchpoints are not digitally tracked. A strong performance agency builds attribution frameworks that capture these offline and cross-channel touchpoints, often integrating CRM data with ad platform data to produce a full-funnel view."),

  callout("warning", "The WhatsApp Attribution Gap", "In India, a large proportion of B2B leads that originate from digital ads complete their conversion journey through WhatsApp or a phone call. If your attribution only tracks the digital click, you are systematically under-counting the value of your campaigns. Performance agencies solve this with UTM-enriched WhatsApp links, CRM webhook integrations, and call tracking numbers."),

  // h3 5
  h3("5. India-Specific Channel Knowledge"),

  p("Running digital advertising in India is not the same as running it in the US or Europe. The infrastructure is different, consumer behaviour is different, and the signals that indicate purchase intent are different. An agency that brings only global best practices without India-specific knowledge will consistently underperform."),

  p("UPI has transformed how Indian consumers complete purchases. Performance campaigns for e-commerce and D2C brands must be optimised for UPI payment flows, not just credit card checkout. Click-to-WhatsApp ads on Meta are among the highest-converting formats in the Indian market because they meet buyers in the channel they already use. Campaigns that drive to a generic contact form convert significantly worse than those that open a WhatsApp conversation."),

  p("Indian consumer behaviour follows distinct patterns that affect campaign scheduling. Mobile traffic peaks between 9 PM and 11 PM. Search volume for high-consideration purchases spikes on Saturday mornings. Festival seasons, particularly Diwali, Pongal, Eid, and the Navratri period, produce dramatically different conversion dynamics than the rest of the year. Price sensitivity signals, including searches for terms like 'best price', 'discount', and 'offer', indicate a different buyer intent than premium searches and require different ad copy and landing page strategies."),

  p("Language targeting is another India-specific lever that is underused by most advertisers. Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, and Malayalam together reach hundreds of millions of buyers who convert significantly better on vernacular content than English. A performance agency with India expertise builds campaigns that test vernacular creatives systematically."),

  callout("info", "India-First Performance Marketing Practices", "The highest-converting Indian digital campaigns combine three elements: UPI-optimised landing pages, Click-to-WhatsApp ad formats on Meta, and vernacular creative variants tested against English. Brands that implement all three consistently see 25 to 40 percent lower cost per qualified lead than brands running generic global campaigns."),

  // ── SECTION 4: PLATFORM COST BENCHMARKS ──────────────────────────────────
  h2("Platform Cost Benchmarks for India 2026"),

  p("Understanding what traffic costs is essential to building a credible performance marketing budget. These benchmarks are aggregated from Indian market data across mid-size advertisers. Costs vary significantly by targeting precision, ad quality score, competitor density, and seasonality. Use these as planning inputs, not guarantees."),

  h3("Google Search CPC by Industry"),

  p("Google Search CPCs in India reflect competition for high-intent queries. B2B services keywords such as 'digital marketing agency India' or 'cloud software for enterprises' typically cost Rs 40 to Rs 150 per click. E-commerce product keywords range from Rs 15 to Rs 60 per click, with branded terms cheaper and non-branded competitive terms at the higher end. Education keywords, including test prep, degree programs, and professional certifications, cost Rs 20 to Rs 80 per click. Healthcare keywords, particularly diagnostics, hospitals, and specialty consultations, range from Rs 30 to Rs 100 per click."),

  stats(
    ["Rs 40-150", "B2B Services Google CPC"],
    ["Rs 15-60", "E-commerce Google CPC"],
    ["Rs 20-80", "Education Google CPC"],
    ["Rs 30-100", "Healthcare Google CPC"]
  ),

  h3("Meta and LinkedIn Benchmarks"),

  p("Meta CPM (cost per 1,000 impressions) in India ranges from Rs 80 to Rs 200 for standard audience targeting. Retargeting audiences and Lookalike Audiences at the 1 percent similarity level typically cost 20 to 40 percent more than broad targeting but convert at significantly higher rates. For a budget of Rs 1,00,000 per month on Meta, a mid-range CPM of Rs 130 would generate roughly 7.7 lakh impressions, assuming no click-through to website costs."),

  p("LinkedIn CPC in India ranges from Rs 800 to Rs 2,500 per click, making it the most expensive channel on a per-click basis. However, for B2B companies selling solutions above Rs 5,00,000 in annual contract value, LinkedIn delivers a quality of lead that no other platform can match. A single LinkedIn campaign click that converts into a Rs 20,00,000 deal is dramatically cheaper than 10 Meta leads that do not convert."),

  stats(
    ["Rs 80-200", "Meta CPM India"],
    ["Rs 800-2,500", "LinkedIn CPC India"],
    ["Rs 15-60", "Google Shopping CPC"],
    ["Rs 50-180", "YouTube CPM India"]
  ),

  h3("Budget Allocation at Rs 1,00,000 per Month"),

  p("For a B2B technology company in India with a Rs 1,00,000 monthly performance marketing budget, a typical starting allocation might be: Rs 50,000 on Google Search (targeting bottom-of-funnel, high-intent keywords), Rs 25,000 on LinkedIn (decision-maker awareness and retargeting), and Rs 25,000 on Meta (broad awareness, lead generation, and retargeting warm audiences). This allocation prioritises conversion over reach."),

  p("For a B2C e-commerce brand at the same budget, the split shifts: Rs 40,000 on Google Shopping and Search, Rs 40,000 on Meta (Facebook and Instagram combined for broad reach and conversion campaigns), and Rs 20,000 reserved for YouTube or programmatic display for brand recall. The right split depends entirely on where your buyers are and what stage of the funnel you are targeting."),

  callout("tip", "The Rs 1 Lakh Starting Point", "Rs 1,00,000 per month is a workable test budget for performance marketing in India, but it is not a comfortable scale budget. At this level, you are gathering data and finding what works. The learning phase typically requires 2 to 3 months before ROAS stabilises. Expect month 1 and 2 to show lower returns than month 4 and 5."),

  // ── SECTION 5: 4 SIGNS YOU NEED AN AGENCY ────────────────────────────────
  h2("4 Signs You Need a Performance Marketing Agency"),

  p("Many Indian businesses run their own digital advertising for years before engaging an agency, and many never make the switch because they do not recognise the signals that indicate DIY management is costing them more than an agency would. Here are four patterns that consistently indicate it is time to bring in specialist help."),

  h3("1. Ad Spend Has Grown But ROI Is Flat"),

  p("This is the most common pattern. The business increased its monthly ad budget, sometimes two or three times over, without a proportional increase in leads, sales, or pipeline. More spend produced more clicks but not more qualified outcomes. This is a structural problem, not a budget problem. Increasing spend into a broken funnel only amplifies the inefficiency."),

  p("The root cause is usually one of three things: creative fatigue (the same ads shown to the same audiences repeatedly until performance collapses), audience saturation (the target audience has been exhausted without lookalike expansion), or attribution failure (the campaigns that appear to be performing best are actually only capturing existing demand, not creating new demand). A performance agency diagnoses all three."),

  h3("2. Launching Into a New Market Without Channel Expertise"),

  p("Entering a new geographic market, a new demographic segment, or a new product category requires different channel strategies, different bidding approaches, and different creative angles than what works in your existing market. Applying your existing campaign structure to a new market typically produces poor results and wastes the first three months of budget."),

  p("Performance agencies that have operated across multiple Indian cities, industries, and audience segments bring institutional knowledge that cannot be built quickly from scratch. They know that healthcare campaigns in Tier 2 cities require different messaging than the same campaign in Mumbai. They know that B2B campaigns targeting manufacturing companies respond to different creative formats than IT sector targeting. This knowledge accelerates the learning curve significantly."),

  h3("3. Lacking Internal Attribution Infrastructure"),

  p("If your team cannot tell you, within 24 hours, what your cost per qualified lead was by channel last week, you lack the attribution infrastructure required for serious performance marketing. This is not a failure of effort. Building proper attribution requires integrating ad platforms with CRM systems, setting up conversion tracking across all touchpoints, and building reporting dashboards that surface actionable data. Most in-house marketing teams do not have the technical expertise to do this well."),

  p("Operating without attribution means making budget decisions based on incomplete information. Channels that appear expensive on a surface level may be driving the highest-quality leads. Channels that appear to have the lowest CPL may be generating leads that never convert. Without attribution, you cannot know which is which."),

  h3("4. Need to Scale Without Proportional Headcount Growth"),

  p("Scaling performance marketing internally requires adding people: a paid search specialist, a paid social specialist, a creative designer, a data analyst, a CRO specialist. For a company going from Rs 2,00,000 to Rs 10,00,000 per month in ad spend, building that team internally means hiring 4 to 6 people and managing a full department. An agency provides that entire capability at a fraction of the cost."),

  p("The economics become particularly compelling at higher spend levels. An agency retainer of Rs 80,000 to Rs 1,50,000 per month that manages Rs 10,00,000 in ad spend is a management fee of 8 to 15 percent of spend. Building an equivalent internal capability would cost Rs 4,00,000 to Rs 7,00,000 per month in salaries alone, before tools, benefits, and management overhead."),

  p("There is also the question of talent availability. Senior performance marketing specialists in India command Rs 12,00,000 to Rs 24,00,000 per annum in major metros. A single specialist cannot cover the full breadth of paid search, paid social, attribution, CRO, and creative strategy. An agency provides a team of specialists for the same or lower investment than one senior generalist hire."),

  callout("warning", "The False Economy of DIY Performance Marketing", "Many Indian founders believe they are saving money by managing ads in-house with a junior executive. The hidden cost is not the salary. It is the wasted ad spend from campaigns that run for weeks without proper optimisation, the lost revenue from under-scaled campaigns that are working, and the opportunity cost of not having a specialist team extracting maximum value from every rupee. DIY performance marketing usually costs more than an agency, it just does not appear as a line item on the invoice."),

  p_link("The strategic considerations around building internal teams versus agency partnerships are explored further in our analysis of ", "why strategic digital marketing firms are critical for business success", "/insights/why-strategic-digital-marketing-firms-are-critical-for-business-success", "."),

  // ── SECTION 6: THE SCALING FRAMEWORK ─────────────────────────────────────
  h2("The Scaling Framework: Test, Validate, Scale"),

  p("One of the most common mistakes Indian brands make with performance marketing is attempting to scale before they have found what works. They allocate a large budget from month one, spread it across multiple channels, and measure aggregate results that are too noisy to be actionable. A structured three-phase approach produces dramatically better outcomes."),

  h3("Phase 1: Test (Rs 30,000 to Rs 80,000 per Month)"),

  p("The test phase is not about generating revenue. It is about generating data. The goal is to identify, with statistical confidence, which creative concepts, audience segments, and channel combinations produce the best results for your specific business. This requires running multiple small experiments in parallel and measuring results rigorously."),

  p("A well-structured test phase might run 3 to 5 creative concepts across 2 to 3 audience segments on a single channel, with enough budget on each combination to accumulate 20 to 30 conversion events per variant before drawing conclusions. This discipline prevents premature scaling of ideas that appeared to work in small samples but would not hold at volume."),

  pq("The test phase is not a cost. It is the price of knowing what your best campaign looks like before you scale it. Brands that skip this phase spend 10 times as much to learn the same lessons."),

  h3("Phase 2: Validate (Rs 80,000 to Rs 2,50,000 per Month)"),

  p("Validation takes the winners from the test phase and proves they work at higher volume. This phase introduces more risk: budgets are large enough that poor performance costs real money. The goal is to demonstrate that winning creatives and audiences maintain their performance as spend increases, and to identify the point at which returns begin to diminish."),

  p("Validation also involves optimising the conversion funnel. A campaign generating clicks at a good CPC but low conversion rate points to a landing page problem. A campaign generating form fills that do not convert to qualified leads points to a targeting or messaging problem. Both must be solved before scaling."),

  h3("Phase 3: Scale (3-5x Spend on Proven Campaigns)"),

  p("Scale deploys large budgets exclusively into validated, proven combinations. This is where performance marketing delivers its highest returns. A campaign that generates Rs 8 of revenue for every Rs 1 of ad spend at Rs 50,000 per month will not automatically produce the same return at Rs 5,00,000 per month, because audience saturation and auction competition increase. But a well-managed scale phase should sustain ROAS within 20 percent of validated levels."),

  p("Scaling also requires continuous creative refresh. At high spend levels, audience fatigue accelerates. New creative variants must enter test continuously, with winners rolling up to full scale. The agencies that sustain high ROAS at scale are those with systematic creative production and testing pipelines, not those relying on one or two winning concepts indefinitely."),

  p("Budget scaling should follow a structured ramp, not a sudden jump. Doubling ad spend in a single week can trigger algorithm resets in Google and Meta, pushing campaigns back into the learning phase and temporarily degrading performance. A performance agency will typically increase spend by 20 to 30 percent per week, giving platform algorithms time to adjust bidding patterns and audience targeting to the new volume."),

  callout("tip", "The 20 Percent Scaling Rule", "Never increase ad spend by more than 20 to 30 percent per week on a campaign that is already performing well. Larger jumps force the platform algorithm into a fresh learning phase that can last 7 to 14 days, during which cost efficiency typically worsens. Patience in scaling preserves the optimisation work already done."),

  stats(
    ["2-4x ROAS", "Test phase (learning, high variance)"],
    ["4-6x ROAS", "Validate phase (stabilising)"],
    ["5-8x ROAS", "Scale phase (proven campaigns)"]
  ),

  callout("info", "The Phase Gate Principle", "Budget should not advance from test to validate, or validate to scale, until specific performance thresholds are met. Advancing prematurely because of schedule pressure or impatience is how brands waste large budgets. A performance agency enforces these phase gates as part of its process, not as a recommendation."),

  p_link("The role of artificial intelligence in accelerating each phase of this scaling framework is covered in detail in our post on ", "how AI transforms performance marketing for scalable growth", "/insights/how-ai-transforms-performance-marketing-for-scalable-growth", "."),

  // ── SECTION 7: SERVICES BREAKDOWN ────────────────────────────────────────
  h2("Performance Marketing Services Breakdown"),

  p("When you engage a performance marketing agency, you are purchasing a specific set of services that together constitute a managed customer acquisition operation. Understanding what each service does, and why it matters, helps you evaluate agency proposals and hold partners accountable."),

  h3("Paid Search Management"),

  p("Paid search management covers Google Search, Google Shopping, Microsoft Advertising (Bing), and Google Performance Max campaigns. The core activities are keyword research and negative keyword management, ad copy testing and optimisation, bid strategy selection and adjustment, Quality Score improvement, and search impression share analysis. A well-managed paid search campaign continuously improves its efficiency over time as the team builds a more precise picture of which queries produce buyers versus researchers."),

  p("In the Indian B2B market, paid search management often includes a significant investment in negative keywords. Queries that sound relevant but produce non-converting traffic, such as research queries, job seeker queries, and competitor brand searches, must be excluded systematically. Failure to maintain a disciplined negative keyword list is one of the most common sources of wasted spend in Indian search campaigns."),

  p("Google Performance Max campaigns require particular expertise in the Indian market context. P-Max campaigns use machine learning to optimise across all Google inventory simultaneously, including Search, Display, YouTube, Gmail, Maps, and Discover. When properly configured with strong audience signals and creative assets, P-Max campaigns can discover converting audiences that manual campaigns miss. Poorly configured, they waste budget on low-quality placements. Most in-house teams lack the experience to configure P-Max well."),

  h3("Paid Social Management"),

  p("Paid social management covers Meta (Facebook and Instagram), LinkedIn, and increasingly YouTube Shorts and Pinterest for specific categories. Social platforms require fundamentally different creative approaches than search. Social ads interrupt users who are not actively searching, which means the creative must earn attention and create desire before it can ask for action."),

  p("Paid social management includes audience strategy (custom audiences from CRM data, website visitors, and video viewers; Lookalike Audiences; interest and behaviour targeting), creative briefing and performance analysis, campaign structure optimisation (campaign budget optimisation versus ad set budget optimisation), and A/B testing of headlines, images, videos, and calls to action."),

  p("The creative dimension of paid social is where most in-house teams fall short. Meta and Instagram campaigns require a constant stream of fresh creative because the platform shows ads to the same users repeatedly within days. A strong performance agency either has in-house creative capacity or a close partnership with a creative studio that can deliver tested variants weekly, not monthly."),

  p("LinkedIn paid social in India deserves special mention. Sponsored Content, Message Ads, and Conversation Ads each serve a different role in the B2B funnel. Sponsored Content builds awareness among target personas. Message Ads deliver direct outreach to specific decision-makers, with open rates that email cannot match. A performance agency builds LinkedIn campaigns that use each format at the right funnel stage, rather than defaulting to a single format for all objectives."),

  h3("Programmatic Display"),

  p("Programmatic display buys advertising inventory across thousands of websites and apps through automated real-time bidding. In India, this includes major news portals, vertical content sites, app networks, and premium publishers. Programmatic is particularly effective for retargeting (showing ads to users who visited your website but did not convert) and for building brand awareness at scale across specific audience segments."),

  h3("Conversion Rate Optimisation (CRO)"),

  p("Performance marketing without CRO is like driving more water into a leaking pipe. CRO addresses the landing page, website, and checkout experience that converts ad clicks into customers. Services include landing page A/B testing, heatmap and session recording analysis, form optimisation, page speed improvement, and mobile experience testing. A 1 percent improvement in conversion rate has the same impact on revenue as a 1 percent increase in traffic, and it costs a fraction of what additional traffic costs."),

  p("In the Indian context, CRO must account for the diversity of devices, connections, and browser environments that Indian users bring. A landing page that converts well on a high-end Android device in Mumbai may fail completely on a low-end device on a 4G connection in a Tier 2 city. Performance agencies that work in India test across this full device and connectivity spectrum."),

  h3("Attribution Modeling"),

  p("Attribution modeling is the analytical layer that makes sense of all campaign data. It involves integrating ad platform data (Google Ads, Meta Ads Manager, LinkedIn Campaign Manager) with CRM data (Salesforce, HubSpot, Zoho CRM), building multi-touch attribution models, and producing reports that show the true contribution of each channel to revenue outcomes."),

  h3("Audience Building and Lookalike Strategy"),

  p("First-party audience strategy is increasingly the foundation of strong performance marketing. Custom audiences built from CRM contact lists, website visitors, app users, and video viewers allow campaigns to target people who have already shown interest in the brand. Lookalike Audiences extend this by finding new users who share characteristics with existing high-value customers."),

  p("In India, first-party data strategies are becoming more important as third-party cookie deprecation affects targeting precision across the web. Brands that have invested in building and maintaining clean, rich first-party audiences will maintain a structural advantage in their performance marketing efficiency. Agencies that understand this build audience strategy as a long-term asset, not just a campaign input."),

  p("Customer Match campaigns on Google and Custom Audiences on Meta allow direct targeting of your existing customer base for upselling and cross-selling, which typically produces the highest ROAS of any campaign type. A performance agency that does not use your CRM data in campaigns from month one is leaving significant returns untapped."),

  stats(
    ["40-50%", "B2B budget on Google Search"],
    ["25-35%", "B2B budget on LinkedIn"],
    ["40-60%", "B2C budget on Meta platforms"],
    ["20-30%", "retention via Customer Match"]
  ),

  // ── SECTION 8: REALISTIC KPIs ─────────────────────────────────────────────
  h2("How to Set Realistic KPIs for Indian Markets"),

  p("One of the most common errors in Indian performance marketing is using global or US-market benchmarks as KPI targets. Indian market conditions, including lower average order values, higher price sensitivity, longer B2B sales cycles, and different channel dynamics, produce different numbers. Setting unrealistic KPIs based on global data leads to premature campaign termination, misaligned agency relationships, and poor resource allocation decisions."),

  h3("Customer Acquisition Cost Benchmarks by Sector"),

  p("In the Indian B2B software sector, a reasonable CAC for a qualified sales-ready lead from digital campaigns ranges from Rs 3,000 to Rs 15,000, depending on deal size and sales cycle. For enterprise contracts above Rs 25,00,000 in ACV, a CAC of Rs 50,000 to Rs 2,00,000 is not unusual and remains profitable given the deal economics. For B2C e-commerce, a first-purchase CAC of Rs 300 to Rs 800 is typical for consumer goods, with subscription products warranting higher investment against lifetime value."),

  stats(
    ["Rs 3K-15K", "B2B SaaS qualified lead CAC"],
    ["Rs 300-800", "B2C e-commerce first-purchase CAC"],
    ["Rs 500-2,000", "EdTech paid course CAC"],
    ["Rs 1,500-6,000", "Financial services lead CAC"]
  ),

  h3("ROAS Expectations by Channel"),

  p("ROAS expectations must account for the role each channel plays in the funnel. Google Search campaigns targeting high-intent keywords should be held to a higher ROAS target, typically 5 to 10 times, because they capture buyers who are ready to convert. YouTube and Meta awareness campaigns should be held to lower ROAS targets, typically 2 to 4 times, because they build the pipeline that search later harvests."),

  p("Blended ROAS across all channels is the most honest performance metric. A brand achieving 3 times blended ROAS, meaning Rs 3 of revenue for every Rs 1 of ad spend, is performing at the Indian industry average. A brand achieving 5 times blended ROAS is in the top quartile. Blended ROAS above 7 times indicates exceptional product-market fit, strong creative, and precise targeting."),

  p_b([{t:"Channel ROAS targets should be set at different levels. ",b:true},{t:"Branded search might target 15 to 20 times ROAS because the buyer was already intending to convert. Non-branded search targets 5 to 8 times. Retargeting campaigns target 6 to 10 times. Prospecting campaigns on Meta or YouTube target 2 to 4 times because they serve audiences who have not yet expressed purchase intent. Averaging across all of these without distinction distorts campaign management decisions.",b:false}]),

  h3("Conversion Rate Benchmarks"),

  p("Landing page conversion rates in India vary widely by industry and offer type. A free demo or free trial offer for B2B software typically converts at 3 to 7 percent of clicks. A contact form for professional services converts at 1 to 4 percent. An e-commerce product page converts at 1.5 to 4 percent depending on price point and trust signals. These are benchmarks for well-optimised pages; a generic, slow-loading landing page might convert at 0.3 to 0.8 percent."),

  callout("warning", "Do Not Use Global Benchmarks for Indian Campaigns", "A Google benchmark report showing a 3.7 percent average landing page conversion rate is based predominantly on US and European data. Indian users have different expectations, different trust signals, and different device environments. An Indian e-commerce page that converts at 2 percent may be performing excellently for its market, while a page converting at 3.5 percent may be failing by its own potential. Always benchmark against Indian industry data, and ideally against your own historical performance."),

  p_link("For a deeper look at how search advertising works in the Indian B2B context, including the specific campaign mistakes that cost Indian companies the most money, see our guide on ", "Google Ads mistakes that derail B2B campaigns", "/insights/search-engine-marketing-b2b-google-ads-mistakes", "."),

  pq("The Indian market rewards advertisers who invest time learning its specific rhythms, signals, and buyer behaviours. Global playbooks are a starting point, never the final answer."),

  // ── SECTION 9: SOURCES ────────────────────────────────────────────────────
  h2("Sources and Data"),

  p("1. Dentsu India Digital Advertising Report 2025-26: India digital ad market projections, CAGR analysis, and channel mix data."),
  p("2. Google India Year in Search 2025: Consumer behaviour patterns, mobile traffic peaks, and search intent analysis for Indian markets."),
  p("3. Meta India Business Report Q4 2025: Indian Facebook and Instagram user base data, CPM benchmarks, and Click-to-WhatsApp conversion rates."),
  p("4. LinkedIn Marketing Solutions India Benchmark Report 2026: B2B CPC benchmarks, decision-maker audience data, and industry ROAS comparisons."),
  p("5. NASSCOM Digital Marketing Maturity Survey 2025: Attribution infrastructure adoption rates, CMO survey data on spend-to-revenue connectivity, and in-house versus agency performance comparisons."),
  p("6. Razorpay Payment Insights Report 2025: UPI transaction volumes, mobile payment adoption by city tier, and conversion rate data for UPI-optimised checkout flows in Indian e-commerce."),

  p("All benchmarks in this article reflect mid-market Indian advertisers spending between Rs 50,000 and Rs 25,00,000 per month on digital advertising. Enterprise advertisers with budgets above Rs 1 crore per month typically achieve different cost and ROAS benchmarks due to audience scale advantages, negotiated platform rates, and more mature attribution infrastructure."),

];

await client.patch("insight-wp-989299").set({
  title: "From Spend to Scale: How Performance Marketing Agencies Drive Measurable Growth for Indian Brands",
  seoTitle: "Performance Marketing Agencies India 2026: From Spend to Scale",
  excerpt: "India's digital advertising market will exceed Rs 55,000 crore in 2026. Yet most Indian brands cannot tell you what their last campaign generated in revenue. Performance marketing is not a channel. It is a management philosophy that ties every rupee to a measurable outcome.",
  categories: ["digital-marketing","industry-insights"],
  tags: ["performance marketing India","performance marketing agency India","digital advertising India","performance marketing ROI","Google Ads India","Meta Ads India"],
  body,
}).commit();
console.log("Published! Blocks:", body.length);
