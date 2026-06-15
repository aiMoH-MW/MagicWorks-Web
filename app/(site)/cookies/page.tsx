import type { Metadata } from "next";
import Link from "next/link";
import { ContactImage } from "@/components/ContactImage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for magicworksitsolutions.com — how MagicWorks IT Solutions uses cookies and similar technologies, and how to manage your preferences.",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: false },
};

const toc = [
  { id: "about", label: "About this policy" },
  { id: "what-are-cookies", label: "What are cookies" },
  { id: "types", label: "The types of cookies we use" },
  { id: "consent", label: "Your consent and choices" },
  { id: "browser", label: "Managing cookies in your browser" },
  { id: "third-party", label: "Third-party cookies" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

const cookieTable = [
  {
    name: "mw_cookie_consent",
    provider: "MagicWorks",
    category: "Strictly Necessary",
    purpose: "Stores your cookie consent preferences (analytics and marketing opt-in/out) so we do not re-ask on every visit.",
    duration: "1 year (localStorage)",
  },
  {
    name: "_ga",
    provider: "Google LLC",
    category: "Analytics",
    purpose: "Distinguishes unique users by assigning a randomly generated client identifier; used to calculate visitor, session, and campaign statistics.",
    duration: "2 years",
  },
  {
    name: "_ga_*",
    provider: "Google LLC",
    category: "Analytics",
    purpose: "Used by Google Analytics 4 to persist session state and store campaign attribution data.",
    duration: "2 years",
  },
  {
    name: "_gid",
    provider: "Google LLC",
    category: "Analytics",
    purpose: "Distinguishes unique users; used to count and store the number of page views.",
    duration: "24 hours",
  },
  {
    name: "_gcl_au",
    provider: "Google LLC",
    category: "Marketing",
    purpose: "Used by Google Ads via Google Tag Manager to store and measure conversions and track advertising campaign effectiveness.",
    duration: "90 days",
  },
];

export default function CookiesPage() {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="max-w-[800px] mx-auto px-8">

        {/* Header */}
        <p className="eyebrow text-[#5B3FBE] mb-4">Legal</p>
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#2A1B5C] mb-3">
          Cookie Policy
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

          {/* 1. About this policy */}
          <div id="about">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              1. About this policy
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                This Cookie Policy explains how MagicWorks IT Solutions Pvt. Ltd. (&ldquo;MagicWorks&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) uses cookies and similar technologies on{" "}
                <a href="https://magicworksitsolutions.com" className="text-[#5B3FBE] hover:underline">
                  https://magicworksitsolutions.com
                </a>{" "}
                (the &ldquo;Website&rdquo;). It should be read together with our{" "}
                <Link href="/privacy" className="text-[#5B3FBE] hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          {/* 2. What are cookies */}
          <div id="what-are-cookies">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              2. What are cookies
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                Cookies are small text files placed on your device when you visit a website. They help the website function, remember your preferences, and understand how it is used. We also use similar technologies such as pixels, tags, and local storage, which we refer to collectively as &ldquo;cookies&rdquo;.
              </p>
            </div>
          </div>

          {/* 3. Types of cookies */}
          <div id="types">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              3. The types of cookies we use
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <ul className="space-y-3">
                {[
                  { type: "Strictly necessary cookies", detail: "Required for the Website to function, such as for security, network management, and basic navigation. These are always active and cannot be switched off through our consent tool." },
                  { type: "Performance and analytics cookies", detail: "Help us understand how visitors use the Website, so we can improve it, for example through analytics tools such as Google Analytics. These run only with your consent." },
                  { type: "Functional cookies", detail: "Remember your preferences and choices to give you a better experience. These run only with your consent." },
                  { type: "Marketing and advertising cookies", detail: "Used to measure and improve the relevance of our marketing, and may be set by us or by advertising partners. These run only with your consent." },
                ].map((item) => (
                  <li key={item.type} className="flex items-start gap-3">
                    <span className="mt-[8px] flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[#5B3FBE]" />
                    <span><strong className="text-[#2A1B5C]">{item.type}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>

              {/* Cookie table */}
              <div className="bg-white border border-[#D8D8DE] rounded-[10px] overflow-x-auto">
                <table className="w-full text-[13px] min-w-[600px]">
                  <thead>
                    <tr className="bg-[#EDE9F7]">
                      <th className="text-left px-4 py-3 font-semibold text-[#2A1B5C] w-[18%]">Cookie</th>
                      <th className="text-left px-4 py-3 font-semibold text-[#2A1B5C] w-[16%]">Provider</th>
                      <th className="text-left px-4 py-3 font-semibold text-[#2A1B5C] w-[18%]">Category</th>
                      <th className="text-left px-4 py-3 font-semibold text-[#2A1B5C]">Purpose</th>
                      <th className="text-left px-4 py-3 font-semibold text-[#2A1B5C] w-[14%]">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F0F6]">
                    {cookieTable.map((row) => (
                      <tr key={row.name}>
                        <td className="px-4 py-3.5 font-mono text-[12px] text-[#5B3FBE] align-top">{row.name}</td>
                        <td className="px-4 py-3.5 text-[#3F3F4A] align-top">{row.provider}</td>
                        <td className="px-4 py-3.5 text-[#3F3F4A] align-top">{row.category}</td>
                        <td className="px-4 py-3.5 text-[#3F3F4A] leading-[1.6] align-top">{row.purpose}</td>
                        <td className="px-4 py-3.5 text-[#3F3F4A] align-top whitespace-nowrap">{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[13px] text-[#9A9AA8] leading-[1.65]">
                All analytics and marketing cookies are set only when you grant consent. The <span className="font-mono text-[12px]">mw_cookie_consent</span> preference is stored in your browser&rsquo;s localStorage (not as a cookie) and is always active.
              </p>
            </div>
          </div>

          {/* 4. Consent and choices */}
          <div id="consent">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              4. Your consent and choices
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>
                When you first visit the Website, we will ask for your consent to non-essential cookies through a consent banner, consistent with the consent principles of the Digital Personal Data Protection Act, 2023. You can accept, reject, or customise your choices, and you can change your preferences at any time through the Cookie Settings link in our footer.
              </p>
              <p>
                Strictly necessary cookies do not require consent because the Website cannot function properly without them.
              </p>
            </div>
          </div>

          {/* 5. Browser controls */}
          <div id="browser">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              5. Managing cookies in your browser
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                You can also control cookies through your browser settings, including blocking or deleting them. Please note that disabling certain cookies may affect how the Website works. Guidance is usually available in your browser&rsquo;s help section.
              </p>
            </div>
          </div>

          {/* 6. Third-party cookies */}
          <div id="third-party">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              6. Third-party cookies
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                Some cookies are set by third parties, such as analytics and advertising providers, which process data in accordance with their own privacy and cookie policies. We encourage you to review those policies.
              </p>
            </div>
          </div>

          {/* 7. Changes */}
          <div id="changes">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              7. Changes to this policy
            </h2>
            <div className="text-[15px] leading-[1.75]">
              <p>
                We may update this Cookie Policy from time to time. The updated version will be posted on this page with a revised &ldquo;Last updated&rdquo; date.
              </p>
            </div>
          </div>

          {/* 8. Contact */}
          <div id="contact">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-4">
              8. Contact
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75]">
              <p>If you have questions about our use of cookies, please contact us:</p>
              <div className="bg-white border border-[#D8D8DE] border-l-4 border-l-[#5B3FBE] rounded-[10px] p-6">
                <p className="font-semibold text-[15px] text-[#2A1B5C] mb-3">MagicWorks IT Solutions Pvt. Ltd.</p>
                <div className="space-y-2 text-[14px]">
                  <p className="text-[#3F3F4A]">201, Vasant Bahawa, Survey No. 20, Near La Valle Casa, Bavdhan, Pune, Maharashtra, India</p>
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

          {/* Divider */}
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
