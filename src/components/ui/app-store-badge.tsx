import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface AppStoreBadgeProps {
  href: string;
  className?: string;
}

// The iOS app ships via TestFlight (public beta), not the App Store yet — the badge
// keeps the Apple mark but points at the TestFlight invite.
export function AppStoreBadge({ href, className }: AppStoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Download the cashu.me beta on TestFlight"
      className={cn(
        "group inline-flex h-14 items-center gap-3 rounded-none border border-white/15 bg-black px-4 text-white transition-[border-color,transform] duration-200 hover:border-white/30 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
        className
      )}
    >
      <Icons.apple
        className="size-7 flex-shrink-0 fill-current"
        aria-hidden="true"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="type-button text-[10px] text-white/80">
          Download Beta on
        </span>
        <span className="mt-1 type-button text-[16px]">
          TestFlight
        </span>
      </span>
    </a>
  );
}
