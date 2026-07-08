import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { FeatureHighlight } from "@/components/sections/feature-highlight";
import { TapToPay } from "@/components/sections/tap-to-pay";
import { BentoGrid } from "@/components/sections/bento";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureHighlight
          id="features"
          feature={siteConfig.featureHighlight[0]}
          layoutIndex={0}
          className="pt-[var(--section-y-wide)] pb-0"
        />
        <TapToPay />
        <FeatureHighlight
          feature={siteConfig.featureHighlight[1]}
          layoutIndex={1}
          className="pt-0 pb-0"
        />
        <BentoGrid />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
