/* eslint-disable @next/next/no-img-element */
"use client";

import { ApkBadge } from "@/components/ui/apk-badge";
import { AppStoreBadge } from "@/components/ui/app-store-badge";
import { BrowserBadge } from "@/components/ui/browser-badge";
import { easeInOutCubic, easeOutCubic, easeOutQuart } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

const PHONES = [
  {
    src: "/images/screen-mints.png",
    alt: "cashu.me mints list",
    rotate: -8,
    delay: 1.0,
    y: [0, -14, 0],
    dur: 5.5,
  },
  {
    src: "/images/screen-wallet.png",
    alt: "cashu.me wallet home",
    rotate: 0,
    delay: 0.8,
    y: [0, -20, 0],
    dur: 5.0,
  },
  {
    src: "/images/screen-receive.png",
    alt: "cashu.me receive flow",
    rotate: 8,
    delay: 1.0,
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
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.32, ease: easeOutQuart, delay: 0.18 }
          }
          className="type-display-1 text-foreground"
        >
          {siteConfig.description}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.8, ease: easeOutCubic, delay: 0.3 }
          }
          className="mx-auto mt-10 max-w-[50ch] type-lead text-foreground/75"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.8, ease: easeOutCubic, delay: 0.5 }
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
                reduceMotion
                  ? false
                  : { opacity: 0, y: 80, rotate: phone.rotate * 0.5 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1, y: 0, rotate: phone.rotate }
                  : {
                      opacity: 1,
                      y: phone.y,
                      rotate: phone.rotate,
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 0.8, delay: phone.delay, ease: easeOutCubic },
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
              <img
                src={phone.src}
                alt={phone.alt}
                width={921}
                height={2000}
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
