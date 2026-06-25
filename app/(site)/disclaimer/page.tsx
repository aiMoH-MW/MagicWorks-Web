import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for magicworksitsolutions.com | MagicWorks IT Solutions Pvt. Ltd. General information, no professional advice, no guarantee of results.",
  alternates: { canonical: "/disclaimer" },
  robots: { index: false, follow: false },
};

const toc = [
  { id: "general", label: "General information only" },
  { id: "not-advice", label: "Not professional advice" },
  { id: "no-guarantee", label: "No guarantee of results" },
  { id: "testimonials", label: "Testimonials, case studies, and examples" },
  { id: "no-relationship", label: "No professional relationship" },
  { id: "external-links", label: "External links" },
  { id: "forward-looking", label: "Forward-looking statements" },
  { id: "errors", label: "Errors and omissions" },
  { id: "contact", label: "Contact" },
];

export default function DisclaimerPage() {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="max-w-[800px] mx-auto px-8">

        {/* Header */}
        <p className="eyebrow text-[#5B3FBE] mb-4">Legal</p>
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#2A1B5C] mb-3">
          Disclaimer
        </h1>
        <p className="text-[14px] text-[#9A9AA8] mb-10">
          Last updated: 17 June 2026 · MagicWorks IT Solutions Pvt. Ltd.
        </p>

        {/* Table of contents */}
        <div className="bg-white border border-[#D8D8DE] rounded-[10px] p-6 mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A9AA8] mb-3">Contents</p>
          <ol className="space-y-1.5">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[14px] text-[#5B3FBE] hover:text-[#2A1B5C] transition-colors no-underline"
                >
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Body */}
        <div className="space-y-14 text-[#3F3F4A]">

          {/* 1. General information */}
          <div id="general">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              1. General information only
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                The information provided on{" "}
                <a href="https://magicworksitsolutions.com" className="text-[#5B3FBE] hover:underline">
                  https://magicworksitsolutions.com
                </a>{" "}
                (the &ldquo;Website&rdquo;) and in any resources we make available, including articles, playbooks, reports, and checklists, is for general information and educational purposes only. It is provided in good faith, but we make no representation or warranty of any kind, express or implied, regarding its accuracy, adequacy, completeness, reliability, or availability.
              </p>
            </div>
          </div>

          {/* 2. Not professional advice */}
          <div id="not-advice">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              2. Not professional advice
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                Nothing on the Website constitutes legal, financial, tax, accounting, investment, or other professional advice, and it should not be relied upon as such. Our content, including any guidance on AI, marketing, technology, compliance, or platform strategy, is general in nature and may not apply to your specific circumstances. You should obtain advice from a suitably qualified professional before acting on anything you read here. Any references to laws, including the Digital Personal Data Protection Act, 2023, are general and may change; confirm your obligations with your own advisors.
              </p>
            </div>
          </div>

          {/* 3. No guarantee of results */}
          <div id="no-guarantee">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              3. No guarantee of results
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                MagicWorks does not promise or guarantee any specific outcome, result, ranking, citation, lead volume, revenue, or return on investment from the use of the Website, our content, or our services. Marketing, search, AI, and platform outcomes depend on many factors outside our control, including your market, execution, and decisions. Any examples, strategies, or approaches described are illustrative and are not assurances of results.
              </p>
            </div>
          </div>

          {/* 4. Testimonials */}
          <div id="testimonials">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              4. Testimonials, case studies, and examples
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                Any testimonials, case studies, results, or examples shown on the Website reflect particular situations and are not a guarantee or prediction that you or anyone else will achieve the same or similar results. Individual outcomes vary.
              </p>
            </div>
          </div>

          {/* 5. No professional relationship */}
          <div id="no-relationship">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              5. No professional relationship
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                Your use of the Website, or your downloading of any resource, does not create any client, advisory, or professional relationship between you and MagicWorks. Such a relationship arises only under a separate written agreement.
              </p>
            </div>
          </div>

          {/* 6. External links */}
          <div id="external-links">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              6. External links
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                The Website may contain links to external websites and to our associated brands, including but not limited to MagicFlow AI, Magic Pipeline, and MagicWorks Host. We do not control and are not responsible for the content, accuracy, or practices of any third-party website, and the inclusion of a link does not imply endorsement.
              </p>
            </div>
          </div>

          {/* 7. Forward-looking statements */}
          <div id="forward-looking">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              7. Forward-looking statements
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                Any statements about future plans, capabilities, or expectations are forward-looking and subject to change. We are under no obligation to update them.
              </p>
            </div>
          </div>

          {/* 8. Errors and omissions */}
          <div id="errors">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              8. Errors and omissions
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                While we take care to keep the Website accurate and current, it may contain errors, omissions, or out-of-date information, and is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent permitted by law, MagicWorks will not be liable for any loss or damage arising from your reliance on any information on the Website.
              </p>
            </div>
          </div>

          {/* 9. Contact */}
          <div id="contact">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              9. Contact
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>If you have any questions about this Disclaimer, please contact us:</p>
            </div>
          </div>

          {/* Divider + company info */}
          <div className="border-t border-[#D8D8DE] pt-10">
            <div className="space-y-1 text-[13px] text-[#9A9AA8] leading-[1.7]">
              <p><strong className="text-[#3F3F4A]">MagicWorks IT Solutions Pvt. Ltd.</strong></p>
              <p>201, Vasant Bahawa, Survey No. 20, Near La Valle Casa, Bavdhan, Pune, Maharashtra, India</p>
              <p>CIN: U72200PN2012PTC144846 &nbsp;·&nbsp; GSTIN: 27AAICM2623C1ZT</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
