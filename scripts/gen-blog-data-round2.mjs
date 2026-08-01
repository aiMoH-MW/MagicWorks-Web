/**
 * gen-blog-data-round2.mjs
 *
 * Generates Portable Text JSON (body blocks + FAQ) for the second batch of
 * 5 AI Consultation blog posts (author: Mohan Chute), matching the exact
 * shape scripts/publish-5-ai-consultation-blogs-round2.mjs expects:
 *   { blocks: [...], faq: [{ question, answer }, ...] }
 *
 * Run: node scripts/gen-blog-data-round2.mjs
 * Output: scripts/blog-data/blog-6..10-*.json
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "blog-data");

// ── Key generator (unique per run) ─────────────────────────────────────────
let _n = 0;
function k(prefix = "b") { return `${prefix}${++_n}${Math.random().toString(36).slice(2, 5)}`; }

// ── Portable Text builders ─────────────────────────────────────────────────
function p(text) {
  return { _type: "block", _key: k(), style: "normal", markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
}
// paragraph whose leading phrase is bold
function pLead(strongText, restText) {
  return { _type: "block", _key: k(), style: "normal", markDefs: [],
    children: [
      { _type: "span", _key: k("s"), text: strongText, marks: ["strong"] },
      { _type: "span", _key: k("s"), text: restText, marks: [] },
    ] };
}
// paragraph with a single inline link in the middle
function pLink(before, linkText, href, after) {
  const lk = k("lk");
  return { _type: "block", _key: k(), style: "normal",
    markDefs: [{ _key: lk, _type: "link", href }],
    children: [
      { _type: "span", _key: k("s"), text: before, marks: [] },
      { _type: "span", _key: k("s"), text: linkText, marks: [lk] },
      { _type: "span", _key: k("s"), text: after, marks: [] },
    ] };
}
// paragraph with two inline links
function pLink2(before, l1Text, l1Href, mid, l2Text, l2Href, after) {
  const lk1 = k("lk"); const lk2 = k("lk");
  return { _type: "block", _key: k(), style: "normal",
    markDefs: [{ _key: lk1, _type: "link", href: l1Href }, { _key: lk2, _type: "link", href: l2Href }],
    children: [
      { _type: "span", _key: k("s"), text: before, marks: [] },
      { _type: "span", _key: k("s"), text: l1Text, marks: [lk1] },
      { _type: "span", _key: k("s"), text: mid, marks: [] },
      { _type: "span", _key: k("s"), text: l2Text, marks: [lk2] },
      { _type: "span", _key: k("s"), text: after, marks: [] },
    ] };
}
function h2(text) {
  return { _type: "block", _key: k(), style: "h2", markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
}
function h3(text) {
  return { _type: "block", _key: k(), style: "h3", markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
}
function authorBio() {
  return { _type: "block", _key: k(), style: "normal", markDefs: [],
    children: [{ _type: "span", _key: k("s"),
      text: "Mohan Chute is the founder of MagicWorks IT Solutions, with 17+ years across digital marketing, web strategy, and AI. He writes from inside live client engagements, not theory.",
      marks: ["em"] }] };
}

const AI_HUB = "/services/ai-consultation";
const PROCESS_AUDIT = "/services/ai-consultation/process-audit";
const VENDOR_SPRINT = "/services/ai-consultation/vendor-sprint";
const EMBEDDED_ADVISOR = "/services/ai-consultation/embedded-advisor";
const WORKSHOP = "/services/ai-consultation/workshop";
const BLOG1 = "/blog/from-audit-to-action-ai-roadmap";
const BLOG2 = "/blog/build-buy-or-wait-ai-investment-decision";
const BLOG3 = "/blog/vendor-neutral-ai-advisor-embedded-engagement";
const BLOG4 = "/blog/ai-literacy-gap-leadership-alignment";
const BLOG5 = "/blog/how-to-evaluate-ai-vendor-india-due-diligence-checklist";

function write(file, blocks, faq) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, file), JSON.stringify({ blocks, faq }, null, 2));
  console.log(`✅  ${file}  (${blocks.length} blocks, ${faq.length} FAQs)`);
}

// ════════════════════════════════════════════════════════════════════════
// BLOG 6 — Data Readiness
// ════════════════════════════════════════════════════════════════════════
{
  const blocks = [
    pLead("Almost every stalled AI project gets blamed on the model.", " In our experience, the model is rarely the actual problem. What fails first, quietly and much earlier, is the data the model was supposed to learn from: fragmented across systems nobody reconciled, inconsistently labelled, or simply too thin in history to validate anything against. By the time this becomes visible, it usually looks like an AI problem. It started as a data problem months before any AI vendor was in the room."),
    p("This is written for founders, COOs, and operations leaders at Indian mid-market firms who are about to commission an AI initiative, or who already ran one that quietly underdelivered and are trying to work out why. If the honest answer to \"why did the pilot disappoint us\" is somewhere in your data, not your vendor, this is the piece that explains what to check before you sign the next contract."),
    h2("The failure shows up as an AI problem, but it started earlier"),
    p("The pattern is consistent enough to recognise on sight. A vendor demo works cleanly on a curated sample dataset. The business signs off on a pilot. Three months in, the tool's accuracy on real, messy company data is noticeably worse than what the demo promised, and the conversation shifts to whether the model needs retraining, whether the vendor oversold the product, or whether AI simply isn't ready for this use case yet. Rarely does the conversation start with the data the model was actually asked to work with, even though that is almost always where the gap opened up."),
    p("None of this is a knock on the vendors involved. A model can only be as good as the signal it is given. If your CRM has three different spellings of the same client name, if your inventory system and your finance system disagree about what \"in stock\" means, or if the only record of why a claim was rejected sits in a relationship manager's memory rather than a structured field, no amount of model sophistication closes that gap. It has to be closed on the data side, and that work has to happen before the AI initiative starts, not as an emergency fix once results disappoint."),
    h3("Three data problems that never show up in a sales demo"),
    pLead("Fragmented records across systems.", " Most mid-sized Indian firms run on a patchwork: a CRM here, a tally or ERP export there, WhatsApp and email threads holding decisions that never made it into either. A vendor demo is built on a clean export. Production reality is reconciling three sources that were never designed to agree with each other, and discovering the disagreement only once the AI tool starts producing answers that don't match what the sales team already knows to be true."),
    pLead("Undocumented business logic.", " Every organisation has rules that live in someone's head rather than in a field: which customers get a discount and why, which supplier substitutions are acceptable, which exceptions to the standard process are actually routine. An AI system trained only on the structured data will miss all of this, and the result looks like the AI \"getting it wrong\" when it is more accurately described as the AI never having been told the rule in the first place."),
    pLead("Inconsistent labelling and free text.", " A field called \"status\" that contains \"done\", \"Done\", \"complete\", \"Completed - see notes\", and a blank cell all meaning roughly the same thing is a common finding, not an edge case. It is invisible in a spreadsheet a human reads casually, and it is exactly the kind of noise that quietly degrades anything built on top of it."),
    h2("What a real data-readiness check actually looks at"),
    h3("Where does the data live, and who can actually touch it"),
    p("The first question is less technical than it sounds: for the specific process you want AI to help with, which systems hold the relevant data, and does anyone have write access and export rights across all of them without waiting on a different department's IT ticket. A surprising number of AI initiatives stall for weeks not because the data is bad, but because getting a clean export of it requires three separate approvals that nobody scoped in at the start."),
    h3("How clean is it, actually, not \"mostly clean\""),
    p("\"Mostly clean\" is doing a lot of work in that sentence, and it is worth pressure-testing before an initiative is scoped. A readiness check samples a meaningful slice of the actual records the AI would use, not a curated example set, and checks it against the questions a model will actually need answered: are the categories consistent, is the free text parseable, are there enough non-null values in the fields that matter for the use case to be viable at all."),
    h3("Is there enough history to validate against"),
    p("Even perfectly structured data can be too thin to be useful. A model meant to predict demand needs enough historical cycles to have seen the pattern it is being asked to recognise; a model meant to flag anomalies needs enough \"normal\" examples to know what abnormal looks like. A readiness check asks, explicitly, whether the available history covers enough cycles and enough variation, or whether the first phase of any real initiative needs to be building that history before AI can meaningfully use it."),
    h2("The uncomfortable finding most readiness checks produce"),
    p("Here is what tends to happen once this work is done honestly: the flagship use case that motivated the whole initiative, the one leadership is most excited about, often turns out not to be data-ready yet. A smaller, less exciting, adjacent use case usually is. A manufacturing firm that wants AI-assisted demand forecasting frequently discovers that its sales-order history is structured well enough to support it, while the process everyone actually cares most about, say, predictive maintenance on plant equipment, depends on sensor logs that were never captured in a usable form to begin with."),
    p("This is not a reason to abandon the ambitious use case. It is a reason to sequence it correctly: start where the data already supports a real result, and treat building the missing data foundation for the bigger opportunity as its own named, budgeted piece of work, rather than something quietly folded into \"phase one\" and then blamed on the AI when it doesn't materialise on schedule."),
    h2("Who should own the data-readiness fix"),
    p("This is the part organisations most often get wrong structurally. Data-readiness work tends to fall in the gap between IT, which owns the systems but not the business meaning of the data inside them, and the process owner, who understands the business meaning but rarely has the access or the mandate to reconcile records across systems. Neither side is wrong to hesitate: it genuinely isn't fully their job. It has to be explicitly assigned to one named owner, with authority to pull people from both sides in, before the AI initiative is scoped, not once it stalls."),
    pLink("In practice, this is one of the first things a properly run ", "AI process audit", PROCESS_AUDIT, " should surface: not just which processes are good AI candidates, but which of them are actually ready today versus which need data-foundation work first. Skipping this step is the single most common reason a promising initiative underperforms in its first quarter."),
    h2("Signs your organisation isn't data-ready yet"),
    pLead("Nobody can produce a clean export without a meeting.", " If pulling a representative sample of the data in question requires coordinating three people and a week of back-and-forth, that friction is itself the finding: the data isn't organised for anyone, human or AI, to use quickly."),
    pLead("The same customer or product appears under multiple spellings or IDs.", " This sounds trivial until an AI tool starts treating what should be one entity as several, quietly fragmenting whatever pattern it was supposed to detect."),
    pLead("\"We know what that field really means\" is a common sentence in meetings.", " If institutional knowledge is routinely required to interpret a field correctly, that knowledge needs to be captured in structured form before an automated system can be expected to interpret it correctly on its own."),
    pLead("History exists, but only after a system migration two years ago.", " A shorter, cleaner history is often more useful than a longer, fragmented one, but it needs to be checked explicitly rather than assumed to be sufficient because a start date sounds long enough."),
    h2("What fixing this costs, in practical terms"),
    p("Data-readiness work is rarely as expensive as leadership fears, and rarely as fast as vendors imply. For a single, well-scoped process, it is often measured in a small number of weeks: reconciling one or two systems, standardising a handful of fields, and documenting the business rules that currently live only in someone's head. The cost that actually matters is not the effort itself, but the decision to do it deliberately, on its own timeline, rather than discovering it is needed halfway through a pilot that was scoped without it, when it becomes an unplanned delay that erodes confidence in the whole initiative."),
    h2("Where this fits"),
    pLink2("If you are scoping an AI initiative and want an honest answer on whether your data can actually support it before you commit budget to a vendor, that is precisely what our ", "AI Process Audit & Roadmap", PROCESS_AUDIT, " engagement is built to establish early, alongside our broader ", "AI Consultation", AI_HUB, " practice, which is consultation-only: we tell you what's ready, what isn't, and what order to tackle it in, and you choose who builds it."),
    pLink("Once the roadmap exists, the discipline of actually executing it, rather than letting good findings quietly stall, is its own separate challenge; see our note on turning ", "audit findings into a roadmap you can execute", BLOG1, " for what that looks like in practice."),
    authorBio(),
  ];
  const faq = [
    { question: "How long does a data-readiness check take before an AI project starts?", answer: "For a single, well-scoped process, one to three weeks is typical: enough time to sample real records across the relevant systems, check for consistency and history depth, and document the business rules that currently live outside any structured field. Longer timelines usually mean the scope has quietly expanded to cover multiple processes at once." },
    { question: "Can we just fix the data as we go, alongside the AI pilot?", answer: "You can, but it is worth doing with eyes open: fixing data mid-pilot usually means the pilot's early results are measuring the data problem more than the AI's actual capability, which makes it hard to judge the tool fairly and easy to blame the wrong thing when results disappoint." },
    { question: "What if the readiness check says our flagship use case isn't ready yet?", answer: "That is a common and genuinely useful outcome, not a failure. It usually means starting with a smaller, adjacent use case where the data already supports a real result, while treating the data-foundation work for the bigger opportunity as its own named, budgeted phase rather than an assumption baked silently into the first pilot." },
    { question: "Who inside our company should be responsible for data readiness?", answer: "It needs a single named owner with the authority to pull people from both IT and the relevant business process together, because the work genuinely sits between the two. Leaving it undecided is how it falls through the gap between departments that each assume it's someone else's responsibility." },
    { question: "Does a small or mid-sized company really need a formal data-readiness check, or is that overkill?", answer: "The formality should scale to the initiative, not be skipped entirely. Even an informal version, sampling real records and asking the three questions above honestly, catches most of the expensive surprises. What tends to go wrong is skipping the check altogether because the initiative feels too small to warrant it, only to discover the data problem after the vendor contract is already signed." },
  ];
  write("blog-6-data-readiness-before-ai.json", blocks, faq);
}

// ════════════════════════════════════════════════════════════════════════
// BLOG 7 — Change Management / People Side of AI Adoption
// ════════════════════════════════════════════════════════════════════════
{
  const blocks = [
    pLead("The tool almost always works. Adoption is what fails.", " We have watched technically sound AI deployments sit unused six months after go-live, not because the model performed poorly, but because the people whose daily work it touched never actually changed how they worked. The dashboard exists. The old spreadsheet, run in parallel out of habit, is still the one decisions get made from."),
    p("This is written for founders, COOs, and operations heads at Indian mid-market firms who have deployed, or are about to deploy, an AI tool into a live team process. It assumes the technical build is sound; it is about the much harder, much less discussed problem of getting people to actually trust and use it."),
    h2("Why \"the tool is ready\" and \"the team has adopted it\" are different milestones"),
    p("A go-live date marks when a system is technically available. It says nothing about whether the people who are supposed to use it have changed their actual behaviour. These two milestones get conflated constantly in project planning, and the gap between them is where most AI initiatives quietly lose their promised return: not at the point of deployment, but in the weeks after, when the old way of working is still faster for an individual employee than learning to trust a new one."),
    p("This gap is rarely captured in a project plan because it doesn't look like a technical risk. It looks like \"change management\", a phrase vague enough that it often gets a single slide in a project kickoff and no further attention until adoption numbers come back low three months later, at which point it's treated as a training problem rather than what it usually is: a trust and incentive problem."),
    h3("Resistance rarely looks like resistance"),
    p("Very few employees openly refuse to use a new AI tool. What actually happens is quieter and harder to spot: the tool gets used exactly enough to satisfy a manager who might ask about it, while the real decision-making quietly continues to happen the old way, off to the side, in a parallel spreadsheet or a WhatsApp thread. This isn't sabotage. It's usually a rational response to a system nobody has yet proven is more reliable than the process it's replacing, from the point of view of the person whose job depends on getting the answer right."),
    h2("Three patterns behind stalled adoption, and what's actually driving each one"),
    pLead("The tool changes who looks competent.", " If a sales manager has built their reputation on gut-feel deal prioritisation and the new AI tool now ranks deals differently, adopting it isn't a neutral act: it's an implicit admission that the old method wasn't as good. Expecting enthusiastic adoption from the person whose expertise the tool is partially replacing, without addressing that directly, is a common and avoidable planning gap."),
    pLead("Nobody explained what the tool gets wrong, only what it gets right.", " Every AI system has known failure modes. If the rollout only communicates the upside, the first time an employee catches the tool making a visibly wrong call, in front of a customer or a colleague, trust collapses immediately and is hard to rebuild. Teams that are told upfront, honestly, where the tool is expected to be weak tend to trust it more, not less, once it performs as described."),
    pLead("The incentive structure still rewards the old behaviour.", " If a team's targets, bonuses, or informal praise still track the old process's metrics, rational employees will keep optimising for those metrics, regardless of what tool sits on their desktop. Adoption follows incentives, not intentions, and a rollout plan that doesn't touch the incentive structure is asking people to work against their own measured performance."),
    h2("What an actual adoption plan needs, beyond training"),
    h3("A named champion inside the team, not just in IT"),
    p("Training delivered by an outside vendor or IT department rarely carries the same weight as a peer inside the team who has visibly adopted the tool and can vouch for it in the team's own language. Effective rollouts identify this person deliberately, often someone respected but not necessarily the most senior, and give them real time and standing to answer questions and troubleshoot in the first few weeks, rather than leaving adoption support entirely to a help desk ticket."),
    h3("A defined parallel-run period with an explicit end date"),
    p("Running the old process alongside the new one for a short, bounded period is reasonable and often necessary for building trust. Running it indefinitely, because nobody set an end date, is how the old process quietly becomes permanent. A workable plan states, in advance, exactly when the parallel run ends and the new tool becomes the system of record, and treats that date as a real deadline rather than an aspiration."),
    h3("Visible correction, not just visible launch"),
    p("The single highest-leverage moment in an adoption timeline is the first time the tool is wrong and someone visibly, openly corrects it and explains why, rather than quietly working around it. Teams that see errors handled transparently build more trust in a system than teams that only ever see a polished, error-free demo, because the transparent correction proves the tool is being actively managed rather than blindly trusted."),
    h2("A concrete example"),
    p("Consider a mid-sized logistics firm that rolled out an AI tool to prioritise which delayed shipments needed manual intervention first. The model was accurate. Adoption stalled anyway, because the two senior dispatchers whose judgment the tool was meant to augment had built their reputations on exactly this kind of prioritisation call, and the tool's rankings occasionally disagreed with theirs in ways nobody had prepared them to expect."),
    p("The fix wasn't a better model. It was making one of the two dispatchers the internal champion, explicitly asking them to flag disagreements between their judgment and the tool's ranking each week, and reviewing those disagreements openly rather than assuming the tool was always right. Within six weeks, the dispatcher was using the tool as a first pass and applying judgment on top of it, rather than ignoring it, because the process had made room for their expertise instead of silently overriding it."),
    h2("Who should own adoption, internally"),
    p("Adoption ownership is frequently left unassigned, on the assumption that it will happen naturally once training is complete. It rarely does. Someone, usually the process owner rather than IT, needs explicit responsibility for tracking actual usage in the weeks after go-live, not just availability, and for surfacing resistance early rather than waiting for a quarterly review to reveal that the old spreadsheet never actually went away."),
    pLink("This is also frequently the same gap that shows up before a roadmap is even approved: if leadership itself doesn't share a common, honest vocabulary for what the tool can and can't do, adoption resistance often starts at the top rather than on the front line. Our note on the ", "AI literacy gap", BLOG4, " covers why that alignment has to happen before a rollout, not during one."),
    h2("Signs adoption is stalling before anyone admits it"),
    pLead("Usage numbers look fine, but nobody can point to a decision the tool actually changed.", " High login counts with no behavioural change is a strong signal the tool is being used to satisfy a metric, not to make decisions."),
    pLead("The parallel spreadsheet is still being updated \"just in case\".", " If the old system is still being maintained months after go-live, it hasn't actually been retired; it has just gone quiet in official meetings while remaining the real system of record."),
    pLead("Questions about the tool are directed at IT rather than at the internal champion.", " This usually means the champion role was never properly established, or the person in it doesn't have the standing or time the role requires."),
    h2("Where this fits"),
    pLink2("If your organisation is planning an AI rollout and wants the people side planned as deliberately as the technical build, that alignment work is a core part of our ", "AI Literacy & Leadership Workshop", WORKSHOP, ", and it sits alongside our broader ", "AI Consultation", AI_HUB, " practice, which is built to help you sequence both the technology and the adoption plan realistically, not just the technology."),
    authorBio(),
  ];
  const faq = [
    { question: "How do we know if our AI tool has a real adoption problem versus just a slow start?", answer: "A slow start typically shows steadily rising usage and a shrinking gap with the old process. A real adoption problem shows flat or superficial usage, decisions still visibly being made the old way, and a parallel spreadsheet or process that never actually gets retired despite the tool being technically available." },
    { question: "Is change management really necessary for a small AI pilot, or only for large rollouts?", answer: "The scale of the change-management effort should match the scale of the behaviour change being asked of the team, not the size of the technical project. A small pilot that asks an experienced employee to trust a new judgment call over their own can face exactly the same resistance a large rollout does." },
    { question: "What's the biggest mistake companies make in AI adoption planning?", answer: "Treating adoption as a training problem rather than a trust and incentive problem. Training explains how to use a tool; it does nothing to address why an employee whose expertise or metrics the tool affects might rationally prefer to keep working the old way." },
    { question: "How long should a parallel-run period last before retiring the old process?", answer: "It varies by process complexity, but the key requirement isn't the exact length, it's that an end date is set explicitly in advance and treated as a real deadline. Open-ended parallel runs are the most common way old processes quietly become permanent." },
    { question: "Should we hide the AI tool's known weaknesses from the team to build confidence?", answer: "No. Teams that are told upfront where a tool is expected to be weak tend to trust it more once it performs as described, because the first visible mistake doesn't come as a surprise that undermines the whole rollout. Hiding weaknesses tends to produce the opposite of the intended effect." },
  ];
  write("blog-7-change-management-ai-adoption.json", blocks, faq);
}

// ════════════════════════════════════════════════════════════════════════
// BLOG 8 — In-House AI Hire vs Embedded Advisor
// ════════════════════════════════════════════════════════════════════════
{
  const blocks = [
    pLead("\"Should we just hire someone for this?\" is the question that comes up in nearly every AI strategy conversation we have.", " It's a reasonable instinct. It's also frequently answered too quickly, in either direction, before the actual shape of the need has been worked out."),
    p("This is written for founders and COOs at companies roughly fifty to five hundred employees who are past the \"should we do anything with AI\" question and now facing a narrower, more practical one: build internal capability by hiring, or bring in an outside advisor on an ongoing basis. Both are legitimate answers. The right one depends on specifics most companies don't examine closely enough before deciding."),
    h2("The two options aren't actually competing for the same job"),
    p("An in-house AI hire and an embedded external advisor are often framed as substitutes, which is part of why the decision gets made on budget alone rather than on fit. They are better understood as different tools solving different problems. A strong in-house hire builds and maintains things day to day, sits in team meetings, and accumulates deep, specific knowledge of your systems over years. An embedded advisor brings pattern recognition from many engagements across companies, a vendor-neutral view unclouded by wanting to build everything themselves, and is structured to be temporary or ongoing at a fraction of a full-time loaded cost."),
    p("Confusing the two leads to two common, expensive mistakes: hiring a single AI lead too early, before there is enough steady, well-defined work to justify a full-time role, and burning out or under-using that person on a portfolio of unrelated one-off requests; or retaining an advisor indefinitely for work that has become repetitive and operational enough that it would now be genuinely cheaper, and better for institutional memory, to bring in-house."),
    h2("Questions that actually determine the right answer"),
    h3("Is the work steady enough to fill a real role, or does it come in bursts?"),
    p("A single, well-defined stream of AI-related work, say, continuously improving one customer-facing recommendation system, can justify a full-time hire once it's mature enough to need daily attention. A scattered set of unrelated AI questions across departments, one quarter it's marketing automation, the next it's supply chain forecasting, rarely does, because no single hire is likely to be genuinely expert across all of it, and the role ends up thin across many things rather than deep in any of them."),
    h3("Do you need vendor-neutral judgment, or an implementer?"),
    p("If the immediate need is evaluating which of three vendors to trust with a specific problem, an in-house hire who will eventually implement whichever vendor is chosen has a structural conflict of interest in that evaluation, even an honest one: their own expertise and preferences will shape the recommendation, consciously or not. An outside advisor with no stake in which vendor wins, and no long-term interest in building everything themselves, is structurally better positioned for that specific judgment call."),
    h3("How much of the value is pattern recognition versus institutional depth?"),
    p("Some of the highest-value AI decisions in a mid-market company come from having seen a dozen similar situations play out elsewhere: which vendor claims tend to hold up under real usage, which build-vs-buy calls similar-sized companies later regretted, which data problems always surface eventually regardless of what a demo shows. That kind of pattern recognition compounds across many companies, not within one. Institutional depth, by contrast, deep familiarity with your specific systems, your team's quirks, your customers' edge cases, compounds only inside your own company, and only an in-house hire builds it."),
    h2("A framework, not a rule"),
    p("Companies at the smaller end of this range, roughly fifty to one hundred fifty employees, usually get more value from an embedded advisor relationship at this stage: the AI-related work is rarely steady enough yet to fill a role, and the vendor-neutral judgment matters disproportionately while the company is still making its first few significant AI decisions. Companies at the larger end, two hundred fifty to five hundred employees, more often have enough steady, well-defined AI work to justify at least one focused in-house hire, frequently alongside a retained advisor for the specific moments, a major vendor decision, an annual roadmap review, that benefit from an outside, pattern-informed view."),
    pLink("This is also where the shape of the engagement matters more than the label: an embedded, vendor-neutral advisory relationship looks and functions differently from either a traditional consulting project or a full-time hire, and it's worth understanding the difference before assuming your only two options are \"hire\" or \"one-off consulting project\". See our note on ", "what a vendor-neutral embedded AI advisor actually does", BLOG3, " month to month for what that middle option looks like in practice."),
    h2("A hybrid that works better than either extreme, in practice"),
    p("The companies we've seen get the best outcomes rarely pick one option permanently. They start with an embedded advisor while the AI roadmap and first few decisions are being made, because the judgment needed at that stage is exactly the vendor-neutral, pattern-informed kind an outsider is best positioned to bring. As specific initiatives mature into steady, well-defined operational work, an in-house hire is brought on to own that work day to day, often someone the advisor helped recruit or evaluate. The advisor relationship then continues at a lighter cadence, for the periodic, higher-stakes decisions, a major vendor renewal, an annual strategy review, rather than disappearing entirely."),
    h2("The mistake to avoid in either direction"),
    pLead("Hiring too early locks in a single perspective before the company has enough data points to know what it actually needs.", " A first AI hire made before any real roadmap exists often ends up shaping the roadmap around their own prior experience and preferences, rather than around what the company's specific situation calls for."),
    pLead("Retaining an advisor indefinitely for work that has become routine wastes money and slows institutional learning.", " If the same advisor is still doing the same operational task eighteen months in, with no plan to transition it in-house, that is worth questioning directly rather than assuming the arrangement is still the efficient one."),
    h2("Who should make this call"),
    p("This decision sits above any single department head, because it involves a genuine trade-off between short-term flexibility and long-term institutional capability that only someone with visibility across the whole company, usually the founder or COO, can weigh properly. Delegating it entirely to whichever department is loudest about needing AI help tends to produce a hire or an engagement scoped around that department's immediate frustration rather than the company's actual medium-term need."),
    h2("Where this fits"),
    pLink2("If you're trying to work out whether your organisation needs an in-house hire, an embedded advisor, or both, and in what sequence, that's exactly the kind of judgment call our ", "embedded advisory", EMBEDDED_ADVISOR, " engagements are designed to help with directly, alongside our broader ", "AI Consultation", AI_HUB, " practice: vendor-neutral by design, so the recommendation reflects your situation rather than anyone's incentive to be hired or retained longer than necessary."),
    authorBio(),
  ];
  const faq = [
    { question: "At what company size does it make sense to hire a full-time AI lead?", answer: "There's no fixed headcount threshold; the better test is whether there is a single, steady stream of AI-related work mature enough to need daily attention. Companies with roughly 250 or more employees more often reach that point, but a smaller company with one dominant, well-defined AI use case can justify it earlier, and a larger company with only scattered AI needs across departments can justify it later." },
    { question: "Isn't an embedded advisor just a more expensive way to get the same thing as a consulting project?", answer: "The structure is different in practice. A consulting project typically ends with a deliverable and a handoff; an embedded advisory relationship continues alongside your team on an ongoing basis, vendor-neutral, without the incentive a traditional project-based consultancy sometimes has to recommend more scope or a specific implementation to sell." },
    { question: "Can we start with an in-house hire and add an advisor later if we need outside judgment?", answer: "Yes, though it's less common than the reverse. It usually happens when a company realises, partway through, that a specific decision, often a major vendor evaluation, genuinely benefits from a vendor-neutral outside view that the in-house hire, however capable, can't fully provide given their existing responsibilities and potential preferences." },
    { question: "What's the biggest risk of hiring an AI lead too early?", answer: "The new hire's own prior experience and preferences tend to shape the company's early AI roadmap by default, simply because there isn't yet an independent, vendor-neutral roadmap for them to execute against. That can lock in a direction that reflects one person's background more than the company's actual situation." },
    { question: "Does an embedded advisor replace the need for any in-house AI capability at all?", answer: "Not usually, and not indefinitely. The advisor model works best for judgment, sequencing, and vendor-neutral evaluation; day-to-day operation of a mature AI tool generally benefits from an in-house owner over time, both for cost efficiency and for retaining institutional knowledge inside the company rather than with an outside party." },
  ];
  write("blog-8-in-house-hire-vs-embedded-advisor.json", blocks, faq);
}

// ════════════════════════════════════════════════════════════════════════
// BLOG 9 — Measuring ROI on an AI Pilot Before Scaling
// ════════════════════════════════════════════════════════════════════════
{
  const blocks = [
    pLead("\"The pilot went well\" is the sentence that precedes more bad scaling decisions than almost any other in AI projects.", " It usually means the tool worked, technically, on the specific slice of the problem the pilot covered. It rarely means anyone measured whether it actually moved a number the business cares about, or whether that result will hold once the pilot expands beyond its original, favourable conditions."),
    p("This is written for founders, COOs, and operations leaders at Indian mid-market firms who are running, or about to run, an AI pilot and want a genuine answer, before committing to scale it, on whether it actually delivered a return worth expanding."),
    h2("Why \"it went well\" isn't a measurement"),
    p("Pilots are almost structurally biased toward looking successful. They're usually run on a favourable slice of the business, with more attention from the team than a fully scaled rollout will ever get again, and with a natural incentive for whoever championed the pilot to interpret ambiguous results generously. None of this is dishonest. It's simply what happens when a small, closely watched test is mistaken for a representative sample of what full-scale performance will look like."),
    p("A genuine ROI measurement has to be defined before the pilot starts, tied to a business outcome rather than a technical one, and checked against what would have happened anyway, not just what happened during the pilot in isolation."),
    h2("The metrics that actually matter, and the ones that quietly substitute for them"),
    h3("Business outcome, not technical performance"),
    pLead("Model accuracy, response time, or usage rate are technical metrics.", " They matter as diagnostics, but none of them is a business outcome on their own. A support chatbot with 95% intent-recognition accuracy that doesn't measurably reduce resolution time or support headcount hasn't yet proven a return; it has proven the model works, which is a different, smaller claim."),
    pLead("The honest question is: what changed in a number leadership already tracks?", " Revenue per rep, cost per resolved ticket, days sales outstanding, defect rate, whatever the process was meant to improve. If the pilot can't point to movement in a metric that predates the AI initiative and would have been tracked regardless, the pilot has demonstrated capability, not value."),
    h3("A believable counterfactual, not just a before-and-after"),
    p("A number improving during the pilot period doesn't by itself prove the AI caused it. Seasonal effects, a concurrent process change, or simply the extra attention a pilot process gets from an engaged team can all move a metric independently of the tool. A credible pilot measurement compares the pilot group against a comparable control, even an imperfect one, a similar team or region that didn't get the new tool, rather than relying solely on a single before-and-after comparison that can't rule out other causes."),
    h3("Performance under normal, not ideal, conditions"),
    p("Pilots often run under conditions that won't persist at scale: a smaller, more engaged team, closer oversight from whoever is championing the project, and a narrower slice of the real-world variation the process eventually has to handle. A pilot ROI figure needs to be checked against whether those favourable conditions are structural to the pilot phase itself, in which case the number will likely shrink once they go away at scale, rather than assumed to be representative of steady-state performance."),
    h2("A concrete example of the gap"),
    p("Consider a B2B services firm that piloted an AI tool to draft first-pass responses to inbound RFPs. During the eight-week pilot, response time dropped sharply, and the team reported the tool as a clear success. What the pilot measurement didn't initially separate out: the pilot ran during the firm's quietest sales quarter, with only the two most experienced proposal writers using the tool, both of whom were also the two people most invested in proving it worked."),
    p("When the tool rolled out to the full team during a busier quarter, response time improvement was real but roughly half of what the pilot had suggested, because the full team's average editing time on AI drafts was higher than the two pilot users', and volume was higher too. The gap wasn't a failure of the tool. It was a pilot measurement that never separated the tool's actual effect from the favourable conditions the pilot happened to run under, which meant the scaling decision was made on an inflated number."),
    h2("What to define before the pilot starts, not after"),
    pLead("The specific business metric the pilot is meant to move, named in advance.", " Not \"improve efficiency\" in general, but a specific number that already exists in a report someone reviews today."),
    pLead("A comparison group or a clear \"what would have happened anyway\" baseline.", " Even an imperfect comparison, a similar team, region, or time period without the tool, beats no comparison at all."),
    pLead("A minimum pilot duration long enough to include at least one normal, non-favourable period.", " A pilot that only ever runs during a quiet quarter or with the most capable team members will systematically overstate what scaling will deliver."),
    pLead("A predetermined threshold for what counts as \"worth scaling\".", " Deciding this after seeing the results invites motivated reasoning; deciding it in advance, even roughly, keeps the scaling decision honest."),
    h2("Who should own this measurement"),
    p("Ownership of the ROI measurement should sit with someone who did not champion the pilot and has no stake in its outcome looking favourable, typically a finance lead or an operations head one level removed from whoever ran the day-to-day pilot. This isn't a matter of trust; it's a structural safeguard against the entirely human tendency to interpret ambiguous results in favour of a project one has personally invested time and credibility into."),
    pLink("This measurement discipline is also one of the clearest, most defensible outputs a properly scoped ", "AI process audit and roadmap", PROCESS_AUDIT, " engagement should produce upfront: a named metric, a baseline, and a threshold, agreed before the pilot starts, not reconstructed afterward to justify whatever happened."),
    h2("Signs a pilot's ROI claim deserves a second look"),
    pLead("The only evidence offered is qualitative: \"the team loves it\", \"it feels faster\".", " Positive sentiment is a reasonable early signal, but it is not, on its own, a measured return."),
    pLead("The comparison is only to the period immediately before the pilot, with no adjustment for season or context.", " This is the most common way a pilot's apparent success turns out to be partly, or entirely, something else."),
    pLead("The person presenting the results is the same person who championed the pilot, with no independent review.", " Not a sign of dishonesty, but a reason to have someone else check the numbers before a scaling budget is approved."),
    h2("Where this fits"),
    pLink2("If you're running an AI pilot and want the ROI question answered honestly, with a real baseline, before you commit to scaling it, that discipline is built into our ", "AI Process Audit & Roadmap", PROCESS_AUDIT, " engagement and our broader ", "AI Consultation", AI_HUB, " practice: consultation-only, so the measurement isn't shaped by an interest in selling you the next phase."),
    authorBio(),
  ];
  const faq = [
    { question: "How long should an AI pilot run before we trust the ROI numbers?", answer: "Long enough to include at least one normal, non-favourable period for the team and the business cycle, not just the most convenient window. A pilot that only runs during a quiet quarter with the most capable users will reliably overstate what happens at scale." },
    { question: "What's the single biggest mistake companies make when measuring pilot ROI?", answer: "Measuring a technical metric, accuracy, usage, speed, and treating it as a business outcome. A model can perform well technically without moving any number leadership actually tracks, and that gap only becomes visible if the business metric was defined and measured from the start." },
    { question: "Do we need a formal control group to measure ROI properly?", answer: "A perfect control group is rarely available in a mid-market company, but even an imperfect comparison, a similar team or region that didn't get the tool during the same period, is far better than a single before-and-after number with no adjustment for other factors that could explain the change." },
    { question: "Who should be responsible for evaluating whether a pilot succeeded?", answer: "Ideally someone who didn't champion the pilot and has no stake in it looking successful, often a finance lead or an operations head one step removed from the day-to-day project. This reduces the natural tendency to interpret ambiguous results generously." },
    { question: "What if the pilot's real ROI turns out to be lower than the initial results suggested?", answer: "That's a common and genuinely useful finding, not a failure of the initiative. It usually means scaling should proceed with adjusted expectations, or that the favourable conditions the pilot ran under need to be addressed directly, more training, better data, realistic team capacity, before a full rollout, rather than assumed away." },
  ];
  write("blog-9-measure-roi-ai-pilot.json", blocks, faq);
}

// ════════════════════════════════════════════════════════════════════════
// BLOG 10 — The AI Pilot Trap (portfolio strategy)
// ════════════════════════════════════════════════════════════════════════
{
  const blocks = [
    pLead("Running five small AI pilots at once feels like momentum.", " In our experience, it is usually the opposite: a company that has five pilots running simultaneously, each owned by a different department, each reporting its own version of success, more often ends up with less usable AI capability a year later than a company that ran one pilot properly and scaled it before starting a second."),
    p("This is written for founders and COOs at Indian mid-market firms who are, or are being encouraged to be, excited about \"AI everywhere\" simultaneously: marketing wants a content tool, operations wants a forecasting model, HR wants a resume screener, and each department is moving forward independently because waiting for a company-wide plan feels slower than just starting."),
    h2("Why parallel pilots feel productive and usually aren't"),
    p("Each individual pilot, viewed in isolation, is defensible. The marketing team's content tool genuinely might save time. The forecasting pilot genuinely might improve accuracy. The problem isn't any single pilot's merit; it's that five pilots running in parallel, each without visibility into the others, compete for the same scarce resources, a small number of people who actually understand both the business processes and enough about AI to evaluate a vendor honestly, without anyone noticing the resource is being spread five ways instead of concentrated on getting one thing genuinely right."),
    p("A year later, the common pattern is five pilots in some intermediate state, none of them properly scaled, each department reporting its own pilot as a partial success because nobody wants to admit theirs stalled, and no organisation-wide capability or lesson actually compounding from the effort spent. Compare this to one pilot, run with full attention and a real measurement discipline, scaled properly, with the lessons from that one experience, what data problems showed up, what vendor claims held up, how adoption actually worked, directly informing a faster, better second pilot."),
    h2("The resource that quietly runs out first"),
    p("It is rarely budget that constrains parallel AI pilots in a mid-market company; most individual pilots are inexpensive enough that five of them together still fit inside a modest overall spend. What runs out is attention from the small number of people, often just one or two, who can meaningfully evaluate whether a given pilot's results are real, ask the vendor the right hard questions, and notice early when a pilot's data foundation isn't there yet. Spread across five simultaneous efforts, that attention becomes thin enough that none of the five gets the scrutiny a single pilot would have received."),
    h2("How this typically starts"),
    p("Parallel pilots rarely begin as a deliberate strategy. They begin because a company-wide AI conversation feels slow, and individual department heads, reasonably, don't want to wait for it before addressing their own team's obvious opportunity. Each pilot is locally rational. The absence of any forum where someone can see all five happening at once, and ask whether that's actually the best use of the company's limited AI-capable attention this year, is the actual gap, not any individual department's decision to move forward."),
    h2("What a portfolio approach looks like instead"),
    h3("One shared view of everything in flight"),
    p("This doesn't require a heavyweight program office. It requires a single, simple, honestly maintained list: every AI initiative currently active anywhere in the company, who owns it, what stage it's in, and what it's asking of the limited pool of people who can properly evaluate AI work. The value isn't in tracking for its own sake; it's in making the trade-off visible before it's made by accident."),
    h3("A forced sequencing conversation, not a ban on parallel work"),
    p("Sequencing doesn't mean only one AI initiative is ever allowed to exist. It means a deliberate conversation happens, with real trade-offs named, about which one or two initiatives get the concentrated attention this quarter, and which genuinely can wait, rather than every department's pilot proceeding by default because nobody was in a position to say no."),
    h3("A rule for when a second pilot is allowed to start"),
    p("The simplest version that tends to work well in practice: a second pilot starts once the first has either scaled successfully or been honestly closed out with a documented reason, not simply once someone in another department gets excited about a new idea. This single rule does more to prevent portfolio sprawl than any amount of governance documentation, because it forces a real decision point rather than an accumulation of open-ended experiments."),
    h2("A concrete illustration"),
    p("A mid-sized professional services firm found itself, within the same year, running an AI drafting tool for one practice area, a client-intake chatbot for the front desk, and a resource-forecasting model for staffing, each championed by a different partner, none coordinated with the others. Eighteen months in, the drafting tool had quietly stalled on adoption, the chatbot had launched but nobody had measured whether it actually reduced front-desk workload, and the forecasting model was still in a data-cleanup phase that had never been properly scoped or resourced."),
    p("The fix wasn't cancelling any of the three outright. It was creating a single shared list of all three, assigning one clear owner across the firm to ask, honestly, which one deserved the concentrated attention needed to actually finish, and pausing the other two deliberately, with a stated reason, rather than letting all three continue indefinitely at a thin, under-resourced pace. The drafting tool, once given real attention instead of a third of somebody's time, reached genuine adoption within two months of being prioritised properly."),
    h2("Who should own the portfolio view"),
    p("This has to sit above any individual department head, for the same reason a build-versus-buy roadmap decision does: it requires visibility across the whole company and the standing to tell a department that its pilot, however locally reasonable, isn't this quarter's priority. In practice this is almost always a founder, CEO, or COO, sometimes supported by an outside advisor whose only stake in the sequencing decision is getting it right, not protecting any one department's project."),
    pLink2("This is closely related to, but distinct from, the roadmap discipline covered in our note on ", "turning audit findings into an executable plan", BLOG1, "; the portfolio question here is less about sequencing within one initiative and more about whether the company should be running several unrelated AI efforts at once at all, a question worth asking explicitly before committing to a fifth pilot, alongside our broader ", "AI Consultation", AI_HUB, " work."),
    h2("Signs your organisation has fallen into the pilot trap"),
    pLead("Nobody can name, without checking, how many AI pilots are currently active across the company.", " If the true count is a surprise even to leadership, the portfolio has already outrun anyone's ability to manage it deliberately."),
    pLead("Each pilot's status update comes from the department running it, with no independent check.", " This is how five stalled pilots each get reported as \"on track\" for a year, because nobody outside the department has visibility to challenge that framing."),
    pLead("A new pilot started this quarter without anyone asking what should pause to make room for it.", " Genuine prioritisation involves saying no to something, not just yes to everything new."),
    h2("Where this fits"),
    pLink("If your organisation is juggling multiple AI initiatives without a clear view of which ones deserve real attention this year, that portfolio-level judgment is exactly what an ", "embedded, vendor-neutral AI advisor", EMBEDDED_ADVISOR, " is positioned to bring: someone whose only stake is getting the sequencing right, not defending any single department's pet project."),
    authorBio(),
  ];
  const faq = [
    { question: "Is it ever a good idea to run more than one AI pilot at the same time?", answer: "Yes, but deliberately, with the resourcing and attention split explicitly acknowledged, rather than by default because several departments each started their own without visibility into the others. The problem isn't parallel work itself; it's parallel work nobody is tracking as a portfolio." },
    { question: "What's the clearest sign our company has too many AI pilots running at once?", answer: "If leadership can't immediately name how many AI initiatives are currently active company-wide, and each one's status comes only from the department running it with no independent check, that's a strong sign the portfolio has outrun anyone's ability to manage it." },
    { question: "Doesn't slowing down to sequence pilots mean we lose momentum to competitors?", answer: "In our experience it's the opposite: five simultaneously under-resourced pilots that stall a year later represent far less real progress than one properly resourced pilot that reaches genuine, scaled adoption and produces lessons that make the next one faster." },
    { question: "Who should decide which AI pilot gets priority when multiple departments want to move forward?", answer: "This decision needs to sit above any individual department head, typically with a founder, CEO, or COO, sometimes supported by an outside advisor with no stake in protecting any one department's project, because it requires visibility and standing that no single department head has on their own." },
    { question: "What's a simple rule for preventing pilot sprawl without heavy process?", answer: "A second AI pilot is only greenlit once the first has either scaled successfully or been honestly closed out with a documented reason. That single rule, consistently applied, prevents most of the sprawl that a full governance framework is otherwise built to solve." },
  ];
  write("blog-10-ai-pilot-trap-portfolio-strategy.json", blocks, faq);
}

console.log("\n🎉  All 5 blogs (6-10) generated.\n");
