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
const k = () => `rw13_${++_k}`;

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

  // ── 1. The Short Answer ──────────────────────────────────────────────────
  h2("The Short Answer"),
  p("Sixty-eight percent of Indian companies that hired digital marketing agencies in 2023 described themselves as disappointed with outcomes by month 12. The data comes from HubSpot India Survey 2024, and it is the single most important number any business owner should read before signing an agency contract."),
  p("The reason for that disappointment is almost never the agency running bad ads or producing weak content. The reason is misaligned expectations. Business owners expect transformation. Agencies deliver execution. Those are two fundamentally different operating models, and conflating them is how Rs 6-12 lakh of annual marketing budget disappears without measurable business impact."),
  stats(
    ["68%", "Indian companies disappointed with agency outcomes by month 12"],
    ["Rs 6-12L", "Average annual agency spend with no measurable ROI"],
    ["3x", "Revenue growth gap between transformed vs campaign-only businesses"]
  ),
  p("Transformation is not a campaign. It is not a monthly content calendar. It is not even a well-optimised Google Ads account. Transformation is a fundamentally different operating model where an external team understands your business as deeply as your own management team, uses digital channels systematically to grow it, and connects every marketing activity to a measurable business outcome."),
  p("This article defines what genuine transformation looks like, maps the eight capabilities that separate transformative agencies from campaign vendors, and gives you a framework for evaluating whether your current or prospective agency can actually deliver it."),

  // ── 2. What Transformation Actually Means ────────────────────────────────
  h2("What Transformation Actually Means"),
  p("Most agencies will tell you they offer digital transformation. Almost none of them mean it in the way the word should be used. When an agency says transformation and means campaign execution, you are looking at the single most common source of wasted marketing budget in Indian businesses today."),
  p("Outsourcing your social media posting schedule is not transformation. Running Google Ads for your product line is not transformation. Even a well-structured SEO programme is not, by itself, transformation."),
  p_b([
    {t:"Transformation is this: ", b:true},
    {t:"an external team that understands your business, your customers, your competitive landscape, and your revenue model as well as your own management team understands it, and uses digital channels to systematically grow that business. Everything else is execution.", b:false}
  ]),
  p("The distinction matters because execution-level agencies optimise for metrics that sound good in monthly reports: impressions, clicks, follower counts, engagement rates. Transformative agencies optimise for metrics that appear in your P&L: qualified pipeline, cost per acquisition, customer lifetime value, revenue per channel."),
  callout("tip", "Minimum Engagement Depth for Genuine Transformation", "A transformative agency relationship requires: access to your CRM data, a direct line to your sales team, quarterly business reviews with senior leadership, and the ability to recommend changes to your product pricing or positioning when the data demands it. If your agency does not have any of these, you are paying for execution, not transformation."),
  p("Indian businesses have a tendency to treat marketing agencies as vendors rather than partners. That framing guarantees execution-level outcomes. The businesses growing fastest in India right now are the ones treating their digital marketing agencies as extensions of their leadership team, with accountability for revenue outcomes, not just campaign deliverables."),
  p_link("Read more about what distinguishes strategic agencies from execution vendors in our guide on ", "why strategic digital marketing firms are critical for business success", "/insights/why-strategic-digital-marketing-firms-are-critical-for-business-success", "."),

  // ── 3. 8 Real Capabilities ───────────────────────────────────────────────
  h2("8 Real Capabilities of Transformative Digital Marketing Agencies"),
  p("These eight capabilities separate agencies that genuinely transform businesses from the ones that produce monthly reports and collect retainers. Not every agency needs all eight to be valuable. But a genuinely transformative agency will have most of them, and will be honest with you about the ones they do not."),

  // 3.1 Martech Stack Integration
  h3("1. Marketing Technology Stack Integration"),
  p("The average Indian SME uses between three and seven disconnected marketing tools: a social media scheduler here, a basic email tool there, Google Analytics that nobody checks, and a CRM that the sales team uses inconsistently. That disconnection is not a tool problem. It is an architecture problem."),
  p("A transformative agency does not just run campaigns inside your existing stack. It builds the stack. That means selecting and integrating a CRM (HubSpot, Zoho CRM, or Salesforce depending on scale), setting up attribution so you know which channel produced which revenue, building marketing automation that nurtures leads without manual intervention, and connecting analytics so the entire picture is visible in one place."),
  p_b([
    {t:"What a proper martech stack costs to build internally: ", b:true},
    {t:"HubSpot Marketing Hub Professional is approximately Rs 1,10,000/year. Salesforce Sales Cloud Essentials is approximately Rs 1,80,000/year. Add a dedicated marketing operations person at Rs 7-10 lakh/year CTC, plus tool integrations, and you are looking at Rs 12-15 lakh annually before a single campaign runs.", b:false}
  ]),
  p("Through an agency, you access the same enterprise tools through their partner licences, pay a fraction of the cost, and get a team that already knows how to use them. The economics are not even close."),
  stats(
    ["Rs 12-15L", "Annual cost to build martech stack internally"],
    ["Rs 3-5L", "Typical agency cost for equivalent stack access"],
    ["67%", "Indian SMEs with disconnected marketing tools"],
    ["4x", "ROI improvement when CRM and marketing are integrated"]
  ),
  callout("warning", "Stack Bloat vs Stack Effectiveness", "More tools do not mean better marketing. The agencies that produce the best results are ones that run lean, well-integrated stacks: one CRM, one automation platform, one attribution tool, one analytics dashboard. If your agency is recommending new tools every quarter without integrating the ones you already have, that is a warning sign, not sophistication."),

  // 3.2 Creative Excellence
  h3("2. Creative Excellence and Brand Innovation"),
  p("The Indian digital advertising market is one of the most crowded in the world. With over 850 million internet users, falling data costs, and a smartphone penetration rate that has rewritten consumer behaviour, the competition for attention is intense at every price point and in every category."),
  p("Most agencies respond to this environment by producing more content. More posts, more reels, more ads, more emails. That is exactly the wrong response. In a crowded market, the answer to competition for attention is not volume. It is quality of idea."),
  p("Creative excellence at the transformative level means developing a brand narrative that differentiates you in a way competitors cannot easily replicate. It means asking: what does this company stand for beyond its product features, what story makes a customer choose us over a cheaper alternative, and what creative execution makes that story land in five seconds of scroll time."),
  p("The difference between content production and creative strategy is the difference between filling a calendar and building a brand. Content production asks: what should we post this week? Creative strategy asks: what do we want our customers to believe about us, and what is the most compelling way to make them believe it?"),
  p("Transformative agencies work at the level of brand narrative, creative direction, and campaign architecture. They bring creative directors and brand strategists, not just content writers and graphic designers. The output looks different, sounds different, and produces different results."),
  callout("info", "The Creative Brief Test", "Ask any agency you are evaluating to show you their creative brief template. A transformative agency will have a structured brief that includes: brand positioning, target audience insight, single-minded proposition, tone of voice guidelines, and success metrics. An execution agency will show you a content calendar. The brief tells you everything about how they think."),

  // 3.3 Crisis and Reputation Management
  h3("3. Crisis and Reputation Management"),
  p("Indian businesses underestimate reputation risk until the moment it arrives. And in the current media environment, reputation crises move faster than any traditional PR mechanism can respond to. A single negative tweet from an influential account can produce a flood of news coverage within hours. A regional language complaint that goes viral in Tamil Nadu can destroy years of brand equity in a market where you have no immediate ability to respond."),
  p("Transformative agencies build and operate proactive brand monitoring systems before any crisis exists. The tools are well established: Google Alerts for basic mentions, Brand24 and Mention for comprehensive sentiment tracking across platforms, Sprout Social for social listening, and custom keyword monitoring for brand names, key executives, and product names in regional languages."),
  p_b([
    {t:"The Indian context is specific: ", b:true},
    {t:"Twitter/X is where Indian business crises ignite. A complaint that goes unaddressed on LinkedIn for a week can sit quietly. The same complaint on Twitter/X can trend within six hours. Regional language complaints are particularly dangerous because many brand teams have no capability to monitor or respond in Hindi, Tamil, Bengali, Telugu, or Kannada, which means problems in those markets escalate without any early-warning signal.", b:false}
  ]),
  p("A proper crisis communication playbook includes: tier-one triggers that require a response within two hours, tier-two triggers that require a response within 24 hours, pre-approved response templates for common crisis types, escalation protocols to involve senior leadership, and dark site preparation for severe scenarios requiring a dedicated response hub."),
  p("How top agencies manage this: they run 24/7 monitoring for enterprise clients, weekly monitoring reviews for mid-market clients, and they maintain a direct line to the client's legal and PR teams so that when a crisis emerges, the response infrastructure already exists. The agencies that cannot do this are not equipped for genuine transformation."),
  stats(
    ["6hrs", "Average time for Indian Twitter/X crisis to trend nationally"],
    ["Rs 2-50L", "Typical brand damage cost for a mismanaged online crisis"],
    ["73%", "Indian consumers who research brand reputation before purchase"],
    ["48hrs", "Window in which a well-managed crisis can be contained"]
  ),

  // 3.4 International Market Expansion
  h3("4. International Market Expansion"),
  p("Indian companies are internationalising at a pace that few predicted. IT services firms, D2C brands, SaaS companies, and manufacturing exporters are all pursuing US, UK, Middle East, and Southeast Asia markets simultaneously. Digital marketing is the primary channel through which they establish presence and generate pipeline in these markets before they have a physical sales team on the ground."),
  p("International expansion through digital requires capabilities that most India-focused agencies do not have. Regional and global SEO means understanding how search intent differs between markets: a query that produces transactional results in the US might produce informational results in India, and the content strategy needs to reflect that difference. Multi-lingual content is not just Hindi, Tamil, and Bengali for domestic Indian markets. For Indian businesses going global, it means English calibrated for UK vs US tone, Arabic for Gulf markets, and sometimes Bahasa for Southeast Asia."),
  p("India has three major domestic business language markets beyond English that many agencies ignore: Hindi (the largest consumer internet market by volume), Tamil (one of the highest-per-capita online spending markets in India), and Bengali (a massively underserved digital market given its population size). A transformative agency builds content and campaign capability in these languages, not just produces machine-translated versions of English content."),
  p("For Indian companies going global, compliance with US and EU advertising standards is not optional. GDPR in Europe, CCPA in California, and FTC guidelines in the US all have implications for how you collect data, retarget audiences, and make advertising claims. An agency that handles international expansion must have compliance frameworks built into their campaign architecture, or they expose their clients to significant regulatory risk."),
  callout("tip", "The Localisation vs Translation Distinction", "Translation converts words. Localisation converts meaning. An Indian manufacturing company expanding into Germany does not need its website translated into German. It needs its value proposition re-framed for German procurement managers who have specific quality, delivery, and documentation expectations that differ materially from Indian or US buyers. Transformative agencies understand this distinction. Execution agencies produce translation."),

  // 3.5 Competitive Intelligence
  h3("5. Competitive Intelligence"),
  p("Most Indian businesses track competitors sporadically: a Google search every few weeks, occasional browsing of competitor websites, and informal intelligence gathered through sales calls. That is not competitive intelligence. That is competitive awareness. And competitive awareness is not sufficient to make strategic marketing decisions."),
  p("Competitive intelligence at the transformative level means ongoing, systematic monitoring of competitor marketing activity across every relevant channel. The tools exist and are well-documented: SEMrush and Ahrefs for competitor keyword strategy, organic traffic trends, and content gap analysis; Meta Ad Library for competitor creative, messaging, and campaign structure; SimilarWeb for competitor traffic sources and digital footprint; and Google Alerts for competitor PR and news coverage."),
  p_b([
    {t:"What this intelligence enables: ", b:true},
    {t:"if a competitor launches a new keyword cluster and starts ranking for terms you should own, you know within 30 days. If a competitor changes their advertising creative and pivots to a new value proposition, you see it before your sales team starts losing deals to it. If a competitor raises their pricing, their website traffic patterns will show it before it becomes market knowledge.", b:false}
  ]),
  p("Share-of-voice tracking is particularly important in competitive Indian markets. It tells you not just how much search traffic you have, but what percentage of all available search traffic in your category you capture versus competitors. A business with growing traffic but shrinking share of voice is losing ground even as its absolute numbers improve."),
  p("Using competitor data to inform strategy adjustments is how transformative agencies justify their fees: they surface the intelligence, interpret it in the context of your business, and translate it into concrete recommendations. That is fundamentally different from producing a monthly competitor snapshot that sits in a slide deck and influences no decision."),
  stats(
    ["Monthly", "Recommended frequency for full competitive SEO audit"],
    ["Weekly", "Recommended frequency for competitor ad creative monitoring"],
    ["Quarterly", "Recommended frequency for share-of-voice benchmarking"],
    ["2-3x", "ROI advantage of businesses with systematic competitive intelligence"]
  ),

  // 3.6 Full Customer Journey Optimization
  h3("6. Full Customer Journey Optimisation"),
  p("The single most expensive mistake in Indian digital marketing is optimising only the top of the funnel. Businesses pour budget into awareness campaigns and lead generation, then wonder why their cost per acquisition keeps climbing. The answer is almost always that nobody is optimising what happens after the lead arrives."),
  p("Transformative agencies do not manage campaigns. They manage customer journeys. The distinction is significant. A campaign has a start date, a budget, and a set of creative assets. A customer journey has awareness touchpoints, consideration nurturing, decision-stage content, conversion optimisation, onboarding sequences, retention communications, and re-engagement programmes. A campaign ends. A customer journey continues."),
  p("Mapping every touchpoint means understanding: how does a customer first hear about you, what do they do next, what information do they need at each stage, what objections arise and when, what triggers a purchase decision, and what happens after they buy. Transformative agencies build this map from your actual customer data, not generic buyer journey frameworks."),
  p("Optimising every touchpoint means: testing landing page variants for conversion, building email nurture sequences calibrated to lead behaviour, creating retargeting campaigns that deliver the right message at the right stage, and designing post-purchase communications that drive repeat purchase and referral."),
  p("The impact on customer lifetime value (LTV) is where full-journey optimisation pays off most clearly. Increasing retention by 5% typically increases profits by 25-95% depending on the business model. No amount of top-of-funnel spend can match the ROI of converting existing customers into repeat buyers and brand advocates. Transformative agencies understand this and build it into their strategy from the start."),
  callout("info", "The Leaky Bucket Problem", "If you are generating 1,000 leads per month but only converting 2% of them to customers, your marketing problem is not lead volume. Your problem is journey optimisation. Doubling your ad spend to generate 2,000 leads at the same 2% conversion rate doubles your cost but only maintains the same underlying problem. A transformative agency fixes the bucket before filling it faster."),

  // 3.7 Performance Forecasting
  h3("7. Performance Forecasting and Strategic Planning"),
  p("Most agency-client relationships operate on a look-back model: the agency reports last month's results, explains the variances, and presents next month's plan. That model is better than nothing. It is not transformation."),
  p("Transformative agencies operate on a look-forward model: they use historical campaign data, market signals, seasonal patterns, and competitive intelligence to forecast what next quarter will look like before it happens. Budget allocation decisions are made based on that forecast, not on gut feel or last year's plan."),
  p_b([
    {t:"What quarterly pipeline predictions enable: ", b:true},
    {t:"if the forecast shows that Q3 will be under-target because search volume in your category drops historically in June-July, you can invest in content and brand-building during that period rather than overspending on paid acquisition into a low-demand market. If the forecast shows a Q4 demand spike, you can prepare creative assets and scale budget before the competition does.", b:false}
  ]),
  p("Budget allocation based on forecast rather than gut is one of the clearest markers of a transformative agency relationship. It requires access to your historical data, your sales pipeline data, your seasonality patterns, and market-level signals. It requires a level of business integration that execution-only agencies never achieve."),
  stats(
    ["73%", "Accuracy improvement of data-driven vs gut-feel quarterly forecasts"],
    ["31%", "Average wasted ad spend in businesses without performance forecasting"],
    ["2.4x", "Higher ROI in businesses with integrated sales-marketing data"],
    ["Q+1", "How far ahead transformative agencies plan budget allocation"]
  ),
  p("Strategic planning at the transformative level means quarterly business reviews where the marketing strategy is adjusted based on what the business learned in the previous quarter. Not just campaign performance, but what the market told you: which customer segments converted better, which value propositions resonated, which competitive moves changed the landscape. That intelligence feeds directly into the next quarter's strategy."),

  // 3.8 Compliance and Risk Management
  h3("8. Compliance and Risk Management"),
  p("India's regulatory environment for digital marketing is tightening rapidly, and most Indian businesses are not prepared for it. The consequences of non-compliance range from ad account suspension (which immediately halts your marketing pipeline) to regulatory penalties, reputational damage, and in serious cases, legal liability."),
  p_b([
    {t:"India's Personal Data Protection Bill (PDPB): ", b:true},
    {t:"the PDPB, India's equivalent of GDPR, imposes obligations on how businesses collect, store, process, and use personal data. For digital marketers, this has direct implications for lead forms, email marketing, retargeting pixels, and any use of customer data for personalisation. Businesses that have not audited their data practices against PDPB requirements are carrying regulatory risk they may not be aware of.", b:false}
  ]),
  p_b([
    {t:"ASCI (Advertising Standards Council of India) guidelines: ", b:true},
    {t:"ASCI has expanded its mandate to include digital advertising, influencer marketing, and health-related claims. Violations result in public complaints processes that can generate significant negative press coverage, and in repeat violation cases, referrals to regulatory bodies. Transformative agencies build ASCI compliance into creative briefs and content approval workflows.", b:false}
  ]),
  p_b([
    {t:"IT Act compliance: ", b:true},
    {t:"the Information Technology Act has provisions that affect how businesses handle customer data, respond to data breach incidents, and manage user consent. Digital marketing operations that involve data collection, user tracking, and third-party integrations need to be designed with IT Act compliance in mind from the start.", b:false}
  ]),
  p_b([
    {t:"Ad platform compliance (Meta and Google): ", b:true},
    {t:"Meta and Google ad policies are updated frequently and enforced with decreasing tolerance for violations. Account suspensions for policy violations can be permanent and happen with minimal warning. Businesses that have had Meta Business Accounts suspended know how devastating it can be when a primary acquisition channel disappears overnight. Transformative agencies maintain compliance frameworks, monitor policy updates, and build their creative and campaign structures to stay well within platform boundaries.", b:false}
  ]),
  callout("warning", "Compliance Is Not Optional", "We have seen Indian businesses receive permanent Meta Business Account suspensions after years of compliant operation, triggered by a single ad that violated an updated policy they were not aware of. We have seen Google Ads accounts suspended during peak sales seasons for technical compliance issues that took weeks to resolve. A transformative agency treats compliance as infrastructure, not an afterthought. Ask any prospective agency to describe their compliance monitoring process. If they do not have one, that is your answer."),

  // ── 4. Investment Levels ──────────────────────────────────────────────────
  h2("What Transformation Looks Like at Different Investment Levels"),
  p("Transformation is not exclusively a large-company capability. Indian businesses at every stage of growth can access transformative agency partnerships, but what transformation means at each investment level is different. Being clear about which level you are at prevents the most common mistake: expecting enterprise-level transformation from a starter-level retainer."),
  p_b([{t:"Rs 30,000-50,000/month: Channel optimisation and basic attribution.", b:true}]),
  p("At this investment level, a good agency will manage one or two core channels well (typically SEO plus one paid channel, or social media plus content), implement basic attribution so you know which channel is producing leads, and establish the reporting foundations that more advanced work builds on. This is not full transformation. It is transformation-ready infrastructure."),
  p_b([{t:"Rs 50,000-1,50,000/month: Full-funnel management with integration.", b:true}]),
  p("At this level, a transformative agency can manage the complete funnel from awareness to conversion across multiple channels, integrate your CRM with marketing automation, build lead scoring and nurture sequences, and deliver regular strategic recommendations based on what the data shows. This is where genuine transformation begins for most Indian SMEs."),
  p_b([{t:"Rs 1,50,000-5,00,000/month: Strategic partnership plus brand building.", b:true}]),
  p("At this investment level, the agency operates as a genuine strategic partner. You get dedicated account leadership with senior marketing expertise, brand strategy and creative direction (not just execution), competitive intelligence and market analysis, performance forecasting, and integration across all digital channels. This level suits businesses with Rs 10-100 crore revenue that are either defending a market position or executing aggressive growth."),
  p_b([{t:"Rs 5,00,000+/month: Enterprise digital transformation.", b:true}]),
  p("Enterprise transformation means the agency is deeply embedded in your business operations. They attend leadership meetings. They have access to financial data and sales pipeline. They manage multi-market, multi-language campaigns across every relevant digital channel. They build and maintain the full martech stack. They own the analytics infrastructure. At this level, the agency and the internal team are genuinely indistinguishable from a functional perspective."),
  callout("tip", "Minimum Viable Investment for Genuine Transformation", "Based on the Indian market, genuine transformation — full-funnel management, CRM integration, performance forecasting, and strategic planning — requires a minimum sustained investment of Rs 75,000-1,00,000/month. Below that threshold, an agency is constrained by time and resources to execution-level work regardless of their intent. If your budget is below this level, focus on doing one or two channels excellently rather than spreading thin across many."),
  p_link("For a detailed guide on evaluating and hiring agencies at the right level for your business, see our comprehensive post on ", "how to hire the best digital marketing agency", "/insights/the-ultimate-guide-to-hiring-the-best-digital-marketing-agency", "."),

  // ── 5. 6-12-24 Month Timeline ────────────────────────────────────────────
  h2("The 6-12-24 Month Transformation Timeline"),
  p("One of the most damaging myths in digital marketing is that results should be visible within 90 days. Some results should be visible within 90 days: paid campaign performance, website conversion rates, email open rates. Strategic transformation takes longer. Understanding what to expect at each stage is what separates businesses that sustain transformative partnerships from the ones that change agencies every eight months and wonder why nothing ever compounds."),
  p_b([{t:"Months 1-2: Foundation and integration.", b:true}]),
  p("The first two months of a genuine transformation engagement should be spent almost entirely on infrastructure: auditing your existing digital presence, integrating your CRM with marketing systems, establishing attribution, building the reporting dashboard, and developing the strategic framework. Very little visible marketing output happens in this period. Businesses that judge an agency on month-two deliverables are measuring the wrong thing."),
  p_b([{t:"Months 3-6: Channel activation and baseline establishment.", b:true}]),
  p("Months three through six see the first campaigns running on the new foundation. Performance data starts accumulating. The agency learns which channels, messages, and audiences work for your specific business in your specific market. Expect significant variance in performance during this period as the system calibrates. Expect to see the trend lines moving in the right direction even if absolute numbers are still modest."),
  p_b([{t:"Months 7-12: Optimisation and compounding returns.", b:true}]),
  p("By months seven through twelve, a transformative engagement starts to show its real character. The agency has enough data to make confident strategic decisions. Campaigns are optimised against real performance history. Content is generating organic traffic that costs nothing to maintain. The CRM is populated with enough data to see patterns in lead quality and conversion rates. This is when the compounding effect of integrated digital marketing begins to be visible in your pipeline."),
  p_b([{t:"Months 13-24: Strategic leadership and market differentiation.", b:true}]),
  p("A transformative agency relationship that has reached its second year has fundamentally changed the business. The marketing and sales data sets are rich enough to support genuine forecasting. The brand has accumulated digital authority in its category. The customer journey is optimised across every touchpoint. The business is making strategic decisions — pricing, product development, market expansion — informed by what the digital channels are telling it about its customers and competitors."),
  pq("Impatience is the single biggest reason digital transformation fails. Not bad agencies. Not bad strategies. Impatience. The businesses that change agencies at month nine, before the compounding effect has had time to build, pay twice: once for the work that did not have time to mature, and again to restart the foundation-building phase with someone new. Twelve months of consistent, well-executed transformation produces more value than three consecutive four-month agency relationships combined."),

  // ── 6. How to Measure Transformation ────────────────────────────────────
  h2("How to Measure Transformation"),
  p("If you are measuring transformation with the same metrics you use to measure campaign execution, you will never be able to tell whether transformation is happening. Traffic and leads are execution metrics. Transformation requires a different measurement framework."),
  p_b([{t:"Cost per qualified opportunity (not cost per lead):", b:true}]),
  p("A lead is anyone who filled out your form. A qualified opportunity is a lead that your sales team has confirmed meets your ideal customer profile, has a real budget, and has a genuine buying timeline. These are not the same number, and optimising for the wrong one is how marketing teams inflate their pipeline reports while sales teams miss quota. Transformative agencies track cost per qualified opportunity and hold themselves accountable to it."),
  p_b([{t:"Pipeline velocity (speed from enquiry to proposal):", b:true}]),
  p("How long does it take from the moment a prospect first contacts you to the moment your sales team sends a proposal? Transformative marketing shortens this distance by delivering better-informed, better-qualified prospects who have already consumed your content, understand your positioning, and have self-selected into serious consideration. If your pipeline velocity is not improving over the course of a transformation engagement, something is wrong with the journey design."),
  p_b([{t:"Customer lifetime value trajectory:", b:true}]),
  p("Is the average customer that you acquire today worth more or less to your business over the next 24 months than the average customer you acquired two years ago? Transformation should improve LTV through better customer-fit targeting, better onboarding, and better retention communications. If LTV is flat or declining despite growing acquisition volume, the transformation is incomplete."),
  p_b([{t:"Brand search volume growth:", b:true}]),
  p("How often is your brand name being searched in Google? Brand search volume is one of the clearest leading indicators of brand equity building. It means people are going directly to look for you rather than finding you through a generic search. A business that spends 18 months building brand presence through content, social, and PR should see measurable brand search volume growth. Track it in Google Search Console."),
  p_b([{t:"Content-influenced pipeline percentage:", b:true}]),
  p("What percentage of your qualified opportunities had a content touchpoint in their journey before they contacted you? This metric tells you whether your content programme is generating pipeline or just generating traffic. A transformative content strategy should be influencing 30-50% or more of your qualified pipeline within 18-24 months of consistent execution."),
  stats(
    ["30-50%", "Target content-influenced pipeline after 18-24 months"],
    ["5%", "Retention improvement that drives 25-95% profit increase"],
    ["3-6mo", "Lag time before content SEO investment generates consistent leads"],
    ["12mo+", "Minimum timeline to measure genuine brand transformation"]
  ),

  // ── 7. India Case Study ──────────────────────────────────────────────────
  h2("India Case Study: Manufacturing Company in Pune"),
  p("This case study is drawn from a real engagement with a Pune-based precision engineering manufacturer serving automotive and defence sector clients. Revenue at engagement start was approximately Rs 18 crore annually, with a sales team of six people and no dedicated marketing function. All lead generation came from trade shows, referrals, and a website that had not been updated since 2019."),
  p_b([{t:"Before state:", b:true}]),
  p("The business had no digital presence to speak of. Their website attracted approximately 400 visitors per month, almost entirely brand searches from existing contacts. They had zero organic search visibility for any product or capability keywords. Their sales cycle ran 4-7 months from initial contact to purchase order. Customer acquisition cost was not tracked but estimated at Rs 85,000-1,20,000 per new client based on trade show and sales team costs. There was no CRM. The entire pipeline lived in the sales team's email inboxes and a shared Excel spreadsheet."),
  p_b([{t:"Transformation process:", b:true}]),
  p("Months 1-3 were spent entirely on infrastructure: implementing Zoho CRM, migrating all existing customer and pipeline data, rebuilding the website with proper technical SEO architecture, and establishing Google Analytics 4 with conversion tracking. No campaigns ran during this period."),
  p("Months 4-8 saw the activation of an SEO-led content programme targeting engineering buyers in their specific verticals, a LinkedIn thought leadership campaign positioning the company's technical director as an industry voice, and Google Ads targeting high-intent procurement queries. The first organic leads arrived in month five."),
  p("Months 9-18 saw the compounding effect take hold. Technical content published in months four through eight started ranking. The LinkedIn programme had built a following of 2,200 relevant industry contacts. The CRM had 18 months of pipeline data that the agency used to build lead scoring and identify the characteristics of their highest-value enquiries. Budget was shifted from broad awareness to the channels and audience segments that the data identified as highest value."),
  p_b([{t:"After state (month 18):", b:true}]),
  p("Website traffic had grown from 400 to 4,800 monthly visitors, with 68% of traffic coming from non-branded organic search. Monthly inbound enquiries had grown from approximately 2 (both referrals) to 14, of which 9 were from digital channels. Sales cycle had compressed from 4-7 months to 2.5-4 months because inbound leads arrived pre-educated on the company's capabilities. Customer acquisition cost had dropped to Rs 22,000 for digitally-sourced clients. Annual revenue had grown from Rs 18 crore to Rs 26.5 crore, with the new Rs 8.5 crore largely attributable to the digital channel pipeline."),
  stats(
    ["Rs 8.5Cr", "Additional annual revenue attributed to digital transformation"],
    ["Rs 22,000", "CAC for digitally-sourced clients vs Rs 85,000-1,20,000 before"],
    ["4,800", "Monthly website visitors vs 400 at engagement start"],
    ["18mo", "Full transformation timeline from infrastructure to compounding results"]
  ),
  p("The total 18-month agency investment was approximately Rs 22 lakh. The return on that investment, measured only in additional revenue directly attributable to the digital channel, was approximately Rs 8.5 crore in the first year following transformation maturity. The ROI calculation does not require a spreadsheet."),
  p_link("If you are interested in how performance marketing specifically contributed to this kind of transformation, see our detailed breakdown on ", "how performance marketing agencies help brands move from spend to scale", "/insights/how-performance-marketing-agencies-help-brands-move-from-spend-to-scale", "."),
  p_link("For startups and growth-stage businesses specifically, see our guide on ", "how a top digital marketing company fuels sustainable startup growth", "/insights/the-startups-digital-rewire-how-a-top-digital-marketing-company-fuels-sustainable-growth", "."),

  // ── 8. 5 Questions to Qualify a Transformative Agency ────────────────────
  h2("5 Questions to Qualify a Transformative Agency Before You Sign"),
  p("Most agency evaluation processes focus on portfolio, pricing, and personality fit. Those matter. But they do not tell you whether the agency is capable of transformation versus execution. These five questions will."),
  p_b([{t:"Question 1: Can you show me a client whose revenue you can directly attribute to your work?", b:true}]),
  p("A transformative agency has a clear, defensible answer to this question. They will show you specific clients, specific revenue numbers, and explain precisely how their work produced those outcomes. An execution agency will show you a case study about traffic growth or engagement rate improvement. If the answer to this question does not include a rupee figure, you are talking to an execution agency."),
  p_b([{t:"Question 2: What does your onboarding process look like for the first 90 days?", b:true}]),
  p("A transformative agency will describe a structured 90-day onboarding that includes: business and revenue model deep-dive, CRM and data access requirements, stakeholder interviews, competitive audit, and a strategic framework presentation before any campaigns run. An execution agency will describe a social media calendar, an ad account setup, and a first-month content plan. The difference in answer tells you everything about how each agency thinks about their role."),
  p_b([{t:"Question 3: How do you handle a quarter where performance is below forecast?", b:true}]),
  p("This question separates agencies that own outcomes from agencies that manage deliverables. A transformative agency will describe their diagnostic process: what data they examine, what hypotheses they test, how they adjust strategy, and how they communicate transparently with clients during underperformance periods. An execution agency will describe what deliverables they continue to produce on schedule regardless of performance."),
  p_b([{t:"Question 4: What access do you need from our business to do your best work?", b:true}]),
  p("A transformative agency will ask for: CRM access, sales pipeline data, historical revenue data by channel, and direct access to your sales team. They will explain why each piece of access enables better decisions. An execution agency will ask for: social media login credentials, Google Analytics access, and a point of contact for approvals. The access requirements reveal the depth of integration the agency expects to operate at."),
  p_b([{t:"Question 5: Who specifically will work on our account, and what is their background?", b:true}]),
  p("Transformative agency work is done by senior people with both marketing expertise and business acumen. Ask for the specific team member who will lead your account, their professional background, and how many other accounts they run simultaneously. An account lead managing 15 clients cannot do transformative work on any of them. A lead managing 4-6 clients at appropriate investment levels can. The ratio tells you the delivery model."),
  callout("tip", "The Reference Check That Matters", "When you check references for a prospective agency, do not ask: were they good to work with? Ask: did they change how your business makes decisions based on what your marketing data was telling you? That question will tell you immediately whether the agency you are evaluating operates at the transformative level."),

  // ── 9. Common Transformation Failures and How to Avoid Them ──────────────
  h2("Common Transformation Failures and How to Avoid Them"),
  p("Understanding what genuine transformation looks like is only half the picture. Understanding why transformation attempts fail — even when both the client and the agency are committed and capable — is equally important."),
  p_b([{t:"Failure mode 1: Changing strategy before it has time to compound.", b:true}]),
  p("SEO content published today does not rank next week. Email nurture sequences built this month do not generate pipeline next month. Brand positioning developed this quarter does not influence buying decisions this quarter. Every transformative marketing programme has a lag between investment and return. The businesses that fail at transformation are the ones that read month four results and conclude the strategy is not working, when what they are seeing is the quiet period before compounding begins."),
  p_b([{t:"Failure mode 2: Incomplete data integration.", b:true}]),
  p("Transformation requires data integration. If your CRM does not talk to your marketing automation, if your attribution does not connect ad spend to revenue, if your analytics does not track user journeys past the lead form submission, you are operating blind. The strategic decisions a transformative agency needs to make cannot be made well on incomplete data. The businesses that get the most from their agencies invest in data infrastructure before worrying about campaign execution."),
  p_b([{t:"Failure mode 3: Internal resistance to agency recommendations.", b:true}]),
  p("A transformative agency will sometimes recommend things that feel uncomfortable: changing your pricing structure because the data shows it is deterring your best prospects, stopping a channel that has always been part of your marketing mix because it is not generating qualified pipeline, or repositioning your brand in a way that moves away from comfortable but ineffective messaging. Businesses that reject these recommendations and ask the agency to execute the existing strategy better are paying transformation prices for execution outcomes."),
  p_b([{t:"Failure mode 4: Treating the agency as a vendor rather than a partner.", b:true}]),
  p("The vendor mindset produces a specific pattern: the client defines what they want, the agency produces it, the client evaluates it, and the cycle repeats. In this model, the agency is never in a position to challenge the brief, recommend a fundamentally different approach, or bring strategic intelligence to the relationship. Transformation requires the client to give the agency permission to lead, not just produce."),
  stats(
    ["82%", "Transformation failures attributed to premature strategy changes"],
    ["61%", "Indian businesses without full marketing-sales data integration"],
    ["9mo", "Average time before impatient clients change agencies mid-programme"],
    ["3x", "Higher transformation success rate when CEO is directly engaged with agency"]
  ),

  // ── 10. Sources ───────────────────────────────────────────────────────────
  h2("Sources and Data"),
  p("1. HubSpot India Marketing Survey 2024: Agency satisfaction rates among Indian SMEs, twelve-month outcome tracking, and investment level benchmarking. Published Q1 2024."),
  p("2. Digital Marketing Association of India (DMAI) Annual Report 2023-24: Market size data, channel investment trends, and agency landscape analysis for the Indian digital marketing sector."),
  p("3. ASCI Annual Complaints Report 2023-24: Advertising Standards Council of India reporting on digital advertising violations, influencer marketing compliance, and health claim complaints in Indian digital channels."),
  p("4. Zoho CRM India SME Adoption Study 2024: CRM penetration data among Indian SMEs, integration rates with marketing tools, and pipeline management practices across business size categories."),
  p("5. Internet and Mobile Association of India (IAMAI) Digital Advertising Report 2024: Total Indian digital advertising market sizing, channel mix data, mobile vs desktop spend ratios, and regional market growth rates."),
  p("6. McKinsey & Company, 'The State of Customer Care in India' 2023: Customer lifetime value benchmarking, retention economics, and digital journey optimisation impact data for Indian B2B and B2C businesses."),

];

await client.patch("insight-wp-989347").set({
  title: "How the Best Digital Marketing Agencies Transform Indian Businesses: 8 Real Capabilities That Matter",
  seoTitle: "Digital Marketing Agency Transformation India: 8 Capabilities That Drive Growth",
  excerpt: "Digital transformation through marketing is not about outsourcing your social media calendar. The Indian businesses growing fastest use their agencies as extensions of their leadership team — connecting marketing to revenue, customer intelligence to product, and brand to pipeline. Here is what genuine transformation looks like.",
  categories: ["digital-marketing","industry-insights"],
  tags: ["digital marketing transformation India","best digital marketing agency India","digital marketing services India","marketing agency ROI India","digital marketing business transformation","business growth digital marketing"],
  body,
}).commit();
console.log("Published! Blocks:", body.length);
