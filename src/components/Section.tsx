"use client";

import { easeInOutCubic } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { forwardRef, useRef } from "react";
import type { ReactNode, RefObject } from "react";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { id, title, subtitle, description, children, className, align = "center" },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLElement>(null);
    const ref = (forwardedRef as RefObject<HTMLElement>) || internalRef;

    const alignmentClass =
      align === "left"
        ? "text-left"
        : align === "right"
          ? "text-right"
          : "text-center";

    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1], {
      ease: easeInOutCubic,
    });
    const y = useTransform(scrollYProgress, [0, 0.05, 0.1], [30, 30, 0], {
      ease: easeInOutCubic,
    });

    return (
      <section id={id} ref={ref}>
        <div className={cn("sm:py-20 py-12", className)}>
          {(title || subtitle || description) && (
            <div className={cn(alignmentClass, "space-y-4 pb-10 mx-auto")}>
              {title && (
                <motion.h2
                  className="text-sm text-primary text-balance font-mono font-semibold tracking-wider uppercase"
                  style={{ opacity, y }}
                >
                  {title}
                </motion.h2>
              )}

              {subtitle && (
                <motion.h3
                  className={cn(
                    "font-display mt-4 max-w-lg text-4xl text-balance font-semibold sm:max-w-none sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-foreground",
                    align === "center" && "mx-auto",
                    align === "right" && "ml-auto"
                  )}
                  style={{ opacity, y }}
                >
                  {subtitle}
                </motion.h3>
              )}
              {description && (
                <motion.p
                  className={cn(
                    "mt-6 text-lg leading-8 text-muted-foreground text-balance max-w-2xl",
                    align === "center" && "mx-auto",
                    align === "right" && "ml-auto"
                  )}
                  style={{ opacity, y }}
                >
                  {description}
                </motion.p>
              )}
            </div>
          )}
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
