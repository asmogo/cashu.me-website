"use client";

import { CLOUD_ASSETS, DRIFT_RANGE, RISE_RANGE, TIERS } from "@/lib/clouds";
import type { CloudPlacement, SectionClouds } from "@/lib/clouds";
import { cn } from "@/lib/utils";
import { m, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useSky } from "./sky-provider";

function cloudProps(placement: CloudPlacement) {
  const tier = TIERS[placement.tier];
  return {
    className: cn(
      "absolute w-[var(--cloud-w-mobile)] md:w-[var(--cloud-w)]",
      !placement.mobile && "hidden md:block",
    ),
    style: {
      top: placement.top,
      left: placement.left,
      right: placement.right,
      "--cloud-w": `${placement.width}px`,
      "--cloud-w-mobile": `${placement.mobileWidth ?? placement.width}px`,
      opacity: tier.opacity,
      filter: tier.blur ? `blur(${tier.blur}px)` : undefined,
    } as CSSProperties,
  };
}

function CloudImage({ placement }: { placement: CloudPlacement }) {
  const asset = CLOUD_ASSETS[placement.variant];
  const widths = [128, 256, 384, 512, asset.w].filter(
    (width, index, all) => width <= asset.w && all.indexOf(width) === index,
  );
  return (
    <picture>
      {/* Pre-generated lossless assets retain soft alpha; never run these
          through next/image's lossy optimizer. The PNG remains a fallback. */}
      <source
        type="image/webp"
        srcSet={widths
          .map(
            (width) =>
              `/images/clouds/${placement.variant}-${width}.webp ${width}w`,
          )
          .join(", ")}
        sizes={`(min-width: 768px) ${placement.width}px, ${placement.mobileWidth ?? placement.width}px`}
      />
      <Image
        src={asset.src}
        alt=""
        width={asset.w}
        height={asset.h}
        unoptimized
        className={cn(
          "h-auto w-full select-none [filter:var(--cloud-filter)]",
          placement.flip && "-scale-x-100",
        )}
        draggable={false}
      />
    </picture>
  );
}

function DriftingCloud({
  placement,
  anchor,
  progress,
}: {
  placement: CloudPlacement;
  anchor: number;
  progress: MotionValue<number>;
}) {
  const tier = TIERS[placement.tier];
  const x = useTransform(
    progress,
    (p) => (p - anchor) * DRIFT_RANGE * tier.depth,
  );
  const y = useTransform(
    progress,
    (p) => -(p - anchor) * RISE_RANGE * tier.depth,
  );
  const props = cloudProps(placement);
  return (
    <m.div className={props.className} style={{ ...props.style, x, y }}>
      <CloudImage placement={placement} />
    </m.div>
  );
}

/** Static mobile/reduced-motion clouds never subscribe to scroll progress. */
export function CloudField({ section }: { section?: SectionClouds }) {
  const sky = useSky();
  if (!section || section.clouds.length === 0 || !sky) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {section.clouds.map((placement, i) =>
        sky.drift ? (
          <DriftingCloud
            key={i}
            placement={placement}
            anchor={section.anchor}
            progress={sky.progress}
          />
        ) : (
          <div key={i} {...cloudProps(placement)}>
            <CloudImage placement={placement} />
          </div>
        ),
      )}
    </div>
  );
}
