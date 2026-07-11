"use client";

import { CloudField } from "@/components/sky/cloud-field";
import { ApkBadge } from "@/components/ui/apk-badge";
import { AppStoreBadge } from "@/components/ui/app-store-badge";
import { BrowserBadge } from "@/components/ui/browser-badge";
import {
  easeInOutCubic,
  easeOutCubic,
  easeOutQuart,
  REVEAL_DURATION_LG,
  REVEAL_DURATION_MD,
  REVEAL_DURATION_SM,
  REVEAL_STAGGER,
} from "@/lib/animation";
import { SECTION_CLOUDS } from "@/lib/clouds";
import { siteConfig } from "@/lib/config";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] w-full overflow-hidden"
    >
      <CloudField section={SECTION_CLOUDS.hero} />

      {/* Bright haze behind the phone — sun-through-cloud, lifts the dark
          device off the sky. Offset up-right of center: the hand+phone
          photo's own visual weight sits there, arm sweeping down-left. */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] z-0 flex h-[55%] items-center justify-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 2.4, ease: easeInOutCubic, delay: 0.3 }
          }
          className="absolute size-[620px] translate-x-[70px] -translate-y-[60px] rounded-full bg-white/45 blur-[150px]"
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 2.4, ease: easeInOutCubic, delay: 0.5 }
          }
          className="absolute size-[360px] translate-x-[10px] translate-y-[120px] rounded-full bg-white/40 blur-[100px]"
        />
      </div>

      <div className="container-page relative z-10 px-6 pt-[var(--section-y-wide)] pb-0 text-center lg:px-10">
        {/* Opacity stays at 1 throughout: this is the LCP candidate, and an
            opacity-0 initial state would keep it unpainted (and CWV-invisible)
            until the delayed fade resolves. Blur+rise still reads as a reveal
            without gating the first paint. */}
        <motion.h1
          initial={reduceMotion ? false : { filter: "blur(10px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: REVEAL_DURATION_LG, ease: easeOutQuart, delay: 0 }
          }
          className="type-display-1 uppercase tracking-[-0.01em] text-foreground"
        >
          {siteConfig.description}
        </motion.h1>

        {/* Hero device: a hand holding the wallet, not an abstracted
            screenshot — the phones/objects exception in DESIGN.md, spent on
            one photographic subject instead of three floating mockups.
            Directly under the headline: the hero's focal visual, not an
            afterthought below the CTAs. */}
        <div className="relative mt-8 flex justify-center sm:mt-10 md:mt-12">
          <motion.div
            initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: REVEAL_DURATION_LG,
                    ease: easeOutCubic,
                    delay: REVEAL_STAGGER,
                  }
            }
            className="relative w-64 flex-shrink-0 sm:w-80 md:w-[440px] xl:w-[600px]"
          >
            <Image
              src="/images/hand-wallet.png"
              alt="A hand holding a phone showing the cashu.me wallet balance and recent activity"
              width={629}
              height={741}
              loading="eager"
              preload
              sizes="(min-width: 1280px) 600px, (min-width: 768px) 440px, (min-width: 640px) 320px, 256px"
              className="h-auto w-full select-none [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
              draggable={false}
            />
          </motion.div>
        </div>

        <motion.p
          initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: REVEAL_DURATION_MD, ease: easeOutCubic, delay: REVEAL_STAGGER * 2 }
          }
          className="mx-auto mt-12 max-w-[50ch] type-lead text-foreground/75"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: REVEAL_DURATION_SM,
                  ease: easeOutCubic,
                  delay: REVEAL_STAGGER * 3,
                }
          }
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <AppStoreBadge href={siteConfig.links.testflight} />
          <ApkBadge href={siteConfig.links.androidApk} />
          <BrowserBadge href={siteConfig.links.wallet} />
        </motion.div>
      </div>
    </section>
  );
}
