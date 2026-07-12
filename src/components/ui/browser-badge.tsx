import { Globe } from "lucide-react";
import { storeBadgeClass } from "@/components/ui/store-badge";
import { cn } from "@/lib/utils";

interface BrowserBadgeProps {
  href: string;
  className?: string;
}

// The wallet also runs in any modern browser with nothing to install — this
// badge sits alongside the native App/Play Store badges and points straight
// at the hosted wallet.
export function BrowserBadge({ href, className }: BrowserBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Open the cashu.me wallet in your browser"
      className={cn(storeBadgeClass, className)}
    >
      <Globe
        className="size-8 flex-shrink-0"
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="type-button text-[11px] text-muted-foreground">
          No install
        </span>
        <span className="mt-1 type-button text-[18px]">Browser</span>
      </span>
    </a>
  );
}
