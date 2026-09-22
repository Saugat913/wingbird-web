import CTA from "./cta";
import Download from "./download";
import FAQ from "./faq";
import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";
import Pricing from "./pricing";
import HowItWorks from "./setup";


export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden bg-white text-neutral-900">
        <Hero />
        <HowItWorks />
        <Download />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
