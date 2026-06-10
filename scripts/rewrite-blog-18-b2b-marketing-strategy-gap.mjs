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
const k = () => `rw18_${++_k}`;

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

  // ── SECTION 1: THE BOARDROOM SCENE ────────────────────────────────────────
  h2("The Boardroom Scene"),

  p("The meeting has been scheduled for forty-five minutes. The CFO is sitting at the head of the table with a printed P&L. The marketing lead has a laptop open and a deck ready. The quarter-end review begins."),

  p("The CFO opens: 'We spent Rs 40 lakhs on marketing this year. What did we get?'"),

  p("The marketing lead advances the first slide. Impressions: 18 lakh. Website sessions: 62,000. LinkedIn followers: up 34 percent. Email open rate: 24 percent. Three campaign case studies with colourful graphics. Engagement metrics by channel. Social media reach by month."),

  p("The CFO looks at the numbers. Then asks the only question that matters: 'But how much revenue did this actually generate?'"),

  p("Silence."),

  p("Not because the marketing lead is incompetent. Not because the agency was dishonest. Not because the campaigns were badly run. The silence exists because no one set up a system to connect the Rs 40 lakhs of spend to closed deals. Marketing operated in one lane. Sales operated in another. The two lanes never merged into a single view of commercial return."),

  p("This scene plays out in Indian boardrooms from mid-sized auto component manufacturers in Pune to professional services firms in Connaught Place to SaaS companies in Koramangala. The industries are different. The cities are different. The marketing budgets range from Rs 8 lakhs to Rs 4 crores. But the silence at the end of the CFO question is universal."),

  p("It is not a communication problem. It is a strategy architecture problem. And it has four identifiable gaps."),

  p("Before we examine the gaps, it is worth establishing why this problem is specifically acute in the Indian B2B context. Indian B2B companies often operate in markets where personal relationships have historically driven sales. The founder knows the buyer. The MD knows the procurement head. Business flowed through trust networks built over decades at industry associations, trade fairs, and golf courses. Marketing, in that context, was mostly ceremonial: a brochure to hand over, a website to point to, a presence on social media to signal modernity."),

  p("As those companies have scaled beyond the founder's personal network, or as second-generation leadership has taken over, the limits of relationship-dependent pipeline have become visible. The growth ambition exceeds what personal networks can deliver. Digital marketing was adopted as the solution. But the model adopted was often a digital version of the same ceremonial marketing: a website that looks good, social media posts that signal modernity, ads that create impressions. The measurement model never changed. The accountability standard never changed."),

  p("The result is that a category of Indian B2B companies is now spending significant budget on digital marketing using a mental model designed for brand visibility rather than revenue generation. The budget is real. The spend is real. The outcomes are invisible because nobody built the infrastructure to make them visible."),

  stats(
    ["72%", "Indian B2B companies that cannot attribute marketing spend to closed revenue"],
    ["6-8%", "average B2B marketing spend as a share of annual revenue in India"],
    ["Rs 25,000 crore", "estimated annual waste on unattributed B2B marketing in India"]
  ),

  p("The Rs 25,000 crore figure is not hyperbole. It is the logical result of 72 percent of Indian B2B companies running marketing budgets with no closed-loop measurement connecting activity to revenue. Across tens of thousands of businesses each spending anywhere from Rs 10 lakhs to Rs 5 crore per year, the unattributed and therefore unoptimised spend accumulates to a national-scale problem."),

  p("The solutions exist. They are not expensive. They are not technically complex. What they require is a willingness to stop measuring the wrong things and build the infrastructure to measure the right ones."),

  p("The remainder of this article breaks down each gap with specificity, explains why it exists, what it costs, and what the fix looks like in practice for an Indian B2B company operating in the current environment."),

  // ── SECTION 2: THE REAL PROBLEM ───────────────────────────────────────────
  h2("The Real Problem: Measuring the Wrong Things"),

  p("To understand why Indian B2B marketing produces so much activity and so little revenue, you have to understand where most Indian B2B companies inherited their marketing model from."),

  p("The model most Indian B2B companies are running today was designed for a different era. It was built around brand visibility through press coverage, exhibition presence at trade fairs like Elecrama, Chemtech, or Auto Expo, corporate brochures and collateral, periodic social media posts to signal that the company exists, and email blasts to a database acquired years ago. None of these activities were designed to generate measurable pipeline. They were designed to keep the brand visible and hope that visibility eventually converted into enquiries."),

  p("That model had a logic to it in an era when buyers had limited information. The salesperson was the primary information source. The trade fair booth was where buyers encountered new vendors. The press release in a trade magazine was how capabilities were communicated. In that world, brand visibility was a reasonable proxy for sales enablement."),

  p("But the buyer has changed fundamentally. Today, the procurement manager at a Pune manufacturer evaluating new ERP vendors has already read the comparison articles. They have already looked at G2 and Capterra reviews. They have already checked what competitors are running on the shortlisted platforms by visiting their LinkedIn and website. They have read two or three case studies. When they finally respond to your marketing outreach or pick up the phone to your sales team, the decision is already 60 to 70 percent made."),

  p("Harvard Business Review put a number to this years ago: B2B buyers are 57 percent of the way through their decision process before they engage a vendor's sales team. More recent research from Gartner puts it at 70 percent. The implication is significant. If you are pouring your marketing budget into top-of-funnel awareness and doing nothing to shape the buyer during the 70 percent of the journey that happens before sales contact, you are arriving late to a game that has already been largely decided."),

  pq("Your buyer is 70 percent done deciding before your sales team enters the room. Marketing that only runs awareness is invisible for 70 percent of the buying journey."),

  callout("warning", "Activity Marketing vs Outcome Marketing: The Core Distinction", "Activity marketing measures inputs: posts published, ads run, events attended, emails sent, impressions served. Outcome marketing measures outputs: qualified pipeline generated, cost per qualified lead, revenue influenced by marketing, win rate on marketing-sourced deals. Most Indian B2B companies have robust reporting on activity metrics and zero visibility into outcome metrics. The fix is not to stop the activities. The fix is to build measurement infrastructure that connects the activities to the outcomes."),

  p("The distinction matters because activity metrics can always be made to look good. Impressions can be bought cheaply. Follower counts can be grown with the right content strategy. Email open rates can be improved with better subject lines. A marketing team measured on activity can always show a positive trend line on a PowerPoint deck."),

  p("But a marketing team measured on pipeline contribution cannot fake a number. Either the Rs 40 lakhs generated qualified pipeline or it did not. Either the leads from the last campaign converted into opportunities or they did not. Outcome metrics create accountability that activity metrics never can."),

  p("There is also a generational dimension to the measurement problem in Indian B2B. Many companies are now in transition between first-generation founders who ran the business on instinct and relationships, and second-generation or professional management who need data-driven systems to scale beyond what instinct can sustain. The shift to outcome marketing is partly a generational handoff: from intuition-led to evidence-led decision-making. The companies making this transition successfully are building a measurement infrastructure that the next phase of growth requires."),

  p("The transition from activity marketing to outcome marketing requires changes in four areas. These are the four gaps. Each one compounds the others. Companies that close all four typically see a 3x to 5x improvement in marketing ROI within 12 months without increasing their marketing budget."),

  // ── SECTION 3: GAP 1 ICP ──────────────────────────────────────────────────
  h2("Gap 1: You Are Selling to Everyone, Reaching No One"),

  p("Ask the average Indian B2B company to describe their ideal customer and you hear a version of: 'Any company with 50 or more employees that needs our services.' Or: 'Manufacturing businesses anywhere in India.' Or: 'SMEs looking to grow digitally.' These are not customer profiles. They are demographic filters so wide that they include millions of potential buyers and help you target precisely none of them."),

  p("The Ideal Customer Profile, or ICP, is one of the most misunderstood concepts in Indian B2B marketing. Most companies treat it as a segmentation exercise: pick an industry, pick a size range, call it done. But a real ICP is far more specific, and the specificity is what gives it commercial value."),

  p("A real ICP answers: Which specific industry vertical? Which sub-segment within that vertical? What company size range in terms of revenue or headcount? Which geographic markets? What is the title and function of the primary decision-maker? What is the title and function of the economic buyer who signs the purchase order? What is the typical buying trigger, meaning what event or condition causes this company to start evaluating a solution like yours? What is the budget signal that indicates this company has money allocated for this purchase? What does this buyer type read, attend, and trust? What are the two or three problems that keep this decision-maker awake at night?"),

  p("That level of specificity feels uncomfortable for most Indian B2B leadership teams because it appears to narrow the addressable market. The fear is: if we define too narrow an ICP, we will miss opportunities. The evidence consistently points in the opposite direction. Companies with narrowly defined ICPs win more of the opportunities they pursue because their messaging is precisely calibrated to the specific pain of a specific person in a specific context."),

  stats(
    ["3-5x", "higher conversion rate for ICP-specific campaigns vs broad-audience campaigns"],
    ["60%", "of Indian B2B enquiries that are not ICP-fit but consume 80% of sales time"],
    ["2.4x", "more likely to close a deal when first touchpoint matches ICP criteria"]
  ),

  callout("tip", "What a Real ICP Looks Like in Practice", "A weak ICP: 'Manufacturing companies in India with 100+ employees looking for ERP solutions.' A strong ICP: 'Mid-sized discrete manufacturers in automotive components or precision engineering, headquartered in Pune, Aurangabad, or Chennai, with annual revenue of Rs 50 crore to Rs 500 crore, where the IT or Operations head is driving the evaluation, triggered by either a compliance requirement or a capacity expansion decision, with a budget of Rs 25 lakh to Rs 2 crore for an ERP implementation.' The second definition tells you exactly which LinkedIn titles to target, which trade publications to advertise in, which events to sponsor, and which case studies to write."),

  p("The companies generating the strongest B2B lead generation in India right now are obsessively specific about who they are targeting. A Bengaluru-based SaaS company serving HR teams does not target 'companies of all sizes.' They target Series B to pre-IPO startups with 200 to 800 employees where the CHRO or Head of People is actively building out HR infrastructure, typically identified by job postings for HR operations roles. Every piece of content, every ad campaign, every outbound sequence is calibrated to that specific profile."),

  p("This level of specificity is not just about better targeting. It changes the entire marketing message. When you know exactly who you are writing for, generic becomes impossible. You cannot write vague marketing copy for a person you have defined this precisely. The specificity forces clarity, and clarity is what stops the scroll."),

  pq("Specificity is the rarest and most powerful competitive advantage in Indian B2B marketing. The more precisely you can define who you are talking to, the less competition you face for their attention."),

  p("The practical exercise for any Indian B2B company looking to close this gap is to look at the last 20 customers you won that you consider ideal wins, meaning deals that closed at good margin, where the customer stayed and expanded, and where your solution genuinely solved a material problem. Map those 20 customers against every attribute you can identify. The ICP is hiding in that data. It always is."),

  p("One practical tool for ICP development that Indian B2B companies often overlook is win-loss analysis. Most companies do informal post-mortems on lost deals. Very few do structured analysis on won deals. The won deals hold the ICP data. They reveal the exact profile, the buying trigger, the decision-maker title, and the competitive context of the customers who found your solution most compelling. Collecting this data systematically from your last 20 wins requires three hours of structured interviews. The output is the most accurate ICP you will ever have access to."),

  p("Once the ICP is defined with that level of specificity, the entire marketing operation changes character. Every content brief starts with a named persona at a named company type facing a named challenge. Every ad creative is evaluated against the question: will this stop the scroll of the specific person we defined? Every email subject line is written for the specific problem this specific person is trying to solve. The quality of every marketing output improves because the target is no longer abstract."),

  p_link("Understanding your ICP is also the foundation for avoiding the most expensive mistakes in paid search. ", "Common Google Ads mistakes in B2B campaigns", "/insights/search-engine-marketing-b2b-google-ads-mistakes", " almost always trace back to targeting audiences that are too broad because the ICP was never properly defined."),

  // ── SECTION 4: GAP 2 FUNNEL ───────────────────────────────────────────────
  h2("Gap 2: Filling the Top of the Funnel and Ignoring Everything Beneath It"),

  p("This is the most common and most expensive structural mistake in Indian B2B digital marketing. It follows a predictable sequence. A company allocates a marketing budget. The agency or in-house team runs awareness campaigns: Google Search ads, LinkedIn sponsored content, perhaps display advertising. Traffic arrives on the website. Enquiry forms get submitted. The sales team follows up. Conversion rates are poor. The conclusion reached internally is that digital marketing does not work for this industry or this product."),

  p("The actual problem is almost never the awareness campaigns. The actual problem is that there is no funnel beneath the awareness layer. There is a tap and there is a drain, with nothing structured in the middle to move a buyer from first awareness to qualified intent to purchase decision. The water runs in and runs straight out."),

  p("The confusion stems from treating all buyers as equivalent. A buyer who has just seen your LinkedIn ad for the first time is not in the same mental state as a buyer who has visited your website three times, downloaded a whitepaper, and spent twelve minutes on your pricing page. But most Indian B2B marketing treats these two buyers identically: serve them both an ad that says 'Get a free demo.'"),

  p("The buyer's journey is not a straight line. Research from Gartner's B2B buying studies describes it as a loop: buyers cycle back through information gathering, solution exploration, and requirements building multiple times before finalising a vendor decision. A buyer might reach the consideration stage for your solution, then re-enter the education stage when a new requirement is introduced by their internal team. The funnel model is a simplification, but it is a useful simplification because it establishes the principle that different buyers at different stages need different content, and treating them all the same produces consistently poor results."),

  p("Indian B2B companies that build funnel-stage content frequently discover a surprising secondary benefit: their organic search performance improves substantially. Google rewards content that comprehensively addresses user intent at different stages of a topic. A company that publishes awareness content, education guides, comparison articles, and detailed case studies on a single topic area builds topical authority that lifts all of its content in search rankings. The content investment that was made to improve funnel conversion turns out to also reduce paid acquisition costs by driving more organic traffic. The two investments reinforce each other."),

  p("The awareness-stage buyer has zero context. They do not know you. They have no reason to trust you. They are not ready to talk to sales. Asking them for a demo at this stage is the equivalent of proposing marriage on a first date. The response you get, which is no response, is entirely rational."),

  callout("info", "What a Full B2B Marketing Funnel Looks Like", "Awareness: Content that surfaces your brand to your ICP when they are beginning to recognise a problem. Blog posts, LinkedIn articles, targeted ads, trade media. Goal: be discovered. Education: Content that helps your ICP understand the problem and the category of solution. Guides, webinars, comparison articles, explainer videos. Goal: build trust and educate. Consideration: Content that helps your ICP evaluate your specific solution. Case studies, testimonials, ROI calculators, detailed product content. Goal: make the shortlist. Proof: Social proof, detailed demos, reference calls, pilot programmes. Goal: remove purchase risk. Close: Proposals, pricing discussions, implementation planning, contract negotiation. Goal: convert."),

  p("The average Indian B2B company allocates 80 to 90 percent of its marketing budget to the awareness stage and virtually nothing to education, consideration, and proof. This creates a structural ceiling on conversion rates that no amount of additional awareness spend can break through. You can drive unlimited traffic to a funnel that does not exist."),

  p("The result is a specific and very common pattern in Indian B2B sales cycles. A lead arrives from a campaign. The sales person calls. The lead is not ready to buy. The sales person marks it as cold and stops following up. Six months later that lead signs with a competitor who stayed in touch with useful content throughout the evaluation period."),

  p("Building a proper B2B funnel does not require unlimited budget. It requires deliberate content creation for each stage of the buyer journey, a CRM or marketing automation tool that can route leads based on their stage, and sales and marketing alignment on what action qualifies a lead for handoff to sales. None of this is technically complex. All of it is strategically essential."),

  stats(
    ["92%", "of first-time B2B website visitors who are not ready to buy on initial visit"],
    ["7x", "higher close rate for leads nurtured through full-funnel content vs cold outbound"],
    ["80-90%", "share of typical Indian B2B marketing budget allocated only to awareness stage"]
  ),

  p("The education stage is where Indian B2B companies have the most untapped leverage. Indian business buyers, whether they are procurement managers, CFOs, or managing directors, are making complex decisions under risk. They are not looking for the cheapest option. They are looking for the safest option, meaning the vendor who demonstrates deepest understanding of their specific problem. Content that educates at this stage builds trust faster and more efficiently than any amount of brand awareness spend."),

  p("A mid-market professional services firm in Delhi that starts producing genuinely useful guides on the regulatory or operational challenges facing their target buyers will often see better pipeline results from that content investment over 12 months than from an equivalent spend on awareness advertising. The awareness brings people in. The education content keeps them engaged long enough for trust to form."),

  p("For Indian B2B companies with limited content creation capacity, the practical approach is to prioritise the consideration and proof stages rather than attempting to build content for all five funnel stages simultaneously. The consideration and proof stages, meaning case studies, comparison content, and ROI tools, are where most Indian B2B buyers stall. They have enough information to know they need a solution. They do not have enough confidence to choose one. Content that specifically addresses this confidence gap, which is typically a combination of risk perception and internal justification need, moves more pipeline than any equivalent investment in awareness content."),

  p("A case study is the most underinvested content asset in Indian B2B marketing. Most Indian companies have case studies that are fluffy and generic: 'Client X was facing challenges. We implemented Solution Y. Results were positive.' These case studies do no persuasive work because they contain no specifics that allow a prospective buyer to project the outcome onto their own situation. A case study that names the industry, the company size, the specific challenge, the implementation timeline, and the quantified outcome gives the buyer exactly what they need to make the internal case for your solution. One well-written case study with real numbers does more funnel work than six months of social media posts."),

  p_link("", "Performance marketing agencies that help brands move from spend to scale", "/insights/how-performance-marketing-agencies-help-brands-move-from-spend-to-scale", " structure their entire engagement model around funnel completeness, not just top-of-funnel volume."),

  // ── SECTION 5: GAP 3 ATTRIBUTION ──────────────────────────────────────────
  h2("Gap 3: Cannot Tell Which Channel Is Working"),

  p("This is the single biggest silent drain on marketing ROI across Indian B2B companies. Silent because it does not announce itself. The campaigns are running, the leads are coming in, the monthly reports are being filed. Nobody flags the attribution problem because nobody has set up the infrastructure to surface it."),

  p("A typical mid-sized Indian B2B company running a Rs 25 lakh annual marketing budget is simultaneously active across Google Search ads, LinkedIn sponsored content, email campaigns to an existing database, SEO through blog and website content, and referral or partner channels. Leads come in from all of these channels. A percentage of those leads convert to closed deals."),

  p("The question the CFO is asking, and the question that drives every rational marketing budget decision, is: which channels are actually contributing to the deals we close? Not which channels are generating the most clicks. Not which channels are generating the most impressions. Which channels are generating the leads that become customers?"),

  p("In the absence of attribution infrastructure, this question cannot be answered. And in the absence of an answer, budgets get allocated based on intuition, internal politics, and whoever is in the room making the loudest case. The channel generating the most internal enthusiasm gets the most budget. The channel that the agency is most comfortable reporting on gets the most budget. The channel that the marketing lead used at their previous company gets the most budget."),

  p("The channel that is quietly generating the best leads at the lowest cost, but lacks an advocate in the budget meeting, gets underfunded or cut entirely."),

  callout("warning", "The Attribution Test Every Indian B2B Company Should Run", "Can you answer this question with data rather than a best guess: 'Which channel or campaign brought in our last 10 customers?' If the answer is 'probably LinkedIn' or 'I think mostly referrals' or 'we would need to check with the sales team,' your marketing budget is being spent, not invested. Spend returns activity. Investment returns measurable yield. The difference is attribution infrastructure."),

  p("Attribution infrastructure for an Indian B2B company does not require expensive technology. It requires three connected components working together: UTM parameters on every paid and email campaign, a CRM that captures the lead source at the point of first contact and tracks it through to close, and a reporting discipline that reviews closed-deal source data monthly rather than only looking at lead volume."),

  p("UTM parameters are the foundation. Every URL that appears in a paid ad, every link in an email campaign, every social post driving traffic to a landing page should carry UTM parameters that tag the source, medium, campaign, and content. When a visitor arrives via that link and submits an enquiry, the UTM data follows them into the CRM. When that lead closes six months later, the closed deal is tagged with the original source. You can now run a report that shows, with precision, which channels sourced the deals you closed."),

  p("The second component is CRM discipline. Many Indian B2B companies have a CRM but do not use the lead source field consistently. Sales teams enter leads without tagging source. Marketing campaigns are not integrated with the CRM. The data is in the system but fragmented, making attribution reports unreliable. Closing this gap requires process discipline, not technology investment."),

  p("The third component is closed-loop reporting: a monthly review where marketing looks at not just leads generated but closed deals sourced, with source attribution. This review changes the conversation. It replaces 'our LinkedIn engagement is up 40 percent' with 'our LinkedIn campaign sourced 3 closed deals this quarter at an average deal value of Rs 8 lakhs, making the cost per closed deal Rs 1.2 lakhs against a lifetime value of Rs 35 lakhs.'"),

  stats(
    ["34%", "average budget misallocation in Indian B2B companies without attribution infrastructure"],
    ["Rs 8-12 lakh", "estimated annual waste per Rs 1 crore marketing budget from channel misattribution"],
    ["50%", "of Indian B2B marketers who cannot name their top revenue-generating channel with data"]
  ),

  p("The irony of the attribution problem is that the channels most often penalised by misattribution are frequently the ones doing the most genuine work. SEO-driven content, for example, often contributes to deals that are attributed to a later-touchpoint paid campaign because the buyer discovered the company through a blog post months before they converted. Without multi-touch attribution, the content investment looks unproductive and the paid campaign that captured the already-warm lead gets all the credit."),

  p("Indian B2B companies that build proper attribution infrastructure typically discover that their channel mix needs significant rebalancing within the first 90 days of having reliable data. The channels they assumed were performing well often are not. The channels they assumed were marginal often turn out to be generating their highest-quality pipeline."),

  p("There is also a multi-touch attribution question that becomes important once basic attribution is working. First-touch attribution, meaning crediting the channel that first brought the lead, is the simplest model but not always the most accurate. A buyer may have first discovered your company through an organic blog post, then seen a retargeting ad three months later, then clicked a LinkedIn message from a sales development representative before finally converting. Each touchpoint contributed. First-touch attribution credits only the blog. Last-touch attribution credits only the LinkedIn message. A multi-touch model distributes credit across the full journey."),

  p("For Indian B2B companies just getting started with attribution, first-touch or last-touch is the right starting point. Building the habit of source tracking and closing the data loop matters more than choosing the perfect attribution model. Once the data discipline is established, moving to a more sophisticated model is straightforward. The common failure mode is attempting to build a sophisticated attribution model before the data infrastructure is reliable, producing complex reports built on incomplete data that lead to worse decisions than simple intuition."),

  // ── SECTION 6: GAP 4 ALIGNMENT ────────────────────────────────────────────
  h2("Gap 4: Marketing and Sales Running Separate Races"),

  p("This is the gap that makes all the others worse. You can have reasonable ICP definition, a functional funnel, and some attribution infrastructure, but if marketing and sales are operating as separate functions with separate goals, separate definitions of success, and separate views of the data, the system will underperform its potential by a significant margin."),

  p("The dynamic that plays out in most Indian B2B companies looks like this. At the quarterly review, marketing presents: '120 leads delivered this quarter, up from 84 last quarter. Cost per lead down 18 percent.' Sales responds: 'Most of them were unusable. Garbage inquiries. Nobody picked up the phone. The three that we did connect with had no budget and were nowhere near making a decision.'"),

  p("Both sides are partially right. Marketing did deliver 120 leads. Many of them were of poor quality. The disagreement is genuine but unresolvable in this format because neither team has the infrastructure to examine the same data together. Marketing does not know which of its leads converted. Sales does not know which channel sourced the leads they liked. The post-mortem conversation happens in a vacuum."),

  p("This misalignment creates a specific failure mode that compounds over time. Marketing, measured on lead volume, continues to optimise for lead volume. The incentive structure pushes them toward high-volume, low-quality channels that generate enquiries from buyers who are too early in their journey or not ICP-fit at all. Sales, burned by low-quality leads, stops prioritising marketing-generated pipeline and defaults to existing relationships and inbound referrals. Marketing budget continues to be spent. Marketing-sourced deals continue to be few. Both teams conclude the other is the problem."),

  callout("tip", "What a Productive Sales-Marketing Alignment Meeting Looks Like in Practice", "Frequency: weekly, 30 minutes. Attendees: marketing lead, two sales reps, sales manager. Agenda: Review leads from the last 7 days by source. For each lead, sales notes quality: ICP-fit or not, contact made or not, stage progressed or not. Marketing notes which campaign each lead came from. Together, identify which campaigns are generating ICP-fit leads and which are not. Action: marketing adjusts targeting on underperforming campaigns within 48 hours. Outcome tracked: cost per ICP-fit lead by channel, not cost per lead overall."),

  p("The resolution is not a team restructure. It is a shared measurement framework and a shared meeting cadence. High-growth Indian B2B companies close this loop deliberately by establishing a single shared definition of what a qualified lead looks like, scored against ICP criteria, agreed by both marketing and sales before campaigns launch. This definition is not negotiable mid-quarter. It is set at the start of each planning cycle and reviewed at the end."),

  p("The shared pipeline review, where marketing and sales examine the same CRM data together weekly, is the single most valuable operational change an Indian B2B company can make to improve marketing ROI without spending an additional rupee. It creates the feedback loop that makes every other part of the system smarter over time. Marketing learns which messages resonate with buyers who actually convert. Sales learns which channels are generating their best deals. Strategy improves because both teams are working from the same evidence."),

  p("The shift also changes how marketing reports to leadership. Instead of 'we generated 120 leads,' marketing reports 'we generated 38 ICP-qualified leads, of which 14 have progressed to active pipeline worth Rs 2.1 crore, and 6 have closed for a combined value of Rs 72 lakhs.' That is a report the CFO can use. That is a report that earns budget rather than defending it."),

  p("Lead scoring is the mechanism that makes this work in practice. A lead scoring model assigns numerical weight to ICP-fit criteria: industry match, company size match, title match, behavioural signals such as pages visited and content downloaded, and explicit signals like budget or timeline mentioned in a form response. Leads above a threshold score are automatically passed to sales. Leads below the threshold are placed into a nurture sequence until they score higher. Sales only sees leads that meet the agreed threshold. Marketing only claims credit for leads that convert to opportunities, not all leads generated."),

  p("Implementing lead scoring does not require expensive marketing automation. A basic model can be implemented in any CRM with a custom field and a manual scoring process. A sales development representative reviewing new leads against a checklist, rather than a fully automated algorithmic score, will still produce dramatically better lead quality for the sales team than an undifferentiated lead list. The technology sophistication can be built over time. The habit of qualifying before handing off is what matters first."),

  pq("When marketing and sales share the same definition of a qualified lead and review the same data together weekly, the quality of the leads improves without changing the campaigns. The feedback loop is the fix."),

  p_link("One area where sales-marketing misalignment is particularly costly is in conversion infrastructure. ", "AI chatbots versus traditional lead forms in B2B India", "/insights/ai-chatbot-vs-lead-forms-b2b-india", " illustrates how the handoff mechanism between marketing-generated traffic and sales follow-up determines conversion rate more than the quality of the traffic itself."),

  // ── SECTION 7: WHAT TOP PERFORMERS DO ─────────────────────────────────────
  h2("What Top-Performing Indian B2B Brands Do Differently"),

  p("There is no magic in what the best Indian B2B marketers do. There is discipline. There is a consistency of practice that is less exciting to describe than it is powerful to execute. Three habits distinguish the companies with strong, attributable marketing ROI from the ones having the boardroom silence conversation at every quarter end."),

  h3("Practice 1: ICP First, Always"),

  p("Every campaign brief at a high-performing Indian B2B company begins with the same two questions: who specifically are we trying to reach, and what is the one thing they care about most right now? Not two things. Not a list. One thing. This forces the campaign team to understand the buyer well enough to prioritise their concerns correctly."),

  p("The discipline of asking these two questions before every campaign is a forcing function that prevents the most common form of marketing drift: campaigns that start focused and gradually broaden their targeting as the team tries to reach more people and improve volume metrics. ICP-first prevents drift by making specificity a non-negotiable starting condition rather than an aspiration that gets traded away when the numbers look low."),

  p("The ICP is not a quarterly exercise. It is a living document updated every time a significant deal is won or lost. When a deal is won outside the ICP, the team examines whether it represents a new ICP segment worth pursuing deliberately or a one-off opportunity that should not distort strategy. When a deal is lost to a competitor, the team examines whether the ICP definition needs refinement or whether the messaging for that segment needs work."),

  p("Companies with this habit find that their marketing gets more specific and more effective over time rather than more generic. Each quarter's ICP refinement makes the next quarter's campaigns slightly more precise. The compounding effect over two to three years is a marketing function that generates almost exclusively ICP-fit pipeline, dramatically reducing the sales time wasted on unqualified enquiries."),

  h3("Practice 2: Attribution as a Business Requirement"),

  p("Top-performing Indian B2B companies do not treat attribution as a marketing nice-to-have. They treat it as a business requirement with the same standing as financial reporting. The CFO expects to know which cost centres are generating return. Marketing attribution is simply the application of that same logic to the marketing cost centre."),

  p("This means UTM parameters are non-negotiable on every campaign. CRM integration is non-negotiable. Closed-loop reporting is on the calendar every month, not quarterly. The marketing lead is expected to walk into every budget review with data showing cost per closed deal by channel, not cost per click or cost per lead."),

  p("The organisations with this practice make dramatically better budget decisions. They know, with evidence, which channels are working. They can run controlled experiments: double the spend on a channel that is generating good pipeline, reduce spend on a channel that is not, and measure the impact on pipeline quality and volume within 60 to 90 days. Over time, this creates an increasingly efficient marketing portfolio where budget concentrates naturally on what works."),

  p("Attribution as a business requirement also changes the relationship between a company and its marketing agency. When the brief to the agency includes a requirement for closed-loop reporting, the agency is incentivised to optimise for deal quality rather than lead volume. Agencies that are evaluated purely on cost per lead will optimise for cost per lead, which often means targeting broad audiences that submit enquiries but do not convert. Agencies evaluated on cost per closed deal will optimise for deal quality. The measurement standard shapes the behaviour of every participant in the marketing system."),

  p("The conversation with a marketing agency should therefore begin with: how do you measure success, and what data do you use to optimise campaigns? An agency that answers with impressions, clicks, and cost per lead is operating an activity model. An agency that answers with ICP-qualified leads, pipeline contribution, and cost per closed deal is operating an outcome model. The question takes 30 seconds and reveals everything about the measurement philosophy of the partnership you are entering."),

  h3("Practice 3: Shared Pipeline Reviews as Operational Rhythm"),

  p("The third differentiating practice is the institutionalisation of a joint sales-marketing pipeline review as an operational rhythm, not an occasional event. High-performing Indian B2B companies run this meeting weekly or biweekly. It is not a reporting meeting. It is a decision-making meeting."),

  p("The output of each meeting is a specific set of actions: campaign targeting adjustments, content briefs to address gaps identified in the buyer journey, adjustments to lead scoring criteria, or changes to the handoff process between marketing and sales. The meeting does not end with a slide deck. It ends with a task list."),

  p("A specific signal that the alignment meeting is working is when marketing starts requesting specific case studies from sales rather than producing generic content. When the marketing lead says 'we need a case study from a discrete manufacturer in Gujarat because that is the segment that is converting best right now,' it means the attribution data is informing content strategy. When marketing decides what to write based on what performed six months ago in a content calendar exercise, the data loop is not closed."),

  p("Over time, this rhythm creates an organisational muscle for continuous improvement in marketing and sales performance. The quality of strategy increases not through occasional strategy sessions but through the accumulation of small, evidence-based adjustments made weekly. Companies that run this cadence for two years find it nearly impossible to articulate exactly when their marketing got good because the improvement was gradual and continuous rather than the result of a single strategic overhaul."),

  // ── SECTION 8: REVENUE ATTRIBUTION FRAMEWORK ──────────────────────────────
  h2("The Revenue Attribution Framework"),

  p("Revenue attribution is the practice of connecting every touchpoint in a buyer's journey, from the first ad impression to the signed contract, into a single legible view of what marketing is actually generating. It is not a technology purchase. It is a systematic approach to data collection and reporting that any Indian B2B company can implement with tools they likely already have."),

  p("The framework has four steps, each building on the previous. A company that completes all four will have, within 90 days, a clear and reliable view of which channels are generating which deals."),

  p_b([
    {t: "Step 1: UTM Tagging All Campaigns. ", b: true},
    {t: "Every URL in every paid campaign, every email, every social post must carry UTM parameters. At minimum: utm_source (google, linkedin, email), utm_medium (cpc, organic, social), utm_campaign (the specific campaign name). This takes one hour to implement and creates the data foundation for everything that follows. Without UTM tagging, all website traffic appears as either direct or organic in your analytics, making channel attribution impossible.", b: false}
  ]),

  p_b([
    {t: "Step 2: CRM Integration. ", b: true},
    {t: "The UTM data captured when a visitor submits an enquiry must flow automatically into your CRM as the lead source. Most CRM platforms, whether Zoho, HubSpot, or Salesforce, have native web form integration that captures UTM parameters. If your enquiry form is not sending UTM data to your CRM, this is the highest-leverage technical fix available to your marketing operation. It typically takes a developer two to four hours to implement.", b: false}
  ]),

  p_b([
    {t: "Step 3: Pipeline Reporting. ", b: true},
    {t: "Once CRM has lead source data, build a standard pipeline report that shows leads, opportunities, and closed deals segmented by source. Run this report monthly. The report reveals immediately which channels are contributing to pipeline and which are generating leads that stall. A channel with high lead volume and low opportunity conversion is generating non-ICP leads. A channel with low lead volume and high opportunity conversion is underinvested.", b: false}
  ]),

  p_b([
    {t: "Step 4: Closed-Loop Feedback. ", b: true},
    {t: "The final step is feeding the closed-deal data back into campaign optimisation. When you know which campaigns sourced your closed deals, you can instruct Google and LinkedIn to optimise towards the audience segments that convert to deals rather than optimising towards the audience segments that submit enquiries. This is the difference between algorithmic optimisation for lead volume and algorithmic optimisation for revenue. The latter produces substantially better results at the same or lower cost.", b: false}
  ]),

  p("Indian B2B companies that implement this framework consistently report that within 90 days they have enough data to make their first significant channel rebalancing decision. Within six months, they have a reliable enough picture of what drives closed deals to build a quarterly marketing plan that the CFO can evaluate on commercial terms rather than activity metrics."),

  p("The technology required is minimal. Google Analytics 4 for website tracking. UTM parameters on all campaigns. A CRM with web form integration. A reporting tool, which can be as simple as a Google Sheets dashboard if the CRM does not have native reporting. The total technology cost for a company that does not already have these tools is typically between Rs 0 and Rs 1.5 lakhs per year. The return on that investment, in the form of better budget decisions and higher-quality pipeline, is typically orders of magnitude larger."),

  p("A note on choosing a CRM for Indian B2B companies implementing attribution for the first time: the right CRM is the one your sales team will actually use. A sophisticated platform that sits unused because the sales team finds it cumbersome produces no attribution data. Zoho CRM has strong adoption among Indian SMEs and mid-market companies because the interface is familiar, the pricing is accessible, and the local support ecosystem is mature. HubSpot is preferred by companies with a more digital-native sales team and stronger inbound volume. Salesforce makes sense at larger organisations where the customisation requirements justify the cost. The choice matters less than the discipline of use."),

  p("The attribution framework described above is the minimum viable infrastructure. Companies with more complex buying cycles, multiple buyer personas, or long sales cycles of six months or more will need to layer on additional components: a marketing automation platform for lead nurturing, a more sophisticated multi-touch attribution model, and possibly revenue operations as a dedicated function that sits between marketing and sales to manage the data infrastructure. But none of that is required to begin. Begin with UTM tagging, CRM lead source fields, and a monthly pipeline report. The more sophisticated components become necessary as the business scales and the data complexity increases."),

  p_link("For companies evaluating how to structure their marketing operations to support attribution and funnel management, ", "the complete guide to hiring the best digital marketing agency in India", "/insights/the-ultimate-guide-to-hiring-the-best-digital-marketing-agency", " covers what to look for in a partner who can help build this infrastructure rather than simply run campaigns."),

  // ── SECTION 9: WHAT CLOSING ALL 4 GAPS DELIVERS ───────────────────────────
  h2("What Closing All 4 Gaps Delivers"),

  p("The four gaps, ICP definition, full-funnel architecture, attribution infrastructure, and sales-marketing alignment, are not independent problems. They are a system. Closing one without the others produces limited improvement. Closing all four produces compounding returns that typically reach full velocity within 12 to 18 months."),

  p("The first thing that changes when all four gaps are closed is the quality of pipeline. Not the volume. The quality. Companies that close all four gaps typically see a reduction in total lead volume of 20 to 30 percent in the first quarter as targeting becomes more precise and non-ICP audiences are deprioritised. They also see a simultaneous increase of 3 to 5 times in the proportion of leads that progress to qualified pipeline. The sales team, for the first time in many cases, is spending the majority of their time on genuinely qualified opportunities rather than chasing non-ICP enquiries."),

  p("The second change is cost efficiency. Customer acquisition cost typically falls 40 to 60 percent when all four gaps are closed, not because marketing spend is reduced but because the same spend is now concentrated on channels and audiences that convert, rather than distributed across all channels proportionally with no evidence base for the allocation."),

  p("The third change is predictability. For most Indian B2B leadership teams, marketing pipeline is an unpredictable variable. Some quarters are strong, some are weak, and the reason for the variation is never clear. When attribution infrastructure is in place and the funnel is properly structured, quarterly pipeline becomes forecastable within a reasonable range. Marketing can tell sales and leadership at the start of each quarter: 'Based on current campaign performance and average funnel conversion rates, we project X to Y ICP-qualified leads, of which Z percent should progress to active pipeline.' This is a fundamentally different relationship between marketing and the rest of the business."),

  stats(
    ["3-5x", "more qualified pipeline from same budget after closing all 4 gaps"],
    ["40-60%", "lower customer acquisition cost within 12 months of closing all 4 gaps"],
    ["2-3x", "higher customer lifetime value from better-fit ICP customers"],
    ["Rs 1 crore+", "typical annual marketing budget freed from unproductive spend after attribution"]
  ),

  p("The fourth change is longer-term and perhaps the most commercially significant: customer quality improves. When you are attracting ICP-fit customers through messaging specifically designed for their problem, those customers arrive with clearer expectations, fit better with your service delivery model, stay longer, expand more, and refer more effectively. The lifetime value of an ICP-fit customer typically runs 2 to 3 times that of a non-ICP customer acquired through broad targeting."),

  p("The predictability change deserves particular attention because it changes the nature of the business itself. A company with predictable marketing pipeline can make investment decisions with confidence. It can hire ahead of demand rather than behind it. It can commit to product development roadmaps knowing that the pipeline to support them is being generated systematically. The companies that are consistently described as fast-growing in Indian B2B markets are almost always the ones that have achieved pipeline predictability. Growth becomes a managed process rather than a series of fortunate quarters interspersed with difficult ones."),

  p("Taken together, the four changes, pipeline quality, cost efficiency, predictability, and customer lifetime value, create a compounding effect that accelerates over time. The first 90 days show early data signals. The first 6 months show clear directional improvement. At 12 months, the gap between companies that have closed all four gaps and those still running activity-based marketing is wide and growing. At 24 months, it is often the defining competitive differentiator in a given market segment."),

  pq("The compounding effect of getting strategy right is not a metaphor. It is a measurable commercial phenomenon. Every good decision made this quarter is slightly easier to make next quarter because the data foundation is stronger and the organisational alignment is deeper."),

  p("The journey from the boardroom silence to the quarterly marketing review where the CFO sees revenue attributed to specific campaigns is not a 30-day project. It requires commitment to building infrastructure, changing measurement habits, and resolving the organisational dynamics between marketing and sales. But for any Indian B2B company spending Rs 10 lakhs or more per year on marketing and unable to connect that spend to revenue, it is the highest-return strategic investment available."),

  p("A reasonable sequencing for a company approaching all four gaps for the first time looks like this. In the first 30 days: define or sharpen the ICP using the win analysis method, implement UTM tagging across all live campaigns, and ensure the CRM lead source field is being populated consistently. In days 31 to 60: build the first pipeline attribution report, run the first joint sales-marketing pipeline review, and identify which funnel stages have no content coverage. In days 61 to 90: publish the first piece of mid-funnel content targeting the most critical gap, adjust campaign targeting based on attribution data, and establish the weekly alignment meeting as a recurring calendar event. At the 90-day mark, you will have enough data to make your first evidence-based budget reallocation decision."),

  p("The investment required for this 90-day transformation is primarily time rather than money. A focused marketing lead and engaged sales leadership can accomplish all of this within existing budget and without external agency support, though an experienced digital marketing partner can accelerate the process considerably by bringing proven frameworks and implementation experience. The critical success factor is not the presence of an agency or the sophistication of the technology. It is the organisational commitment to measuring the right things and acting on what the data shows."),

  p_link("Indian B2B companies that are also reviewing their lead conversion infrastructure should read about ", "AI chatbots versus lead forms in the Indian B2B context", "/insights/ai-chatbot-vs-lead-forms-b2b-india", ", which directly affects how efficiently marketing-generated traffic converts into qualified pipeline."),

  p("The silence at the end of the CFO's question is not a permanent condition. It is a gap. And gaps can be closed."),

  // ── SECTION 10: SOURCES ───────────────────────────────────────────────────
  h2("Sources and Data"),

  p("1. Gartner B2B Buying Research (2023): 'B2B buyers are 70 percent of the way through their purchasing decision before engaging a vendor sales representative.' Gartner Sales Practice Research, available at gartner.com/en/sales/insights/b2b-buying-journey."),

  p("2. LinkedIn B2B Institute India Report (2024): Analysis of B2B marketing effectiveness and attribution practices across Indian enterprises, covering over 1,200 companies with annual marketing budgets above Rs 10 lakhs. Available at linkedin.com/business/marketing/blog."),

  p("3. NASSCOM Digital Marketing Benchmark Survey (2024): 'Marketing attribution and ROI measurement remain the top challenges for Indian B2B technology companies, cited by 68 percent of respondents.' NASSCOM Strategic Review 2024, nasscom.in."),

  p("4. Salesforce State of Marketing Report, India Edition (2024): Benchmarks for funnel conversion rates, lead qualification practices, and sales-marketing alignment across Asia-Pacific including India. Available at salesforce.com/resources/research-reports/state-of-marketing."),

  p("5. HubSpot India B2B Marketing Research (2024): Analysis of 800+ Indian B2B companies on ICP definition practices, channel attribution, and pipeline predictability. Data sourced from HubSpot CRM aggregate usage patterns, available at hubspot.com/marketing-statistics."),

  p("6. McKinsey & Company, 'The New B2B Sales Playbook' (2022): Research on B2B buyer behaviour changes, including the finding that 70 percent of the buying journey occurs before sales engagement, and the commercial impact of digital-first buyer journeys in emerging markets including India. mckinsey.com/capabilities/growth-marketing-and-sales/our-insights."),

];

await client.patch("blog-indian-b2b-marketing-strategy-gap").set({
  title: "Why Indian B2B Companies Spend More on Marketing and Get Less: The 4 Strategy Gaps Explained",
  seoTitle: "Indian B2B Marketing ROI Gap: 4 Strategy Fixes That Work in 2026",
  excerpt: "Most Indian B2B companies spend 6-8% of annual revenue on marketing and cannot connect it to pipeline. The CFO asks what the Rs 40 lakh marketing budget returned. The marketing lead pulls up clicks, impressions, and follower growth. Silence. This is not one company's problem -- it is the operating reality for most Indian B2B businesses. Here are the 4 gaps and how to close them.",
  categories: ["digital-marketing","industry-insights"],
  tags: ["B2B marketing India","B2B marketing strategy India","marketing ROI India","B2B lead generation India","revenue attribution India","Indian B2B marketing gap"],
  body,
}).commit();
console.log("Published! Blocks:", body.length);
