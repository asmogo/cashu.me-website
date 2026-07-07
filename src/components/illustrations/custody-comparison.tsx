"use client";

import { easeInOutCubic, easeOutCubic } from "@/lib/animation";
import { cn } from "@/lib/utils";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Eye, Landmark } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const CUSTODIAL_FIELDS = [
  "ID 0x42a8…",
  "TO @alice",
  "$50.00",
  "10:42:31",
];

const LOOP_DURATION = 4.0;
const REPEAT_DELAY = 0.6;

const BEAT = {
  enter: 0.05,
  boxLeft: 0.25,
  boxCenter: 0.32,
  scanDone: 0.62,
  exit: 0.72,
  exitDone: 0.85,
  fadeOut: 0.95,
} as const;

const CHIP_TRAVEL_PX = -160;
const PACKET_ORIGIN = "-50%";

interface LaneProps {
  active: boolean;
  reduceMotion: boolean;
  checkpoint: string;
  packetDelay: number;
  variant: "mint" | "bank";
  children: React.ReactNode;
}

function Lane({
  active,
  reduceMotion,
  checkpoint,
  packetDelay,
  variant,
  children,
}: LaneProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6">
      {/* Left identifier */}
      {variant === "mint" ? (
        <div className="size-9 overflow-hidden">
          <Image
            src="/images/cashu-logo.png"
            alt="Cashu"
            width={64}
            height={64}
            className="size-full scale-[1.6] select-none rounded-none object-cover [image-rendering:pixelated]"
            draggable={false}
          />
        </div>
      ) : (
        <div className="flex size-9 items-center justify-center border border-foreground/20 bg-foreground/[0.04]">
          <Landmark className="size-5 text-foreground/70" strokeWidth={1.75} />
        </div>
      )}

      {/* Rail + checkpoint + packet */}
      <div
        className="relative flex h-9 items-center [--box-center:43%] sm:[--box-center:41%]"
      >
        {/* The rail */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-foreground/15" />

        {/* Checkpoint band (vertically centered, ~38% across) */}
        <div className="absolute left-[34%] top-0 flex h-full w-[18%] items-center justify-center sm:w-[14%]">
          <div className="absolute inset-y-0 left-0 w-px bg-foreground/25" />
          <div className="absolute inset-y-0 right-0 w-px bg-foreground/25" />
          <span className="absolute -top-5 type-label text-muted-foreground">
            {checkpoint}
          </span>
        </div>

        {/* The packet (dot): emerges from the identifier tile, settles into the
            box, then departs. Mint vanishes the dot during the hold (mint can't
            see the data) and re-emits after; bank stays bright throughout
            (custodian sees everything). */}
        <motion.div
          aria-hidden
          className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--scan)]"
          initial={{ left: PACKET_ORIGIN, opacity: 0 }}
          animate={
            active
              ? reduceMotion
                ? { left: "100%", opacity: 1 }
                : {
                    left: [
                      PACKET_ORIGIN,
                      "0%",
                      "var(--box-center)",
                      "var(--box-center)",
                      "100%",
                      "100%",
                    ],
                    opacity:
                      variant === "mint"
                        ? [0, 1, 0, 0, 1, 0]
                        : [0, 1, 1, 1, 1, 0],
                  }
              : { left: PACKET_ORIGIN, opacity: 0 }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: LOOP_DURATION,
                  delay: packetDelay,
                  repeat: Infinity,
                  repeatDelay: REPEAT_DELAY,
                  ease: [
                    easeOutCubic,
                    easeOutCubic,
                    "linear",
                    easeOutCubic,
                    "linear",
                  ],
                  times: [
                    0,
                    BEAT.enter,
                    BEAT.boxCenter,
                    BEAT.exit,
                    BEAT.exitDone,
                    1,
                  ],
                }
          }
        />

        {/* Mint variant: a frosted overlay sits above the dot and blurs it
            as it passes behind. Editorially: the mint verifies the packet
            but doesn't see its contents — the dot blurs into the box. */}
        {variant === "mint" && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-[34%] top-0 h-full w-[18%] bg-foreground/[0.06] backdrop-blur-[10px] sm:w-[14%]"
          />
        )}

        {/* Laser scan line — clipped to the checkpoint band, sweeps top→bottom
            during the packet's hold beat. Rendered AFTER the mint overlay so
            it stays sharp on top while the dot beneath gets blurred. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[34%] top-0 h-full w-[18%] overflow-hidden sm:w-[14%]"
        >
          <motion.div
            className="absolute inset-x-0 h-px bg-[var(--scan)] shadow-[0_0_6px_var(--scan)]"
            initial={{ top: "0%", opacity: 0 }}
            animate={
              active && !reduceMotion
                ? {
                    top: ["0%", "0%", "100%", "100%"],
                    opacity: [0, 1, 1, 0],
                  }
                : { opacity: 0 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: LOOP_DURATION,
                    delay: packetDelay,
                    repeat: Infinity,
                    repeatDelay: REPEAT_DELAY,
                    ease: easeInOutCubic,
                    times: [0, BEAT.boxCenter, BEAT.scanDone, BEAT.exit],
                  }
            }
          />
        </div>

        {/* Bank variant: eye fades in under the box as the packet enters,
            holds during the scan, fades out as the packet exits. */}
        {variant === "bank" && (
          <motion.div
            aria-hidden
            className="absolute top-full mt-2 left-[34%] flex w-[18%] items-center justify-center sm:w-[14%]"
            initial={{ opacity: 0, y: 4 }}
            animate={
              active
                ? reduceMotion
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: [0, 0, 1, 1, 0, 0],
                      y: [4, 4, 0, 0, 0, 4],
                    }
                : { opacity: 0, y: 4 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: LOOP_DURATION,
                    delay: packetDelay,
                    repeat: Infinity,
                    repeatDelay: REPEAT_DELAY,
                    ease: easeInOutCubic,
                    times: [
                      0,
                      BEAT.boxLeft,
                      BEAT.boxCenter,
                      BEAT.scanDone,
                      BEAT.exit,
                      1,
                    ],
                  }
            }
          >
            <Eye className="size-4 text-foreground" />
          </motion.div>
        )}
      </div>

      {/* Output zone */}
      <div className="min-w-[160px] sm:min-w-[200px]">{children}</div>
    </div>
  );
}

interface ExtractingChipProps {
  active: boolean;
  reduceMotion: boolean;
  packetDelay: number;
  tIn: number;
  className?: string;
  children: React.ReactNode;
}

function ExtractingChip({
  active,
  reduceMotion,
  packetDelay,
  tIn,
  className,
  children,
}: ExtractingChipProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, x: CHIP_TRAVEL_PX }}
      animate={
        active
          ? reduceMotion
            ? { opacity: 1, x: 0 }
            : {
                opacity: [0, 0, 1, 1, 0],
                x: [CHIP_TRAVEL_PX, CHIP_TRAVEL_PX, 0, 0, 0],
              }
          : { opacity: 0, x: CHIP_TRAVEL_PX }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: LOOP_DURATION,
              delay: packetDelay,
              repeat: Infinity,
              repeatDelay: REPEAT_DELAY,
              ease: easeOutCubic,
              times: [
                0,
                Math.max(0, tIn - 0.02),
                tIn,
                BEAT.fadeOut,
                Math.min(1, BEAT.fadeOut + 0.04),
              ],
            }
      }
    >
      {children}
    </motion.span>
  );
}

const captionVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutCubic, delay: 0.4 },
  },
};

export function CustodyComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const reduceMotion = useReducedMotion() ?? false;

  const packetDelay = 0.6;

  // Bank chips emerge as the scan line crosses their notional row.
  const scanWindow = BEAT.scanDone - BEAT.boxCenter;
  const chipStep = scanWindow / CUSTODIAL_FIELDS.length;

  return (
    <div
      ref={ref}
      className="w-full max-w-[640px] py-2 sm:py-4"
      aria-label="Comparison: a custodial wallet sees every detail of your transactions. A Cashu mint only verifies the ecash is valid, nothing else."
    >
      <div className="flex flex-col gap-10 sm:gap-14">
        {/* Ecash lane */}
        <Lane
          active={inView}
          reduceMotion={reduceMotion}
          checkpoint="MINT"
          packetDelay={packetDelay}
          variant="mint"
        >
          <div className="flex flex-col items-start gap-2">
            <ExtractingChip
              active={inView}
              reduceMotion={reduceMotion}
              packetDelay={packetDelay}
              tIn={BEAT.scanDone}
              className={cn(
                "inline-flex items-center border border-[color-mix(in_oklab,var(--scan)_40%,transparent)] bg-[color-mix(in_oklab,var(--scan)_8%,transparent)] px-2 py-1 type-label text-[color:var(--scan)]"
              )}
            >
              ✓ VALID
            </ExtractingChip>
            <motion.span
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={captionVariants}
              className="type-label text-muted-foreground"
            >
              Mint sees nothing else.
            </motion.span>
          </div>
        </Lane>

        {/* Hairline divider */}
        <div className="h-px w-full bg-foreground/10" />

        {/* Custodial lane */}
        <Lane
          active={inView}
          reduceMotion={reduceMotion}
          checkpoint="CUSTODIAN"
          packetDelay={packetDelay}
          variant="bank"
        >
          <div className="flex flex-col items-start gap-1.5">
            {CUSTODIAL_FIELDS.map((field, i) => (
              <ExtractingChip
                key={field}
                active={inView}
                reduceMotion={reduceMotion}
                packetDelay={packetDelay}
                tIn={BEAT.boxCenter + i * chipStep}
                className="inline-flex items-center border border-foreground/20 bg-foreground/[0.03] px-2 py-1 type-label text-foreground/80"
              >
                {field}
              </ExtractingChip>
            ))}
            <motion.span
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={captionVariants}
              className="mt-1 type-label text-foreground/55"
            >
              Custodian sees all of it.
            </motion.span>
          </div>
        </Lane>
      </div>
    </div>
  );
}
