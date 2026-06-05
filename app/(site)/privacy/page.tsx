import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for magicworksitsolutions.com — MagicWorks IT Solutions Pvt. Ltd. How we collect, use, and protect your data.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
};

const sections = [
  {
    h: "Our Commitments to You",
    paragraphs: [
      "magicworksitsolutions.com is aware of the trust that you place in us while visiting our website and it is our utmost responsibility to protect your privacy. magicworksitsolutions.com respects and protects the privacy of the individuals that use our websites. Individually identifiable information about you is not willfully disclosed to any third party without first receiving your permission, as explained in this privacy policy.",
      "This website contains links to other sites that are outside of magicworksitsolutions.com's control. These sites may have their own policy regarding privacy and you are encouraged to read their Privacy Policy. Information on magicworksitsolutions.com website is gathered in two ways: (1) indirectly (for example, through our site's technology); and (2) directly (for example, when you provide information on various pages of magicworksitsolutions.com).",
    ],
  },
  {
    h: "Purpose of Collecting Users Information",
    paragraphs: [
      "magicworksitsolutions.com will not sell or rent your personal information to anyone. We may share personal information collected on the website with our partners and third parties but only with your consent, which can be granted in the form of an opt-out at the points where personal information is collected.",
      "We may disclose personal information when required by law or if in good faith we believe that such action is necessary in order to conform to the requirements of law or comply with legal process served on the website.",
    ],
  },
  {
    h: "Personal Information",
    paragraphs: [
      "Personal information is the information that includes your name, birth date, e-mail or mailing addresses that can be used to uniquely identify you.",
      "You can access 'magicworksitsolutions.com' website and browse it without providing your personal information. However in order to participate in some of the activities available, or to benefit from services offered on the website, a user must provide personal information (including, but not limited to, your name, address, telephone number, email address, and credit card number; if you place an order with us).",
      "When you purchase a product or service, magicworksitsolutions.com will, through our partner payment gateways, collect credit card information for invoicing purposes. This information is processed for magicworksitsolutions.com by a third party partner. That third party and magicworksitsolutions.com use security techniques, including encryption and secure servers, to protect against any unauthorized access to transmitted information used for invoicing purposes. Neither magicworksitsolutions.com nor our third-party partner stores uses or shares credit card information for any other purpose.",
      "Personal information collected on this website is primarily used for the purpose it is requested for. In particular, contact information such as name and e-mail addresses is used to provide users with the services they have chosen on this website, such as, for example, the provision of newsletters.",
      "We may use personal information collected to contact users in connection with their inappropriate use of this website, non-compliance with any Terms and Conditions of Use, or in connection with a complaint filed by another user.",
    ],
  },
  {
    h: "Anonymous Information",
    paragraphs: [
      "magicworksitsolutions.com may collect certain aggregate data called web log information (such as your web browser, operating system, pages visited, etc.) and use cookies when you visit any of our web pages. For instance, when you visit one of our websites, our web server will automatically recognize some non-personal information, including but not limited to the date and time you visited our site, the pages you visited, the referrer (the website you came from), the type of browser you are using, the type of operating system you are using, and the domain name and address of your internet service provider.",
      "A \"cookie\" is a small text file, stored by your browser on your computer's hard drive, which can be read by our system when you return to our site. Most web browsers automatically accept cookies, but you can usually change your browser to prevent that what you wish. Whilst magicworksitsolutions.com uses cookies to track your visit to our site, this information does not identify you personally and you remain anonymous unless you provide magicworksitsolutions.com with your personal information.",
      "If we use cookies, it is for the sole purpose to serve you better. You may occasionally get cookies from our advertisers. magicworksitsolutions.com does not control these cookies or any other applications or tracking controls from other advertisers or partners of magicworksitsolutions.com.",
      "We use third-party advertising companies to serve ads when you visit our website. These companies may use information (excluding your name, address, email address, or telephone number) about your visits to this website and others in order to provide advertisements about the products and services that are of interest to you.",
      "Google, as a third party vendor, uses cookies to serve ads on the site. Google uses the DoubleClick advertising cookie on AdSense partner sites and certain Google services to help advertisers and publishers serve and manage ads across the web. Users may opt out of the use of the DART cookie by visiting the Google ad and content network.",
      "In some cases we may also collect information about you that you voluntarily submit and which is not personal, such as general statistical information like age, gender, zip / postal code, preferences and interests.",
    ],
  },
  {
    h: "Use of the Personal Information",
    paragraphs: [
      "We may use your personal information to contact you. For example, we may send you marketing or promotional materials including emails or other information; we may respond to your comments or requests for information; or we may contact you, if needed, in the course of processing your order for products or services offered through our websites. We may also enhance or merge personal information with data obtained from third parties for the same purpose.",
      "We may also use personal information about you to improve our marketing and promotional efforts; to statistically analyze site usage; to improve our content and product offerings; and to customize our site's content, layout and services. We may also use your information to deliver information that is targeted to your interests, such as banners, new services and promotions. We believe such information allow us to improve our site and better tailor it to meet our visitors' needs. magicworksitsolutions.com does not collect personal information automatically, but we may combine non-personal information collected automatically (e.g., through cookies) with your previously submitted personal information.",
      "magicworksitsolutions.com occasionally sends visitors emails describing new products, promotions or events. These services are optional and you may request to opt-out of these services completely, at any time. We will only store your personal information for a reasonable period of time.",
      "We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent and we only use your information as described in the Privacy Policy. We view protection of users' privacy as a very important community principle. We understand clearly that you and Your Personal Information is one of our most important assets. We store and process your information on computers located all over the world that are protected by physical as well as reasonable technological security measures and procedures in accordance with Information Technology Act 2008 and rules thereunder.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="max-w-[760px] mx-auto px-8">
        <p className="eyebrow text-[#5B3FBE] mb-4">Legal</p>
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#2A1B5C] mb-3">Privacy Policy</h1>
        <p className="text-[14px] text-[#9A9AA8] mb-10">Effective Date: 21 January 2026 · MagicWorks IT Solutions Pvt. Ltd.</p>

        <div className="space-y-10 text-[#3F3F4A]">
          {sections.map(({ h, paragraphs }) => (
            <div key={h}>
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-3">{h}</h2>
              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[1.7]">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
