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
      {/* Lilac radial glow behind phones */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2.4, ease: easeInOutCubic, delay: 0.3 }}
          className="size-[700px] rounded-full bg-primary/30 blur-[140px]"
        />
      </div>

      <main className="relative mx-auto max-w-[var(--max-container-width)] px-6 pt-32 text-center sm:pt-40 md:pt-48 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.1 }}
          className="font-display text-5xl font-semibold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          {siteConfig.description}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <AppStoreBadge href={siteConfig.links.appStore} />
          <PlayStoreBadge href={siteConfig.links.playStore} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.7 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
        >
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
            { src: siteConfig.featureHighlight[0].imageSrc, rotate: -8, delay: 1.0, y: [0, -14, 0], dur: 5.5 },
            { src: siteConfig.featureHighlight[1].imageSrc, rotate: 0, delay: 0.8, y: [0, -20, 0], dur: 5.0 },
            { src: siteConfig.featureHighlight[2].imageSrc, rotate: 8, delay: 1.0, y: [0, -14, 0], dur: 6.0 },
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
                "relative flex-shrink-0",
                i === 1 ? "z-10 w-44 sm:w-56" : "w-36 sm:w-48 opacity-90"
              )}
            >
              <img
                src={phone.src}
                alt="cashu.me wallet"
                className="h-auto w-full select-none drop-shadow-2xl"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </section>
  );
}
