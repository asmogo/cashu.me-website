/* eslint-disable @next/next/no-img-element */
"use client";

import { AppStoreBadge } from "@/components/ui/app-store-badge";
import { PlayStoreBadge } from "@/components/ui/play-store-badge";
import { easeInOutCubic, easeOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] w-full overflow-hidden"
    >
      {/* Soft halos behind the phone trio — lifts them off the inkwell. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex h-[60%] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: easeInOutCubic, delay: 0.3 }}
          className="absolute size-[820px] rounded-full bg-foreground/[0.04] blur-[160px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: easeInOutCubic, delay: 0.5 }}
          className="absolute size-[460px] -translate-x-[260px] rounded-full bg-foreground/[0.06] blur-[110px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: easeInOutCubic, delay: 0.5 }}
          className="absolute size-[460px] translate-x-[260px] rounded-full bg-foreground/[0.06] blur-[110px]"
        />
      </div>

      <main className="relative mx-auto max-w-[var(--max-container-width)] px-6 pt-32 text-center sm:pt-40 md:pt-48 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic }}
          className="mb-10 flex justify-center"
        >
          <span className="inline-flex items-center rounded-full border border-foreground/25 bg-foreground/[0.06] px-3 py-1.5 backdrop-blur-xl type-label text-foreground">
            {siteConfig.name}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.1 }}
          className="type-display-1 text-foreground"
        >
          {siteConfig.description}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.3 }}
          className="mx-auto mt-10 max-w-[50ch] type-lead text-foreground/75"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <AppStoreBadge href={siteConfig.links.appStore} />
          <PlayStoreBadge href={siteConfig.links.playStore} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 type-label text-muted-foreground"
        >
          <a
            href={siteConfig.links.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-foreground"
          >
            → View source on GitHub
          </a>
          <Link
            href={siteConfig.links.spec}
            className="transition-colors hover:text-foreground"
          >
            → Read the spec
          </Link>
        </motion.div>

        {/* Floating phones */}
        <div className="relative mt-20 flex items-end justify-center gap-4 sm:mt-24 sm:gap-8 md:mt-28">
          {[
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
          ].map((phone, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, rotate: phone.rotate * 0.5 }}
              animate={{
                opacity: 1,
                y: phone.y,
                rotate: phone.rotate,
              }}
              transition={{
                opacity: { duration: 0.8, delay: phone.delay, ease: easeOutCubic },
                rotate: { duration: 0.8, delay: phone.delay, ease: easeOutCubic },
                y: {
                  duration: phone.dur,
                  delay: phone.delay + 0.4,
                  repeat: Infinity,
                  ease: easeInOutCubic,
                },
              }}
              className={cn(
                "relative flex-shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl",
                i === 1
                  ? "z-10 w-48 sm:w-60 md:w-72"
                  : "w-36 sm:w-48 md:w-56 opacity-90"
              )}
            >
              <img
                src={phone.src}
                alt={phone.alt}
                className="h-auto w-full select-none"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </section>
  );
}
