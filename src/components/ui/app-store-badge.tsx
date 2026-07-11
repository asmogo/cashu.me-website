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
        "group inline-flex h-14 items-center gap-3 rounded-lg border border-white/50 bg-background/55 backdrop-blur-lg px-4 text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),0_8px_24px_-12px_rgba(30,64,120,0.28)] transition-[border-color,background-color,transform] duration-200 hover:border-white/70 hover:bg-background/75 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
        className
      )}
    >
      <Icons.apple
        className="size-7 flex-shrink-0 fill-current"
        aria-hidden="true"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="type-button text-[10px] text-muted-foreground">
          Download Beta on
        </span>
        <span className="mt-1 type-button text-[16px]">
          TestFlight
        </span>
      </span>
    </a>
  );
}
