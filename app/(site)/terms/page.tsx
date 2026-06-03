import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for magicworksitsolutions.com — MagicWorks IT Solutions Pvt. Ltd.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="max-w-[760px] mx-auto px-8">
        <p className="eyebrow text-[#5B3FBE] mb-4">Legal</p>
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#2A1B5C] mb-3">Terms of Service</h1>
        <p className="text-[14px] text-[#9A9AA8] mb-10">Last updated: June 2026 · MagicWorks IT Solutions Pvt. Ltd.</p>

        <div className="space-y-8 text-[#3F3F4A]">
          {[
            { h: "1. Services", p: "MagicWorks IT Solutions Pvt. Ltd. provides digital marketing, web development, AI consultation, and platform consultation services. Specific terms, deliverables, timelines, and fees are set out in individual service agreements or statements of work signed by both parties." },
            { h: "2. Use of this website", p: "This website is provided for informational purposes. You may not copy, reproduce, or distribute any content from this site without written permission. You may not use this site for unlawful purposes or in any way that could damage the reputation of MagicWorks IT Solutions Pvt. Ltd." },
            { h: "3. Intellectual property", p: "All content on this site — text, design, imagery, and code — is owned by or licensed to MagicWorks IT Solutions Pvt. Ltd. Client work product ownership is governed by the relevant service agreement." },
            { h: "4. Limitation of liability", p: "To the maximum extent permitted by applicable law, MagicWorks IT Solutions Pvt. Ltd. shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or our services, beyond the fees paid in the relevant engagement period." },
            { h: "5. Governing law", p: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Pune, Maharashtra, India." },
            { h: "6. Changes to these terms", p: "We may update these terms from time to time. Material changes will be notified by updating the date at the top of this page. Continued use of this site after changes constitutes acceptance." },
            { h: "7. Contact", p: "For questions about these terms: legal@magicworksitsolutions.com · MagicWorks IT Solutions Pvt. Ltd., Pune, Maharashtra, India." },
          ].map(({ h, p }) => (
            <div key={h}>
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-2">{h}</h2>
              <p className="text-[15px] leading-[1.7]">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
