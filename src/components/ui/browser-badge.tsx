import { Globe } from "lucide-react";
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
      className={cn(
        "group inline-flex h-14 items-center gap-3 rounded-none border border-white/15 bg-black px-4 text-white transition-[border-color,transform] duration-200 hover:border-white/30 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
        className
      )}
    >
      <Globe
        className="size-7 flex-shrink-0"
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="type-button text-[10px] text-white/80">
          No install
        </span>
        <span className="mt-1 type-button text-[16px]">
          Open in Browser
        </span>
      </span>
    </a>
  );
}
