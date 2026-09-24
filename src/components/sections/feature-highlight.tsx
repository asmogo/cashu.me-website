import { Section } from "@/components/section";
import { FeatureCopy } from "./feature-copy";
import { FeatureVideo } from "./feature-video";
import type { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FeatureLayout {
  textClass: string;
  imageClass: string;
  imageAlignClass: string;
}

// lg collapse: two-panel text+media sections (this, tap-to-pay) break at lg;
// multi-item grids (bento, footer) break at md.
const LAYOUTS: FeatureLayout[] = [
  {
    textClass: "lg:col-span-5 lg:col-start-1",
    imageClass: "lg:col-span-6 lg:col-start-7",
    imageAlignClass: "lg:justify-end",
  },
  {
    textClass: "lg:col-span-6 lg:col-start-7",
    imageClass: "lg:col-span-5 lg:col-start-1",
    imageAlignClass: "lg:justify-start",
  },
];

// Shared "phone screen" card styling for both the still-image and video media.
const MEDIA_CLASS =
  "relative h-auto w-full max-w-[300px] rounded-[2rem] border border-foreground/15 drop-shadow-2xl";

interface FeatureHighlightProps {
  feature: (typeof siteConfig.featureHighlight)[number];
  layoutIndex: number;
  className?: string;
  id?: string;
}

export function FeatureHighlight({
  feature,
  layoutIndex,
  className,
  id,
}: FeatureHighlightProps) {
  const layout = LAYOUTS[layoutIndex] ?? LAYOUTS[LAYOUTS.length - 1];
  const { title, description } = feature;
  const imageSrc = "imageSrc" in feature ? feature.imageSrc : undefined;
  const imageSrcDark =
    "imageSrcDark" in feature ? feature.imageSrcDark : undefined;
  const videoSrc = "videoSrc" in feature ? feature.videoSrc : undefined;
  const videoSrcDark =
    "videoSrcDark" in feature ? feature.videoSrcDark : undefined;
  const posterSrc = "posterSrc" in feature ? feature.posterSrc : undefined;
  const posterSrcDark =
    "posterSrcDark" in feature ? feature.posterSrcDark : undefined;
  return (
    <Section
      id={id}
      variant="editorial"
      hideHeader
      className={cn("container-page px-6 lg:px-10", className)}
    >
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-10 lg:gap-x-10">
        <FeatureCopy
          title={title}
          description={description}
          className={layout.textClass}
        />
        <div
          className={cn(
            "col-span-12 flex justify-center lg:row-start-1",
            layout.imageClass,
            layout.imageAlignClass,
          )}
        >
          <div className="relative">
            {/* Bright haze lifts the phone off the sky, matching the hero. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="size-[520px] rounded-full bg-white/50 blur-[140px]" />
            </div>
            {videoSrc ? (
              <FeatureVideo
                src={videoSrc}
                darkSrc={videoSrcDark}
                poster={posterSrc}
                darkPoster={posterSrcDark}
                className={MEDIA_CLASS}
              />
            ) : imageSrc ? (
              <>
                <Image
                  src={imageSrc}
                  alt={title}
                  width={1206}
                  height={2622}
                  sizes="300px"
                  className={cn(MEDIA_CLASS, imageSrcDark && "dark:hidden")}
                />
                {imageSrcDark && (
                  <Image
                    src={imageSrcDark}
                    alt={title}
                    width={1206}
                    height={2622}
                    sizes="300px"
                    className={cn(MEDIA_CLASS, "hidden dark:block")}
                  />
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
