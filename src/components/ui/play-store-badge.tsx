/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

interface PlayStoreBadgeProps {
  href: string;
  className?: string;
}

export function PlayStoreBadge({ href, className }: PlayStoreBadgeProps) {
  return (
    <a
      href={href}
      aria-label="Get cashu.me on Google Play"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-80",
        className
      )}
    >
      <img
        src="/badges/google-play-badge.png"
        alt="Get it on Google Play"
        className="h-12 w-auto sm:h-14"
        draggable={false}
      />
    </a>
  );
}
