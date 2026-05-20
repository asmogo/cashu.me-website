import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { FeatureHighlight } from "@/components/sections/feature-highlight";
import { BentoGrid } from "@/components/sections/bento";
import { Comparison } from "@/components/sections/comparison";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureHighlight />
        <BentoGrid />
        <Comparison />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
