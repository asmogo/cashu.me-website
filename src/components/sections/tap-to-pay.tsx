"use client";

import { easeOutCubic, easeOutQuart } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { motion, useReducedMotion } from "framer-motion";

export function TapToPay() {
  const reduceMotion = useReducedMotion() ?? false;
  const { title, description, videoSrc } = siteConfig.tapToPay;

  return (
    <section
      id="tap-to-pay"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="size-[560px] rounded-full bg-primary/[0.08] blur-[140px]" />
      </div>

      <div className="container relative mx-auto max-w-[var(--max-container-width)] px-6 text-center lg:px-10">
        <motion.h3
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: easeOutCubic }
          }
          className="type-display-2 text-foreground"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: easeOutCubic, delay: 0.1 }
          }
          className="mx-auto mt-6 max-w-[50ch] type-lead text-foreground/75"
        >
          {description}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: easeOutCubic, delay: 0.2 }
          }
          className="relative mx-auto mt-14 w-fit"
        >
          {!reduceMotion && (
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-[2rem] border border-primary/25"
                  animate={{ scale: [1, 1.1], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: easeOutQuart,
                    delay: i * 1.3,
                  }}
                />
              ))}
            </div>
          )}
          <video
            src={videoSrc}
            width={406}
            height={720}
            autoPlay={!reduceMotion}
            loop={!reduceMotion}
            muted
            playsInline
            aria-hidden="true"
            className="relative h-auto w-full max-w-[340px] rounded-[2rem] border border-foreground/15 drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
