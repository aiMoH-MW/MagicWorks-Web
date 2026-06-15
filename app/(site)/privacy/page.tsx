import type { Metadata } from "next";
import { ContactImage } from "@/components/ContactImage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for magicworksitsolutions.com, MagicWorks IT Solutions Pvt. Ltd. How we collect, use, and protect your data under the DPDP Act 2023.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
};

const toc = [
  { id: "about", label: "About This Policy" },
  { id: "data-collected", label: "Data We Collect" },
  { id: "how-we-use", label: "How We Use Your Data" },
  { id: "legal-basis", label: "Legal Basis for Processing" },
  { id: "sharing", label: "Data Sharing" },
  { id: "retention", label: "Data Retention" },
  { id: "cross-border", label: "Cross-Border Transfers" },
  { id: "cookies", label: "Cookies and Tracking" },
  { id: "your-rights", label: "Your Rights" },
  { id: "children", label: "Children's Privacy" },
  { id: "security", label: "Security" },
  { id: "breach", label: "Data Breach" },
  { id: "grievance", label: "Grievance Officer" },
  { id: "changes", label: "Changes to This Policy" },
];

export default function PrivacyPage() {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="max-w-[800px] mx-auto px-8">

        {/* Header */}
        <p className="eyebrow text-[#5B3FBE] mb-4">Legal</p>
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#2A1B5C] mb-3">
          Privacy Policy
        </h1>
        <p className="text-[14px] text-[#9A9AA8] mb-2">
          Effective date: 9 June 2026 · MagicWorks IT Solutions Pvt. Ltd.
        </p>
        <p className="text-[14px] text-[#9A9AA8] mb-10">
          This policy is issued in compliance with the Digital Personal Data Protection Act, 2023 (India) and the rules made thereunder.
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

          {/* 1. About This Policy */}
          <div id="about">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              1. About This Policy
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                MagicWorks IT Solutions Pvt. Ltd. (&ldquo;MagicWorks&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website magicworksitsolutions.com and provides digital marketing, web development, AI consultation, and platform consultation services to businesses across India.
              </p>
              <p>
                This Privacy Policy explains what personal data we collect from visitors to our website, why we collect it, how we use and protect it, and what rights you have over it. It applies to all personal data collected through this website, our contact and enquiry forms, newsletter and whitepaper subscriptions, and any direct correspondence with us.
              </p>
              <p>
                We are the Data Fiduciary in respect of personal data collected through this website, as defined under the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;). You, the individual providing your data, are the Data Principal.
              </p>
              <p>
                Please read this policy carefully. By submitting any form on this website or providing us with your personal data, you consent to the practices described here.
              </p>
            </div>
          </div>

          {/* 2. Data We Collect */}
          <div id="data-collected">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              2. Data We Collect
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>We collect personal data only when you voluntarily provide it or when it is generated automatically through your use of this website.</p>

              <div className="bg-white border border-[#D8D8DE] rounded-[10px] overflow-hidden">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="bg-[#EDE9F7]">
                      <th className="text-left px-5 py-3 font-semibold text-[#2A1B5C] w-[40%]">Category</th>
                      <th className="text-left px-5 py-3 font-semibold text-[#2A1B5C]">Data collected</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F0F6]">
                    {[
                      { cat: "Contact and enquiry forms", data: "Name, email address, phone number (optional), company name (optional), website URL (optional), service interest, and the message you type." },
                      { cat: "Newsletter subscription", data: "Email address, and the page or source from which you subscribed." },
                      { cat: "Whitepaper download", data: "Email address and the whitepaper title you requested." },
                      { cat: "Usage data (automatic)", data: "IP address, browser type, device type, pages visited, time spent, referring URL, and approximate geographic region. Collected via server logs and analytics tools." },
                      { cat: "Cookie data", data: "Session and preference data stored as cookies. See Section 8 for details." },
                    ].map((row) => (
                      <tr key={row.cat}>
                        <td className="px-5 py-3.5 font-medium text-[#2A1B5C] align-top">{row.cat}</td>
                        <td className="px-5 py-3.5 text-[#3F3F4A] leading-[1.65]">{row.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p>
                We do not collect sensitive personal data such as financial account details, health data, religious or political beliefs, biometric data, or any data falling within the special categories defined under the DPDP Act.
              </p>
              <p>
                You can browse this website without submitting any personal data. Personal data is only collected when you choose to interact with a form or subscription on this site.
              </p>
            </div>
          </div>

          {/* 3. How We Use Your Data */}
          <div id="how-we-use">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              3. How We Use Your Data
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>We use personal data only for the purpose for which it was collected, or for a purpose that is directly compatible with that original purpose. The specific purposes are:</p>
              <ul className="space-y-3">
                {[
                  { purpose: "Responding to enquiries", detail: "When you submit a contact or discovery-call form, we use your name, email, phone number, and message to respond to your enquiry and discuss our services with you." },
                  { purpose: "Newsletter delivery", detail: "When you subscribe to our newsletter, we use your email address to send you our published insights, guides, and occasional service updates. You can unsubscribe at any time via the link in every email." },
                  { purpose: "Whitepaper delivery", detail: "When you request a whitepaper, we use your email address to send you the requested PDF and, with your consent, to add you to our mailing list for related content." },
                  { purpose: "Service delivery", detail: "If you become a client, we use the contact and company details you provide to manage our engagement, deliver work, and communicate with you about the project." },
                  { purpose: "Website improvement", detail: "We use aggregated, anonymised usage data to understand how visitors interact with this website and improve its content, structure, and performance. This data is not linked to individual identities." },
                  { purpose: "Legal and compliance obligations", detail: "We may process personal data to comply with applicable law, respond to lawful requests from government or regulatory authorities, or enforce our rights." },
                ].map((item) => (
                  <li key={item.purpose} className="flex items-start gap-3">
                    <span className="mt-[8px] flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[#D4A537]" />
                    <span><strong className="text-[#2A1B5C]">{item.purpose}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
              <p>
                We do not sell, rent, or trade your personal data to third parties for their own marketing purposes. We do not use your personal data for automated decision-making or profiling in any way that produces a legal or similarly significant effect on you.
              </p>
            </div>
          </div>

          {/* 4. Legal Basis for Processing */}
          <div id="legal-basis">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              4. Legal Basis for Processing
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                Under the DPDP Act 2023, we process personal data on the following grounds:
              </p>
              <ul className="space-y-3">
                {[
                  { basis: "Consent", detail: "For newsletter subscriptions, whitepaper downloads, and marketing communications, we rely on your free, specific, informed, and unambiguous consent given at the point of data collection. You may withdraw your consent at any time without affecting the lawfulness of processing carried out before withdrawal." },
                  { basis: "Legitimate use", detail: "For responding to your direct enquiries, fulfilling service agreements, and managing client relationships, we process data as necessary to carry out the purpose for which you provided the data." },
                  { basis: "Legal obligation", detail: "We may process data to comply with requirements under Indian law, including responding to lawful orders from courts or authorities." },
                ].map((item) => (
                  <li key={item.basis} className="flex items-start gap-3">
                    <span className="mt-[8px] flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[#5B3FBE]" />
                    <span><strong className="text-[#2A1B5C]">{item.basis}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Data Sharing */}
          <div id="sharing">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              5. Data Sharing
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                We do not share your personal data with third parties except in the following limited circumstances:
              </p>
              <ul className="space-y-3">
                {[
                  { who: "Technology service providers (Data Processors)", detail: "We use Supabase Inc. to store form submissions and subscription data, and Resend to deliver email notifications to our internal team. These providers act as Data Processors under our instructions and are contractually prohibited from using your data for their own purposes." },
                  { who: "Analytics providers", detail: "We use aggregated, anonymised website analytics. Where any analytics provider receives identifiable data (such as an IP address), this is subject to their own privacy terms and applicable data transfer protections." },
                  { who: "Legal requirements", detail: "We may disclose personal data if required by law, court order, or a lawful request from a government authority, or where we believe disclosure is necessary to protect the rights, property, or safety of MagicWorks, our clients, or the public." },
                  { who: "Business transfers", detail: "If MagicWorks IT Solutions Pvt. Ltd. undergoes a merger, acquisition, or sale of assets, personal data held by us may be transferred to the successor entity, subject to equivalent privacy protections." },
                ].map((item) => (
                  <li key={item.who} className="flex items-start gap-3">
                    <span className="mt-[8px] flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[#D4A537]" />
                    <span><strong className="text-[#2A1B5C]">{item.who}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Data Retention */}
          <div id="retention">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              6. Data Retention
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. Our standard retention periods are:
              </p>
              <div className="bg-white border border-[#D8D8DE] rounded-[10px] overflow-hidden">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="bg-[#EDE9F7]">
                      <th className="text-left px-5 py-3 font-semibold text-[#2A1B5C] w-[45%]">Data type</th>
                      <th className="text-left px-5 py-3 font-semibold text-[#2A1B5C]">Retention period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F0F6]">
                    {[
                      { type: "Enquiry / contact form submissions", period: "3 years from the date of submission, or until you request deletion." },
                      { type: "Newsletter subscriptions", period: "Until you unsubscribe, plus 30 days for processing." },
                      { type: "Whitepaper download records", period: "3 years from the date of download, or until you request deletion." },
                      { type: "Client engagement records", period: "7 years from the end of the engagement, in accordance with applicable commercial and tax law." },
                      { type: "Usage and analytics data", period: "Aggregated data indefinitely; IP address logs purged after 12 months." },
                    ].map((row) => (
                      <tr key={row.type}>
                        <td className="px-5 py-3.5 font-medium text-[#2A1B5C] align-top">{row.type}</td>
                        <td className="px-5 py-3.5 text-[#3F3F4A] leading-[1.65]">{row.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                When data is no longer required, we delete or anonymise it securely. You may request earlier deletion subject to Section 9 (Your Rights) below.
              </p>
            </div>
          </div>

          {/* 7. Cross-Border Transfers */}
          <div id="cross-border">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              7. Cross-Border Data Transfers
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                Some of our technology providers (including Supabase and Resend) may store or process data on servers located outside India. We only transfer personal data to countries or territories that provide an adequate level of data protection, or where we have put in place appropriate safeguards such as standard contractual clauses or equivalent mechanisms consistent with the DPDP Act 2023 and any rules or notifications issued by the Government of India thereunder.
              </p>
              <p>
                By submitting personal data through this website, you acknowledge that your data may be processed outside India subject to the protections described above.
              </p>
            </div>
          </div>

          {/* 8. Cookies and Tracking */}
          <div id="cookies">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              8. Cookies and Tracking
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                This website uses cookies and similar tracking technologies to improve your browsing experience and to collect anonymised analytics about site usage.
              </p>
              <ul className="space-y-3">
                {[
                  { type: "Strictly necessary cookies", detail: "These are required for the website to function correctly (for example, session state). They cannot be disabled." },
                  { type: "Analytics cookies", detail: "These collect anonymised information about how visitors use this website, such as which pages are visited most often. This helps us improve the site. No personal identity is linked to this data." },
                  { type: "Third-party cookies", detail: "Third-party services embedded on this site (such as analytics or chat tools) may set their own cookies. We have no control over these and recommend reviewing the privacy policies of those providers." },
                ].map((item) => (
                  <li key={item.type} className="flex items-start gap-3">
                    <span className="mt-[8px] flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[#5B3FBE]" />
                    <span><strong className="text-[#2A1B5C]">{item.type}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
              <p>
                You can control or disable cookies through your browser settings. Disabling certain cookies may affect the functionality of this website. A cookie consent banner on this site provides you with granular control over non-essential cookies on your first visit.
              </p>
            </div>
          </div>

          {/* 9. Your Rights */}
          <div id="your-rights">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              9. Your Rights Under the DPDP Act 2023
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                As a Data Principal under the DPDP Act 2023, you have the following rights in respect of personal data we hold about you:
              </p>

              <div className="space-y-4">
                {[
                  {
                    right: "Right to access information",
                    detail: "You have the right to request a summary of the personal data we hold about you and the purposes for which it is being processed.",
                  },
                  {
                    right: "Right to correction and erasure",
                    detail: "You have the right to request that we correct inaccurate or incomplete personal data, or that we erase personal data that is no longer necessary for the purpose for which it was collected, subject to any legal retention obligations.",
                  },
                  {
                    right: "Right to withdraw consent",
                    detail: "Where we process your data on the basis of your consent, you have the right to withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing carried out prior to withdrawal. To unsubscribe from emails, use the link in any email we send you. To withdraw consent for other processing, contact our Grievance Officer.",
                  },
                  {
                    right: "Right to grievance redressal",
                    detail: "You have the right to have your grievance regarding our processing of your personal data redressed in an expeditious, fair, and reasonable manner. See Section 13 for how to raise a grievance.",
                  },
                  {
                    right: "Right to nominate",
                    detail: "Under the DPDP Act, you have the right to nominate another individual who may, in the event of your death or incapacity, exercise your rights in relation to your personal data. To register a nominee, contact our Grievance Officer.",
                  },
                ].map((item) => (
                  <div key={item.right} className="bg-white border border-[#D8D8DE] rounded-[10px] p-5">
                    <p className="font-semibold text-[14px] text-[#2A1B5C] mb-1">{item.right}</p>
                    <p className="text-[14px] text-[#3F3F4A] leading-[1.65]">{item.detail}</p>
                  </div>
                ))}
              </div>

              <p>
                To exercise any of these rights, write to us at <a href="mailto:legal@magicworksitsolutions.com" className="text-[#5B3FBE] hover:underline">legal@magicworksitsolutions.com</a>. We will respond within the time periods prescribed under the DPDP Act (generally within 30 days, or as may be specified by the Data Protection Board of India). We may need to verify your identity before processing your request.
              </p>
              <p>
                If you are not satisfied with our response, you may file a complaint with the Data Protection Board of India once it is constituted and operational under the DPDP Act.
              </p>
            </div>
          </div>

          {/* 10. Children's Privacy */}
          <div id="children">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              10. Children&rsquo;s Privacy
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                This website is directed at businesses and business professionals. We do not knowingly collect personal data from persons under 18 years of age. Where processing of personal data of a child (defined as any person below 18 years under the DPDP Act) is required, we will obtain verifiable consent from the parent or legal guardian before collecting such data.
              </p>
              <p>
                If you believe we have inadvertently collected personal data from a person under 18, please contact us immediately at <a href="mailto:legal@magicworksitsolutions.com" className="text-[#5B3FBE] hover:underline">legal@magicworksitsolutions.com</a> and we will delete it promptly.
              </p>
            </div>
          </div>

          {/* 11. Security */}
          <div id="security">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              11. Security
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                We implement reasonable technical and organisational measures to protect personal data against unauthorised access, disclosure, alteration, or destruction. These include:
              </p>
              <ul className="space-y-2">
                {[
                  "HTTPS encryption for all data transmitted to and from this website.",
                  "Access controls that restrict internal access to personal data to those with a legitimate need.",
                  "Use of reputable, security-certified infrastructure and data processors.",
                  "Regular review of our security practices.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[8px] flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[#D4A537]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                No method of electronic transmission or storage is completely secure. While we take reasonable steps to protect your data, we cannot guarantee absolute security. You transmit personal data to us at your own risk.
              </p>
            </div>
          </div>

          {/* 12. Data Breach */}
          <div id="breach">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              12. Data Breach Notification
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                In the event of a personal data breach that is likely to result in harm to affected Data Principals, we will notify the Data Protection Board of India as required under the DPDP Act 2023. We will also notify affected individuals promptly in the manner prescribed by the Board, providing information about the nature of the breach, the data affected, and the steps we are taking to address it.
              </p>
            </div>
          </div>

          {/* 13. Grievance Officer */}
          <div id="grievance">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              13. Grievance Officer
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                In accordance with the DPDP Act 2023, we have designated a Grievance Officer to address concerns and complaints about the processing of personal data. If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, please contact:
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
                  <p className="text-[#9A9AA8] pt-1">Response time: We will acknowledge your grievance within 48 hours and resolve it within 30 days of receipt, or within the period prescribed by the Data Protection Board of India.</p>
                </div>
              </div>
              <p>
                If your grievance is not resolved to your satisfaction, you may escalate it to the Data Protection Board of India once the Board is constituted and operational under the DPDP Act.
              </p>
            </div>
          </div>

          {/* 14. Changes to This Policy */}
          <div id="changes">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              14. Changes to This Policy
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, the services we offer, or applicable law. When we make material changes, we will update the effective date at the top of this page. We encourage you to review this page periodically.
              </p>
              <p>
                Continued use of this website after changes are published constitutes your acknowledgment of the updated policy. If we make changes that materially affect how we process data for which you have given consent, we will seek fresh consent where required.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#D8D8DE] pt-10">
            <p className="text-[13px] text-[#9A9AA8] leading-[1.7]">
              This Privacy Policy was last reviewed and updated on <strong className="text-[#3F3F4A]">9 June 2026</strong>. It supersedes all previous versions. For questions about this policy, contact us at <a href="mailto:legal@magicworksitsolutions.com" className="text-[#5B3FBE] hover:underline">legal@magicworksitsolutions.com</a>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
