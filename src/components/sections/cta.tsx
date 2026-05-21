"use client";

import { buttonVariants } from "@/components/ui/button";
import { easeOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden border-t border-border/60 py-[var(--section-y-wide)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 flex items-start justify-center pt-24"
      >
        <div className="size-[720px] rounded-full bg-primary/15 blur-[140px]" />
      </div>

      <div className="container relative mx-auto max-w-[var(--max-container-width)] px-6 text-center lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="type-display-2 text-foreground"
        >
          No install? Run it in the browser.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutCubic, delay: 0.1 }}
          className="mx-auto mt-10 max-w-[50ch] type-lead text-foreground/75"
        >
          Open cashu.me in any modern browser. Add it to your home screen for
          one-tap launch. Same wallet, same protocol, no install.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutCubic, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={siteConfig.links.wallet}
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            Open Cashu.me
          </Link>
          <Link
            href={siteConfig.links.repo}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            View source
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
