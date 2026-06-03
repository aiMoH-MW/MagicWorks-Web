import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for magicworksitsolutions.com — MagicWorks IT Solutions Pvt. Ltd. How we collect, use, and protect your data under India's DPDP Act 2023.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="max-w-[760px] mx-auto px-8">
        <p className="eyebrow text-[#5B3FBE] mb-4">Legal</p>
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#2A1B5C] mb-3">Privacy Policy</h1>
        <p className="text-[14px] text-[#9A9AA8] mb-10">Last updated: June 2026 · MagicWorks IT Solutions Pvt. Ltd.</p>

        <div className="prose-base space-y-8 text-[#3F3F4A]">
          {[
            {
              h: "1. Who we are",
              p: "MagicWorks IT Solutions Pvt. Ltd. is an AI-first digital marketing agency incorporated in India and headquartered in Pune, Maharashtra. We operate this website at magicworksitsolutions.com.",
            },
            {
              h: "2. What data we collect",
              p: "We collect data you provide directly: name, email address, phone number, company name, and message content when you submit a contact form, book a discovery call, apply for a role, or complete an assessment. We also collect standard server logs (IP address, browser type, pages visited) and usage analytics via Vercel Analytics.",
            },
            {
              h: "3. How we use your data",
              p: "We use your data to respond to enquiries, schedule calls, process job applications, send you information you have requested, and improve this website. We do not sell your data to third parties. We do not send unsolicited marketing without your consent.",
            },
            {
              h: "4. Data storage",
              p: "Form submissions are stored in Supabase (servers located in the European Union). Analytics data is processed by Vercel Analytics. Content is managed via Sanity (servers located in the United States). All processors operate under appropriate data transfer safeguards.",
            },
            {
              h: "5. Your rights under India's DPDP Act 2023",
              p: "You have the right to access, correct, and erase your personal data. You may withdraw consent at any time. To exercise these rights, contact our Grievance Officer at grievance@magicworksitsolutions.com. We will respond within 30 days.",
            },
            {
              h: "6. Cookies",
              p: "This site uses no advertising cookies and no third-party tracking cookies. We use essential session cookies required for the site to function and first-party analytics.",
            },
            {
              h: "7. Contact",
              p: "Questions about this policy: privacy@magicworksitsolutions.com · Grievance Officer: grievance@magicworksitsolutions.com · MagicWorks IT Solutions Pvt. Ltd., Pune, Maharashtra, India.",
            },
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
