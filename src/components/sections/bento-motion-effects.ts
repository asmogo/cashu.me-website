import { interpolate, scroll } from "framer-motion";
import { easeInOutCubic } from "@/lib/animation";

export function animateBento(section: HTMLElement, grid: HTMLElement) {
  const cards = Array.from(grid.children) as HTMLElement[];
  const transforms = cards.map((_, index) => {
    const start = (index + 1) / 10;
    return {
      opacity: interpolate([0, start, start + 0.2], [0, 0, 1], {
        ease: easeInOutCubic,
      }),
      y: interpolate([0, start, start + 0.2], [80, 80, 0], {
        ease: easeInOutCubic,
      }),
    };
  });
  return scroll(
    (progress: number) => {
      cards.forEach((card, index) => {
        card.style.opacity = String(transforms[index].opacity(progress));
        card.style.transform = `translateY(${transforms[index].y(progress)}px)`;
      });
    },
    { target: section, offset: ["start end", "end start"] },
  );
}
