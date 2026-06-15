import type { Metadata } from "next";
import Link from "next/link";
import { ContactImage } from "@/components/ContactImage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for magicworksitsolutions.com — MagicWorks IT Solutions Pvt. Ltd.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: false },
};

const toc = [
  { id: "acceptance", label: "Acceptance of these terms" },
  { id: "eligibility", label: "Eligibility" },
  { id: "about", label: "About the Website and our services" },
  { id: "licence", label: "Licence to use the Website" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "ip", label: "Intellectual property" },
  { id: "submissions", label: "Your submissions" },
  { id: "third-party", label: "Third-party links and associated brands" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "liability", label: "Limitation of liability" },
  { id: "indemnity", label: "Indemnity" },
  { id: "fees", label: "Fees and payments" },
  { id: "privacy", label: "Privacy" },
  { id: "suspension", label: "Suspension and termination" },
  { id: "force-majeure", label: "Force majeure" },
  { id: "governing-law", label: "Governing law and jurisdiction" },
  { id: "disputes", label: "Dispute resolution" },
  { id: "general", label: "General" },
  { id: "changes", label: "Changes to these Terms" },
  { id: "grievance", label: "Grievance redressal and contact" },
];

export default function TermsPage() {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="max-w-[800px] mx-auto px-8">

        {/* Header */}
        <p className="eyebrow text-[#5B3FBE] mb-4">Legal</p>
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#2A1B5C] mb-3">
          Terms of Use
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

          {/* 1. Acceptance */}
          <div id="acceptance">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              1. Acceptance of these terms
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
                <a href="https://magicworksitsolutions.com" className="text-[#5B3FBE] hover:underline">
                  https://magicworksitsolutions.com
                </a>{" "}
                (the &ldquo;Website&rdquo;), operated by MagicWorks IT Solutions Pvt. Ltd. (&ldquo;MagicWorks&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By accessing or using the Website, you agree to be bound by these Terms, our{" "}
                <Link href="/privacy" className="text-[#5B3FBE] hover:underline">Privacy Policy</Link>,
                our{" "}
                <Link href="/cookies" className="text-[#5B3FBE] hover:underline">Cookie Policy</Link>,
                and our{" "}
                <Link href="/disclaimer" className="text-[#5B3FBE] hover:underline">Disclaimer</Link>.
                If you do not agree, please do not use the Website.
              </p>
              <p>
                These Terms constitute an electronic record under the Information Technology Act, 2000, and do not require any physical or digital signature.
              </p>
            </div>
          </div>

          {/* 2. Eligibility */}
          <div id="eligibility">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              2. Eligibility
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                By using the Website, you confirm that you are competent to enter into a contract under the Indian Contract Act, 1872, and are at least eighteen years of age. If you use the Website on behalf of an organisation, you confirm that you are authorised to bind that organisation to these Terms.
              </p>
            </div>
          </div>

          {/* 3. About */}
          <div id="about">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              3. About the Website and our services
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                The Website provides information about MagicWorks and its services, including digital marketing, web development, and AI and platform consultation, along with resources such as articles and downloadable playbooks. The Website is informational. Nothing on it constitutes a binding offer. Any engagement for services will be governed by a separate written agreement, proposal, or statement of work agreed between you and MagicWorks, which will prevail over these Terms in respect of that engagement.
              </p>
            </div>
          </div>

          {/* 4. Licence */}
          <div id="licence">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              4. Licence to use the Website
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Website for your own lawful, personal, or internal business purposes, subject to these Terms. All rights not expressly granted are reserved.
              </p>
            </div>
          </div>

          {/* 5. Acceptable use */}
          <div id="acceptable-use">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              5. Acceptable use
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>You agree not to:</p>
              <ul className="space-y-3">
                {[
                  "Use the Website in any way that breaches applicable law or these Terms.",
                  "Copy, reproduce, republish, distribute, or commercially exploit Website content except as expressly permitted.",
                  "Attempt to gain unauthorised access to, interfere with, or disrupt the Website, its servers, or connected systems.",
                  "Introduce viruses, malware, or other harmful code, or use automated means such as scrapers or bots without our consent.",
                  "Upload or transmit any content that is unlawful, defamatory, infringing, obscene, misleading, or otherwise objectionable, or that violates the rights of others.",
                  "Misrepresent your identity or affiliation, or harvest personal data of others.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[9px] flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[#D4A537]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>We may suspend or terminate your access if we reasonably believe you have breached these Terms.</p>
            </div>
          </div>

          {/* 6. Intellectual property */}
          <div id="ip">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              6. Intellectual property
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                All content on the Website, including text, graphics, logos, the &ldquo;MagicWorks&rdquo; name and marks, design, layout, software, and downloadable resources, is owned by or licensed to MagicWorks and is protected by the Copyright Act, 1957, the Trade Marks Act, 1999, and other applicable laws. You may not use, reproduce, or create derivative works from this content without our prior written permission, except that you may download and use resources we make available for their intended purpose. The names and marks of our associated brands and of third parties remain the property of their respective owners.
              </p>
            </div>
          </div>

          {/* 7. Your submissions */}
          <div id="submissions">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              7. Your submissions
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                When you submit an enquiry, application, or other content through the Website, you confirm that you are entitled to provide it and that it is accurate and not unlawful. You grant us a licence to use that content for the purpose for which it was provided and as described in our{" "}
                <Link href="/privacy" className="text-[#5B3FBE] hover:underline">Privacy Policy</Link>.
                Do not submit confidential information through the Website unless requested.
              </p>
            </div>
          </div>

          {/* 8. Third-party links */}
          <div id="third-party">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              8. Third-party links and associated brands
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                The Website may link to third-party websites and to our associated brands, including MagicFlow AI, Magic Pipeline, and MagicWorks Host. These are provided for convenience. We do not control and are not responsible for the content, products, or practices of third-party websites, and a link does not imply endorsement. Associated brands may be operated as separate entities and under their own terms and policies.
              </p>
            </div>
          </div>

          {/* 9. Disclaimers */}
          <div id="disclaimers">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              9. Disclaimers
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                The Website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including as to accuracy, completeness, fitness for a particular purpose, and uninterrupted availability. We do not guarantee any particular result or outcome from the use of the Website or our content. Please also read our{" "}
                <Link href="/disclaimer" className="text-[#5B3FBE] hover:underline">Disclaimer</Link>.
              </p>
            </div>
          </div>

          {/* 10. Limitation of liability */}
          <div id="liability">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              10. Limitation of liability
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                To the fullest extent permitted by applicable law, MagicWorks and its directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, or goodwill, arising out of or in connection with your use of, or inability to use, the Website or its content. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.
              </p>
            </div>
          </div>

          {/* 11. Indemnity */}
          <div id="indemnity">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              11. Indemnity
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                You agree to indemnify and hold harmless MagicWorks and its directors, employees, and agents from any claims, losses, liabilities, and expenses arising out of your breach of these Terms or your misuse of the Website.
              </p>
            </div>
          </div>

          {/* 12. Fees and payments */}
          <div id="fees">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              12. Fees and payments
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                Where you engage MagicWorks for paid services, the applicable fees, taxes (including Goods and Services Tax), payment terms, and refund or cancellation terms will be set out in the relevant written agreement, proposal, or invoice.
              </p>
            </div>
          </div>

          {/* 13. Privacy */}
          <div id="privacy">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              13. Privacy
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                Your use of the Website is also governed by our{" "}
                <Link href="/privacy" className="text-[#5B3FBE] hover:underline">Privacy Policy</Link>,
                which explains how we handle personal data.
              </p>
            </div>
          </div>

          {/* 14. Suspension and termination */}
          <div id="suspension">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              14. Suspension and termination
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                We may modify, suspend, or discontinue all or part of the Website at any time, and may restrict or terminate your access, without notice where reasonable, including for breach of these Terms.
              </p>
            </div>
          </div>

          {/* 15. Force majeure */}
          <div id="force-majeure">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              15. Force majeure
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                We will not be liable for any failure or delay caused by events beyond our reasonable control, including acts of God, internet or power failures, government action, or other force majeure events.
              </p>
            </div>
          </div>

          {/* 16. Governing law */}
          <div id="governing-law">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              16. Governing law and jurisdiction
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                These Terms are governed by the laws of India. Subject to Section 17, the courts at Pune, Maharashtra, India, will have exclusive jurisdiction over any dispute arising out of or relating to these Terms or the Website.
              </p>
            </div>
          </div>

          {/* 17. Dispute resolution */}
          <div id="disputes">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              17. Dispute resolution
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                The parties will first attempt to resolve any dispute amicably. If unresolved within 60 days, the dispute will be referred to arbitration by a sole arbitrator under the Arbitration and Conciliation Act, 1996, seated at Pune, conducted in English. This Section does not prevent us from seeking urgent interim relief from a court.
              </p>
            </div>
          </div>

          {/* 18. General */}
          <div id="general">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              18. General
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                If any provision of these Terms is found unenforceable, the remaining provisions will continue in effect. Our failure to enforce any right is not a waiver of it. These Terms, together with the{" "}
                <Link href="/privacy" className="text-[#5B3FBE] hover:underline">Privacy Policy</Link>,{" "}
                <Link href="/cookies" className="text-[#5B3FBE] hover:underline">Cookie Policy</Link>, and{" "}
                <Link href="/disclaimer" className="text-[#5B3FBE] hover:underline">Disclaimer</Link>, and any applicable service agreement, constitute the entire agreement between you and us regarding the Website.
              </p>
            </div>
          </div>

          {/* 19. Changes */}
          <div id="changes">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              19. Changes to these Terms
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                We may update these Terms from time to time. The updated version will be posted on this page with a revised &ldquo;Last updated&rdquo; date, and will apply to your continued use of the Website.
              </p>
            </div>
          </div>

          {/* 20. Grievance */}
          <div id="grievance">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              20. Grievance redressal and contact
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                For any questions or complaints regarding the Website or these Terms, including content-related grievances under the applicable Information Technology rules, please contact:
              </p>
              <div className="bg-white border border-[#D8D8DE] border-l-4 border-l-[#5B3FBE] rounded-[10px] p-6">
                <p className="font-semibold text-[15px] text-[#2A1B5C] mb-3">Grievance Officer</p>
                <div className="space-y-2 text-[14px]">
                  <p><span className="text-[#9A9AA8]">Name:</span> <span className="text-[#3F3F4A] font-medium">Sudhir Dilip Dixit</span></p>
                  <p><span className="text-[#9A9AA8]">Organisation:</span> <span className="text-[#3F3F4A]">MagicWorks IT Solutions Pvt. Ltd.</span></p>
                  <p><span className="text-[#9A9AA8]">Address:</span> <span className="text-[#3F3F4A]">201, Vasant Bahawa, Survey No. 20, Near La Valle Casa, Bavdhan, Pune, Maharashtra, India</span></p>
                  <p className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#9A9AA8]">Email:</span>
                    <ContactImage text="info@magicworksitsolutions.com" href="mailto:info@magicworksitsolutions.com" />
                  </p>
                  <p className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#9A9AA8]">Phone:</span>
                    <ContactImage text="+91 8806430505" href="tel:+918806430505" />
                  </p>
                </div>
              </div>
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
