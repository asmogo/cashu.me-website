"use client";

import { easeOutCubic } from "@/lib/animation";
import { cn } from "@/lib/utils";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef } from "react";

const CUSTODIAL_FIELDS = [
  "ID 0x42a8…",
  "TO @alice",
  "$50.00",
  "10:42:31",
];

interface LaneProps {
  active: boolean;
  reduceMotion: boolean;
  identifier: string;
  checkpoint: string;
  packetDelay: number;
  children: React.ReactNode;
}

function Lane({
  active,
  reduceMotion,
  identifier,
  checkpoint,
  packetDelay,
  children,
}: LaneProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6">
      {/* Left identifier tile */}
      <div className="flex items-center gap-3">
        <div className="size-9 border border-foreground/20 bg-foreground/[0.04]" />
        <span className="hidden text-label text-muted-foreground sm:inline">
          {identifier}
        </span>
      </div>

      {/* Rail + checkpoint + packet */}
      <div className="relative flex h-9 items-center">
        {/* The rail */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-foreground/15" />

        {/* Checkpoint band (vertically centered, ~38% across) */}
        <div className="absolute left-[34%] top-0 flex h-full w-[18%] items-center justify-center sm:w-[14%]">
          <div className="absolute inset-y-0 left-0 w-px bg-foreground/25" />
          <div className="absolute inset-y-0 right-0 w-px bg-foreground/25" />
          <span className="absolute -top-5 text-label text-muted-foreground">
            {checkpoint}
          </span>
        </div>

        {/* The packet (lilac dot travelling left → right, looping) */}
        <motion.div
          aria-hidden
          className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary"
          initial={{ left: "0%", opacity: 0 }}
          animate={
            active
              ? reduceMotion
                ? { left: "100%", opacity: 1 }
                : {
                    left: ["0%", "100%"],
                    opacity: [0, 1, 1, 1, 0],
                  }
              : { left: "0%", opacity: 0 }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 2.6,
                  delay: packetDelay,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: easeOutCubic,
                  times: [0, 0.05, 0.45, 0.95, 1],
                }
          }
        />
      </div>

      {/* Output zone */}
      <div className="min-w-[160px] sm:min-w-[200px]">{children}</div>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutCubic } },
};

export function CustodyComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div
      ref={ref}
      className="w-full max-w-[640px] py-2 sm:py-4"
      aria-label="How custodial wallets see your transactions vs how Cashu mints don't."
    >
      <div className="flex flex-col gap-10 sm:gap-14">
        {/* Ecash lane */}
        <Lane
          active={inView}
          reduceMotion={reduceMotion}
          identifier="CASHU.ME"
          checkpoint="MINT"
          packetDelay={0.6}
        >
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col items-start gap-2"
          >
            <motion.span
              variants={itemVariants}
              className={cn(
                "inline-flex items-center border border-primary/40 bg-primary/[0.06] px-2 py-1 text-label text-primary"
              )}
            >
              ✓ VALID
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="text-label text-muted-foreground"
            >
              Mint sees nothing else.
            </motion.span>
          </motion.div>
        </Lane>

        {/* Hairline divider */}
        <div className="h-px w-full bg-foreground/10" />

        {/* Custodial lane */}
        <Lane
          active={inView}
          reduceMotion={reduceMotion}
          identifier="CUSTODIAL"
          checkpoint="BANK"
          packetDelay={0.6}
        >
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            transition={{ delayChildren: 1.6 }}
            className="flex flex-col items-start gap-1.5"
          >
            {CUSTODIAL_FIELDS.map((field) => (
              <motion.span
                key={field}
                variants={itemVariants}
                className="inline-flex items-center border border-foreground/20 bg-foreground/[0.03] px-2 py-1 text-label text-foreground/80"
              >
                {field}
              </motion.span>
            ))}
            <motion.span
              variants={itemVariants}
              className="mt-1 text-label text-foreground/55"
            >
              Custodian sees all of it.
            </motion.span>
          </motion.div>
        </Lane>
      </div>
    </div>
  );
}
