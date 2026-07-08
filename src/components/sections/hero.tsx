"use client";

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
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const PHONES = [
  {
    src: "/images/screen-mints.png",
    alt: "cashu.me mints list",
    rotate: -8,
    delay: 0.34,
    y: [0, -14, 0],
    dur: 5.5,
  },
  {
    src: "/images/screen-wallet.png",
    alt: "cashu.me wallet home",
    rotate: 0,
    delay: 0.28,
    y: [0, -20, 0],
    dur: 5.0,
  },
  {
    src: "/images/screen-receive.png",
    alt: "cashu.me receive flow",
    rotate: 8,
    delay: 0.34,
    y: [0, -14, 0],
    dur: 6.0,
  },
];

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] w-full overflow-hidden"
    >
      {/* Soft halos behind the phone trio, lifts them off the inkwell. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex h-[60%] items-center justify-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 2.4, ease: easeInOutCubic, delay: 0.3 }
          }
          className="absolute size-[820px] rounded-full bg-foreground/[0.04] blur-[160px]"
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 2.4, ease: easeInOutCubic, delay: 0.5 }
          }
          className="absolute size-[460px] -translate-x-[260px] rounded-full bg-foreground/[0.06] blur-[110px]"
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 2.4, ease: easeInOutCubic, delay: 0.5 }
          }
          className="absolute size-[460px] translate-x-[260px] rounded-full bg-foreground/[0.06] blur-[110px]"
        />
      </div>

      <div className="container-page relative px-6 pt-[var(--section-y-wide)] pb-0 text-center lg:px-10">
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
          className="type-display-1 text-foreground"
        >
          {siteConfig.description}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { y: 16, filter: "blur(8px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: REVEAL_DURATION_MD, ease: easeOutCubic, delay: REVEAL_STAGGER }
          }
          className="mx-auto mt-10 max-w-[50ch] type-lead text-foreground/75"
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
                  delay: REVEAL_STAGGER * 2,
                }
          }
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <AppStoreBadge href={siteConfig.links.testflight} />
          <ApkBadge href={siteConfig.links.androidApk} />
          <BrowserBadge href={siteConfig.links.wallet} />
        </motion.div>

        {/* Floating phones */}
        <div className="relative mt-20 flex items-end justify-center gap-4 sm:mt-24 sm:gap-8 md:mt-28">
          {PHONES.map((phone, i) => (
            <motion.div
              key={i}
              initial={
                reduceMotion ? false : { y: 80, rotate: phone.rotate * 0.5 }
              }
              animate={
                reduceMotion
                  ? { y: 0, rotate: phone.rotate }
                  : {
                      y: phone.y,
                      rotate: phone.rotate,
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      rotate: { duration: 0.8, delay: phone.delay, ease: easeOutCubic },
                      y: {
                        duration: phone.dur,
                        delay: phone.delay + 0.4,
                        repeat: Infinity,
                        ease: easeInOutCubic,
                      },
                    }
              }
              className={cn(
                "relative flex-shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl",
                i === 1
                  ? "z-10 w-44 sm:w-60 md:w-72 xl:w-80"
                  : "w-32 sm:w-48 md:w-56 xl:w-64 opacity-90"
              )}
            >
              <Image
                src={phone.src}
                alt={phone.alt}
                width={921}
                height={2000}
                loading="eager"
                preload={i === 1}
                sizes={
                  i === 1
                    ? "(min-width: 1280px) 320px, (min-width: 768px) 288px, (min-width: 640px) 240px, 176px"
                    : "(min-width: 1280px) 256px, (min-width: 768px) 224px, (min-width: 640px) 192px, 128px"
                }
                className="h-auto w-full select-none"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
