/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

interface AppStoreBadgeProps {
  href: string;
  className?: string;
}

export function AppStoreBadge({ href, className }: AppStoreBadgeProps) {
  return (
    <a
      href={href}
      aria-label="Download cashu.me on the App Store"
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-80",
        className
      )}
    >
      <img
        src="/badges/app-store-badge.svg"
        alt="Download on the App Store"
        className="h-12 w-auto sm:h-14"
        draggable={false}
      />
    </a>
  );
}
