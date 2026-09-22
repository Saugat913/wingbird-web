import Header from "./components/header";
import Hero from "./components/hero";
import HowItWorks from "./components/setup";
import HowToUse from "./components/how-to-use";
import Download from "./components/download";
import Pricing from "./components/pricing";
import FAQ from "./components/faq";
import CTA from "./components/cta";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden bg-white text-neutral-900">
        <Hero />
        <HowItWorks />
        <Download />
        <HowToUse />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
