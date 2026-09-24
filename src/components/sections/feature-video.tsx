"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export function FeatureVideo({
  src,
  darkSrc,
  poster,
  darkPoster,
  className,
}: {
  src: string;
  darkSrc?: string;
  poster?: string;
  darkPoster?: string;
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const activeSrc = resolvedTheme === "dark" && darkSrc ? darkSrc : src;
  const activePoster =
    resolvedTheme === "dark" && darkPoster ? darkPoster : poster;

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) ref.current?.pause();
  }, [reduceMotion]);

  return (
    <video
      ref={ref}
      key={activeSrc}
      src={shouldLoad ? activeSrc : undefined}
      poster={shouldLoad ? activePoster : undefined}
      preload="none"
      width={720}
      height={1558}
      autoPlay={!reduceMotion}
      loop={!reduceMotion}
      muted
      playsInline
      aria-hidden="true"
      className={className}
    />
  );
}
