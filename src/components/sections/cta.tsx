"use client";

import { buttonVariants } from "@/components/ui/button";
import { easeOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section id="cta" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-[var(--max-container-width)] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-muted px-8 py-16 text-center sm:px-12 sm:py-24">
          {/* Lilac glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-center"
          >
            <div className="size-[600px] rounded-full bg-primary/15 blur-[120px]" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easeOutCubic }}
            className="relative font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            Take it with you.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              ease: easeOutCubic,
              delay: 0.1,
            }}
            className="relative mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Browser PWA, no app store. Installs in one tap on iOS, Android,
            and desktop. Source on GitHub, MIT-licensed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              ease: easeOutCubic,
              delay: 0.2,
            }}
            className="relative mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href={siteConfig.links.wallet}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "group"
              )}
            >
              Open {siteConfig.name}
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={siteConfig.links.repo}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              View source
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
