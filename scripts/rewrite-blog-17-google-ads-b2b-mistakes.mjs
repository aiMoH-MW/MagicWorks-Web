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
const k = () => `rw17_${++_k}`;

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

  // ── SECTION 1: THE BUDGET IS NOT THE PROBLEM ──────────────────────────────
  h2("The Budget Is Not the Problem. The Setup Is."),

  p("Indian B2B companies are collectively spending an estimated Rs 12,000 crore or more per year on Google Ads. That number has grown every year for the past decade, driven by increased digital adoption, aggressive agency pitches, and the genuine belief that paid search is the fastest path from obscurity to pipeline."),

  p("The belief is not wrong. Google Ads, when set up correctly, remains the most reliable mechanism for generating qualified B2B leads at predictable cost and scale. Nothing else in the digital marketing toolkit comes close for intent-based demand capture in a market like India, where buyers actively search for suppliers, vendors, and service providers before making any procurement decision."),

  p("But there is a gap that no one in the industry talks about loudly enough. The top 10 percent of Google Ads accounts in India achieve 5 to 8 times return on ad spend. The average account achieves 2 to 3 times. That gap is not explained by the size of the budget. It is not explained by industry vertical. It is not explained by competitive density in the market. It is explained by structural setup. By the decisions made in the first two weeks of an account, which then compound silently for months or years."),

  stats(
    ["Rs 12,000 crore+", "estimated Indian B2B Google Ads spend annually"],
    ["5-8x ROAS", "top 10% of Indian B2B accounts"],
    ["2-3x ROAS", "average Indian B2B account"],
    ["Rs 8,000 crore", "estimated annual wasted spend"]
  ),

  p("The companies achieving 5 to 8 times ROAS are not spending more. In many cases they are spending less. They have simply fixed the structural problems that cause the average account to bleed money on clicks that will never become customers. That structural gap is entirely fixable, and it does not require a larger budget to fix it. It requires a different approach."),

  pq("Google Ads does not fail. Accounts fail."),

  p("This post documents the seven most damaging structural mistakes found in Indian B2B Google Ads accounts, with specific before-and-after fixes and realistic benchmarks drawn from actual account data in the Indian market. Each mistake is distinct, but they compound. Fixing one produces measurable improvement. Fixing all seven produces transformation."),

  p_link("For a broader view of how paid advertising fits within a full performance marketing strategy, see our guide on how ", "performance marketing agencies help brands move from spend to scale", "/insights/how-performance-marketing-agencies-help-brands-move-from-spend-to-scale", "."),

  // ── SECTION 2: MISTAKE 1 ──────────────────────────────────────────────────
  h2("Mistake 1: Broad Match Without Guardrails"),

  h3("What It Looks Like"),

  p("Broad Match is Google's default keyword match type. When you add a keyword like industrial pump to a campaign without specifying a match type, Google will show your ad for any query it considers related. In practice, for an Indian B2B industrial supplier, that means your ad appears for queries like industrial pump repair DIY, cheap pump for aquarium, pump price in Hindi, pump wholesaler near me (where the searcher is a retailer not a manufacturer), and water pump for home use under Rs 2,000."),

  p("Every one of those clicks costs you full CPC. You are paying the same rate you would pay for a query like industrial pump supplier for pharma plant or bulk industrial pump order 500 units, which is the query from the buyer you actually want. Google's matching algorithm is optimised for Google's revenue, not your conversion rate. Broad Match without negative keywords and match type discipline is a mechanism for transferring your budget to Google in exchange for volume that does not convert."),

  p("The scale of this problem in Indian B2B accounts is significant. Audits of manufacturing sector accounts in Pune, Ahmedabad, and Chennai regularly reveal that 40 to 60 percent of actual search queries triggering ads have no B2B purchase intent. They are informational queries, consumer queries, job seekers, students, and researchers. All paying full industrial B2B CPC rates."),

  h3("The Fix"),

  p("The fix begins with a Search Terms report audit. Download the last 90 days of actual search queries that triggered your ads. Read through them. Categorise every query as high intent (active B2B buyer), medium intent (research stage), low intent (informational), or no intent (job seekers, students, DIY consumers). The distribution you find will be uncomfortable but clarifying."),

  p_b([
    {t: "Move core keywords to Phrase Match or Exact Match immediately.", b: true},
    {t: " Phrase Match allows you to maintain reasonable coverage while filtering out the most egregious mismatches. Exact Match gives you maximum precision for your highest-value, highest-intent terms. Reserve Broad Match only for deliberate discovery campaigns where you are specifically trying to identify new query patterns, with a separate, capped budget and aggressive negative keyword coverage from day one."}
  ]),

  p("The rule should be: Broad Match is a research tool, not a primary traffic driver. You run it with a small budget to discover new queries, then mine those discoveries to add high-intent queries to your Phrase and Exact campaigns and irrelevant queries to your negative keyword lists. It is never the default."),

  callout("tip", "Match Type Discipline in Practice", "In a mature B2B Google Ads account, the majority of spend should sit in Phrase Match and Exact Match campaigns. Broad Match should represent no more than 10-15% of total budget and should be treated as an ongoing discovery exercise, not a primary traffic source. Review the Search Terms report from your Broad Match campaigns weekly."),

  h3("Expected Impact"),

  p("Accounts that move from uncontrolled Broad Match to disciplined Phrase and Exact Match with proper negative keyword coverage consistently see 20 to 40 percent reduction in wasted spend within 30 days. That wasted spend does not disappear from the account. It is reallocated toward clicks that actually have purchase intent, effectively multiplying the productive output of the same budget."),

  stats(
    ["20-40%", "reduction in wasted spend within 30 days"],
    ["40-60%", "of B2B queries in unmanaged Broad Match have no purchase intent"],
    ["30 days", "typical time to see measurable improvement after match type fix"]
  ),

  p("The improvement is not a one-time reset. As you continue to refine match types and expand negative keyword lists, the account becomes progressively more efficient. Each week of proper management narrows the gap between clicks you pay for and buyers you actually want."),

  // ── SECTION 3: MISTAKE 2 ──────────────────────────────────────────────────
  h2("Mistake 2: No Negative Keyword Strategy"),

  h3("What It Looks Like"),

  p("Even accounts that use Phrase Match or Exact Match as their primary match types suffer from negative keyword neglect. The symptoms are the same: paying full industrial B2B CPC rates for traffic that has zero possibility of converting."),

  p("A concrete example from an industrial packaging supplier account in Pune: the campaign was generating clicks from queries like free industrial packaging samples, industrial packaging job vacancy in Mumbai, industrial packaging training course online, and industrial packaging machine repair service. None of these queries represent a buyer. The first is seeking free product. The second is seeking employment. The third is seeking education. The fourth is seeking maintenance service for equipment they already own."),

  p("The account had no negative keywords. Not even the obvious ones. No exclusions for free, job vacancy, jobs, recruitment, training, course, certificate, DIY, repair, secondhand, used, or salary. Every one of those queries triggered ads and generated clicks at full CPC."),

  h3("The Fix"),

  p("A proper negative keyword strategy is tiered across three levels, each serving a different function."),

  p_b([
    {t: "Account-level negatives", b: true},
    {t: " are applied universally across every campaign in the account. These are queries that should never trigger any of your ads under any circumstances. The list includes: jobs, job vacancy, recruitment, fresher, salary, internship, training, course, certificate, diploma, free, DIY, repair service, secondhand, used, how to. Build this list at account creation and add to it every month."}
  ]),

  p_b([
    {t: "Campaign-level negatives", b: true},
    {t: " prevent cross-contamination between your service lines. If you run separate campaigns for industrial pumps and industrial valves, add pumps as a negative to the valves campaign and valves as a negative to the pumps campaign. This forces Google to show the most relevant ad for each query rather than letting campaigns compete against each other for the same clicks."}
  ]),

  p_b([
    {t: "Ad group-level negatives", b: true},
    {t: " separate intent within a campaign. If your industrial pumps campaign has ad groups for centrifugal pumps, submersible pumps, and diaphragm pumps, use ad group negatives to ensure a search for centrifugal pump triggers the centrifugal ad group, not the general pump ad group. This precision improves Quality Score and conversion rates simultaneously."}
  ]),

  p("Review the Search Terms report every week without exception. Every new irrelevant query you discover is a negative keyword waiting to be added. The list is never complete. As Google's matching algorithm evolves and as new query patterns emerge seasonally or with industry trends, your negative keyword list needs continuous updates."),

  callout("warning", "Negative Keywords Are Never a Finished Task", "One of the most common mistakes is treating negative keyword setup as a one-time project. It is ongoing maintenance. An account that was perfectly configured six months ago can degrade significantly if no one has reviewed the Search Terms report since. Block time for this every week, without exception."),

  h3("Expected Impact"),

  p("A robust negative keyword strategy does not just reduce wasted spend. It improves the quality of every other metric in the account. When the traffic reaching your ads and landing pages is composed of higher-intent queries, your conversion rate improves without touching ad creative or landing pages. Your Quality Score improves because relevance signals strengthen. Your CPC trends downward as Google rewards more relevant accounts with better positioning at lower cost."),

  p("Accounts that implement tiered negative keyword strategies typically see direct conversion rate improvement of 0.5 to 1.5 percentage points within 60 days, purely from increased targeting purity. That improvement compounds with every other fix in this list."),

  // ── SECTION 4: MISTAKE 3 ──────────────────────────────────────────────────
  h2("Mistake 3: Ignoring Quality Score and Paying the Penalty"),

  h3("What It Looks Like"),

  p("Quality Score is Google's assessment of how relevant your keywords, ads, and landing pages are to the user experience. It is scored on a scale of 1 to 10 and it has a direct mathematical relationship with your CPC and ad position. A keyword with Quality Score 4 costs you significantly more per click than the same keyword with Quality Score 8, for exactly the same position in search results."),

  p("Most Indian B2B Google Ads accounts are running with Quality Scores of 4 to 6 on their primary keywords. That means they are paying a relevance tax on every single click, every single day. The tax is not visible as a line item in your billing statement. It is simply baked into the CPC you pay. You pay more than you should, for worse positions than you could have, because the account has not been optimised for relevance."),

  p("The root cause in most cases is a disconnect across three layers that should be tightly aligned: the keyword, the ad copy, and the landing page. An account bidding on industrial safety equipment supplier shows an ad with a headline about wholesale industrial products, which links to a homepage featuring the company's entire product catalogue. None of these three elements reinforce each other. Google's algorithm detects the misalignment and penalises the account accordingly."),

  h3("The Fix"),

  p("Quality Score optimisation is achieved through alignment across all three layers. The alignment is not complex in principle but it requires disciplined execution across the account."),

  p_b([
    {t: "Layer 1: Keyword to ad alignment.", b: true},
    {t: " The primary keyword should appear verbatim or near-verbatim in at least one of your ad headlines. If you are bidding on industrial safety equipment supplier, the phrase industrial safety equipment supplier should appear in your ad headline. Google highlights query-matching terms in ads, which increases click-through rate and signals relevance to the Quality Score algorithm."}
  ]),

  p_b([
    {t: "Layer 2: Ad to landing page alignment.", b: true},
    {t: " The specific promise made in your ad must be reinforced immediately on the landing page. If your ad says Bulk Industrial Safety Equipment, top of the landing page must speak to bulk industrial safety equipment. Not about the company. Not about all products. About the specific thing the ad promised."}
  ]),

  p_b([
    {t: "Layer 3: Landing page experience.", b: true},
    {t: " Google measures expected click-through rate, ad relevance, and landing page experience as the three components of Quality Score. Landing page experience is assessed on load speed, mobile-friendliness, transparency of content, and how directly the page delivers on the ad promise without requiring further navigation. A slow-loading page on mobile, which describes the majority of Indian B2B websites, depresses Quality Score regardless of how relevant the content is."}
  ]),

  p("Quality Score optimisation is not a one-time project. It requires regular creative refresh because ad relevance signals decay as consumer query patterns evolve. It requires ongoing landing page iteration informed by on-page conversion data. Accounts that treat Quality Score as an ongoing maintenance priority rather than a setup task sustain their CPC advantages over time."),

  h3("Expected Impact"),

  p("The CPC impact of moving from Quality Score 5 to Quality Score 8 on core keywords is significant. Google's internal data and independent account analyses consistently show 30 to 50 percent CPC reduction for the same ad position when Quality Score improves from the 4-6 range to the 7-9 range. For an account spending Rs 2 lakh per month, that is Rs 60,000 to Rs 1 lakh per month in recovered budget, available either as cost savings or redeployment toward higher volume."),

  stats(
    ["30-50%", "CPC reduction moving from QS 5 to QS 8"],
    ["4-6", "typical Quality Score range in unoptimised Indian B2B accounts"],
    ["7-9", "target Quality Score range for core B2B keywords"]
  ),

  p("There is a compounding dimension to this as well. Higher Quality Scores improve ad rank, which improves click-through rates, which generates more conversion data, which enables better bidding decisions. Every improvement in Quality Score makes every other part of the account work better."),

  // ── SECTION 5: MISTAKE 4 ──────────────────────────────────────────────────
  h2("Mistake 4: Sending Paid Traffic to Your Homepage"),

  h3("What It Looks Like"),

  p("This is perhaps the most visible and most persistently common mistake in Indian B2B Google Ads accounts. An ad is carefully crafted around a specific product, service, or buyer need. The click is earned. The visitor arrives. And then they are deposited on a homepage designed to introduce the company to every possible visitor simultaneously."),

  p("The homepage has a hero image of your factory. It has a navigation bar with eight sections. It has a banner for your three product lines. It has a news ticker with your latest ISO certification. It has a client logo carousel. It has a footer with your address, phone number, and social media links. What it does not have is the specific answer to the specific question the visitor just asked by clicking your specific ad."),

  p("The visitor clicked an ad that said Bulk Industrial Safety Equipment for Manufacturing Plants. They arrived at a homepage that says Welcome to ABC Industries, Your Trusted Partner in Industrial Solutions Since 1998. Their brain immediately processes a mismatch. The page is not answering their question. Their options are to navigate into the site to find what they want, or to press the back button and try the next result. In India's B2B market, where buyers are time-pressured procurement managers evaluating multiple suppliers simultaneously, they press back. Almost every time."),

  p("The result is a bounce rate on paid traffic of 70 to 80 percent in most unoptimised accounts. That is 70 to 80 percent of clicks generating zero engagement, zero inquiry, zero pipeline. Paid for in full."),

  h3("The Fix"),

  p("Every campaign needs a dedicated landing page that mirrors the specific promise of the ad that leads to it. This is not optional. It is the foundational infrastructure for paid traffic to convert at acceptable rates."),

  p_b([
    {t: "The landing page headline must match the ad headline.", b: true},
    {t: " If the ad says Bulk Industrial Safety Equipment, Get a Quote in 24 Hours, the landing page must open with that same message or a direct continuation of it. The visitor should experience the landing page as the answer to what the ad promised, not as a redirect to a different conversation."}
  ]),

  p_b([
    {t: "The landing page must have a single, prominent call to action.", b: true},
    {t: " In B2B India, that CTA is typically Request a Quote, Get a Proposal, or Call Now. There should be no other navigation. No links to blog posts. No related products. No menu bar. The visitor is there for one reason. The page should serve that one reason and eliminate every other distraction."}
  ]),

  p_b([
    {t: "The landing page must load in under 3 seconds on mobile.", b: true},
    {t: " The majority of B2B procurement research in India now happens on mobile, even for complex industrial purchases. A landing page that takes 6 to 8 seconds to load on a 4G connection in a Tier 2 city will lose the majority of its visitors before the page even renders. This is a technical requirement, not a nice-to-have."}
  ]),

  p("For accounts with multiple product lines or service offerings, this means building multiple landing pages. One per campaign, minimum. This is more work than pointing all traffic to the homepage. It is also the difference between a 1 to 2 percent conversion rate and a 4 to 6 percent conversion rate on paid traffic."),

  callout("tip", "Landing Page Minimum Viable Standard for Indian B2B", "A high-converting B2B landing page for the Indian market needs: headline that mirrors the ad promise, 3-5 bullet points on what the buyer gets (not features, benefits), a form requesting only name, company, phone number and requirement, a visible phone number for immediate call option, and at minimum 2-3 trust signals such as client logos, certifications, or years in operation. That is it. Keep it simple and fast."),

  h3("Expected Impact"),

  p("Dedicated landing pages consistently produce 2 to 3 times the conversion rate of homepage traffic for paid campaigns. In a real account, that means if you were generating 20 inquiries per month from Rs 1,50,000 in spend, you can expect 40 to 60 inquiries from the same spend after implementing proper landing page architecture. Cost per lead falls proportionally without any reduction in budget."),

  stats(
    ["2-3x", "conversion rate improvement with dedicated landing pages"],
    ["70-80%", "typical homepage bounce rate for paid B2B traffic"],
    ["3 seconds", "maximum acceptable landing page load time on mobile"]
  ),

  p_link("Building landing pages that convert requires understanding what motivates the Indian B2B buyer at each stage of their journey. Our analysis of ", "AI chatbots versus lead forms for B2B India", "/insights/ai-chatbot-vs-lead-forms-b2b-india", " covers how to structure the conversion experience for maximum qualified lead capture."),

  // ── SECTION 6: MISTAKE 5 ──────────────────────────────────────────────────
  h2("Mistake 5: Running Ads Without Conversion Tracking"),

  h3("What It Looks Like"),

  p("You know how many clicks your ads generated this month. You know your average CPC. You know your click-through rate and your impression share. You have a Google Ads dashboard full of data. What you do not know is which keyword generated your last three actual customer inquiries. You do not know which ad copy drove the form submission that became last month's biggest closed deal. You do not know whether your Rs 40,000 campaign produced three leads or thirty."),

  p("This is the reality for a significant proportion of Indian B2B Google Ads accounts. Clicks are tracked. Outcomes are not. The result is budget allocation based on vanity metrics. You increase spend on campaigns that look good on paper (high impressions, high click volume) and reduce spend on campaigns that look modest but may be generating all your actual revenue."),

  p("Without conversion tracking, automated bidding strategies are also completely blind. Google's Smart Bidding algorithms optimise toward conversion signals. If you have no conversion signals, they optimise toward clicks, because that is the only thing they can measure. You end up paying more for clicks that generate nothing, because you have trained the algorithm to prioritise click volume over outcome quality."),

  h3("The Fix"),

  p("Conversion tracking setup is technical but not complex. It requires Google Tag Manager installed on your website, which enables you to fire tracking events without modifying code for every new goal. Once GTM is in place, the tracking setup for most B2B websites takes a few hours."),

  p_b([
    {t: "Form submissions:", b: true},
    {t: " Every form on every landing page should fire a conversion event on successful submission. Not on page load. Not on button click. On confirmed submission. If your forms have a thank-you page, track the thank-you page URL. If they use Ajax, use event-based tracking."}
  ]),

  p_b([
    {t: "Phone call clicks:", b: true},
    {t: " In Indian B2B, phone calls are often the preferred first contact method. Track every click on a phone number link as a conversion. If your budget allows, use Google Call Forwarding numbers to track actual call duration and filter out very short calls that indicate wrong numbers."}
  ]),

  p_b([
    {t: "WhatsApp button taps:", b: true},
    {t: " WhatsApp is the dominant business communication channel in India. If you have a WhatsApp button on your landing pages, track every tap as a micro-conversion. Even if not every WhatsApp inquiry becomes a lead, the volume data helps you understand channel preferences."}
  ]),

  p_b([
    {t: "Value-based conversion tracking:", b: true},
    {t: " If your deals vary significantly in size, implement value-based conversion tracking. Assign different conversion values to different inquiry types. A demo booking has higher value than a general information request. Feeding this data into Smart Bidding enables the algorithm to optimise toward revenue, not just lead volume."}
  ]),

  callout("warning", "No Conversion Tracking Means No Valid Data", "Every Google Ads decision made without conversion tracking is a guess. You cannot optimise what you cannot measure. Before increasing any budget, before testing any new strategy, before implementing any bidding change, verify that every meaningful action on your website is tracked as a conversion in Google Ads. This is the prerequisite for everything else."),

  h3("Expected Impact"),

  p("Conversion tracking does not directly produce more leads. What it produces is the data foundation required to make every other decision correctly. Once you can see which keywords, which ads, and which campaigns produce actual leads and customers, you can redirect budget toward what works and away from what does not. That reallocation is consistently the highest-leverage intervention available in any underperforming account."),

  p("Accounts that implement full conversion tracking and spend 90 days making data-driven budget reallocations typically achieve 25 to 40 percent improvement in cost per lead without increasing total spend. The same budget, redirected based on actual outcome data rather than vanity metrics, produces dramatically better results."),

  // ── SECTION 7: MISTAKE 6 ──────────────────────────────────────────────────
  h2("Mistake 6: Switching to Smart Bidding Too Early"),

  h3("What It Looks Like"),

  p("Google promotes its automated bidding strategies aggressively. Target CPA, Maximize Conversions, Target ROAS, and Maximize Conversion Value are presented as the modern, intelligent approach to bidding. Google's own account managers recommend switching to Smart Bidding almost universally. The pitch is compelling: let Google's machine learning optimise your bids in real time based on hundreds of signals that manual bidding cannot incorporate."),

  p("The problem is that every one of these algorithms requires data to function. Target CPA needs to know what a conversion costs and what it looks like. Target ROAS needs to know what a conversion is worth. Maximize Conversions needs enough conversion history to understand what kind of user signals predict conversion. Without that data, the algorithm is operating on noise. It cannot distinguish a good click from a bad click because it has not seen enough conversions to know the difference."),

  p("Google's own guidance acknowledges this: Smart Bidding strategies work best with at least 30 conversions per month, and Target ROAS requires at least 50 conversions per month for stable performance. Most Indian B2B accounts are running Smart Bidding with 5 to 15 conversions per month. The result is unpredictable spend spikes, inflated CPCs, budget exhausted by midday, and a false conclusion that automated bidding does not work in their market."),

  h3("The Fix"),

  p("The fix is sequencing. Smart Bidding is not wrong. It is premature when applied to data-poor accounts. The correct sequence is to build conversion data first, then introduce automation."),

  p_b([
    {t: "Phase 1: Manual CPC or Enhanced CPC.", b: true},
    {t: " Start here. Manual CPC gives you complete control over what you bid for each keyword. Enhanced CPC allows a small automated adjustment up or down at the auction level while maintaining your manual bids as the baseline. Both are appropriate when an account is generating fewer than 30 conversions per month. The goal in this phase is not bid efficiency. It is conversion volume growth."}
  ]),

  p_b([
    {t: "Phase 2: Test Target CPA on one mature campaign.", b: true},
    {t: " Once you are consistently generating 30 or more conversions per month and have 90 days of stable conversion data, select your single most active campaign and switch it to Target CPA. Set the Target CPA at your current actual CPA, not below it. Give it 4 to 6 weeks to learn before evaluating performance."}
  ]),

  p_b([
    {t: "Phase 3: Gradual account-wide rollout.", b: true},
    {t: " Only after the pilot campaign demonstrates stable performance does it make sense to roll Smart Bidding out to other campaigns. Do not change multiple campaigns simultaneously. Change one, evaluate for 4 to 6 weeks, then proceed."}
  ]),

  p("This sequencing approach feels slower than a one-time account-wide switch to Target ROAS. In practice it is faster because it avoids the 3 to 6 months of account instability that premature Smart Bidding adoption creates, during which budget is consumed erratically and confidence in the channel collapses."),

  h3("Expected Impact"),

  p("Accounts that follow proper sequencing through Manual CPC to eventual Smart Bidding implementation experience a qualitatively different outcome than accounts that switch prematurely. The data-building phase is characterised by predictable spend and stable CPL. The transition to Smart Bidding, when it happens with sufficient data, typically produces an additional 15 to 25 percent reduction in CPL within the first 90 days as the algorithm optimises against a rich conversion signal."),

  stats(
    ["30+", "conversions per month required before switching to Target CPA"],
    ["50+", "conversions per month recommended for Target ROAS stability"],
    ["15-25%", "additional CPL reduction when Smart Bidding is introduced with sufficient data"]
  ),

  callout("tip", "The Learning Period Is Real", "Every Smart Bidding strategy has a learning period of approximately 1 to 2 weeks after activation. During this period, Google's algorithm is calibrating its model against your account's signals. Performance fluctuates and CPCs can spike. This is normal. Do not evaluate performance during the learning period and do not make changes that would reset the learning period. Let the algorithm complete its calibration before drawing conclusions."),

  // ── SECTION 8: MISTAKE 7 ──────────────────────────────────────────────────
  h2("Mistake 7: Mixing B2B and B2C Intent in the Same Campaigns"),

  h3("What It Looks Like"),

  p("This mistake is structural at the campaign architecture level. Generic keywords in industrial or commercial categories attract both B2B buyers and individual consumers. They look similar in the search query. They cost the same per click. They convert at radically different rates."),

  p("Consider an account selling industrial packaging materials in Mumbai. The keyword industrial packaging attracts the procurement manager at a pharmaceutical company sourcing 50,000 units of specialised cartons per month. It also attracts a small home-based craft business owner looking for bubble wrap. It attracts someone searching for packaging for a single Amazon seller shipment. It attracts a student researching sustainable packaging for a college project."),

  p("The procurement manager and the craft business owner and the student all generate the same click event in your account. They cost exactly the same. Only one of them becomes a customer. In most B2B categories, the ratio of non-qualifying to qualifying clicks on generic keywords is 5:1 or worse. You are paying for five non-qualifying clicks for every qualifying B2B buyer click."),

  h3("The Fix"),

  p("The fix operates at three levels: keyword selection, ad copy, and audience layering."),

  p_b([
    {t: "Keyword selection with B2B intent qualifiers.", b: true},
    {t: " Build your keyword list around terms that signal commercial or industrial scale. Qualifiers like bulk, wholesale, supplier, manufacturer, enterprise, OEM, industrial, commercial, and B2B dramatically reduce consumer traffic while preserving B2B buyer reach. Industrial packaging supplier is not the same audience as industrial packaging. Bulk industrial packaging wholesale means something fundamentally different to Google's matching algorithm than industrial packaging alone."}
  ]),

  p_b([
    {t: "Ad copy that pre-qualifies passively.", b: true},
    {t: " Use your ad headlines and descriptions to filter out non-qualifying clicks before they happen. If your ad headline says Minimum Order 500 Units, the home crafter and the student do not click. They have immediately recognised that this supplier is not for them. That disqualifying headline costs you zero clicks and zero spend from non-buyers. It is the most efficient filter available in the paid search toolkit."}
  ]),

  p_b([
    {t: "Audience targeting in Observation mode.", b: true},
    {t: " Layer Google's audience targeting on top of your keyword campaigns in Observation mode initially. Add audiences for business professionals, in-market B2B segments, and company decision makers. Observe how these audience segments perform on your existing campaigns. Where B2B audiences outperform generic traffic, apply a positive bid adjustment. This does not restrict your reach but it tilts spend toward the buyers you want."}
  ]),

  p("Over time, as you accumulate audience data, you can move your most efficient B2B audience segments into Targeting mode rather than Observation mode, effectively reserving your highest-value campaigns for confirmed business decision-maker audiences while keeping a discovery campaign open to broader traffic."),

  callout("tip", "Using Ad Copy as a Quality Filter", "Pre-qualifying ad copy is one of the most underused strategies in Indian B2B advertising. Adding specificity to your headline like Rs 50,000+ orders only, or Minimum bulk order: 1,000 units, or Suppliers to 500+ Indian manufacturers, does two things simultaneously: it dissuades non-qualifying clicks and it makes your ad dramatically more compelling to actual B2B buyers who see their own situation reflected in the copy."),

  h3("Expected Impact"),

  p("Campaigns restructured around explicit B2B intent signals consistently produce lower lead volume in the short term and dramatically higher lead quality. A campaign generating 100 leads per month at Rs 2,000 CPL, of which 5 percent are qualified B2B buyers, produces 5 qualified leads. A restructured campaign generating 40 leads per month at Rs 1,500 CPL, of which 25 percent are qualified B2B buyers, produces 10 qualified leads at 40 percent lower cost per qualified lead."),

  p("The headline metrics look worse. The business outcomes are dramatically better. This distinction between lead volume and lead quality is at the heart of the B2B and B2C intent separation problem, and fixing it requires the willingness to accept lower raw lead numbers in exchange for radically better conversion rates through the sales pipeline."),

  p_link("The gap between lead generation that looks good on paper and pipeline that actually converts is a recurring theme in Indian B2B marketing. We explore the structural causes in detail in our analysis of the ", "Indian B2B marketing strategy gap", "/insights/indian-b2b-marketing-strategy-gap-explained", "."),

  // ── SECTION 9: WHAT FIXING THESE MISTAKES DELIVERS ───────────────────────
  h2("What Fixing These Mistakes Actually Delivers: A Real Account"),

  p("Theory is useful. Numbers are better. Here is what the compounded impact of fixing all seven structural mistakes looks like in a real account, based on an industrial components manufacturer in Pune with a monthly Google Ads budget of approximately Rs 1.4 lakh."),

  p("Before the structural fixes were applied, the account had the following characteristics. Uncontrolled Broad Match across all campaigns. No meaningful negative keyword lists. Average Quality Score of 4.8 on primary keywords. All paid traffic directed to the company homepage. Conversion tracking limited to a single thank-you page goal, missing phone calls and WhatsApp interactions. Smart Bidding (Maximize Conversions) running on campaigns with fewer than 15 conversions per month. Generic keywords with no B2B intent qualification."),

  p_b([
    {t: "Before (same monthly budget, unoptimised structure):", b: true},
    {t: " Rs 1.4 lakh monthly spend. Average CPL of Rs 3,500. Conversion rate on paid traffic of 1.2 percent. Estimated qualified B2B pipeline contribution of Rs 20 lakh per month."}
  ]),

  p_b([
    {t: "After (same monthly budget, fixed structure):", b: true},
    {t: " Rs 1.44 lakh monthly spend (slight increase to test B2B-qualified keyword expansion). Average CPL of Rs 1,200. Conversion rate on paid traffic of 3.8 percent. Estimated qualified B2B pipeline contribution of Rs 60 lakh+ per month."}
  ]),

  stats(
    ["Rs 1,200", "CPL after structural fixes (from Rs 3,500)"],
    ["3.8%", "paid traffic conversion rate (from 1.2%)"],
    ["3x", "pipeline contribution from same budget"],
    ["65%", "reduction in cost per qualified lead"]
  ),

  p("The fixes were implemented in sequence over approximately 90 days. Match type discipline and negative keyword implementation happened in weeks 1 and 2. Landing page builds happened in weeks 3 and 4. Conversion tracking overhaul happened in weeks 5 and 6. Quality Score work happened ongoing from week 1. B2B intent restructuring happened in weeks 7 through 10. Manual CPC replaced Smart Bidding in week 1 and Target CPA was reintroduced at week 12 with sufficient data."),

  p("The 90-day timeline is not unusually long. It is the minimum time required to see compounding effects. Each fix individually produces measurable improvement. The seven fixes together produce transformation. The pipeline went from Rs 20 lakh to Rs 60 lakh on essentially identical spend because the structural problems were consuming most of the budget before it had any chance of reaching a real buyer."),

  callout("insight", "This Is Structural, Not Exceptional", "The before-and-after results above are not an exceptional case or a best-case scenario. They represent the predictable, repeatable outcome of fixing structural problems that are present in the majority of Indian B2B Google Ads accounts. If your account has these structural problems, your account has this upside potential. The gap between current performance and achievable performance is a structural gap, not a budget gap."),

  p_link("If your Google Ads account is generating leads but your pipeline is not growing proportionally, the problem may be upstream of advertising entirely. Our analysis of how ", "AI transforms performance marketing for scalable growth", "/insights/how-ai-transforms-performance-marketing-for-scalable-growth", " covers the full measurement and attribution infrastructure required for predictable B2B pipeline growth."),

  // ── SECTION 10: PRIORITY ORDER FOR FIXING ────────────────────────────────
  h2("The Right Order to Fix These Mistakes"),

  p("When an account has all seven structural problems, where do you start? The temptation is to tackle everything simultaneously. That approach creates two problems: account instability from too many simultaneous changes, and difficulty attributing which change produced which improvement."),

  p("The correct sequencing is determined by dependency. Some fixes are prerequisites for others. Conversion tracking must come before any bidding strategy changes. Match type discipline must come before Quality Score optimisation can be accurately measured. Landing page builds should happen before you evaluate true conversion potential from paid traffic."),

  p_b([
    {t: "Week 1-2:", b: true},
    {t: " Implement full conversion tracking. Switch Smart Bidding to Manual CPC or Enhanced CPC if running on fewer than 30 conversions per month. Begin Search Terms report audit."}
  ]),

  p_b([
    {t: "Week 3-4:", b: true},
    {t: " Apply match type discipline. Move core keywords to Phrase and Exact Match. Build account-level and campaign-level negative keyword lists from Search Terms audit findings. Begin landing page builds."}
  ]),

  p_b([
    {t: "Week 5-8:", b: true},
    {t: " Launch dedicated landing pages for each campaign. Begin Quality Score work: align ad headlines to keywords, align landing page headlines to ad copy. Restructure campaigns around B2B intent qualifiers."}
  ]),

  p_b([
    {t: "Week 9-12:", b: true},
    {t: " Continue negative keyword list expansion based on new Search Terms data. Implement audience observation layers for B2B decision-maker segments. Evaluate conversion data volume to determine Smart Bidding readiness."}
  ]),

  p("This 12-week roadmap does not represent a finished account. It represents the foundation of a properly structured account. Real optimisation continues indefinitely. The accounts that maintain 5 to 8 times ROAS year over year are not running on a perfect setup they built once. They are running on a system of ongoing review, weekly negative keyword updates, monthly creative refreshes, and quarterly campaign architecture evaluations."),

  callout("insight", "Audit Before You Optimise", "Before implementing any of the fixes in this guide, complete a full account audit. Download 90 days of Search Terms data. Review your current match types by campaign. Check your conversion tracking against actual form submissions and calls. Map each campaign to the landing page it uses. Measure page load times on mobile. This audit will take 2 to 3 hours and it will tell you exactly which of the seven mistakes your account is currently making and in what severity. The audit is the plan."),

  // ── SECTION 10: SOURCES ───────────────────────────────────────────────────
  h2("Sources and Data"),

  p("1. Google Ads Help Center: About Quality Score and how it affects ad rank and cost. https://support.google.com/google-ads/answer/140351"),

  p("2. Google Ads Help Center: About Smart Bidding and data requirements for automated bidding strategies. https://support.google.com/google-ads/answer/7065882"),

  p("3. WordStream: Google Ads Industry Benchmarks by Industry, including conversion rate and CPC data for industrial and B2B categories. https://www.wordstream.com/blog/ws/2016/02/29/google-adwords-industry-benchmarks"),

  p("4. Internet and Mobile Association of India (IAMAI): Digital Advertising in India Annual Report 2024, total digital advertising market size and B2B segment estimates. https://www.iamai.in/"),

  p("5. Google Think with Google India: B2B Decision Makers and Their Digital Journey, research on how Indian procurement managers use search in the buying process. https://www.thinkwithgoogle.com/intl/en-apac/"),

  p("6. HubSpot State of Marketing Report 2024: Landing page conversion rate benchmarks, conversion tracking implementation rates, and B2B lead quality data by traffic source. https://www.hubspot.com/state-of-marketing"),

];

await client.patch("insight-wp-995176").set({
  title: "Google Ads for Indian B2B: 7 Budget-Killing Mistakes and Exactly How to Fix Each One",
  seoTitle: "Google Ads B2B India 2026: 7 Mistakes Draining Your Budget and How to Fix Them",
  excerpt: "Indian B2B companies collectively waste an estimated Rs 8,000 crore per year on Google Ads that underperform. Not because Google Ads does not work. Because the accounts are set up incorrectly. Here are the 7 most damaging structural mistakes, with specific before-and-after fixes and realistic Indian market data.",
  categories: ["digital-marketing","industry-insights"],
  tags: ["Google Ads India B2B","Google Ads mistakes India","B2B Google Ads India","PPC India","Google Ads optimization India","search engine marketing India"],
  body,
}).commit();
console.log("Published! Blocks:", body.length);
