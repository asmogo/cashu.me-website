/**
 * The cloud library and every placement on the page, in one place.
 *
 * Assets are photographic cutouts extracted from sky photography (see
 * public/images/clouds/). Masters are PNG-24 with alpha; next/image serves
 * small AVIF/WebP renditions per instance.
 *
 * Placement rules (the restraint that keeps this from becoming noise):
 *  - at most ~3 clouds visible per viewport-height on desktop
 *  - clouds live in gutters, beside headings, and at section seams —
 *    never behind running text or interactive targets
 *  - never the same variant twice within one viewport; flips add variety
 *  - `mobile: true` marks the small subset that renders below md
 *
 * Motion: one global scroll-progress value (0–1). Each instance translates on
 * X by (progress − anchor) × DRIFT_RANGE × tier.depth, so it sits at its
 * authored position when its section is on screen and drifts as you scroll
 * past. `anchor` ≈ the page progress at which the section is centered.
 */

export type CloudVariant =
  | "cloud-01"
  | "cloud-03"
  | "cloud-04"
  | "cloud-07"
  | "cloud-08";

export type CloudTier = "far" | "mid" | "near";

export interface CloudPlacement {
  variant: CloudVariant;
  /** CSS offsets in % of the section box */
  top: string;
  left?: string;
  right?: string;
  /** display width in CSS px */
  width: number;
  tier: CloudTier;
  flip?: boolean;
  /** render below md too (default: desktop only) */
  mobile?: boolean;
}

export interface SectionClouds {
  /** page scroll progress (0–1) at which this section is roughly centered */
  anchor: number;
  clouds: CloudPlacement[];
}

export const CLOUD_ASSETS: Record<
  CloudVariant,
  { src: string; w: number; h: number }
> = {
  "cloud-01": { src: "/images/clouds/cloud-01.png", w: 800, h: 651 },
  "cloud-03": { src: "/images/clouds/cloud-03.png", w: 495, h: 563 },
  "cloud-04": { src: "/images/clouds/cloud-04.png", w: 330, h: 222 },
  "cloud-07": { src: "/images/clouds/cloud-07.png", w: 800, h: 419 },
  "cloud-08": { src: "/images/clouds/cloud-08.png", w: 800, h: 311 },
};

/** total X travel (px) of a depth-1 cloud across the full page scroll */
export const DRIFT_RANGE = 420;

export const TIERS: Record<
  CloudTier,
  { depth: number; opacity: number; blur: number }
> = {
  far: { depth: 0.3, opacity: 0.68, blur: 0.6 },
  mid: { depth: 0.6, opacity: 0.85, blur: 0 },
  near: { depth: 1, opacity: 1, blur: 0 },
};

/** keyed by section id — <Section> and manual mounts look their sets up here */
export const SECTION_CLOUDS: Record<string, SectionClouds> = {
  hero: {
    anchor: 0.02,
    clouds: [
      { variant: "cloud-08", top: "4%", left: "34%", width: 200, tier: "far", mobile: true },
      { variant: "cloud-07", top: "9%", right: "10%", width: 64, tier: "far", mobile: true },
      { variant: "cloud-01", top: "11%", left: "3%", width: 150, tier: "mid" },
      { variant: "cloud-04", top: "31%", right: "5%", width: 90, tier: "mid" },
      { variant: "cloud-03", top: "48%", left: "3%", width: 78, tier: "mid" },
      // the signature: larger, tucked partially behind the phone trio
      { variant: "cloud-01", top: "58%", right: "13%", width: 230, tier: "near", flip: true },
    ],
  },
  features: {
    anchor: 0.28,
    clouds: [
      { variant: "cloud-07", top: "10%", left: "2%", width: 90, tier: "far", flip: true },
      { variant: "cloud-04", top: "-4%", right: "18%", width: 52, tier: "far" },
      { variant: "cloud-03", top: "68%", right: "3%", width: 72, tier: "mid", mobile: true },
    ],
  },
  "tap-to-pay": {
    anchor: 0.45,
    clouds: [
      { variant: "cloud-07", top: "4%", left: "10%", width: 120, tier: "far" },
      { variant: "cloud-01", top: "60%", left: "2%", width: 110, tier: "mid", flip: true, mobile: true },
    ],
  },
  "feature-2": {
    anchor: 0.60,
    clouds: [
      { variant: "cloud-03", top: "-3%", left: "3%", width: 80, tier: "mid", flip: true, mobile: true },
      { variant: "cloud-07", top: "66%", right: "2%", width: 100, tier: "far" },
    ],
  },
  bento: {
    anchor: 0.75,
    clouds: [
      { variant: "cloud-01", top: "-3%", right: "6%", width: 130, tier: "mid", mobile: true },
      { variant: "cloud-04", top: "55%", left: "1.5%", width: 56, tier: "far" },
    ],
  },
  faq: {
    anchor: 0.92,
    clouds: [
      { variant: "cloud-07", top: "5%", right: "6%", width: 84, tier: "far", flip: true },
      { variant: "cloud-04", top: "70%", left: "8%", width: 48, tier: "far" },
    ],
  },
  footer: {
    anchor: 1.0,
    clouds: [
      { variant: "cloud-03", top: "10%", right: "10%", width: 68, tier: "far" },
      { variant: "cloud-01", top: "42%", left: "6%", width: 120, tier: "mid", mobile: true },
    ],
  },
};
