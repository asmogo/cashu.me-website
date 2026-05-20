"use client";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const BANK_ROWS = [
  { time: "09:14", to: "Erik J., Stockholm", amount: "−128 sek", tag: "Coffee · Drop Coffee" },
  { time: "12:30", to: "Maria L., Berlin", amount: "−42 sek", tag: "Tip · Substack" },
  { time: "18:02", to: "VPN.com Ltd, Tortola", amount: "−89 sek", tag: "Subscription · monthly" },
  { time: "22:47", to: "Alex P., Lisbon", amount: "−260 sek", tag: "Dinner · split" },
];

const CASHU_ROWS = [
  { time: "—", to: "blinded token", amount: "−1,300 sat", tag: "" },
  { time: "—", to: "blinded token", amount: "−420 sat", tag: "" },
  { time: "—", to: "blinded token", amount: "−890 sat", tag: "" },
  { time: "—", to: "blinded token", amount: "−2,600 sat", tag: "" },
];

function Pane({
  variant,
  className,
}: {
  variant: "bank" | "cashu";
  className?: string;
}) {
  const rows = variant === "bank" ? BANK_ROWS : CASHU_ROWS;
  return (
    <div
      className={cn(
        "h-full w-full rounded-2xl border border-border/60 bg-muted p-6 sm:p-8",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {variant === "bank" ? "your bank" : "cashu mint"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          today
        </span>
      </div>
      <ul className="mt-6 space-y-4">
        {rows.map((row, i) => (
          <li
            key={i}
            className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-4 last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <div
                className={cn(
                  "truncate text-sm font-medium tracking-tight sm:text-base",
                  variant === "cashu" && "text-muted-foreground"
                )}
              >
                {row.to}
              </div>
              {row.tag ? (
                <div className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                  {row.tag}
                </div>
              ) : (
                <div className="mt-0.5 text-xs text-muted-foreground/60 sm:text-sm">
                  not linked to a holder
                </div>
              )}
            </div>
            <div className="shrink-0 text-right font-mono text-sm tabular-nums tracking-tight sm:text-base">
              {row.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Comparison() {
  const [position, setPosition] = useState(55);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, pct)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setFromClientX(e.clientX);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(5, p - 4));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(95, p + 4));
  };

  return (
    <Section
      id="comparison"
      title={siteConfig.comparison.title}
      subtitle={siteConfig.comparison.subtitle}
      description={siteConfig.comparison.description}
      className="container mx-auto max-w-[var(--max-container-width)] px-6 lg:px-10"
    >
      <div
        ref={containerRef}
        className="relative mx-auto aspect-[16/12] w-full max-w-3xl select-none overflow-hidden rounded-3xl border border-border/60 sm:aspect-[16/10]"
      >
        {/* Bank pane (full underneath) */}
        <Pane variant="bank" className="absolute inset-0 rounded-none border-0" />

        {/* Cashu pane clipped to slider position */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          initial={false}
          transition={{ type: "tween", duration: 0.05 }}
        >
          <Pane
            variant="cashu"
            className="h-full w-full rounded-none border-0"
          />
        </motion.div>

        {/* Labels */}
        <div className="pointer-events-none absolute left-4 top-4 z-10">
          <span
            className={cn(
              "rounded-full bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 backdrop-blur transition-opacity",
              position < 25 ? "opacity-0" : "opacity-100"
            )}
          >
            {siteConfig.comparison.leftLabel}
          </span>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 z-10">
          <span
            className={cn(
              "rounded-full bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur transition-opacity",
              position > 75 ? "opacity-0" : "opacity-100"
            )}
          >
            {siteConfig.comparison.rightLabel}
          </span>
        </div>

        {/* Slider handle */}
        <div
          className="absolute inset-y-0 z-20 -ml-px w-0.5 bg-foreground/40"
          style={{ left: `${position}%` }}
        >
          <button
            type="button"
            aria-label="Drag to compare"
            role="slider"
            aria-valuenow={Math.round(position)}
            aria-valuemin={5}
            aria-valuemax={95}
            onPointerDown={onPointerDown}
            onKeyDown={onKey}
            className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border border-border bg-background shadow-lg active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
            >
              <path d="M9 18l-6-6 6-6" />
              <path d="M15 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </Section>
  );
}
