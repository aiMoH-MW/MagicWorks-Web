/**
 * add-web-solutions-consultant.mjs
 * Adds the Web Solutions Consultant job to Sanity WITHOUT touching existing jobs.
 * Run from the project root: node scripts/add-web-solutions-consultant.mjs
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

const job = {
  _id:        'job-web-solutions-consultant',
  _type:      'jobOpening',
  title:      'Web Solutions Consultant',
  slug:       { _type: 'slug', current: 'web-solutions-consultant' },
  subtitle:   'Pune · Full-time · Agency-side role',
  department: 'web-development',
  area:       'Consultative Sales & Client Services',
  location:   'Pune, India',
  type:       'full-time',
  experience: '3 – 6 Years',
  salary:     '₹3.00 LPA – ₹6.00 LPA + project incentives',
  qualification: 'Any graduate or postgraduate\nEngineering, marketing, business, or design background preferred',
  mandatory:  'Prior client-facing experience at a web development agency, digital agency, or product studio. Comfortable scoping a website project end to end.',
  preferredCandidate:
    'A professional who has owned a web project lifecycle from first conversation to go-live. The ideal candidate has sat in a discovery meeting with a founder or marketing head, written a real proposal with scope and pricing, briefed a development team accurately, and answered for the build until launch. We are looking for someone who can hold a credible conversation about AI-native website features (chat agents, intelligent search, content personalisation), then translate that conversation into a documented brief that a Next.js team can execute against. Pipeline ownership, project closure track record, and the temperament to be the only point of contact for a client over a 4 to 16 week build are the qualities that set strong candidates apart.',
  summary:
    'We are hiring a Web Solutions Consultant to own the full client lifecycle for our AI-native website engagements. You are the first conversation a prospect has with MagicWorks, the author of the proposal they say yes to, the brief our development team builds against, and the single point of contact through delivery to go-live. This is a consultative sales role with end-to-end client ownership, not a handover-after-signing role. You will work closely with our AI-native development team and the founder, but the client relationship is yours from start to finish. This is not an entry-level role. We want someone who has carried a project pipeline, written proposals that closed, and shepherded a build to launch with a client who trusted them.',
  responsibilities: [
    '## Discovery and Requirement Understanding',
    'Lead first conversations with prospects (founders, marketing heads, product heads) to understand their business, their current digital presence, and what a new website needs to do for the business',
    'Run structured discovery sessions covering objectives, audience, content scope, AI feature opportunities, integration requirements, and constraints',
    'Document findings into a written brief that captures the project goal, not just a feature list',
    '## Solutioning and Proposal',
    'Translate the discovery brief into a proposed solution: site architecture, AI feature set (chat agents, intelligent search, personalisation, conversational lead capture), CMS choice, integrations, and stack recommendation',
    'Develop detailed proposals covering scope, deliverables, timelines, pricing, and assumptions. Make the trade-offs explicit so the client can decide informedly',
    'Defend the proposal in client meetings. Handle objections with specificity, not platitudes',
    '## Closure and Project Kickoff',
    'Negotiate scope and commercials. Close projects against quarterly revenue targets',
    'Hand a fully briefed project to the development team: scope locked, content responsibilities clear, milestones agreed, payment schedule signed',
    'Set up the client for delivery with a structured kickoff meeting that confirms shared understanding across MagicWorks and the client team',
    '## Single Point of Contact through Delivery',
    'Stay the client\'s only point of contact from kickoff through go-live, typically 8 to 16 weeks',
    'Run weekly status updates with the client. Translate development progress into language the client cares about. Surface risks early',
    'Coordinate internally with developers, designers, content writers, and QA to keep the project on track',
    'Manage scope-change conversations professionally. Variations are documented, priced, and approved before work begins',
    '## Go-live and Handover',
    'Lead the go-live checklist with the development team and client (DNS, analytics, SSL, content sign-off, training session)',
    'Hand off to the AMC team with a clean transition document. Identify natural cross-sell into Pillar 01 (Digital Marketing) where the client\'s growth would benefit from a follow-on retainer',
    '## Pipeline and Reporting',
    'Build and maintain a working pipeline of qualified website opportunities through inbound leads, referrals, networking, and account expansion',
    'Log all pipeline activity, proposals, and client communication in the CRM',
    'Report weekly on pipeline value, proposals sent, conversion rate, projects closed, and delivery health of active engagements',
  ],
  requirements: [
    'Demonstrated experience owning a website project from first call to go-live in an agency or studio environment',
    'Solid working understanding of modern web stacks: what Next.js, headless CMS, and API-driven architecture mean and why they matter to a buyer',
    'Ability to write a proposal that a client can act on: clear scope, honest pricing, sensible timeline, explicit assumptions',
    'Strong discovery and listening skills. You ask the next question; you do not pitch on top of a half-heard brief',
    'Confidence briefing a development team and holding them to a milestone',
    'Excellent written and spoken English. Comfort presenting to founders and senior client-side stakeholders',
    'Pipeline discipline and CRM hygiene',
    'Temperament for client ownership over multi-month engagements without escalating routine issues',
  ],
  niceToHave: [
    'Working familiarity with AI-native website features: chat agents, retrieval-augmented search, content personalisation, conversational lead capture',
    'Exposure to headless CMS platforms (Sanity, Payload, Strapi, or comparable)',
    'Prior experience selling or scoping work in our priority industries: Education, Real Estate, or Manufacturing',
    'Experience with proposal tools, scoping calculators, or pricing frameworks',
    'A network of decision-makers (founders, marketing heads, product heads) you can credibly open conversations with',
  ],
  gainItems: null,
  closing:
    'This role is not for candidates exploring a move into client-facing work, those who want to specialise in sales without delivery ownership, or those who want project management without revenue accountability. We need both, in one person, for the full lifecycle. Tell us about a recent website project you owned end to end. Immediate joiners are a plus.',
  status:   'active',
  postedAt: '2026-06-30T00:00:00.000Z',
};

async function main() {
  console.log('Adding Web Solutions Consultant to Sanity...');
  const result = await mutate([{ createOrReplace: job }]);
  console.log('Result:', JSON.stringify(result, null, 2));
  console.log('\nDone. Job published at: /careers/web-solutions-consultant');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
