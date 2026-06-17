import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import BetaBanner from "@/components/layout/BetaBanner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BetaBanner />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
